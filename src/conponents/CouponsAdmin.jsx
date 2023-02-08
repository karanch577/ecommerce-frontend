import axios from 'axios'
import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AddCoupon from './AddCoupon'
import UserContext from '../context/user/UserContext'

function CouponsAdmin() {
  const { action } = useParams()
  return (
    action !== "add" ? (
      <div className='flex justify-center'>
    <Link className='bg-red-500 text-white px-6 py-2 rounded-full text-xl' to={"coupons/add"}>
      Add Coupon
    </Link>
  </div>
    ) : <AddCoupon />
  )
}

export default CouponsAdmin