
'use server'

import { signIn, signOut } from "../../auth";

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    console.log('action', action);
    await signIn(action, { redirectTo: "/dashboard" });
}

export async function doLogout() {
    await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData) {
    console.log("formData", formData);

    try {
        const response = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });
        return response;
    } catch (err) {
        throw err;
    }
}