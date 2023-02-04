import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import UserContext from '../context/user/UserContext'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'

function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isError, setIsError] = useState(true)

  const [redirect, setRedirect] = useState(false)

  const {setUser} = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(redirect) {
      navigate("/admin/dashboard")
    }
  }, [redirect])

  const handleForm = async (e) => {
    e.preventDefault()
    setEmail("")
    setPassword("")
    try {
      const { data } = await axios.post("/user/signin", {
        email,
        password
      })
      setUser(data.user)
      if(data.user.role === "ADMIN") {
        setRedirect(true)
      }
      
    } catch (error) {
      if(!error.response.data.success) {
        setIsError(false)
      }
    }
  }
 
  return (
    <>
     <Link to={"/"} className="icon flex items-center cursor-pointer max-w-6xl mx-auto my-6 px-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
        <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z" clipRule="evenodd" />
        </svg>
        Phonezone
    </Link>
    <div>
      <form className='flex flex-col max-w-md p-5 mx-auto h-[80vh] justify-center' onSubmit={handleForm}>
      {isError ? "" : <p className='text-right text-red-600'>* Incorrect credentials</p>}
        <h2 className='text-3xl mb-3'>Admin Login</h2>
        <input className="my-3 p-2" type="email" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input className="my-3 p-2" type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button className='cursor-pointer bg-slate-900 text-white w-20 text-center py-1 rounded mt-2'>Login</button>
      </form>
    </div>
    </>
  )
}

export default AdminLogin