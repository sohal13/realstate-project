import React from 'react'
import {Link} from 'react-router-dom'

const Signup = () => {
  return (
    <>
    <div className='p-3 max-w-lg mx-auto'>
      <h1 
      className='text-3xl text-center font-bold
      my-7'
      >Sign Up</h1>
      <form className='flex flex-col gap-4 '>
        <input type='text' 
        placeholder='username'
        className='border p-3 rounded-lg' id='username'/>
        <input type='text' 
        placeholder='email'
        className='border p-3 rounded-lg' id='email'/>
          <input type='text' 
        placeholder='Phone Number'
        className='border p-3 rounded-lg' id='phone'/>
          <input type='text' 
        placeholder='password'
        className='border p-3 rounded-lg' id='password'/>
      <button
      className='bg-slate-700 text-white py-3 rounded-lg
      hover:opacity-90 disabled:opacity-80'
      >SignUp</button>
      </form>
      <div className='gap-2 mt-5'>
        <p>Have an Account?
          <Link to={'/signin'}> <span className='text-red-600 font-bold'>SignIn</span></Link></p>
      </div>
      </div>
      </>
  )
}

export default Signup