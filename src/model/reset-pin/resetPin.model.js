const { randomPinNumber } = require("../../utils/randomGenerator")
const {ResetPinSchema} = require("./resetPin.Schema")

const setPasswordResetPin = async(email) => {

    const pinLength = 6
    const randPin = await randomPinNumber(pinLength)

    const resetObj = 
    {
        email, pin : randPin
    }


    return new Promise((resolve,reject) => {
        ResetPinSchema(resetObj).save().then(data => resolve(data)).catch(error => reject(error))
    })
}

const getPinByEmailPin = async(email, pin) => {

    return new Promise((resolve,reject) => {
        try {

            ResetPinSchema.findOne({email, pin}).then((data) => {
                if(data) { resolve(data) } else { resolve(false) }
            }).catch((error) => {
                console.log(error)
                resolve(false)
            });

        } catch (error) {
            reject(error)
            console.log(error)
        }
    })

    
}

const deletePin = async(email, pin) => {

        try {

            ResetPinSchema.findOneAndDelete({email, pin}).then((data) => {
                
            }).catch((error) => {
                console.log(error)
            });

        } catch (error) {
            console.log(error)
        }
    
}

module.exports = {
    setPasswordResetPin,
    getPinByEmailPin,
    deletePin
    
}