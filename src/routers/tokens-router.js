const express = require("express")
const { verifyRefreshJWT, createRefreshJWT, createAccessJWT } = require("../helpers/jwt.helper")
const { getUserByEmail } = require("../model/user/User.model")
const router = express.Router()

router.get('/',async (req,res,next) =>{
    const {authorization} = req.headers
    const decoded = await verifyRefreshJWT(authorization)
    if(decoded.email)
    {
        const userProf = await getUserByEmail(decoded.email)
        if(userProf._id){

            let tokenExp = userProf.refreshJWT.addedAt
            const dbRefreshToken = userProf.refreshJWT.token

            tokenExp = tokenExp.setDate(tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY)

            const today = new Date()

            if(dbRefreshToken !== authorization && tokenExp < today)
            {
                return res.status(403).json({message: "Forbidden"})
            }

            const accessJWT = await createAccessJWT(decoded.email, userProf._id.toString())
            
            return res.json({status: "success", accessJWT})
        }
    }

    return res.status(403).json({message: "Forbidden"})
})

module.exports = router