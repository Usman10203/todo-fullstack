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
        <div className="max-w-md mx-auto p-6 bg-zinc-500 shadow-lg rounded-lg mt-6">
            <h2 className="text-xl font-semibold text-center mb-4">Your Todos</h2>

            <div className="flex mb-4">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-l"
                    placeholder="Add a new todo..."
                />
                <button onClick={handleAdd} className="px-4 py-2 bg-blue-500 text-white rounded-r">
                    Add
                </button>
            </div>

            {todos.length === 0 ? (
                <p className="text-center">No todos yet.</p>
            ) : (
                <ul className="space-y-3">
                    {todos.map((todo) => (
                        <li key={todo.id} className="flex justify-between items-center p-3 rounded-lg">
                            <span>{todo.subject}</span>
                            <div>
                                <button
                                    onClick={() => handleEdit(todo)}
                                    className="px-3 py-1 mr-2 rounded border hover:bg-yellow-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="px-3 py-1 rounded border hover:bg-red-300"
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
