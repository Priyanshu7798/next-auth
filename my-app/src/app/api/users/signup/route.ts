import {connect} from "@/app/dbConfig/dbConfig"
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"



connect();

export async function POST(request : NextRequest){
    try {
        
        const reqBody = await request.json();
        const {email, username, password} = reqBody;

        if(!email){
            return NextResponse.json({error: "Email Not Found"},{status:404})
        }
        if(!username){
            return NextResponse.json({error: "username Not Found"},{status:404})
        }
        if(!password){
            return NextResponse.json({error: "password Not Found"},{status:404})
        }

        // check if user already exist

        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User Already Exist"},{status:401})
        }

        // hash the password

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)

        // create new User

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created Successfully",
            success : true,
            savedUser,
        },
        {status:201})

    } catch (error:any) { 
        return NextResponse.json({error: error.message},{status:500})
    }
}