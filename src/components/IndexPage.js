import React, {useEffect, useState} from 'react';
import Header from "./Header";
import '../css/index-page.css'
import {collection, getDocs, query} from "firebase/firestore";
import {firestore} from "../index";
import {parseEvents} from "../utils/parseEvents";
import {parseEventCards} from "../utils/parseEventCards";
import {compareByCreationDate} from "../utils/compareByCreationDate";

const IndexPage = () => {
    const [events, setEvents] = useState(JSON.parse(sessionStorage.getItem('recentEvents')) ?? [])

    useEffect(() => {
        const getRecentEvents = async () => {
            const eventsRef = collection(firestore, 'events')
            const recentEvents = await getDocs(query(eventsRef))
            setEvents(parseEvents(recentEvents).filter(event => Date.parse(event.deadline.split('.').reverse().join('-')) >= Date.now()).sort(compareByCreationDate).slice(0, 20))
            sessionStorage.setItem('recentEvents', JSON.stringify(parseEvents(recentEvents).sort(compareByCreationDate).slice(0, 20)))
        }
        if (!sessionStorage.hasOwnProperty('recentEvents')) {
            getRecentEvents()
        }
    })

    return (
        <div className="index-page">
            <Header />
            <div className="index-page-container">
                <h1 className="index-page-header">Последние добавленные события</h1>
                <div className="all-events">
                    {parseEventCards(events.sort(compareByCreationDate))}
                </div>
            </div>
        </div>
    );
};

export default IndexPage;