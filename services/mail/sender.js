const nodemailer = require('nodemailer')


const send = async(body, to, subject) => {
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secure: false,
        port: 587,
        tls: {
            ciphers: 'SSLv3'
        },
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