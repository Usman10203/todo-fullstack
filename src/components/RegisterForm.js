"use client"
import axios from "axios";
import { useState } from "react";
import SocialLogins from "./SocialLogins";

import { useRouter } from "next/navigation";

const RegistrationForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post('/api/register', formData);
            console.log(`response`, response);
            if (response.status === 201) {
                router.push('/');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <h1 style={{ fontSize: "30px" }}>Registeration Form</h1>
            <form
                onSubmit={handleSubmit}
                className="my-5 flex flex-col items-center border p-5 border-gray-300 rounded-md shadow-lg w-full max-w-md mx-auto"
            >
                <div className="w-full my-3">
                    <label htmlFor="name" className="block mb-1 text-lg">Name</label>
                    <input
                        className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-orange-300 outline-none"
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="w-full my-3">
                    <label htmlFor="email" className="block mb-1 text-lg">Email Address</label>
                    <input
                        className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-orange-300 outline-none"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="w-full my-3">
                    <label htmlFor="password" className="block mb-1 text-lg">Password</label>
                    <input
                        className="w-full p-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-orange-300 outline-none"
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-orange-300 hover:bg-orange-400 transition-colors duration-300 mt-4 rounded-md px-6 py-2 w-full max-w-xs text-lg font-semibold shadow-md"
                >
                    Register
                </button>
            </form>

            <SocialLogins />
        </>
    );
};

export default RegistrationForm;
