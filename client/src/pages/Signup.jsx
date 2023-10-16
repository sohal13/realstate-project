import React, { useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Oauth } from '../components/Oauth'

const Signup = () => {

  const navigate = useNavigate()

  const [formData , setFormData] = useState({
  })
  const [error , setError] = useState(null)
  const [Loading , setLoading] = useState(false)


  const handelChnage=(e)=>{
     setFormData({
      ...formData,[e.target.id]:e.target.value,
     })
  }

  const onSubmit=async(e)=>{
    e.preventDefault();
try {
    setLoading(true)
    const res = await axios.post('/api/auth/signup',formData)
      const data = await res.data;
      if(data.success===false){
        setLoading(false)
        setError(data.message)
      }else{
        setLoading(false)
        setError(null)
        navigate('/signin')
      }

      
 
} catch (error) {
  setLoading(false)
  setError(error.message)
}
} 

  return (
    <>
    <div className='p-3 max-w-lg mx-auto'>
      <h1 
      className='text-3xl text-center font-bold
      my-7'
      >Sign Up</h1>
      <form onSubmit={onSubmit} className='flex flex-col gap-4 '>
        <input type='text' 
        placeholder='username'
        className='border p-3 rounded-lg' id='username'
        onChange={handelChnage}
        required
        />
        <input type='email' 
        placeholder='email'
        className='border p-3 rounded-lg' id='email'
        onChange={handelChnage}
        required
        />
          <input type='number' 
        placeholder='Phone Number'
        className='border p-3 rounded-lg' id='phone'
        onChange={handelChnage}
        required
        />
          <input type='text' 
        placeholder='password'
        className='border p-3 rounded-lg' id='password'
        onChange={handelChnage}
        required
        />
      <button disabled={Loading}
      className='bg-slate-700 text-white py-3 rounded-lg
      hover:opacity-90 disabled:opacity-80'
      >{Loading ? "Loading...":"SignIn"}</button>
      <Oauth/>
      </form>
      <div className='gap-2 mt-5'>
        <p>Have an Account?
          <Link to={'/signin'}> <span className='text-blue-500 font-bold'>
           signin
            </span>
            </Link>
            </p>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      </div>
      </>
  )}
export default Signup