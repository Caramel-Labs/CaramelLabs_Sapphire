'use client'

import { useState } from 'react';
import Navbar from '@/components/navbar';
import { signIn } from "next-auth/react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/home",
        });
      };
    

    return (
        <div className="bg-gray-100">
            <Navbar showUserSection={false} />
            <div className="flex h-screen items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Log in to Sapphire Visa Console
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};


