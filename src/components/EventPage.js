import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {deleteDoc, doc, getDoc} from "firebase/firestore";
import {firestore} from "../index";
import Header from "./Header";
import '../css/event-page.css'
import {MY_EVENTS_ROUTE} from "../utils/consts";

const EventPage = () => {
    const [eventData, setEventData] = useState({})
    
    const params = useParams()
    const eventId = params.id

    useEffect(() => {
        const getEventData = async () => {
            const eventDoc = doc(firestore, 'events', eventId)
            const thisEventData = await getDoc(eventDoc)
            setEventData(thisEventData.data())
        }
        getEventData()
    }, [eventId])

    const deleteEvent = async () => {
        if (sessionStorage.getItem('username') === eventData.creator) {
            const eventDoc = doc(firestore, 'events', eventId)
            await deleteDoc(eventDoc)

            document.location.href = MY_EVENTS_ROUTE
        }
    }


    return (
        <div className="event-page">
            <Header />
                <div className={'event-content-container'}>
                    <div className={'this-event-card'}>
                        <h2 className="event-title">{eventData.title}</h2>
                        <p className="event-data-caption">Описание</p>
                        <p className="event-data">{eventData.description}</p>
                        <p className="event-data-caption">Куратор</p>
                        <p className="event-data">{eventData.creator}</p>
                        <p className="event-data-caption">Дата события</p>
                        <p className="event-data">{eventData.deadline}</p>
                    </div>
                {eventData.creator === sessionStorage.getItem('username') ?
                    (<div className="event-settings">
                        <h2 className="control-header">Действия</h2>
                        <button onClick={deleteEvent} className="control-btn event-delete-btn"><span className="icon-del"></span> Удалить событие</button>
                        <Link to={`/event/${eventId}/edit`} className="control-btn edit-link"><span className="icon-edit"></span> Изменить событие</Link>
                    </div>)
                    :
                    (<div className="event-settings">
                        <h2 className="control-header">Действия</h2>
                        <button className="control-btn event-registration-btn"><span className="icon-registration"></span> Зарегистрироваться</button>
                    </div>)
                }
            </div>

        </div>
    );
};

export default React.memo(EventPage);