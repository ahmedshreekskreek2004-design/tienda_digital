import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
    const [confirmed, setConfirmed] = useState(false);

    const navigate = useNavigate();

    async function confirmPayment() {
        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://127.0.0.1:8000/orders/confirm",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );

        const result = await response.json();

        console.log(result);

        if (result.success) {
            setConfirmed(true);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="rounded-2xl bg-white p-8 text-center shadow-xl">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Payment
                    </h1>

                    <p className="mt-3 text-gray-500">
                        Confirm your order payment
                    </p>

                    <div className="mt-8 rounded-xl bg-gray-100 p-5">

                        <p className="text-sm text-gray-500">
                            Order Status
                        </p>

                        <p className="mt-2 text-xl font-semibold text-gray-900">
                            Ready for Payment
                        </p>

                    </div>

                    <button
                        onClick={confirmPayment}
                        className="mt-6 w-full rounded-xl bg-black py-3.5 font-semibold text-white transition hover:bg-gray-800"
                    >
                        Confirm Payment
                    </button>

                    {confirmed && (
                        <div className="mt-6">

                            <p className="mb-5 text-xl font-semibold text-green-600">
                                Payment confirmed ✅
                            </p>

                            <div className="flex gap-3">

                                <button
                                    onClick={() => navigate("/productlista")}
                                    className="flex-1 rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800"
                                >
                                    New Order
                                </button>

                                <button
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        navigate("/login");
                                    }}
                                    className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>

                            </div>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Payment;
