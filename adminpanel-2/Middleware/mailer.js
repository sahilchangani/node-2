const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sahilchangani1234@gmail.com",
        pass: "xhmgnbpsbpospcwf",
    },
});

module.exports.sendotp = async (to, otp) => {
    let mailoptions = {
        from: "sahilchangani1234@gmail.com",
        to: to,
        subject: "Your password reset OTP",
        text: `Your OTP is ${otp}`,
    };

    transport.sendMail(mailoptions, (err, info) => {
        if (err) {
            console.log("Error sending email:", err);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
};