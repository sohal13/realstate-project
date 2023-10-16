import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'

const UserProfile = () => {

  const fileRef = useRef(null);

  const {currentUser}= useSelector((state)=>state.user);
  const [file ,setFile]=useState(undefined);
  const [fileper ,setFileper]=useState(0);
  const [fileError ,setFileError]=useState(false);
  const [formData ,setFormData]=useState({});

 
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

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-center font-bold my-7 text-3xl'>Profile</h1>
      
      <form className='flex flex-col gap-4'>
        <input 
        onChange={(e) => setFile(e.target.files[0])}
        type='file' ref={fileRef} 
        hidden 
        accept='image/*'/>
        <img 
         onClick={()=>fileRef.current.click()}
        className='rounded-full h-20 w-20 cursor-pointer self-center'
        src={formData.avatar ||currentUser.rest.avtar} alt='avtar.jpg'
        />

        <p className='text-center text-red-500 text-[10px] flex flex-col'>
        {fileError && fileper !== 100 ? (<span className='text-red-500'>Error Image Uploading(image must be less then 2Mb)</span>)  :(null)}
        {fileper > 0 && fileper < 100 ?
        (<span className='text-green-500'>Uploading {fileper}%</span>):(null) }
        {fileper === 100 && fileError === null ? (<span className='text-green-500'>Image Succesfully uploaded!</span>):(null)}
        {fileper>0 ?(null): (<span className='text-red-500'>Click on Image to Update</span>)}
         </p>
        <input type="text"
      //value={currentUser.currentUser.rest.username}
        className='rounded-lg py-2 p-3 border'
        id='name'
        />
        <input type="email"
        //value={currentUser.currentUser.rest.email}
        className='rounded-lg py-2 p-3 border'
        id='email'
        />
        <input type="number"
        id='phone'
        placeholder='Enter Your Number...'
        className='rounded-lg py-2 p-3 border'/>
        <input type="password"
        id='password'
        placeholder='XXXXXXXXX'
        className='rounded-lg py-2 p-3 border'/>
        <button className='bg-slate-600 py-2 text-white rounded-lg hover:opacity-95'>Update</button>
        <button className='bg-green-600 py-2 text-white rounded-lg hover:opacity-95'>Create Listing</button>
      </form>
      <p className='flex justify-between my-4'>
        <button className='bg-red-500 text-white rounded-lg hover:opacity-90 cursor-pointer px-4 py-2'>Delete Account</button>
      <button className='bg-red-500 text-white rounded-lg hover:opacity-90 cursor-pointer px-4 py-2'>Sign-Out Now</button>
      </p>
      <p className='text-center my-6'>
        <button className='bg-green-600 px-20 py-2 rounded-lg text-white hover:opacity-95'><Link to={''}>Show My Listing</Link></button></p>
    </div>
  )
}

export default UserProfile