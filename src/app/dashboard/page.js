
import React from 'react'
import Logout from '../../components/Logout'
import { auth } from '../../auth';
import { redirect } from "next/navigation";
import TodoForm from '../../components/TodoForm';
import TodoList from '../../components/TodoList';
const Dashboard = async () => {
    const session = await auth();
    console.log(session);
    const userId = session?.user?.id;
    console.log(`userId`, userId);

    if (!session?.user) redirect("/");

    return (
        <div className="min-h-screen flex flex-col ">

            <nav className="w-full shadow-md py-3 px-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold ">Dashboard</h2>
                <div className="pr-5">
                    <Logout />
                </div>
            </nav>


            <div className="flex flex-col items-center mt-6">
                {session?.user?.name ? (
                    <>
                        <h1 className="text-3xl font-bold ">
                            Welcome, {session.user.name}
                        </h1>
                        {session?.user?.image && (
                            <img
                                src={session.user.image}
                                alt="User Avatar"
                                className="rounded-full mt-3 w-20 h-20 border-2 border-gray-400 shadow-md"
                            />
                        )}
                    </>
                ) : (
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome, {session?.user?.email}
                    </h1>
                )}


                <div className="mt-6 w-full max-w-3xl px-4">
                    <TodoList userId={userId} />
                </div>
            </div>
        </div>
    );

}

export default Dashboard
