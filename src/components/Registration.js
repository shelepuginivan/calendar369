import React, {useState} from 'react';
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import '../css/auth-form.css'
import {Link} from "react-router-dom";
import {firestore} from "../index";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import {parseUsers} from "../utils/parseUsers";


const Registration = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [grade, setGrade] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')


    const registration = async () => {
        const userData = {
                username: username,
                email: email,
                birthdate: birthdate.split('-').reverse().join('.'),
                grade: grade,
                password: password
            }
        if (username && email && grade && birthdate && password && repeatedPassword === password) {
            const usersRef = collection(firestore, "users")
            const allUsers = await getDocs(query(usersRef, where("username", "==", username)))

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
                    <input onChange={(event) => {
                        setUsername(event.target.value)
                        }} value={username} type="text" className='input' id="username"/>
                </div>

                <div className="input">
                    <label htmlFor="grade">Класс</label>
                    <input onChange={(event) => {
                        setGrade(event.target.value)
                        }} value={grade} type="text" id="grade"/>
                </div>

                <div className="input">
                    <label htmlFor="email">Email</label>
                    <input onChange={(event) => {
                        setEmail(event.target.value)
                        }} value={email} type="email" id="email"/>
                </div>

                <div className="input">
                    <label htmlFor="birthdate">Дата рождения</label>
                    <input onChange={(event) => {
                        setBirthdate(event.target.value)
                        }} value={birthdate} type="date" id="birthdate"/>
                </div>

                <div className="input">
                    <label htmlFor="password">Пароль</label>
                    <input onChange={(event) => {
                        setPassword(event.target.value)
                        }} value={password} type="password" id="password"/>
                </div>

                <div className="input">
                    <label htmlFor="password-repeat">Повторите пароль</label>
                    <input onChange={(event) => {
                        setRepeatedPassword(event.target.value)
                        }} value={repeatedPassword} type="password" id="password-repeat"/>
                </div>
                </div>


                <button type={"button"} onClick={registration} className={'submit-btn'}>Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Registration;