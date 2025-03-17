"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from '../../src/app/actions/index';
import SocialLogins from "./SocialLogins";

const LoginForm = () => {

    const router = useRouter();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    async function onSubmit(event) {
        event.preventDefault();
        try {

            const response = await doCredentialLogin(formData);

            if (!!response.error) {
                console.error(response.error);
                setError(response.error.message);
            } else {
                router.push("/dashboard");
            }
        } catch (e) {
            console.error(e);
            setError("Check your Credentials");
        }
    };

    return (
        <>
            {error && <div className="text-xl text-red-500 text-center">{error}</div>}

            <form
                className="my-5 flex flex-col items-center border p-5 border-gray-300 rounded-md shadow-lg w-full max-w-md mx-auto"
                onSubmit={onSubmit}
            >
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
                    Login
                </button>
            </form>

            <SocialLogins />
        </>
    );
};

export default LoginForm;