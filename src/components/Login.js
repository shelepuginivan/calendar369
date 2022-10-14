import React, {useState} from 'react';
import {INDEX_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import '../css/auth-form.css'
import {Link} from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import {firestore} from "../index";
import {parseUsers} from "../utils/parseUsers";
import {userStatus} from "../utils/userStatus";


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        const usersRef = collection(firestore, 'users')
        const thisUser = await getDocs(query(usersRef, where("username", "==", username), where("password", "==", password)))
        const thisUserData = parseUsers(thisUser)
        if (thisUserData.length === 1) {
            sessionStorage.setItem('_id', thisUserData[0]._id)
            sessionStorage.setItem('status', userStatus(thisUserData[0].username))
            sessionStorage.setItem('user', 'true')
            sessionStorage.setItem('username', thisUserData[0].username)
            sessionStorage.setItem('email', thisUserData[0].email)
            sessionStorage.setItem('birthdate', thisUserData[0].birthdate)
            sessionStorage.setItem('grade', thisUserData[0].grade)
            document.location.href = INDEX_ROUTE
        }

    }

    return (
        <div className="container">
            <form className={'auth-form'} action={INDEX_ROUTE}>
                <div className="auth-header">
                    <div className="links">
                        <Link className={'link'} to={REGISTRATION_ROUTE}>Регистрация</Link>
                        <Link className={'link'} to={LOGIN_ROUTE}>Вход</Link>
                    </div>
                    <h1 className={'form-header'}>Календарь</h1>
                </div>


                <div className={'inputs'}>
                    <div className="input">
                        <label htmlFor="email-input">ФИО</label>
                        <input value={username} onChange={(event) => setUsername(event.target.value)} id="email-input" type="text"/>
                    </div>

                    <div className="input">
                        <label htmlFor="password-input">Пароль</label>
                        <input value={password} onChange={(event) => setPassword(event.target.value)} id="password-input" type="password"/>
                    </div>
                </div>


                <button onClick={login} type={"button"} className={'submit-btn'}>Войти</button>
            </form>
        </div>
    );
};

export default Login;