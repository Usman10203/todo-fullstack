import { Suspense } from "react";
import EditTodo from "../../components/EditTodo.js";
import { auth } from '../../auth';
import { redirect } from "next/navigation";
export default async function Page() {
    const session = await auth();

    if (!session?.user) redirect("/");
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <EditTodo />
        </Suspense>
    );
}
