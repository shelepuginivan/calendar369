import React, {useEffect, useState} from 'react';
import Header from "./Header";
import '../css/all-events.css'
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../index";
import {parseEvents} from "../utils/parseEvents";
import {parseEventCards} from "../utils/parseEventCards";

const AllEvents = () => {
    const eventIsValid = (event) => {
        return (!deadline || Date.parse(deadline) === event.deadline) && (!type || type === event.type.substring(0, type.length)) && (!profile || profile === event.profile.substring(0, profile.length))

    }


    const [events, setEvents] = useState(JSON.parse(sessionStorage.getItem('actualEvents')) ?? [])
    const [deadline, setDeadline] = useState('')
    const [profile, setProfile] = useState('')
    const [type, setType] = useState('')
    const [anyEventFound, setAnyEventFound] = useState(true)

    useEffect(() => {
        const getActualEvents = async () => {
            const eventsRef = collection(firestore, 'events')
            const recentEvents = await getDocs(query(eventsRef, where('deadline', '>=', Date.now())))
            setEvents(parseEvents(recentEvents))
            sessionStorage.setItem('actualEvents', JSON.stringify(parseEvents(recentEvents)))
        }
        if (!sessionStorage.hasOwnProperty('actualEvents')) {
            getActualEvents()
        }
    }, [])


    useEffect(() => setAnyEventFound(events.filter(event => eventIsValid(event)).length !== 0),[deadline, type, profile, events])

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
                </div>
                <div className="all-events-wrapper">
                    {
                        (deadline !== '' || type !== '' || profile !== '') && anyEventFound
                        ? parseEventCards(events.filter(event => eventIsValid(event))
)
                        :
                            (<div className="unset-deadline-header-container">
                                <h1 className="unset-deadline-header">{!anyEventFound ?  'Ничего не найдено' : 'Начните вводить один из параметров'}</h1>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllEvents;