import { Suspense } from "react";
import EditTodo from "../../components/EditTodo.js";

export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <EditTodo />
        </Suspense>
    );
}
