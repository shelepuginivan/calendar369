import React, {useEffect, useState} from 'react';
import Header from "./Header";
import '../css/index-page.css'
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../index";
import {parseEvents} from "../utils/parseEvents";
import {parseEventCards} from "../utils/parseEventCards";
import {compareByCreationDate} from "../utils/compareByCreationDate";

const IndexPage = () => {
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
        <div className="index-page">
            <Header />
            <div className="index-page-container">
                <h1 className="index-page-header">Последние добавленные события</h1>
                <div className="all-events">
                    {parseEventCards(events.sort(compareByCreationDate).slice(0, 20))}
                </div>
            </div>
        </div>
    );
};

export default IndexPage;