import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const LoginScreen = () => {
    const [login, setLogin] = useState(true);
    const [user,setUser] = useState({});

    const handleUser = (obj) => {
      setUser (obj);
    }

    const handleLogin = () => {
        setLogin(!login);
    }
  return (
    <>
        {login ? <Login handleLogin={handleLogin} handleUser={handleUser}/> : <Register handleLogin={handleLogin}/>}
    </>
  )
}

export default LoginScreen