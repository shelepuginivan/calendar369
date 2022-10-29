import React from 'react';
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, PROFILE_CREATE_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import '../css/profile.css'
import Header from "./Header";
import {firestore} from "../index";
import {doc, deleteDoc} from "firebase/firestore";

const Profile = () => {
    const deleteUser = async () => {
        const thisUserDocRef = doc(firestore, 'users', localStorage.getItem('_id'))
        await deleteDoc(thisUserDocRef)
        localStorage.clear()
        document.location.href = REGISTRATION_ROUTE
    }

    const logout = () => {
        localStorage.clear()

        document.location.href = LOGIN_ROUTE
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
                            <p className="profile-data username-data">{localStorage.getItem('username')}</p>
                        </div>
                        <div className="profile-data-container">
                            <p className="profile-data status-data">{localStorage.getItem('status') === 'student' ? 'Обучающийся' : 'Преподаватель'}</p>
                        </div>
                        <div className="profile-data-container">
                            <p className="profile-data-caption">Класс обучения</p>
                            <p className="profile-data grade-data">{localStorage.getItem('grade')}</p>
                        </div>
                        <div className="profile-data-container">
                            <p className="profile-data-caption">Дата рождения</p>
                            <p className="profile-data birthdate-data">{localStorage.getItem('birthdate')}</p>
                        </div>

                        <div className="profile-data-container">
                            <p className="profile-data-caption">Email</p>
                            <p className="profile-data email-data">{localStorage.getItem('email')}</p>
                        </div>
                    </div>
                    <div className="profile-card account-control">
                        <h2>Управление аккаунтом</h2>
                        <button onClick={logout} className="control-btn logout-btn"><span className="icon-logout"></span> Выйти</button>
                        <Link to={PROFILE_CREATE_ROUTE} className="control-btn edit-btn"><span className="icon-edit"></span> Редактировать данные</Link>
                        <button type="button" className="control-btn delete-btn" onClick={deleteUser}><span className="icon-del"></span> Удалить аккаунт</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;