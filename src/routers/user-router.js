const express = require("express")
const router = express.Router()

const {insertUser,getUserByEmail} = require("../model/user/User.model")
const {hashPassword,comparePassword} = require("../helpers/bcrypthelper")


router.all('/',(req,res,next) =>{
    //res.json({message: "return from user router"})
    next()
})

//Create new user Router
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

    if(!passFromDB) return res.json({status : "error" , message : "Invalid email or password !"})
    const result = await comparePassword(password,passFromDB)
     
    console.log(result)

    res.json({status : "success" , message : "Login successfully !"})
})


module.exports = router