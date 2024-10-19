
const bcrypt = require('bcrypt');
const saltRounds = 10;


const hashPassword = (plainPassword)=>{
    return new Promise(resolve=>{
        resolve(bcrypt.hash(plainPassword, saltRounds))
    })

}

module.exports = { hashPassword }