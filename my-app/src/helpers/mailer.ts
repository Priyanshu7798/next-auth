import nodemailer from "nodemailer"
import User from "@/models/userModel.js"
import bcrypt from "bcrypt"

export const sendMail = async ({email,emailType,userId}:any) => {
    try {
        
        const hashedToken = await bcrypt.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                user: "4518f9f5584469",
                pass: "b7e94ba3b9526c"
            }
        });


        const mailOptions = {
            from: "priyanshujha98765@gmail.com",
            to: email,
            subject: emailType==="VERIFY" ? "Verification Email" : "Password Reset",
            html: `<P> Click <a href= "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify the Email": "Reset the password"}</p>`
        }

        return await transport.sendMail(mailOptions);
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}