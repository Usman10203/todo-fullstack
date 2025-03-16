'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const TodoList = ({ userId }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const router = useRouter();

    const fetchTodos = async () => {
        try {
            const { data } = await axios.get(`/api/todo`, { params: { userId } });
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [userId]);

    const handleAdd = async () => {
        if (!newTodo.trim()) return;
        try {
            const { data } = await axios.post(`/api/todo`, { userId, subject: newTodo });
            setTodos((prev) => [...prev, data]);
            setNewTodo("");
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const handleDelete = async (todoId) => {
        try {
            await axios.delete(`/api/todo?todoId=${todoId}&userId=${userId}`);
            setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handleEdit = (todo) => {
        router.push(`/edit-todo?id=${todo.id}&subject=${encodeURIComponent(todo.subject)}`);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-blue-800 shadow-xl rounded-xl mt-8 md:max-w-3xl lg:max-w-4xl">
            <h2 className="text-2xl font-bold text-center text-white mb-6">Your Todos</h2>

            <div className="flex gap-3 mb-6">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="flex-1 px-4 py-3 border rounded-l-md outline-none"
                    placeholder="Add a new todo..."
                />
                <button
                    onClick={handleAdd}
                    className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 transition"
                >
                    Add
                </button>
            </div>

            {/* Todo List */}
            {todos.length === 0 ? (
                <p className="text-center text-white text-lg">No todos yet.</p>
            ) : (
                <ul className="space-y-4">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex justify-between items-center p-4 bg-zinc-500 rounded-lg shadow-md"
                        >
                            <span className=" font-medium">{todo.subject}</span>
                            <div>
                                <button
                                    onClick={() => handleEdit(todo)}
                                    className="px-4 py-2 mr-3 bg-yellow-400 text-gray-800 font-semibold rounded-md hover:bg-yellow-500 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
};

export default TodoList;
