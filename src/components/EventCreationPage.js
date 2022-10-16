import React, {useState} from 'react';
import Header from "./Header";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {firestore} from "../index";
import {MY_EVENTS_ROUTE} from "../utils/consts";

const EventCreationPage = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [profile, setProfile] = useState('')
    const [type, setType] = useState('')
    const [deadline, setDeadline] = useState('')

    const createEvent = async () => {
        const eventRef = collection(firestore, 'events')
        const newEventData = {
                title: title,
                description: desc,
                creator: localStorage.getItem('username'),
                creationDate: serverTimestamp(),
                deadline: deadline,
                profile: profile,
                type: type
            }
        if (title && desc && profile && type && deadline) {
            await addDoc(eventRef, newEventData)
            sessionStorage.removeItem('myEvents')
            sessionStorage.removeItem('recentEvents')
            document.location.href = MY_EVENTS_ROUTE

        }
    }

    return (
        <div className="event-creation-page">
            <Header />
            <div className="event-creation-container">
                <h1 className="event-creation-page-header">Создать событие</h1>
                <div className="event-creation-inputs">
                    <div className="event-input">
                        <label htmlFor="input-title">Название</label>
                        <input value={title} onChange={event => setTitle(event.target.value)} id="input-title" type="text"/>
                    </div>
                    <div className="event-input">
                        <label htmlFor="input-desc">Описание</label>
                        <textarea value={desc} onChange={event => setDesc(event.target.value)} id="input-desc" />
                    </div>
                    <div className="event-input">
                        <label htmlFor="input-profile">Профиль</label>
                        <input value={profile} onChange={event => setProfile(event.target.value)} id="input-profile"  type="text"/>
                    </div>
                    <div className="event-input">
                        <label htmlFor="input-type">Тип</label>
                        <input value={type} onChange={event => setType(event.target.value)} id="input-type" type="text" list="data-list"/>
                        <datalist id="data-list">
                            <option value="Олимпиада"></option>
                            <option value="Конференция"></option>
                            <option value="Конкурс"></option>
                        </datalist>
                    </div>
                    <div className="event-input">
                        <label htmlFor="input-deadline">Дата события</label>
                        <input value={deadline} onChange={event => setDeadline(event.target.value)} id="input-deadline" type="date"/>
                    </div>
                    <button onClick={createEvent} className="btn-confirm-event-data"><span className="icon-confirm"></span> Создать событие</button>
                </div>

            </div>
        </div>
    );
};

export default EventCreationPage;