const mongoose = require("mongoose")
const { token } = require("morgan")
const Schema = mongoose.Schema

const ResetPinSchema = new Schema({
    pin: {type: String, maxlength : 6, minlength : 6 },
    email: {type: String, maxlength : 50, required : true},
    addedAt: {type: Date, default : Date.now(), required : true},
})

module.exports = {
    ResetPinSchema : mongoose.model("ResetPin",ResetPinSchema)
}