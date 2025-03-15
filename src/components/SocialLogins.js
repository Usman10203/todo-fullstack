import { doSocialLogin } from "../app/actions/index.js";

const SocialLogins = () => {
    return (
        <form action={doSocialLogin}>
            <button
                className="bg-green-400 text-white p-1 rounded-md m-1 text-lg"
                type="submit"
                name="action"
                value="google"
            >
                Sign In With Google
            </button>

        </form>
    );
};

export default SocialLogins;