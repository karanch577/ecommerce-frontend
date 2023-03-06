import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/user/UserContext'

function Cart() {
    const { cart, setCart, setActiveCoupon } = useContext(UserContext)
    const [totalPrice, setTotalPrice] = useState(0)
    const [finalPrice, setFinalPrice] = useState(0)
    const [coupons, setCoupons] = useState([])
    const [couponInput, setCouponInput] = useState("")
    const [couponError, setCouponError] = useState(false)

    function decreCount(ele) {
        const updatedItem = cart.map(i => (
            ele.item._id === i?.item._id ? {...i, count: !i.count ? 0 : i.count - 1 } : i
        ))
        // check if count = 0, remove that element
        const filteredItem = updatedItem.filter(i => i.count !== 0)
        setCart(filteredItem)
    }

    function increCount(ele) {
        const updatedItem = cart.map(i => (
            ele.item._id === i?.item._id ? {...i, count: !i.count ? 0 : i.count + 1 } : i
        ))
        setCart(updatedItem)
    }

    function applyDiscount() {
        const appliedCoupon = coupons.find(coupon => coupon.code === couponInput)
        if(appliedCoupon) {
            setCouponError(false)
            setActiveCoupon(appliedCoupon)
            const finalPrice = totalPrice -  (totalPrice * appliedCoupon.discount/100)
            setFinalPrice(finalPrice)
        }else {
            setCouponError(true)
            setFinalPrice(totalPrice)
            setCouponError(true)
        }
    }

    useEffect(() => {
        if(cart.length > 0){
            const total = cart.reduce((acc, cur) => acc + (cur.item.price * cur.count), 0)

            setTotalPrice(total)
            setFinalPrice(total)
        }
    }, [cart])

    // get the available coupons
    useEffect(() => {
        axios.get("/coupon/active")
        .then(({data}) => setCoupons(data.coupons))
        .catch(err => console.log(err))
    }, [])
  return (
    <div className='max-w-7xl mx-auto py-4 px-20'>
        {cart.length ?
        <div className='flex'>
        <div className="item bg-white rounded w-[74%]">
            {cart.map((el, index) => (
                <div className='pb-3 border-b pr-3' key={index}>
                    <div className='flex items-center'>
                        <div className="img w-56 flex justify-center">
                        <img className='m-4 rounded h-48 w-auto' src={el.item.photos[0].secure_url} />

                        </div>
                    <div>
                    <h2>{el.item.name}</h2>
                    <p>₹ {el.item.price}</p>
                    </div>
                    </div>
                    <div className="count flex mx-5 mb-3">
                    <p className='border rounded-full w-6 h-6 p-0 flex justify-center items-center' onClick={() => decreCount(el)}>-</p>
                    <p className='mx-3'>{el.count}</p>
                    <p className='border rounded-full w-6 h-6 p-0 flex justify-center items-center' onClick={() => increCount(el)}>+</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="price bg-white ml-5 w-[24%] rounded p-4">
            <h3 className='uppercase'>Price Details</h3>
            <div className="price flex justify-between my-2">
            <h3>Price ({cart.length === 1 ? `${cart.length} item` : `${cart.length} items`})</h3>
            <p>{totalPrice}</p>
            </div>
            <div className="coupon my-5">
                {couponError ? (<p className='text-red-500'>*coupon is not available</p>): ""}
            <input type="text" className='p-0.5 mb-2 w-full rounded' placeholder='Enter Coupon' value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' onClick={applyDiscount}>Apply</button>
                <div className="activeCoupons">
                    <h2 className='font-semibold'>Available Coupons</h2>
                    {coupons.length && coupons.map((coupon, index) => (
                        <div key={index} className='flex justify-between border my-2 px-1 cursor-pointer' onClick={() => setCouponInput(coupon.code)}>
                            <h2>{coupon.code}</h2>
                            <h2>{coupon.discount}% OFF</h2>
                        </div>
                    ))}
                </div>
                
            </div>
            <div>
            <div className="total flex justify-between border-dashed border-y-2 border-blue-300 py-2">
            <h3>Total Amount</h3>
            <p>{finalPrice}</p>
            </div>
            <Link to="/checkout" className='bg-blue-500 hover:bg-blue-700 flex justify-center text-white font-bold py-2 px-4 rounded mt-4'>Checkout</Link>
            </div>
        </div>
        </div>
       :
         <div className='flex flex-col items-center rounded mt-12 bg-white  justify-center h-[40vh] '>
         <h2 className='font-semibold text-xl'>Your Cart is empty</h2>
         <div className="link mt-10">
             <Link to="/category/tempered-glass" className='text-blue-600 m-3'>View Tempered Glass</Link>
             <Link to="/category/cases-and-covers" className='text-blue-600 m-3'>View Cases & Covers</Link>
         </div>
     </div> }
    </div>
  )
}

export default Cart