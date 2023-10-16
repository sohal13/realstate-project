import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInSuccess } from '../redux/user/userSlice'


export const Oauth =() => {
    const navigate = useNavigate();
    const dispach = useDispatch();

    const handelGoogleClick=async()=>{
try {
    const provider = new GoogleAuthProvider()
    const auth = getAuth(app)
    const result = await signInWithPopup(auth , provider)
    //console.log(result);

    const res = await axios.post('/api/auth/google',{name:result.user.displayName,
     email:result.user.email ,photo:result.user.photoURL})

     const data = await res.data;
     dispach(signInSuccess(data));
     navigate('/')
} catch (error) {
    console.log("can't signin with google",error);
}
    }
  return (
    <button onClick={handelGoogleClick} type='button' className='bg-red-600 rounded-lg text-white py-3
    hover:opacity-95'>Continu With Google</button>
  )
}
