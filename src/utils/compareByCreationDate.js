export const compareByCreationDate = (event1, event2) => {
    if (event1.creationDate > event2.creationDate) {
        return -1
    } else if (event1.creationDate < event2.creationDate) {
        return 1
    } else {
        return 0
    }
}