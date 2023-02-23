import axios from 'axios'
import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AddCoupon from './AddCoupon'
import UserContext from '../context/user/UserContext'

function CouponsAdmin() {
  const { action } = useParams()
  const [coupons, setCoupons] = useState([])
  const [editId, setEditId] = useState("")
  const [editInput, setEditInput] = useState({
    name: "",
    discount: ""
  })

  const state = useContext(UserContext)

  useEffect(() => {
    try {
      axios.get("/coupon/all")
      .then(({data}) => setCoupons(data.coupons))
    } catch (error) {
      console.log(error);
    }
  }, [editId, state.reload])

  async function handleEdit() {
    
  }

  async function handleDelete(deleteId) {
    try {
      await axios.delete(`/coupon/${deleteId}`)
      state.setReload((value) => !value)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    action !== "add" ? (
    <div className='flex flex-col'>
    <div className='flex justify-center'>
    <Link className='bg-red-500 text-white px-6 py-2 rounded-full text-xl' to={"coupons/add"}>
      Add Coupon
    </Link>
    </div>
    {/* list the categories */}
    <h2 className='text-2xl m-2 top-3'>Coupons -</h2>
    <div className='bg-white rounded h-[56vh] overflow-auto'>
      <div>
      {coupons.length ? coupons.map((el) => 
      <div className='text-xl my-3 px-5 flex items-center justify-between' key={el._id}>
      <div className="flex justify-between grow">
      <div className="input w-1/3">
        
        {editId === el._id ? <input type="text" placeholder={editInput} onChange={(e) => setEditInput(e.target.value)} className='w-full'/> : 
        <p>{el.code}</p>
        
        }
        </div>
  
        <div className="input w-1/3">
          
        {editId === el._id ? <input type="number" placeholder={editInput} onChange={(e) => setEditInput(e.target.value)} className='w-full'/> : 
        <p>{el.discount}</p>
        }
        </div>
  
        <div className="input w-1/3">
          
        {editId === el._id ? <input type="text" placeholder={editInput} onChange={(e) => setEditInput(e.target.value)} className='w-ful'/> : 
        <p>{el.active ? <span className='bg-green-500 text-white rounded px-4 py-1'>active</span> : <span>inactive</span>}</p>
        }
        </div>
      </div>
     

      {editId === el._id ? <button className='text-white bg-red-500 text-sm ml-3 py-1.5 rounded-lg px-5' onClick={handleEdit}>Edit</button>:
        
      <div className="icons flex items-center ml-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => {
        handleDelete(el._id)
        }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
</svg>

      </div>}
      </div>) : ""}
      </div>
    </div>
  </div>
    ) : <AddCoupon />
  )
}

export default CouponsAdmin