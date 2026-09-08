
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch(
            "http://127.0.0.1:8000/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
            }
        );

        const result = await response.json();

        if (result) {
            console.log("Register successful");

            setName("");
            setEmail("");
            setPassword("");

            navigate("/login");
        } else {
            console.log("Register failed");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                {/* Logo / Title */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Create Account
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Create your account and start shopping
                    </p>
                </div>

                {/* Register Card */}
                <div className="rounded-2xl bg-white p-8 shadow-xl">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                            />
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-black py-3.5 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
                        >
                            Create Account
                        </button>

                    </form>

                    {/* Login */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-1 font-semibold text-black hover:underline"
                        >
                            Login
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;

