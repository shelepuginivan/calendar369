import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, addDoc, where} from "firebase/firestore";
import {firestore} from "../index";
import Header from "./Header";
import '../css/event-page.css'
import {MY_EVENTS_ROUTE} from "../utils/consts";
import {parseEventRegs} from "../utils/parseEventRegistrations";
import {dateToFormat} from "../utils/dateToFormat";
import EventPageError from "./EventPageError";

const EventPage = () => {
    const [eventData, setEventData] = useState({})

    const params = useParams()
    const eventId = params.id

    const [isRegOnEvent, setIsRegOnEvent] = useState(JSON.parse(sessionStorage.getItem(`isRegOn${eventId}`)) ?? false)


    useEffect(() => {
        const getEventData = async () => {
            const eventDoc = doc(firestore, 'events', eventId)
            const thisEventData = await getDoc(eventDoc)
            setEventData(thisEventData.data())
        }
        const getRegStatus = async () => {
            const eventsRegsRef = collection(firestore, 'eventRegistrations')
            const eventRegistration = await getDocs(query(eventsRegsRef, where("eventId", "==", eventId), where("username", "==", localStorage.getItem('username'))))
            const thisEventReg = parseEventRegs(eventRegistration)
            setIsRegOnEvent(thisEventReg.length !== 0)
        }
        getRegStatus()
        getEventData()
    }, [eventId])

    const deleteEvent = async () => {
        if (localStorage.getItem('username') === eventData.creator) {
            const eventDoc = doc(firestore, 'events', eventId)
            await deleteDoc(eventDoc)
            const myEvents = JSON.parse(sessionStorage.getItem('myEvents'))
            myEvents.forEach(event => {
                if (event._id === eventId) {
                    myEvents.pop(event)
                }
            })
            sessionStorage.setItem('myEvents', JSON.stringify(myEvents))
            sessionStorage.removeItem('recentEvents')
            document.location.href = MY_EVENTS_ROUTE
        }
    }

    const registrationOnEvent = async () => {
        const eventsRegsRef = collection(firestore, 'eventRegistrations')
        const eventRegistration = await getDocs(query(eventsRegsRef, where("eventId", "==", eventId), where("username", "==", localStorage.getItem('username'))))
        const thisEventReg = parseEventRegs(eventRegistration)
        setIsRegOnEvent(thisEventReg.length !== 0)
        const eventRegistrationData = {
            "eventCreator": eventData.creator,
            "eventDeadline": eventData.deadline,
            "eventId": eventId,
            "eventProfile": eventData.profile,
            "eventTitle": eventData.title,
            "eventType": eventData.type,
            "registeredAt": serverTimestamp(),
            "userEmail": localStorage.getItem("email"),
            "username": localStorage.getItem("username"),
            "grade": localStorage.getItem('grade')
        }
        if (isRegOnEvent) {
            const thisEventRegDoc = doc(firestore, 'eventRegistrations', thisEventReg[0]._id)
            await deleteDoc(thisEventRegDoc)
            sessionStorage.setItem(`isRegOn${eventId}`, 'false')
            const userRegisteredOnEvents = JSON.parse(sessionStorage.getItem('userRegisteredOnEvents')) ?? []
            userRegisteredOnEvents.forEach(eventData => {
                if (eventData.eventId === eventId && userRegisteredOnEvents) {
                    userRegisteredOnEvents.pop(eventData)
                }
            })
            sessionStorage.setItem('userRegisteredOnEvents', JSON.stringify(userRegisteredOnEvents))

        } else {
            await addDoc(eventsRegsRef, eventRegistrationData)
            sessionStorage.setItem(`isRegOn${eventId}`, 'true')
            const userRegisteredOnEvents = JSON.parse(sessionStorage.getItem('userRegisteredOnEvents')) ?? []
            userRegisteredOnEvents.push(eventRegistrationData)
            sessionStorage.setItem('userRegisteredOnEvents', JSON.stringify(userRegisteredOnEvents))
        }
        setIsRegOnEvent(!isRegOnEvent)
    }


    return eventData
        ? (
        <div className="event-page">
            <Header />
                <div className={'event-content-container'}>
                    <div className={'this-event-card'}>
                        <h2 className="event-title">{eventData.title}</h2>
                        <p className="event-data-caption">????????????????</p>
                        <p className="event-data">{eventData.description}</p>
                        <p className="event-data-caption">??????????????</p>
                        <p className="event-data">{eventData.creator}</p>
                        <p className="event-data-caption">???????? ??????????????</p>
                        <p className="event-data">{dateToFormat(new Date(eventData.deadline))}</p>
                    </div>
                {eventData.creator === localStorage.getItem('username') ?
                    (<div className="event-settings">
                        <h2 className="control-header">????????????????</h2>
                        <button onClick={deleteEvent} className="control-btn event-delete-btn"><span className="icon-del"></span> ?????????????? ??????????????</button>
                        <Link to={`/event/${eventId}/edit`} className="control-btn edit-link"><span className="icon-edit"></span> ???????????????? ??????????????</Link>
                        <Link to={`/event/${eventId}/participants`} className="control-btn edit-link"><span className="icon-participants"></span> ???????????? ????????????????????</Link>
                    </div>)
                    : localStorage.getItem('status') === 'student' ?
                    (<div className="event-settings">
                        <h2 className="control-header">????????????????</h2>
                        <button onClick={registrationOnEvent} state={String(!isRegOnEvent)} className="control-btn event-registration-btn">{!isRegOnEvent ? (<span><span className="icon-registration"></span> ????????????????????????????????????</span>) : (<span><span className="icon-cancel-reg"></span> ???????????????? ??????????????????????</span>)}</button>
                    </div>) : (<div></div>)
                }
            </div>

        </div>
    )
        : (
            <EventPageError />
        )

};

export default React.memo(EventPage);