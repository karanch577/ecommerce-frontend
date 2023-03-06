import React from 'react'
import { useState } from 'react'
import UserContext from './UserContext'

function UserProvider(props) {
    const [user, setUser] = useState(null)
    const [reload, setReload] = useState(false)
    const [cart, setCart] = useState([])
    const [activeCoupon, setActiveCoupon] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [redirectLocation, setRedirectLocation] = useState(null)
    
  return (
    <UserContext.Provider value={{
      user,
      setUser,
      cart,
      setCart,
      activeCoupon,
      setActiveCoupon,
      isLoggedIn,
      setIsLoggedIn,
      reload,
      setReload,
      redirectLocation,
      setRedirectLocation}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider