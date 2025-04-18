import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connect()

export async function GET(request: NextRequest){
    try {
        
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password")

        return NextResponse.json(
            {   message: "The user fetched",
                data: user,
            }
        )

    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}