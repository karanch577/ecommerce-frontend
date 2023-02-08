import React from 'react'
import { useState } from 'react'
import UserContext from './UserContext'

function UserProvider(props) {
    const [user, setUser] = useState(null)
    const [reload, setReload] = useState(false)
    
  return (
    <UserContext.Provider value={{
      user,
      setUser,
      reload,
      setReload}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider