const mongoose = require("mongoose")
const { token } = require("morgan")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type: String, maxlength : 50, required : true},
    company: {type: String, maxlength : 50, required : true},
    adress: {type: String, maxlength : 100, },
    phone: {type: Number, maxlength : 50, },
    email: {type: String, maxlength : 50, required : true},
    password: {type: String, maxlength : 100, minlength : 8, required : true},
    refreshJWT : {token: { type : String, maxlength : 500, default:"" },addedAt : {type : Date, required : true, default:Date.now()} }
})

module.exports = {
    UserSchema : mongoose.model("User",UserSchema)
}