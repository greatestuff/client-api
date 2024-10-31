const {UserSchema} = require("./User.Schema")

const insertUser = (userObj) => {
    return new Promise((resolve,reject) => {
        UserSchema(userObj).save().then(data => resolve(data)).catch(error => reject(error))
    })
}

const getUserByEmail = (email) => {

    return new Promise((resolve,reject) => {
        
    if(!email){ return false }

    try 
    {
        UserSchema.findOne({email}).then((data) => {
            resolve(data) 
        }).catch((error) => {
            console.log(error)
            reject(error)
        });
        
    } catch (error) 
    { 
        reject(error)
    }

    })
}

const getUserByID = (_id) => {

    return new Promise((resolve,reject) => {
        
    if(!_id){ return false }

    try 
    {
        console.log(_id)
        UserSchema.findOne({_id}).then((data) => {
            resolve(data) 
        }).catch((error) => {
            reject(error)
        });
        
    } catch (error) 
    { 
        reject(error)
    }

    })
}

const storeUserRefreshJWT = (_id, token)=>
{
    return new Promise((resolve,reject) =>{
        try 
        {
            UserSchema.findOneAndUpdate(
                {_id},
                {$set:{"refreshJWT.token":token,"refreshJWT.addedAt":Date.now()}},
                {new:true}
            )
            .then((data)=>{resolve(data)})
            .catch((error)=>{reject(error)})
        } catch (error) {
            reject(error)
        }
    } )
}

const updatePassowrd = (email, newHashedPassword)=>
{
    return new Promise((resolve,reject)=>{
        try 
        {
            UserSchema.findOneAndUpdate(
                {email},
                {$set:{"password":newHashedPassword}},
                {new:true}
            )
            .then((data)=>{resolve(data)})
            .catch((error)=>{reject(error)})
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    insertUser, getUserByEmail, storeUserRefreshJWT, getUserByID, updatePassowrd
}