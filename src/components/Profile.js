import React from 'react';
import {Link} from "react-router-dom";
import {PROFILE_EDIT_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import '../css/profile.css'
import Header from "./Header";
import {firestore} from "../index";
import {doc, deleteDoc} from "firebase/firestore";

const Profile = () => {
    const deleteUser = async () => {
        const thisUserDocRef = doc(firestore, 'users', sessionStorage.getItem('_id'))
        await deleteDoc(thisUserDocRef)
        sessionStorage.clear()
        document.location.href = REGISTRATION_ROUTE
    }


    return (
        <div className={'profile'}>
            <Header />
            <div className={'profile-container'}>
                <h1 className={'main-page-header'}>Профиль</h1>
                <div className={'profile-cards'}>
                    <div className="profile-card profile-data">
                        <h2>Данные</h2>
                        <div className="profile-data-container">
                            <p className="profile-data-caption">ФИО</p>
                            <p className="profile-data username-data">{sessionStorage.getItem('username')}</p>
                        </div>
                        <div className="profile-data-container">
                            <p className="profile-data status-data">{sessionStorage.getItem('status') === 'student' ? 'Обучающийся' : 'Преподаватель'}</p>
                        </div>
                        <div className="profile-data-container">
                            <p className="profile-data-caption">Класс обучения</p>
                            <p className="profile-data grade-data">{sessionStorage.getItem('grade')}</p>
                        </div>
                        <div className="profile-data-container">
                            <p className="profile-data-caption">Дата рождения</p>
                            <p className="profile-data birthdate-data">{sessionStorage.getItem('birthdate')}</p>
                        </div>

                        <div className="profile-data-container">
                            <p className="profile-data-caption">Email</p>
                            <p className="profile-data email-data">{sessionStorage.getItem('email')}</p>
                        </div>
                    </div>
                    <div className="profile-card account-control">
                        <h2>Управление аккаунтом</h2>
                        <Link to={PROFILE_EDIT_ROUTE} className="control-btn edit-btn">Редактировать данные</Link>
                        <button type="button" className="control-btn delete-btn" onClick={deleteUser}>Удалить аккаунт</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;