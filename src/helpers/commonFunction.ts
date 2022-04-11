import nodeMailer from 'nodemailer'

class commonFunction{
    sendMail(email:any, subject:any, text: any,cb: any) {
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: "smits.spaceo@gmail.com",
                pass: "smit@0103"
            }
        });
        const options = {
            // from: "thapa@gmail.com",
            to: email,
            subject: subject,
            text: text
        }
        transporter.sendMail(options, (error, result) => {
            if (error) {
                console.log("Error:", error.message);
                cb(error, null);
            } else {
                console.log("Mail sent:", result.response);
                cb(null, result.response)
            }
        });
    }
    getOtp() {
        let otp = Math.floor((Math.random() * 1000) + 1000);
        return otp;
    }
}

export default new commonFunction();