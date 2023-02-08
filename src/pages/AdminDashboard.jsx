import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import CategoriesAdmin from '../conponents/CategoriesAdmin'
import CouponsAdmin from '../conponents/CouponsAdmin'
import ListProductsAdmin from '../conponents/ListProductsAdmin'
import UserContext from '../context/user/UserContext'


function AdminDashboard() {
    const { user, setUser } = useContext(UserContext)
    const [isLogout, setIsLogout] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if(!user) {
            axios.get("/user/getprofile")
            .then(({data}) => {
                setUser(data?.user)
            })
            .catch(({response}) => {
                setIsLogout(!response.data.success);
            })
        }
         if((user && user.role !== "ADMIN") || isLogout) {
            navigate("/")
        }
        
    },[isLogout])

     // check if the user is admin or not
     
    // function for signout
    async function signout() {
        const { data } = await axios.get("/user/signout")
        setIsLogout(data.success)
    }

    const {subpage} = useParams()
    
    function linkClasses(type=null) {
        let classes = 'py-2 px-4 text-center rounded'
        if(type === subpage) {
            return `${classes} bg-red-500 text-gray-200`
        }else {
            return classes
        }
    }
  return (
    <div className='h-screen'>
        <nav className='flex justify-between max-w-6xl mx-auto py-6 px-4'>
         <Link to={"/"} className="icon flex items-center cursor-pointer ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
        <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z" clipRule="evenodd" />
        </svg>
        Phonezone
        </Link>
        <button className="flex items-center cursor-pointer" onClick={signout}>
        Logout
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
        </button>
        </nav>

        <h2 className='capitalize block max-w-6xl mx-auto pl-24 text-3xl my-4'>Welcome back, {user?.name}</h2>
        <div className='max-w-6xl mx-auto my-6 flex py-3 px-6 gap-4 h-[70vh]'>
        <aside className='w-[200px] flex flex-col rounded p-[2px] bg-white'>
            <Link className={linkClasses("products")} to={"/admin/dashboard/products"}>Products</Link>
            <Link className={linkClasses("categories")} to={"/admin/dashboard/categories"}>Categories</Link>
            <Link className={linkClasses("coupons")} to={"/admin/dashboard/coupons"}>Coupons</Link>
        </aside>
        <div className='grow'>
            {subpage === "products" ? <ListProductsAdmin /> : subpage === "categories" ? <CategoriesAdmin /> : subpage === "coupons" ? <CouponsAdmin /> : ""}
        </div>
        </div>
    </div>
  )
}

export default AdminDashboard