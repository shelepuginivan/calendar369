import React, {useState} from 'react';
import {firestore} from "../index";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import Header from "./Header";
import '../css/profile-editor.css'
import {PROFILE_ROUTE} from "../utils/consts";
import {parseUsers} from "../utils/parseUsers";


const ProfileEditor = () => {
    const [newGrade, setNewGrade] = useState(sessionStorage.getItem('grade'))
    const [newEmail, setNewEmail] = useState(sessionStorage.getItem('email'))
    const [newBirthdate, setNewBirthdate] = useState(sessionStorage.getItem('birthdate'))
    const [newUsername, setNewUsername] = useState(sessionStorage.getItem('username'))

    const editProfile = async () => {
        const thisUserRef = doc(firestore, 'users', sessionStorage.getItem('_id'))
        const usersRef = collection(firestore, 'users')
        const usersDocsRef = await getDocs(query(usersRef, where('username', '==', newUsername)))
        const usersDocs = parseUsers(usersDocsRef)
        const setUsername = usersDocs.length === 0 ? newUsername : sessionStorage.getItem('username')
        await updateDoc(thisUserRef, {
            username: setUsername,
            grade: newGrade,
            email: newEmail,
        })
        sessionStorage.setItem('grade', newGrade)
        sessionStorage.setItem('email', newEmail)
        sessionStorage.setItem('birthdate', newBirthdate.split('-').reverse().join('.'))
        sessionStorage.setItem('username', setUsername)

        document.location.href = PROFILE_ROUTE
    }

    return (
        <div className="profile-editor">
            <Header />
            <div className="profile-editor-container">
                <h1 className="profile-editor-header">Редактировать профиль</h1>
                <div className="profile-update-inputs">
                    <div className="update-input">
                        <label htmlFor="update-username-input">ФИО</label>
                        <input onChange={event => setNewUsername(event.target.value)} value={newUsername} id="update-username-input" type="text"/>
                    </div>

                    <div className="update-input">
                         <label htmlFor="update-grade-input">Класс</label>
                        <input onChange={event => setNewGrade(event.target.value)} value={newGrade} id="update-grade-input" type="text"/>
                    </div>

                    <div className="update-input">
                        <label htmlFor="update-email-input">Email</label>
                        <input onChange={event => setNewEmail(event.target.value)} value={newEmail} id="update-email-input" type="email"/>
                    </div>

                    <div className="update-input">
                        <label htmlFor="update-birthdate-input">Дата рождения</label>
                        <input onChange={event => setNewBirthdate(event.target.value)} value={newBirthdate} id="update-birthdate-input" type="date"/>
                    </div>

                    <button onClick={editProfile} className="btn-confirm-edit"><span className="icon-confirm"></span> Сохранить изменения</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditor;