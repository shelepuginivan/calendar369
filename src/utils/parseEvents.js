export const parseEvents = (eventsDocs) => {
    let allEvents = [];
    eventsDocs.forEach(doc => {
        let data = doc.data()
        data._id = doc.id
        allEvents.push(data)
    })
    return allEvents
};