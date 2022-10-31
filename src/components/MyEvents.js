import React, {useEffect, useState} from 'react';
import Header from "./Header";
import '../css/my-events.css'
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../index";
import {parseEvents} from "../utils/parseEvents";
import {parseEventCards} from "../utils/parseEventCards";
import {compareByDeadline} from "../utils/compareByDeadline";

const MyEvents = () => {
    const [events, setEvents] = useState(JSON.parse(sessionStorage.getItem('actualEvents')) ?? [])

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


    return (
        <div className="my-events">
            <Header />
            <div className="my-events-container">
                <h1 className="my-events-header">Мои события</h1>
                <div className="event-cards">
                    {parseEventCards(events.filter(event => event.creator === localStorage.getItem('username')).sort(compareByDeadline))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(MyEvents);