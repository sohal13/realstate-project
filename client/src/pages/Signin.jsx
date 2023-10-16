import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFaliur } from '../redux/user/userSlice';
import { Link , useNavigate } from 'react-router-dom'
import { Oauth } from '../components/Oauth';
const Signin = () => {

  const navigate = useNavigate();
  const dispach = useDispatch();

  const [formData , setFormData] = useState({});
  const {loading , error}=useSelector((state)=>state.user);


  const handelChnage=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const onSubmit=async(e)=>{
    e.preventDefault();
    try {
      dispach(signInStart())
      const res = await axios.post('/api/auth/signin',formData)
      const data = await res.data;
      if(data.success === false){
        dispach(signInFaliur(data.message));
      }else{
      dispach(signInSuccess(data))
      navigate('/')
    }
      
    } catch (error) {
      dispach(signInFaliur(data.message));
     
    }

  }
  return (
    <>
\<div className='p-3 max-w-lg mx-auto'>
<h1 
className='text-3xl text-center font-bold
my-7'
>Sign In</h1>
<form onSubmit={onSubmit} className='flex flex-col gap-4 '>

  <input type='text' 
  placeholder='email'
  className='border p-3 rounded-lg' id='email'
  onChange={handelChnage}
  required
  />

    <input type='password' 
  placeholder='password'
  className='border p-3 rounded-lg' id='password'
  onChange={handelChnage}
  required
  />
<button 
className='bg-slate-700 text-white py-3 rounded-lg
hover:opacity-90 disabled:opacity-80'
>{loading ?"Loading...":"SignIn"}</button>
<Oauth/>
</form>
<div className='gap-2 mt-5'>
  <p>Don't have an Account?
    <Link to={'/signup'}> <span className='text-blue-500 font-bold'>
     signup
      </span>
      </Link>
      </p>
      <p className='text-red-500 mt-2'><span>{error}</span></p>
</div>
</div>
</>
  )
}

export default Signin