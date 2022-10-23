import React from "react";
import EventCard from "../components/EventCard";

export const parseEventCards = (events) => events.map(event => (
        <EventCard key={event._id} event={event} />
    ))