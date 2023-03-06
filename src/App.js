import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios"
import AdminLogin from "./pages/AdminLogin";
import UserProvider from "./context/user/UserProvider";
import AdminDashboard from "./pages/AdminDashboard";
import Product from "./pages/Product";
import ProductProvider from "./context/product/ProductProvider";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";

axios.defaults.baseURL = "http://localhost:4000/api"
axios.defaults.withCredentials = true

function App() {
  return (
    <UserProvider>
      <ProductProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<Home />}/>
        <Route path="/product/:id" element={<Product />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="/paymentsuccess" element={<PaymentSuccess />}/>
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login/admin" element={<AdminLogin />}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route path="/admin/dashboard/:subpage" element={<AdminDashboard />}/>
          <Route path="/admin/dashboard/:subpage/:action" element={<AdminDashboard />}/>
        </Route>
      </Routes>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
