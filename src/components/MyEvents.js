import React, {useEffect, useState} from 'react';
import Header from "./Header";
import '../css/my-events.css'
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../index";
import {parseEvents} from "../utils/parseEvents";
import {parseEventCards} from "../utils/parseEventCards";
import {compareByDeadline} from "../utils/compareByDeadline";

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

    return (
        <div className="my-events">
            <Header />
            <div className="my-events-container">
                <h1 className="my-events-header">Мои события</h1>
                <div className="event-cards">
                    {parseEventCards(allEvents.sort(compareByDeadline))}
                </div>
            </div>
        </div>
    );
};

export default React.memo(MyEvents);