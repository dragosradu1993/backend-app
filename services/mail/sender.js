const nodemailer = require('nodemailer')


const send = async(body, to, subject) => {
    let transporter = nodemailer.createTransport({
        service: 'Outlook365',
        secure: false,
        port: 587,
        auth: {
          user: "gestiunelicenta@outlook.com",
          pass: "DRG_231423@"
        }
      })

    let email = await transporter.sendMail({
        from: 'gestiunelicenta@outlook.com',
        to: to,
        subject: subject,
        html: body
    })

    console.log(email)
}

module.exports = send