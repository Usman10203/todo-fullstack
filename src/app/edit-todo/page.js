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
        <div className="max-w-md mx-auto p-6 bg-zinc-500 shadow-lg rounded-lg mt-6">
            <h2 className="text-xl font-semibold text-center mb-4">Edit Todo</h2>
            <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full px-3 py-2 border rounded mb-4"
            />
            <button
                onClick={handleUpdate}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded"
            >
                Update Todo
            </button>
        </div>
    );
};

export default EditTodo;
