const express = require("express")
const { insertTicket, getTickets, getTicketByID, updateClientReply, updateStatusClose, deleteTicket } = require("../model/ticket/Ticket.Model")
const {userAuthorization} = require("../middlewares/userAuthorization.middleware")
const router = express.Router()

router.all('/',(req,res,next) =>{
    //res.json({message: "return from ticket router"})

    next()
})

//Create a new ticket
router.post("/",userAuthorization, async(req, res, next) =>{

    try {
        const {subject, sender, message} = req.body
        const userId = req.userId
        
        const ticketObj = {
            clientId: userId,
            subject,
            conversations : 
            [
                {
                    sender,
                    message
                }
            ]
        }

        const result = await insertTicket(ticketObj)

        if(result._id)
        {
            return res.json({status: 'success', message: "New ticket hass been added"})
        }
        return res.json({status: 'error', message: "unable to create the ticket please try again later !"})
    } catch (error) {
        console.log(error)
        return res.json({status: 'error', message: "An error happened !"})
    }

})


//Get all tickets for a specific user
router.get("/",userAuthorization, async(req, res) =>{

    try {

        const userId = req.userId

        const result = await getTickets(userId)
        

        return res.json({status: 'success', message: result})

        return res.json({status: 'error', message: "unable to get any tickets !"})

    } catch (error) {
        console.log(error)
        return res.json({status: 'error', message: "An error happened !"})
    }

})

//Get specific ticket
router.get("/:_id",userAuthorization, async(req, res) =>{

    try {

        const {_id} = req.params
        const clientId = req.userId
        
        console.log(_id)
        const result = await getTicketByID(_id,clientId)
        

        return res.json({status: 'success', message: result})

    } catch (error) {
        console.log(error)
        return res.json({status: 'error', message: "An error happened !"})
    }

})

//update reply message from client
router.put("/:_id",userAuthorization, async(req, res) =>{

    try {

        const {message, sender} = req.body
        const {_id} = req.params
        const clientId = req.userId
        
        const result = await updateClientReply({_id, message, sender})
        
        if(result._id)
        {
            return res.json({status : "success", message : "your message updated"})
        }

        return res.json({status: 'error', message: "Unable to update message"})

    } catch (error) {
        console.log(error)
        return res.json({status: 'error', message: "An error happened !"})
    }

})

//update ticket to close
router.patch("/close-ticket/:_id",userAuthorization, async(req, res) =>{

    try {

        const {_id} = req.params
        const clientId = req.userId
        
        const result = await updateStatusClose({_id, clientId})
        
        if(result._id)
        {
            return res.json({status : "success", message : "The ticket has been closed"})
        }

        return res.json({status: 'error', message: "Unable to update ticket"})

    } catch (error) {
        console.log(error)
        return res.json({status: 'error', message: "An error happened !"})
    }

})

//delete ticket
router.delete("/:_id",userAuthorization, async(req, res) =>{

    try {

        const {_id} = req.params
        const clientId = req.userId
        
        const result = await deleteTicket({_id, clientId})
        console.log(result)
        return res.json({status : "success", message : "The ticket has been deleted"})

    } catch (error) {
        console.log(error)
        return res.json({status: 'error', message: "An error happened !"})
    }

})

module.exports = router