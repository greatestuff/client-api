const express = require("express")
const router = express.Router()

const {insertUser,getUserByEmail, getUserByID, updatePassowrd, storeUserRefreshJWT} = require("../model/user/User.model")
const {hashPassword,comparePassword} = require("../helpers/bcrypthelper")
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt.helper")
const { userAuthorization } = require("../middlewares/userAuthorization.middleware")
const { setPasswordResetPin, getPinByEmailPin, deletePin } = require("../model/reset-pin/resetPin.model")
const { emailProcessor } = require("../helpers/emailhelper")
const { deleteAccessJWT } = require("../helpers/redis.helper")
const { resetPassReqValidation, updatePassValidation, newUserValidation, createNewTicketValidation } = require("../middlewares/formValidation.middleware")


router.all('/',(req,res,next) =>{
    //res.json({message: "return from user router"})
    next()
})

//Get user profile router
router.get("/", userAuthorization, async(req, res)=>{

    const _id = req.userID

    const userProf = await getUserByID(_id)
    

    res.json({user : userProf})

})


//Create new user Router
router.post("/", newUserValidation,async(req, res)=>{
    const  { name, company, adress, phone, email, password } = req.body

    try 
    {
        //hashpassword:
        const hashedPassword = await hashPassword(password)

        const newUserObject = { name, company, adress, phone, email, password : hashedPassword }

        const result = await insertUser(newUserObject)
        console.log(result)
        res.json({message : "New User created ! ",result})

    } catch (error) 
    {
        res.json({status: "error", message : error.message})
    }
    
})

//User sign in Router
router.post("/login",async(req, res)=>{
    console.log(req.body)
    const {email, password} = req.body

    if(!email || !password)
    {
        return res.json({status : "error" , message : "Invalid form submission !"})
    }

    const user = await getUserByEmail(email)
    const passFromDB = user && user._id ? user.password : null

    if(!passFromDB){ return res.json({status : "error" , message : "Invalid email or password !"})}

    const result = await comparePassword(password,passFromDB)
     
    if(!result){return res.json({status : "error" , message : "Invalid email or password !"})}

    const accessJWT  = await createAccessJWT(user.email,user._id)
    const refreshJWT = await createRefreshJWT(user.email,user._id)

    res.json({status : "success" , message : "Login successfully !",accessJWT,refreshJWT})
})

//reset password router
router.post("/reset-password", resetPassReqValidation, async(req, res)=>{
    const {email} = req.body
    const user = await getUserByEmail(email)

    if(user && user._id)
    {
        const reqPin = await setPasswordResetPin(email)
        const result = await emailProcessor({email,pin: reqPin.pin,type : "request-new-pass"})

        if(result && result.messageId)
        {
            return res.json({status : "success" , message : "If the email exist in our database and email will be sent shortly !"})
        }

        return res.json({status : "error" , message : "Unable to process your request at the moment, Plz try again later !"})
    }

    return res.json({status : "success" , message : "If the email exist in our database and email will be sent shortly !"})
})

//update password router
router.patch("/reset-password", updatePassValidation, async (req, res)=>{
    const {email, pin, newPassword} = req.body

    const getpin = await getPinByEmailPin(email,pin)
    if(getpin._id)
    {
        const dbDate = getpin.addedAt
        const expiresIn = 1;
        let expDate = dbDate.setDate(dbDate.getDate() + expiresIn)
        const today = new Date()

        if(today > expDate)
        {
            return res.json({status : "error", message : "Expired pin"})
            deletePin(email, pin)
        }

        const hashedPass = await hashPassword(newPassword)
        const user = await updatePassowrd(email, hashedPass)

        if(user._id)
        {
            const result = await emailProcessor({email, type: "password-update-success"} )
            deletePin(email,pin)
            return res.json({status : "success", message : "password has been updated !"})
        }


    }

    return res.json({status : "error", message : "Unable to update you password. Plz try again later"})
        
})

//User logout and invalidate JWT Tokens
router.delete("/logout", userAuthorization, async(req, res)=>{

    const {authorization} = req.headers

    const _id = req.userID

    deleteAccessJWT(authorization)
    const result = await storeUserRefreshJWT(_id,'')

    //const userProf = await getUserByID(_id)
    

    res.json({status: "succecss",message : "Logged out succesfully"})

})

module.exports = router