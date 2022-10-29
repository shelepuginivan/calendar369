import React, {useState} from 'react';
import Header from "./Header";
import '../css/all-events.css'
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../index";
import {parseEvents} from "../utils/parseEvents";
import {parseEventCards} from "../utils/parseEventCards";

const AllEvents = () => {
    const [events, setEvents] = useState([])
    const [deadline, setDeadline] = useState('')
    const [profile, setProfile] = useState('')
    const [type, setType] = useState('')

    const searchEvent = async () => {
        let now = new Date()
        let condition = (new Date(deadline) <= new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()))
        if (deadline && condition && !sessionStorage.hasOwnProperty(deadline)) {
            const eventsRef = collection(firestore, 'events')
            const allEvents = await getDocs(query(eventsRef, where("deadline", "==", deadline.split('-').reverse().join('.'))))
            setEvents(parseEvents(allEvents))
            sessionStorage.setItem(deadline, JSON.stringify(parseEvents(allEvents)))
        } else if (sessionStorage.hasOwnProperty(deadline)) {
            setEvents(JSON.parse(sessionStorage.getItem(deadline)))
        }
    }

    return (
        <div className="all-events-page">
            <Header />
            <div className="all-events-page-container">
                <div className="params-inputs">
                    <div className="sort-input">
                        <label htmlFor="event-date-input">Дата события:</label>
                        <input onChange={event => setDeadline(event.target.value)} value={deadline} id="event-date-input" type="date"/>
                    </div>
                    <div className="sort-input">
                        <label htmlFor="event-profile-input">Профиль</label>
                        <input onChange={event => setProfile(event.target.value)} value={profile} id="event-profile-input" type="text" list="profile-list"/>
                        <datalist id="profile-list">
                            <option value="Математика"></option>
                            <option value="Физика"></option>
                            <option value="Информатика"></option>
                            <option value="География"></option>
                            <option value="Биология"></option>
                            <option value="Химия"></option>
                            <option value="Экология"></option>
                            <option value="Обществознание"></option>
                            <option value="История"></option>
                            <option value="Право"></option>
                            <option value="Экономика"></option>
                            <option value="Русский язык"></option>
                            <option value="Литература"></option>
                            <option value="Основы безопасности жизнедеятельности"></option>
                            <option value="Физическая культура"></option>

                        </datalist>
                    </div>
                    <div className="sort-input">
                        <label htmlFor="event-type-input">Тип</label>
                        <input onChange={event => setType(event.target.value)} value={type} id="event-type-input" type="text" list="type-list"/>
                        <datalist id="type-list">
                            <option value="Олимпиада"></option>
                            <option value="Конференция"></option>
                            <option value="Конкурс"></option>
                        </datalist>
                    </div>
                    <button onClick={searchEvent} className="control-btn btn-search">Поиск <span className="icon-search"></span></button>
                </div>
                <div className="all-events-wrapper">
                    {deadline !== '' ?
                        (parseEventCards(events.filter(event => (
                        (profile ? event.profile === profile : true) && (type ? event.type === type : true) )
                    )))
                        :
                        (<div className="unset-deadline-header-container">
                            <h1 className="unset-deadline-header">Пожалуйста, выберите дату события</h1>
                        </div>)}

                </div>
            </div>
        </div>
    );
};

export default AllEvents;