import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios"
import AdminLogin from "./pages/AdminLogin";
import UserProvider from "./context/user/UserProvider";
import AdminDashboard from "./pages/AdminDashboard";

axios.defaults.baseURL = "http://localhost:4000/api"
axios.defaults.withCredentials = true

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<Home />}/>
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login/admin" element={<AdminLogin />}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
      </Routes>
    </UserProvider>
  );
}

export default App;
