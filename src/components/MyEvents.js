import React, {useEffect, useState} from 'react';
import Header from "./Header";
import '../css/my-events.css'
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../index";
import {parseEvents} from "../utils/parseEvents";

const MyEvents = () => {
    const [allEvents, setAllEvents] = useState(JSON.parse(sessionStorage.getItem('myEvents')) ?? [])


    const username = localStorage.getItem('username')
    useEffect(() => {
        const getAllEvents = async () => {
        const eventsRef = collection(firestore, 'events')
        const allEventsDocs = await getDocs(query(eventsRef, where("creator", "==", username)))
        setAllEvents(parseEvents(allEventsDocs))
        sessionStorage.setItem('myEvents', JSON.stringify(parseEvents(allEventsDocs)))
        console.log(JSON.parse(sessionStorage.getItem('myEvents')))
            console.log(allEvents, 'allEvents')
    }
    if (!sessionStorage.hasOwnProperty('myEvents')) {
         getAllEvents().then(() => console.log('fetched'))
    }
    }, [username])


    const compare = (event1, event2) => {
        if (event1.deadline < event2.deadline) {
            return 1
        } else if (event1.deadline > event2.deadline) {
            return -1
        } else {
            return 0
        }
    }

    const parseEventCards = (events) => events.map(event => (
        <div key={event._id} className="event-card">
            <a href={`/event/${event._id}`} className="event-card-data event-title">{event.title}</a>
            <p className="event-card-data event-title">{event.creator}</p>
            <p className="event-card-data event-title">{event.profile}</p>
            <p className="event-card-data event-title">{event.type}</p>
            <p className="event-card-data event-title">{event.deadline}</p>
        </div>
    ))

    return (
        <div className="my-events">
            <Header />
            <div className="my-events-container">
                <h1 className="my-events-header">Мои события</h1>
                <div className="event-cards">
                    {parseEventCards(allEvents.sort(compare))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(MyEvents);