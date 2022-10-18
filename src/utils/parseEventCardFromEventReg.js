export const parseEventCardFromEventReg = (eventRegData) => {
    const eventCardData = [];
    eventRegData.forEach(eventData => {
        eventCardData.push({
            _id: eventData.eventId,
            title: eventData.eventTitle,
            creator: eventData.eventCreator,
            type: eventData.eventType,
            profile: eventData.eventProfile,
            deadline: eventData.eventDeadline
        })
    })
    return eventCardData;
};