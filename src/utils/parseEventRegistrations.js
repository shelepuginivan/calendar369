export const parseEventRegs = (eventsRegsDoc) => {
    let allEventsRegs = [];
    eventsRegsDoc.forEach(doc => {
        let data = doc.data()
        data._id = doc.id
        allEventsRegs.push(data)
    })
    return allEventsRegs
};