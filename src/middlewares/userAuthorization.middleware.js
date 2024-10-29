const { verifyAccessJWT } = require("../helpers/jwt.helper")
const { getJWT, deleteAccessJWT } = require("../helpers/redis.helper")

const userAuthorization = async (req, res, next)=>{
    const { authorization } = req.headers

    const decodedJWT = await verifyAccessJWT(authorization)
    if(decodedJWT.email)
    {
        const userID = await getJWT(authorization)

        if(!userID)
        {
            return res.status(403).json({message : "Forbidden"})
        }
        

        req.userId = userID

        return next()
    }

    deleteAccessJWT(authorization)

    return res.status(403).json({message : "Forbidden"}) 
    
}

module.exports = {
    userAuthorization
}