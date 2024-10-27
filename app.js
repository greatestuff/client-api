require("dotenv").config({ path:"./.env"});
require("dotenv").config
const express = require("express")
const app = express()
const bodyParser = require("body-parser") 
const cors = require("cors") 
const helmet = require("helmet") 
const morgan = require("morgan") 

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const port = process.env.PORT || 3001

//API Security
//app.use(helmet())

//handle CORS Error
app.use(cors())

//Mongo DB Connestion setup 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

if(process.env.NODE_ENV !== "production")
{

        const mDB = mongoose.connection;

        mDB.on("open", ()=>{
        console.log("Mongo DB is connected")
        })
    
        mDB.on("error", (error)=>{
            console.log(error)
        })
    
        
        //Logger
        app.use(morgan("tiny"))

}




//set Body Parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//Load routers
const userRouter = require("./src/routers/user-router")
const ticketRouter = require("./src/routers/ticket-router")
const tokensRouter = require("./src/routers/tokens-router")

//Use Router
app.use("/v1/user",userRouter)
app.use("/v1/ticket",ticketRouter)
app.use("/v1/tokens",tokensRouter)



//Error handler
const handleError = require("./src/utils/errorHandler")

 app.use((req, res, next) => {
    const error = new Error("Ressource not found !")
    error.status = 404

    next(error)
 })

 app.use((error,req, res, next) => {
    handleError(error,res)
 })


app.listen(port, ()=> {
    console.log('API is ready on http://localhost:'+port)
})