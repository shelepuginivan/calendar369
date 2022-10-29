import React, {useRef} from 'react';
import bcrypt from 'bcryptjs';
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import '../css/auth-form.css'
import {Link} from "react-router-dom";
import {firestore} from "../index";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import {parseUsers} from "../utils/parseUsers";


const Registration = () => {
    const usernameRef = useRef()
    const emailRef = useRef()
    const gradeRef = useRef()
    const birthdateRef = useRef()
    const passwordRef = useRef()
    const passwordRepeatRef = useRef()

    const registration = async () => {
        const salt = await bcrypt.genSalt()
        const userData = {
                username: usernameRef.current.value,
                email: emailRef.current.value,
                birthdate: birthdateRef.current.value.split('-').reverse().join('.'),
                grade: gradeRef.current.value,
                password: await bcrypt.hash(passwordRef.current.value, salt)
            }
        if (usernameRef.current.value && emailRef.current.value && birthdateRef.current.value && passwordRef.current.value && passwordRepeatRef.current.value === passwordRef.current.value) {
            const usersRef = collection(firestore, "users")
            const allUsers = await getDocs(query(usersRef, where("username", "==", usernameRef.current.value)))

            const usersData = parseUsers(allUsers)

            if (usersData.length === 0) {
                await addDoc(usersRef, userData)
            }

            document.location.href = LOGIN_ROUTE
        }

    };

    return (
        <div className={'container'}>
            <form className={'auth-form'} action={LOGIN_ROUTE} onSubmit={registration}>
                <div className="auth-header">
                    <div className="links">
                        <Link className={'link'} to={REGISTRATION_ROUTE}>Регистрация</Link>
                        <Link className={'link'} to={LOGIN_ROUTE}>Вход</Link>
                    </div>
                    <h1 className={'form-header'}>Календарь</h1>
                </div>

                <div className="inputs">
                    <div className="input">
                    <label htmlFor="username">ФИО</label>
                    <input ref={usernameRef} type="text" className='input' id="username"/>
                </div>

                <div className="input">
                    <label htmlFor="grade">Класс</label>
                    <input ref={gradeRef} type="text" placeholder="Если Вы учитель, оставьте это поле пустым" id="grade"/>
                </div>

                <div className="input">
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="email" id="email"/>
                </div>

                <div className="input">
                    <label htmlFor="birthdate">Дата рождения</label>
                    <input ref={birthdateRef} type="date" id="birthdate"/>
                </div>

                <div className="input">
                    <label htmlFor="password">Пароль</label>
                    <input ref={passwordRef} type="password" id="password"/>
                </div>

                <div className="input">
                    <label htmlFor="password-repeat">Повторите пароль</label>
                    <input ref={passwordRepeatRef} type="password" id="password-repeat"/>
                </div>
                </div>


                <button type={"button"} onClick={registration} className={'submit-btn'}>Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Registration;