import React, { useEffect, useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart,updateUserSuccess,updateUserFaliur,
  signOutStart,signOutSuccess,signOutFaliur ,
userDeletedFaliur,userDeletedStart,userDeletedSuccess} from '../redux/user/userSlice'
import { useDispatch } from 'react-redux';
import axios from 'axios'

const UserProfile = () => {

  const fileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch =  useDispatch();

  const {currentUser}= useSelector((state)=>state.user);
  const [file ,setFile]=useState(undefined);
  const [fileper ,setFileper]=useState(0);
  const [fileError ,setFileError]=useState(false);
  const [formData ,setFormData]=useState({});
  const [updateUser,setUserUpdate]=useState(null)

  useEffect(()=>{
    if(file){
      handelFileUpdate(file);
    }
  },[file])

  const handelFileUpdate=(file)=>{
    const storage = getStorage(app);
    const fileName =new Date().getTime() + file.name;
    const storagrRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storagrRef,file);
    
    uploadTask.on('state_changed',
    (snapshot)=>{
      const process = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFileper(Math.round(process));
    },
    (error)=>{
      setFileError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadUrl)=>{
        setFormData({...formData,
          avatar:downloadUrl})
      })
    }
    );
  }

  const handelChnage =(e)=>{
    setFormData({...formData,
     [e.target.id]:e.target.value})
  }

  const handelSubmit =async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.post(`api/user/update/${currentUser.rest._id}`,formData)
      const data = await res.data;
      if(data.success===false){
        dispatch(updateUserFaliur(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUserUpdate(data?.message)
    } catch (error) {
      dispatch(updateUserFaliur(error.message))
    }
  }
const handelDeleteUser=async()=>{
  try {
    dispatch(userDeletedStart());
    const res = await axios.delete(`/api/user/deleteuser/${currentUser.rest?._id}`)
    const data = await res.data;
    if(data.success===false){
      dispatch(userDeletedFaliur(data.message));
      return;
    }
    dispatch(userDeletedSuccess(data));
    navigate('/signup')
  
  } catch (error) {
    dispatch(userDeletedFaliur(error.message))
  }
}
  const handelLogout=async()=>{
    try {
      dispatch(signOutStart());
      const res = await axios.get('/api/user/signout');
      const data = await res.data;
      if(data.success==false){
        console.log("logOut Unccesfull!!");
        dispatch(signOutFaliur(data.message))
        return;
      }
      dispatch(signOutSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signOutFaliur());
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-center font-bold my-7 text-3xl'>Profile</h1>
      
      <form onSubmit={handelSubmit} className='flex flex-col gap-4'>
        <input 
        onChange={(e) => setFile(e.target.files[0])}
        type='file' ref={fileRef} 
        hidden 
        accept='image/*'/>
        <img 
         onClick={()=>fileRef.current.click()}
        className='rounded-full h-20 w-20 cursor-pointer self-center'
        src={formData?.avatar || currentUser.rest?.avtar} alt='avtar.jpg'
        />
        <p className='text-center text-red-500 text-[10px] flex flex-col'>
        {fileError  ? (<span className='text-red-500'>Error Image Uploading(image must be less then 2Mb)</span>)  :(null)}
        {fileper > 0 && fileper < 100 ?
        (<span className='text-green-500'>Uploading {fileper}%</span>):(null) }
        {fileper === 100 ? (<span className='text-green-500'>Image Succesfully uploaded!</span>):(null)}
        {fileper>0 ?(null): (<span className='text-red-500'>Click on Image to Update</span>)}
         </p>
        <input type="text"
      defaultValue={currentUser.rest?.username}
        className='rounded-lg py-2 p-3 border'
        id='name'
        onChange={handelChnage}
        />
        <input type="email"
        defaultValue={currentUser.rest?.email}
        className='rounded-lg py-2 p-3 border'
        id='email'
        onChange={handelChnage}
        />
        <input type="number"
        id='phone'
        defaultValue={currentUser.rest?.phone}
        placeholder='Update Your Number (IMPORTANT)'
        className='rounded-lg py-2 p-3 border'
        onChange={handelChnage}
        />
        <input type="password"
        id='password'
        placeholder='XXXXXXXXX'
        className='rounded-lg py-2 p-3 border'
        onChange={handelChnage}
        />
        <p className='text-sm text-green-500 text-center'>{updateUser}</p>
        <button className='bg-slate-600 py-2 text-white rounded-lg hover:opacity-95'>Update</button>
      </form>
      <p className='flex justify-between my-4'>
        <button 
        onClick={handelDeleteUser}
        className='bg-red-500 text-white rounded-lg hover:opacity-90 cursor-pointer px-4 py-2'>Delete Account</button>
      <button 
      onClick={handelLogout}
      className='bg-red-500 text-white rounded-lg hover:opacity-90 cursor-pointer px-4 py-2'>Sign-Out Now</button>
      </p>
      <p className='flex flex-col text-center my-6 gap-4'>
      <button className='bg-green-600 py-2 text-white rounded-lg hover:opacity-95'><Link to={"/createlisting"}>List Property</Link></button>
        <button className='bg-green-600 mx-20 py-2 rounded-lg text-white hover:opacity-95'><Link to={''}>Show My Listing</Link></button></p>
    </div>
  )
}

export default UserProfile