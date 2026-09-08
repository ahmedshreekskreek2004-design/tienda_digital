
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (result.success) {
            console.log("login successful");
            localStorage.setItem("token", result.token);

            navigate("/productlista");

            setName("");
        setEmail("");
        setPassword("");
        } else {
            console.log("login failed,tienes que validar");
        }

    }


return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

        <div className="w-full max-w-md">

            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900">
                    Welcome Back
                </h1>

                <p className="mt-2 text-gray-500">
                    Login to your account
                </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-xl">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-black py-3.5 font-semibold text-white transition hover:bg-gray-800"
                    >
                        Login
                    </button>

                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account?
                    </p>

                    <button
                        onClick={() => navigate("/register")}
                        className="mt-1 font-semibold text-black hover:underline"
                    >
                        Create Account
                    </button>
                </div>

            </div>

        </div>

    </div>
);


}

export default Login;

