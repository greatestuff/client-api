const express = require("express")
const router = express.Router()

const {insertUser} = require("../model/user/User.model")
const {hashPassword} = require("../helpers/bcrypthelper")


router.all('/',(req,res,next) =>{
    //res.json({message: "return from user router"})
    next()
})

router.post("/",async(req, res)=>{
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

module.exports = router