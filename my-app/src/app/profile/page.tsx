"use client"
import axios from "axios"
import Link from "next/link"
import { NextResponse } from "next/server"
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function profilePage() {

    const [data, setData] = useState("Nothing")
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Suceess")
            router.push("/login")

        } catch (error:any) {
            toast.error(error.message)
        }
    }

    const getUserDetails = async () =>{
        try {
            const res = await axios.get("/api/users/me")
            setData(res.data.data._id);
        } catch (error:any) {
            toast.error(error.message)
        }
    }
    console.log(data);
    return(
        <>
            <Toaster />
            <div className="flex flex-col justify-center items-center min-h-screen">
                
                <p>Profile Page</p>

                <h2>User Details</h2>
                <span className="p-2 rounded bg-orange-400">
                    {data === "Nothing" ? "Nothing" : <Link href={`/profile/${data}`}>
                        {data}
                    </Link>}
                    
                </span>
                    
                <hr />

                <button className="bg-blue-700 hover:bg-blue-400 text-white rounded-lg font-bold py-2 px-4 mt-3"
                    onClick={logout}
                >
                    Log Out
                </button> 


                <button className="bg-purple-700 hover:bg-purple-400 text-white rounded-lg font-bold py-2 px-4 mt-3"
                    onClick={getUserDetails}
                >
                    Get User Details 
                </button> 
            </div>


            
        </>
    )
}