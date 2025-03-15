'use client';
import { useState } from 'react';
import axios from 'axios';

export default function TodoForm({ userId }) {
    const [subject, setSubject] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddTodo = async () => {
        if (!subject.trim()) return alert("Todo cannot be empty!");

        setLoading(true);
        try {
            const response = await axios.post('/api/todo', { subject, userId });
            console.log(`response`, response);
            setSubject('');

        } catch (error) {
            console.error("Error adding todo:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-md space-y-4">
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter todo..."
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <button
                onClick={handleAddTodo}
                disabled={loading}
                className="w-full p-2 rounded-md border  hover:bg-gray-200 transition disabled:opacity-50"
            >
                {loading ? "Adding..." : "Add Todo"}
            </button>
        </div>
    );
}
