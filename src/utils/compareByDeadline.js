export const compareByDeadline = (event1, event2) => {
        if (event1.deadline < event2.deadline) {
            return -1
        } else if (event1.deadline > event2.deadline) {
            return 1
        } else {
            return 0
        }
    }