import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {parseEventCards} from "../utils/parseEventCards";
import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "../index";
import {parseEventRegs} from "../utils/parseEventRegistrations";
import {parseEventCardFromEventReg} from "../utils/parseEventCardFromEventReg";
import '../css/user-registered-on-events.css'

const UserRegisteredOnEvents = () => {
    const [userRegisteredOnEvent, setUserRegisteredOnEvent] = useState(JSON.parse(sessionStorage.getItem('userRegisteredOnEvents')) ?? [])
    useEffect(() => {
        const getEventsUserRegisteredOn = async () => {
              if (!sessionStorage.hasOwnProperty('userRegisteredOnEvents')) {
                  const eventsRegsRef = collection(firestore, 'eventRegistrations')
                  const eventsUserRegisteredOnDocs = await getDocs(query(eventsRegsRef, where("username", "==", localStorage.getItem('username'))))
                  setUserRegisteredOnEvent(parseEventRegs(eventsUserRegisteredOnDocs).filter(item => Date.parse(item.eventDeadline.split('.').reverse().join('-')) >= Date.now()))
                  sessionStorage.setItem('userRegisteredOnEvents', JSON.stringify(parseEventRegs(eventsUserRegisteredOnDocs).filter(item => Date.parse(item.deadline.split('.').reverse().join('-')) >= Date.now())))
              }
        }
        getEventsUserRegisteredOn()
    }, [])



    return (
        <div className="user-registered-on-events">
            <Header />
            <div className="user-registered-on-events-container">
                <h1 className="user-registered-on-events-header">События, на которые вы записаны</h1>
                <div className="user-registered-on-events-wrapper">
                    {parseEventCards(parseEventCardFromEventReg(userRegisteredOnEvent))}
                </div>
            </div>
        </div>
    );
};

export default UserRegisteredOnEvents;