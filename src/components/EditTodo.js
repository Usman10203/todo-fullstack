'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const EditTodo = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const id = searchParams.get("id");
    const subject = searchParams.get("subject");
    const [newSubject, setNewSubject] = useState("");

    useEffect(() => {
        if (subject) {
            setNewSubject(subject);
        }
    }, [subject]);

    const handleUpdate = async () => {
        if (!newSubject.trim()) return;

        try {
            await axios.put(`/api/todo`, { id, subject: newSubject });
            router.push("/dashboard");
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <div className="w-[90%] max-w-2xl mx-auto p-8 bg-blue-900 shadow-xl rounded-xl mt-8 md:max-w-3xl lg:max-w-4xl">
            <h2 className="text-2xl font-bold text-center text-white mb-6">Edit Todo</h2>

            <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full px-4 py-3 border rounded-md outline-none mb-6"
                placeholder="Edit your todo..."
            />

            <button
                onClick={handleUpdate}
                className="w-full px-5 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
                Update Todo
            </button>
        </div>

    );
};

export default EditTodo;
