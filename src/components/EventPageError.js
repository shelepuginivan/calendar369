import React from 'react';
import Header from "./Header";
import {INDEX_ROUTE} from "../utils/consts";
import "../css/event-page-error.css";

const EventPageError = () => {
    return (
        <div className="event-page-error">
            <Header />
                <h1 className="err-message">Событие не найдено</h1>
                <a className="err-link" href={INDEX_ROUTE}>На главную</a>
        </div>
    );
};

export default EventPageError;