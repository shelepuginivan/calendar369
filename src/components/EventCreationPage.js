import React, {useRef} from 'react';
import Header from "./Header";
import {addDoc, collection} from "firebase/firestore";
import {firestore} from "../index";
import {MY_EVENTS_ROUTE} from "../utils/consts";

const EventCreationPage = () => {
    const titleRef = useRef()
    const descRef = useRef()
    const profileRef = useRef()
    const typeRef = useRef()
    const deadlineRef = useRef()

    const createEvent = async () => {
        const eventRef = collection(firestore, 'events')
        const title = titleRef.current.value
        const desc = descRef.current.value
        const deadline = Date.parse(deadlineRef.current.value)
        const profile = profileRef.current.value
        const type = typeRef.current.value


        const newEventData = {
                title: title,
                description: desc,
                creator: localStorage.getItem('username'),
                creationDate: Date.now(),
                deadline: deadline,
                profile: profile,
                type: type
            }
        if (title && desc && profile && type && deadline) {
            await addDoc(eventRef, newEventData)
            sessionStorage.removeItem('myEvents')
            sessionStorage.removeItem('actualEvents')
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
                        <input ref={titleRef} id="input-title" type="text"/>
                    </div>
                    <div className="event-input">
                        <label htmlFor="input-desc">Описание</label>
                        <textarea ref={descRef} id="input-desc" />
                    </div>
                    <div className="event-input">
                        <label htmlFor="input-profile">Профиль</label>
                        <input ref={profileRef} id="input-profile"  type="text" list="profile-list"/>
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
                    <div className="event-input">
                        <label htmlFor="input-type">Тип</label>
                        <input ref={typeRef} id="input-type" type="text" list="data-list"/>
                        <datalist id="data-list">
                            <option value="Олимпиада"></option>
                            <option value="Конференция"></option>
                            <option value="Конкурс"></option>
                        </datalist>
                    </div>
                    <div className="event-input">
                        <label htmlFor="input-deadline">Дата события</label>
                        <input ref={deadlineRef} id="input-deadline" type="date"/>
                    </div>
                    <button onClick={createEvent} className="btn-confirm-event-data"><span className="icon-confirm"></span> Создать событие</button>
                </div>

            </div>
        </div>
    );
};

export default EventCreationPage;