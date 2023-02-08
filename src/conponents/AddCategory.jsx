import axios from 'axios'
import React, { useState, useContext } from 'react'
import UserContext from '../context/user/UserContext'

function AddCategory() {
    const [input, setInput] = useState("")
    const [showError, setShowError] = useState(false)
    const [dbError, setDbError] = useState(false)

    const {setReload} = useContext(UserContext)

    const handleForm = async (e) => {
        e.preventDefault()
        setInput("")
        if(!input) {
            setShowError(true)
        } else {
            setShowError(false)
            try {
                const { data } = await axios.post("/category/create", {
                    name: input
                })
                if(data.success) {
                    setReload((value) => !value)
                }
            } catch (error) {
                if(error.response.status){
                    setDbError(true)
                }
            }
        }
    }
  return (
    <div>
        <form className='flex flex-col w-[75%] mx-auto relative bg-white rounded py-2 px-4' onSubmit={handleForm} onFocus={() =>{
            setShowError(false)
            setDbError(false)
        }}>
            <p className='text-3xl my-6'>Enter the category name</p>
            {showError ? <p className='text-red-500 text-right absolute right-0 top-12'>* Category is mandatory</p> : dbError ? <p className='text-red-500 text-right absolute right-0 top-12'>* Category already exist</p> : ""}
            <input type="text" placeholder='Category name' className='p-2 w-full rounded' value={input} onChange={(e) => setInput(e.target.value)}/>
            <button type="submit" className='block my-4 bg-red-500 p-2 rounded text-white'>Add</button>
        </form>
    </div>
  )
}

export default AddCategory