import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        required : [true, "Please Provide  a username"]
    },
    email: {
        type: String,
        required : [true, "Please Provide  a email"],
        unique: true,
    },
    password: {
        type: String,
        required : [true, "Please Provide  a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("User",userSchema);
export default User;