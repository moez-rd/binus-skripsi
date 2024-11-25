'use client'

import React from "react";
import useHandler from "./handler";

export default function Login() {
    const {handleSubmit, handleInputChange, loading, user, error} = useHandler()

    return (
        <div className="h-screen">
            <div className="p-10 border rounded-lg max-w-xl mx-auto mt-40">
                <h1 className="text-center font-bold text-3xl mb-10">Login Admin</h1>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
                    <div className="flex flex-col space-y-1">
                        <label>Username</label>
                        <input name="username" value={user.username} onChange={handleInputChange}
                               type="text" placeholder="Username" required/>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label>Password</label>
                        <input name="password" value={user.password}
                               onChange={handleInputChange} type="password"
                               placeholder="Password" required/>
                    </div>
                    {error && (
                        <div className="bg-red-100 p-4 rounded">
                            <p className="text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="bg-gray-900 text-white py-3 px-8 rounded-md font-medium hover:bg-gray-800 disabled:bg-gray-700"
                        disabled={loading}>{loading ? "Tunggu" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}