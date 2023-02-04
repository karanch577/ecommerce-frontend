import React from 'react'
import { useState } from 'react'
import UserContext from './UserContext'

function UserProvider(props) {
    const [user, setUser] = useState(null)
    
  return (
    <UserContext.Provider value={{user, setUser}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider