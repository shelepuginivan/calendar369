import React from 'react';
import '../css/event-card.css'
import {Link} from "react-router-dom";
import {dateToFormat} from "../utils/dateToFormat";


const EventCard = ({event}) => {
    return (
        <div key={event._id} className="event-card">
            <div className="event-data">
                <a href={`/event/${event._id}`} className="event-card-data event-title">{event.title}</a>
                <p className="event-card-data event-title"><span className="event-data-caption">Куратор:</span> {event.creator}</p>
                <p className="event-card-data event-title"><span className="event-data-caption">Профиль/предмет:</span> {event.profile}</p>
                <p className="event-card-data event-title"><span className="event-data-caption">Тип:</span> {event.type}</p>
                <p className="event-card-data event-title"><span className="event-data-caption">Дата события:</span> {dateToFormat(new Date(event.deadline))}</p>
            </div>
            <div className="btn-container"><Link className="control-btn details-btn" to={`/event/${event._id}`}><span className="icon-info"></span> Подробнее</Link></div>
        </div>
    );
};

export default EventCard;