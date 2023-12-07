import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const LoginScreen = () => {
    const [login, setLogin] = useState(true)
    const handleLogin = () => {
        setLogin(!login);
    }
  return (
    <>
        {login ? <Login switcher={handleLogin}/> : <Register switcher={handleLogin}/>}
    </>
  )
}

export default LoginScreen