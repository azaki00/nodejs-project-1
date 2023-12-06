const nodemailer = require("nodemailer");

exports.sendMail = async function (options){

    // 1-Create a transporter

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    // 2-Define mailing options
    const mailOptions = {
        from: "test user <test@user.com>",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    // 3-Send Email
    await transporter.sendMail(mailOptions);
}