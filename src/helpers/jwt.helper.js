var jwt = require('jsonwebtoken');
const { setJWT, getJWT } = require("./redis.helper.js");
const { storeUserRefreshJWT } = require('../model/user/User.model.js');

const createAccessJWT = async(email, _id)=>{

    try 
    {
        const accessJWT = await jwt.sign({email} , process.env.JWT_ACCESS_SECRET,{expiresIn:'20d'});
        await setJWT(accessJWT,""+_id)
        return Promise.resolve(accessJWT,""+_id )
    } 
    catch (error) 
    {
        return Promise.reject(error)
    }

}

const createRefreshJWT = async(email, _id)=>
{
    try 
    {
        const refreshJWT = await jwt.sign({email} , process.env.JWT_REFRESH_SECRET,{expiresIn:'30d'});
        await storeUserRefreshJWT(_id,refreshJWT)
        return Promise.resolve(refreshJWT,""+_id)
    } 
    catch (error) 
    {
        return Promise.reject(error)
    }
}

const verifyAccessJWT = (userJWT) =>
{
    try 
    {
        return Promise.resolve(jwt.verify(userJWT,process.env.JWT_ACCESS_SECRET)) 
    } catch (error) {
        return Promise.resolve(error)
    }

}

const verifyRefreshJWT = (userJWT) =>
    {
        try 
        {
            return Promise.resolve(jwt.verify(userJWT,process.env.JWT_REFRESH_SECRET)) 
        } catch (error) {
            return Promise.resolve(error)
        }
    
    }

module.exports = 
{
    createAccessJWT,
    createRefreshJWT,
    verifyAccessJWT,
    verifyRefreshJWT
}