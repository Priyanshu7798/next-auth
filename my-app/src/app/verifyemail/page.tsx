"use client"

import axios from "axios"
import React, {useEffect ,useState} from "react"
import Link from "next/link"
import toast, {Toaster} from "react-hot-toast"

export default function verifyEmailPage() {

    const [token ,setToken] = useState("");
    const [verify, setVerify] = useState(false)
    const [error,setError] = useState(false)

    const verifiedEmail = async () =>{
        
        try {
            await axios.post('/api/users/verifyemail',{token})
            setVerify(true)

        } catch (error:any) {
            setError(true)
            toast.error(error.message)
        }
    }


    useEffect(()=>{
        let urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    },[])

    useEffect(()=>{
        if(token.length>0){
            (async () => {
                await verifiedEmail();
            })();
        }
    }, [token])

    return(
        <>
            <Toaster />
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                    <h1 className="text-4xl">
                        Verify The Email
                    </h1>

                    <h2 className="p-2 text-2xl mt-5 bg-orange-500 text-white rounded-lg">
                        {token ? `${token}`: "No Token"}
                    </h2>

                    { verify && (
                        <div>
                            <h2>Email Verified</h2>
                            <Link href="/login">
                                <p className="text-orange-500 rounded text-xl hover:cursor-pointer"> LOGIN</p>
                            </Link>
                        </div>
                    )}


                    { error && (
                        <div>
                            <h2 className="text-3xl bg-yellow-200 text-red-600 hover:cursor-pointer">SOMETHING WENT HORRIBLY WRONG</h2>
                        </div>
                    )}


            </div>
        </>
    )
}