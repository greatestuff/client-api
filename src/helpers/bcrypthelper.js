
const bcrypt = require('bcrypt');
const saltRounds = 10;


const hashPassword = (plainPassword)=>{
    return new Promise(resolve=>{
        resolve(bcrypt.hash(plainPassword, saltRounds))
    })

}

const comparePassword = (plainPassword, passFromDB)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.compare(plainPassword, passFromDB, function(err, result) {
            if(err) reject(err)
            resolve(result)
        });
    })
}

module.exports = { hashPassword,comparePassword }