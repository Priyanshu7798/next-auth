"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import React, { useState } from "react"

export default function Loginpage() {

    const [user, setUser] = useState({
        email: "" ,
        password: "" 
    })
    const onLogin = async () =>{

    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 text-2xl">
                Login Page

                <hr />

                {/* email */}
                <label htmlFor="email">email</label>
                <input 
                    className="p-2 border-gray-100 rounded-lg mb-4 focus:border-gray-600 bg-white text-black"
                    id="email"
                    type="text" 
                    value={user.email}
                    onChange={(e)=>setUser({...user,email :e.target.value})}
                    placeholder="email"
                />

                {/* Password */}
                <label htmlFor="password">password</label>
                <input 
                    className="p-2 border border-gray-100 rounded-lg mb-4 focus:border-gray-600 bg-white text-black"
                    id="password"
                    type="password" 
                    value={user.password}
                    onChange={(e)=>setUser({...user,password :e.target.value})}
                    placeholder="password"
                />

                <button 
                    onClick={onLogin}
                    className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                    Log In
                </button>

                <Link href='/signup'> To Signup Page </Link>
            </div>
        </>
    )
}