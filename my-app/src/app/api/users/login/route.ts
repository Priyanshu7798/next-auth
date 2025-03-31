import {connect} from "@/app/dbConfig/dbConfig"
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


connect()

export async function POST(request: NextRequest){
    try {
        
        const reqBody = await request.json();
        const {email,password} = reqBody;

        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            NextResponse.json({message: 'The User doesnt exist'},{status : 400})
        }
    
        // check the password decrpyt
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            NextResponse.json({message: 'Password Doesnt match'},{status : 400})
        }


        // create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        }
        
        // create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: "1d"})

        const response= NextResponse.json({
            message: "Login Successfulyy!!",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
        NextResponse.json({error: error.message},{status : 500})
    }
}
