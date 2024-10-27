const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "karl23@ethereal.email",
      pass: "69pxD6YJzZX3A3hN3B",
    },
  });

const sendEmail = async(emailInfo)=>{
    return new Promise(async(resolve,reject)=>{
        try 
        {
            const info = await transporter.sendMail(emailInfo);
            console.log("Message sent: %s", info.messageId);  
            resolve(info)
        } catch (error) {
            reject(error)
            console.log(error)
        }
    })


}



const emailProcessor = async({email, pin, type})=>{
    let emailInfo = ""

    switch (type) {
        case "request-new-pass":
                
                emailInfo = {
                from: '"Maddison Foo Koch 👻" <karl23@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "Reset Pin ✔", // Subject line
                text: "Reset Pin : " + pin + "This pin will expire in 1 day", // plain text body
                html: "<b>Pin Code : " + pin + "</b>", // html body
            }

            break;

        case "password-update-success":
                emailInfo = {
                from: '"Maddison Foo Koch 👻" <karl23@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "Password Updated ✔", // Subject line
                text: "Your passowrd has been updated recently", // plain text body
                html: "<b>Your passowrd has been updated recently</b>", // html body
            }

            break;
    
        default:
            break;

    }

    return sendEmail(emailInfo)

}

module.exports = 
{
    emailProcessor
}