import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductLista() {
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);
    const [quasion, setQuasion] = useState("");

    const navigate = useNavigate();

    async function productlista() {
        const response = await fetch(
            "http://127.0.0.1:8000/products",
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            }
        );

        const result = await response.json();

        if (Array.isArray(result)) {
            setProducts(result);
        } else {
            console.log("los datos no es array", result);
        }
    }

    async function addToOrder(productId, quantity) {
        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://127.0.0.1:8000/orders/add",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity: quantity,
                }),
            }
        );

        const result = await response.json();

        console.log(result);
    }

    function goToPayment() {
        setQuantity(1);
        setProducts([]);
        setTotal(0);
        setShowConfirm(false);

        navigate("/payment");
    }

    async function aiChat(e) {
        e.preventDefault();

        const response = await fetch(
            "http://127.0.0.1:8000/ai/chat",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: quasion,
                }),
            }
        );

        const result = await response.json();

        console.log(result);
    }

    async function buy() {
        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://127.0.0.1:8000/orders/buy",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const result = await response.json();

        if (result.success) {
            setTotal(result.total);
            setShowConfirm(true);
        }
    }

    const categories = [
        ...new Set(products.map((product) => product.category)),
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="mb-10 text-center text-4xl font-bold">
                Products
            </h1>

            <div className="mb-10 text-center">

                <button
                    onClick={productlista}
                    className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
                >
                    Get Products
                </button>

            </div>

            <div className="mx-auto mb-12 max-w-3xl rounded-2xl bg-white p-6 shadow-md">

                <div className="mb-5 text-center">

                    <h2 className="text-2xl font-bold text-gray-900">
                        Ask our AI Assistant
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Ask about our products, prices, categories, or recommendations.
                    </p>

                </div>

                <form
                    onSubmit={aiChat}
                    className="flex flex-col gap-3 sm:flex-row"
                >

                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        value={quasion}
                        onChange={(e) => setQuasion(e.target.value)}
                        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
                    />

                    <button
                        type="submit"
                        className="rounded-xl bg-black px-7 py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-95"
                    >
                        Ask AI
                    </button>

                </form>

            </div>

            {categories.map((category) => (

                <section
                    key={category}
                    className="mx-auto mb-12 max-w-6xl"
                >

                    <h2 className="mb-6 border-b border-gray-300 pb-3 text-3xl font-bold capitalize">
                        {category}
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(3, minmax(0, 1fr))",
                            gap: "24px",
                        }}
                    >

                        {products
                            .filter(
                                (product) =>
                                    product.category === category
                            )
                            .map((product) => (

                                <div
                                    key={product.id}
                                    className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl"
                                    style={{
                                        width: "100%",
                                    }}
                                >

                                    <div
                                        style={{
                                            width: "100%",
                                            height: "250px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#f9fafb",
                                            padding: "15px",
                                            overflow: "hidden",
                                        }}
                                    >

                                        <img
                                            src={`http://127.0.0.1:8000/storage/${product.image}`}
                                            alt={product.title}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                                display: "block",
                                            }}
                                        />

                                    </div>

                                    <div className="p-5 text-center">

                                        <h3 className="text-xl font-semibold">
                                            {product.title}
                                        </h3>

                                        <p className="mt-2 text-lg font-bold">
                                            ${product.price}
                                        </p>

                                        <div className="mt-4 flex items-center justify-center gap-3">

                                            <input
                                                type="number"
                                                min="1"
                                                value={quantity}
                                                onChange={(e) =>
                                                    setQuantity(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-20 rounded-lg border p-2 text-center"
                                            />

                                            <button
                                                onClick={() =>
                                                    addToOrder(
                                                        product.id,
                                                        quantity
                                                    )
                                                }
                                                className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
                                            >
                                                Choose
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                    </div>

                </section>

            ))}

            {products.length > 0 && (

                <div className="mx-auto mt-10 max-w-2xl rounded-xl bg-white p-6 text-center shadow-md">

                    <button
                        onClick={() => buy()}
                        className="rounded-lg bg-black px-8 py-3 text-white hover:bg-gray-800"
                    >
                        Buy
                    </button>

                    <div className="mt-5 text-2xl font-bold">
                        Total: ${total}
                    </div>

                    {showConfirm && (

                        <button
                            onClick={goToPayment}
                            className="mt-5 rounded-lg bg-green-600 px-8 py-3 text-white hover:bg-green-700"
                        >
                            Confirm Payment
                        </button>

                    )}

                </div>

            )}

        </div>
    );
}

export default ProductLista;
