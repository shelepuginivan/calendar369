export const parseUsers = (usersDocs) => {
    let allUsers = [];
    usersDocs.forEach(doc => {
        let data = doc.data()
        data._id = doc.id
        allUsers.push(data)
    })
    return allUsers
};