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
            <form
                onSubmit={handleSubmit}
                className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
            >
                <div className="my-2">
                    <label htmlFor="name">Name</label>
                    <input
                        className="border mx-2 border-gray-500 rounded"
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="my-2">
                    <label htmlFor="email">Email Address</label>
                    <input
                        className="border mx-2 border-gray-500 rounded"
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="my-2">
                    <label htmlFor="password">Password</label>
                    <input
                        className="border mx-2 border-gray-500 rounded"
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
                >
                    Register
                </button>
            </form>
            <SocialLogins />
        </>
    );
};

export default RegistrationForm;
