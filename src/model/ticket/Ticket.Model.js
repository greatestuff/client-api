const {TicketSchema} = require("./Ticket.Schema")

const insertTicket = (ticketObj) => {
    
    return new Promise((resolve,reject) => {
        try {
            //const insertedTicket = (ticketObj) => {
                TicketSchema(ticketObj).save().then(data => resolve(data)).catch(error => reject(error))
            //}
        } catch (error) {
            reject(error)
        }
    })
}

const getTickets = (clientId) => {
    
    return new Promise((resolve,reject) => {
        try {
            //const insertedTicket = (ticketObj) => {
                TicketSchema.find({clientId}).then(data => resolve(data)).catch(error => reject(error))
            //}
        } catch (error) {
            reject(error)
        }
    })
}

const getTicketByID = (_id, clientId) => {
    
    return new Promise((resolve,reject) => {
        try {
            //const insertedTicket = (ticketObj) => {
                TicketSchema.find({_id, clientId}).then(data => resolve(data)).catch(error => reject(error))
            //}
        } catch (error) {
            reject(error)
        }
    })
}

const updateClientReply = ({_id, message, sender}) => {
    
    return new Promise((resolve,reject) => {
        try {
            //const insertedTicket = (ticketObj) => {
                TicketSchema.findOneAndUpdate(
                    {_id},
                    {status: "Pending Operator response", $push : {conversations : {message,sender}}},
                    {new:true})
                    .then(data => resolve(data)).catch(error => reject(error))
            //}
        } catch (error) {
            reject(error)
        }
    })
}


const updateStatusClose = ({_id, clientId}) => {
    
    return new Promise((resolve,reject) => {
        try {
            //const insertedTicket = (ticketObj) => {
                TicketSchema.findOneAndUpdate(
                    {_id, clientId},
                    {status: "Closed"},
                    {new:true})
                    .then(data => resolve(data)).catch(error => reject(error))
            //}
        } catch (error) {
            reject(error)
        }
    })
}

const deleteTicket = ({_id, clientId}) => {
    
    return new Promise((resolve,reject) => {
        try {
            //const insertedTicket = (ticketObj) => {
                TicketSchema.findOneAndDelete(
                    {_id, clientId})
                    .then(data => resolve(data)).catch(error => reject(error))
            //}
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    insertTicket, getTickets, getTicketByID, updateClientReply, updateStatusClose, deleteTicket
}