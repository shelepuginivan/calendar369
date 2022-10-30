import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {useParams} from "react-router-dom";
import {firestore} from "../index";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import '../css/event-participants.css'
import {parseParticipants} from "../utils/parseParticipants";

const EventParticipants = () => {
    const params = useParams()
    const eventId = params.id


    const [eventData, setEventData] = useState(JSON.parse(sessionStorage.getItem(`${eventId}Data`)) ?? {})
    const [eventParticipants, setEventParticipants] = useState(JSON.parse(sessionStorage.getItem(`${eventId}Participants`)) ?? [])


    useEffect(() => {
        const getEventData = async () => {
            const thisEventDocRef = doc(firestore, 'events', eventId)
            const thisEventData = await getDoc(thisEventDocRef)
            sessionStorage.setItem(`${eventId}Data`, JSON.stringify(thisEventData.data()))
            setEventData(thisEventData.data())
        }
        const getEventParticipants = async () => {
            const eventRegsRef = collection(firestore, 'eventRegistrations')
            const thisEventRegs = await getDocs(query(eventRegsRef, where("eventId", "==", eventId)))
            const participants = []
            thisEventRegs.forEach(eventRegData => {
                participants.push({
                    username: eventRegData.data().username,
                    email: eventRegData.data().userEmail,
                    grade: eventRegData.data().grade
                })
            })
            console.log(participants)
            sessionStorage.setItem(`${eventId}Participants`, JSON.stringify(participants))
            setEventParticipants(participants)
        }
        if (!sessionStorage.hasOwnProperty(`${eventId}Data`)) {
            getEventData()
        }
        if (!sessionStorage.hasOwnProperty(`${eventId}Participants`)) {
            getEventParticipants()
        }
    }, [])


    return (
        <div className="event-participants">
            <Header />
            <div className="event-participants-container">
                <h1 className="event-participants-header">Участники события "{eventData.title}":</h1>
                <div className="participants-wrapper">
                    {parseParticipants(eventParticipants)}
                </div>
            </div>




        </div>
    );
};

export default EventParticipants;