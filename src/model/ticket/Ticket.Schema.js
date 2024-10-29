const mongoose = require("mongoose")
const { token } = require("morgan")
const Schema = mongoose.Schema

const TicketSchema = new Schema({
    clientId: {type: Schema.Types.ObjectId},
    subject: {type: String, maxlength : 100, required : true,default:''},
    openAt: {type: Date, required : true, default: new Date},
    status: {type: String, maxlength : 30, required : true, default:'Pending Operator response'},
    conversations : [
        {
            sender : {type: String, maxlength : 50, required : true, default:''},
            message: {type: String, maxlength : 1000, required : true, default:''},
            msgAt: {type: Date, required : true, default: new Date}
        }
    ]

})

module.exports = {
    TicketSchema : mongoose.model("Ticket",TicketSchema)
}