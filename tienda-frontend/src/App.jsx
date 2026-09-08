
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./auth/register";
import Login from "./auth/login";
import ProductLista from "./product/productlista";
import Payment from "./product/Payment";

function App() {
    return (
        <BrowserRouter>
                <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productlista" element={<ProductLista />} />
            <Route path="/payment" element={<Payment />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;

