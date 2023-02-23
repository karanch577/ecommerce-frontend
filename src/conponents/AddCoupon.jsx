import axios from 'axios'
import React, { useState, useContext } from 'react'
import UserContext from '../context/user/UserContext'

function AddCoupon() {
    const [input, setInput] = useState({
      name: "",
      discount: ""
    })
    const [showError, setShowError] = useState(false)
    const [dbError, setDbError] = useState(false)

    const {setReload} = useContext(UserContext)
    console.log(input);

    async function handleForm(e) {
      e.preventDefault()
      setInput({
        name: "",
        discount: ""
      })
      if(!input.name || !input.discount) {
        setShowError(true)
    } else {
        setShowError(false)
        try {
            const { data } = await axios.post("/coupon/create", input)
            
            setReload((value) => !value)
        } catch (error) {
            if(error.response.status){
                setDbError(true)
            }
        }
    }
    }
  return (
    <div>   <form className='flex flex-col w-[75%] mx-auto relative bg-white rounded py-2 px-4' onSubmit={handleForm} onFocus={() =>{
      setShowError(false)
      setDbError(false)
  }}>
      <p className='text-3xl my-6'>Enter the coupon details</p>
      {showError ? <p className='text-red-500 text-right absolute right-0 top-12'>* All fields are mandatory</p> : dbError ? <p className='text-red-500 text-right absolute right-0 top-12'>* coupon already exist</p> : ""}
      <input type="text" placeholder='Coupon name' className='p-2 w-full rounded' value={input.name} onChange={(e) => setInput((prev) => ({
        ...prev,
        name: e.target.value
      }))}/>

      <input type="number" min={0} max={100} placeholder='Discount' className='p-2 w-full rounded my-7' value={input.discount} onChange={(e) => setInput((prev) => ({
        ...prev,
        discount: e.target.value
      }))}/>
      <button type="submit" className='block my-4 bg-red-500 p-2 rounded text-white'>Add</button>
  </form></div>
  )
}

export default AddCoupon