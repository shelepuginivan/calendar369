import React, {useEffect, useState} from 'react';
import Header from "./Header";
import '../css/index-page.css'
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../index";
import {parseEvents} from "../utils/parseEvents";
import {parseEventCards} from "../utils/parseEventCards";
import {compareByDeadline} from "../utils/compareByDeadline";

const IndexPage = () => {
    const [events, setEvents] = useState(JSON.parse(sessionStorage.getItem('recentEvents')) ?? [])


    useEffect(() => {
        const getRecentEvents = async () => {
            const eventsRef = collection(firestore, 'events')
            const recentEvents = await getDocs(query(eventsRef), where("deadline", ">=", Date.now()))
            setEvents(parseEvents(recentEvents).sort(compareByDeadline).slice(0, 20))
            sessionStorage.setItem('recentEvents', JSON.stringify(parseEvents(recentEvents).sort(compareByDeadline).slice(0, 20)))
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
                    {parseEventCards(events.sort(compareByDeadline))}
                </div>
            </div>
        </div>
    );
};

export default IndexPage;