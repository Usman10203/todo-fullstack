
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
        <div className="flex flex-col items-center m-4">
            {session?.user?.name && session?.user?.image ? (
                <>
                    <h1 className="text-3xl my-2">
                        Welcome, {session?.user?.name}
                    </h1>
                    {/* <Image
                        src={session?.user?.image}
                        alt=''
                        width={72}
                        height={72}
                        className="rounded-full"
                    /> */}
                </>
            ) : (
                <h1 className="text-3xl my-2">
                    Welcome, {session?.user?.email}
                </h1>
            )}
            <Logout />


            <TodoList userId={userId} />
        </div>
    );
}

export default Dashboard
