import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='px-8'>
        <div className='w-full flex flex-col justify-center items-center gap-2.5'>
            <div className='flex flex-col gap-3'>
                <h1>Login</h1>
                <p>Welcome back</p>
            </div>
            <form className='flex flex-col gap-3' action="">
                <div className='flex flex-col gap-2'>
                <label>Email</label>
                <input type="email" />
                </div>

                <div className='flex flex-col gap-2'>
                <label>Password</label>
                <input type="password" />
                </div>
            </form>
            <div><p>Don't have an account with us yet? <Link to={"/SignUp"}>Register here.</Link></p></div>
        </div>
    </div>
  )
}

export default Login