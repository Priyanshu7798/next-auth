"use client";

import React, { useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function SignupPage() {

    const [user,setUser] = useState({
        email: "",
        username: "",
        password: "",
    })

    const onSignup = async () => {
        
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 text-2xl">
                Signup Page

                <hr />

                {/* Username */}
                <label htmlFor="username">Username</label>
                <input 
                    className="p-2 border-gray-100 rounded-lg mb-4 focus:border-gray-600 bg-white text-black"
                    id="username"
                    type="text" 
                    value={user.username}
                    onChange={(e)=>setUser({...user,username :e.target.value})}
                    placeholder="username"
                />

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
                    onClick={onSignup}
                    className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                    Sign Up
                </button>

                <Link href='/login'>To Log In</Link>
            </div>
        </>
    )
}