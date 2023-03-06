import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import UserContext from '../context/user/UserContext'

function Checkout() {
    const {cart, isLoggedIn, setRedirectLocation, activeCoupon} = useContext(UserContext)

    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [showError, setShowError] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if(!cart.length) {
            navigate("/")
        }
    }, [])

    if(!isLoggedIn) {
        setRedirectLocation(location.pathname)
    } else {
        setRedirectLocation(null)
    }

    let products = cart.map(ele => (
        {
            productId: ele.item._id,
            count: ele.count,
            price: ele.item.price
        }
    ))

    async function proceedToPayment(e) {
        e.preventDefault()
        if(!isLoggedIn) {
            setShowError(true)
        }else {
            setShowError(false)
            let dataToSend = {
                products,
                coupon: activeCoupon,
                address,
                phoneNumber

            }
            try {
                const {data: {key}} = await axios.get("/order/getkey")
                const {data: {order}} = await axios.post("/order/checkout", dataToSend)


                const options = {
                    key, 
                    amount: order.amount,
                    currency: "INR",
                    name: "Phonezone",
                    description: "Delivering quality",
                    image: "https://learnyst-user-assets.s3.ap-south-1.amazonaws.com/school-assets/schools/2410/schoolLogo/1657573685244Custom%20Size%20%E2%80%93%201.png",
                    order_id: order.id,
                    callback_url: "http://localhost:4000/api/order/paymentverification",
                    prefill: {
                        "name": "Gaurav Kumar",
                        "email": "gaurav.kumar@example.com",
                        "contact": "9000090000"
                    },
                    notes: {
                        "address": "Razorpay Corporate Office"
                    },
                    theme: {
                        "color": "#3399cc"
                    }
                };
                const razor = new window.Razorpay(options);
                razor.open()
            } catch (error) {
                console.log(error);
            }
        }

    }
  return (
    <div className='max-w-7xl mx-auto py-4 px-20'>
        <div>
        {!isLoggedIn ? <div>
            <h3 className='my-3'>You must Login to proceed further</h3>
            <Link className='text-center w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' to="/login">Login</Link>
        </div> : ""}
        </div>
        <div className="address">
            <h2 className='uppercase my-3'>Delivery Address</h2>
            <form className='flex flex-col'>
                <textarea placeholder='Enter Complete Address' className='rounded px-2 py-1' onChange={(e) => setAddress(e.target.value)}/>
                <input type="number" className='my-3 px-2 py-1 rounded' placeholder='Eenter your Phone no.' onChange={(e) => setPhoneNumber(e.target.value)}/>
                <button className='text-center w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={proceedToPayment}>Payment</button>
            </form>
        </div>
    </div>
  )
}

export default Checkout