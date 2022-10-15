import React, {useEffect} from 'react';
import {useState} from "react";
import {doc, getDoc, serverTimestamp, updateDoc} from "firebase/firestore";
import {firestore} from "../index";
import {MY_EVENTS_ROUTE} from "../utils/consts";
import Header from "./Header";
import {useParams} from "react-router-dom";
import '../css/event-creation-page.css'

const EventEditor = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [profile, setProfile] = useState('')
    const [type, setType] = useState('')
    const [deadline, setDeadline] = useState('')

    const params = useParams()
    const eventId = params.id

    useEffect(() => {
        const getThisEvent = async () => {
            const thisEventRef = doc(firestore, 'events', eventId)
            const thisEventDoc = await getDoc(thisEventRef)
            setTitle(thisEventDoc.data().title)
            setDesc(thisEventDoc.data().description)
            setProfile(thisEventDoc.data().profile)
            setType(thisEventDoc.data().type)
            setDeadline(thisEventDoc.data().deadline)
        }
        getThisEvent().then(() => console.log('success'))
    }, [eventId])

    const editEvent = async () => {
        const thisEventRef = doc(firestore, 'events', eventId)
        if (title && desc && profile && type && deadline) {
            await updateDoc(thisEventRef, {
                title: title,
                description: desc,
                creator: sessionStorage.getItem('username'),
                creationDate: serverTimestamp(),
                deadline: deadline,
                profile: profile,
                type: type
            })
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
                    <button onClick={editEvent} className="btn-confirm-event-data"><span className="icon-confirm"></span> Сохранить изменения</button>
                </div>

            </div>
        </div>
    );
};

export default React.memo(EventEditor);