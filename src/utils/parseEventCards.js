import React from "react";
import EventCard from "../components/EventCard";

export const parseEventCards = (events) => events.map(event => (
        <EventCard event={event} />
    ))