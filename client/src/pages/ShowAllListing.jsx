import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ListingimgSlider } from '../components/ListingimgSlider';
import { useNavigate } from 'react-router-dom';

const ShowAllListing = () => {
    const {currentUser} = useSelector(state=>state.user);
const navigate = useNavigate();
    const [listings , setListing] = useState([]);
    const [error , setError] = useState(false)

    useEffect(()=>{
        getListings();
    },[])

    const getListings=async()=>{
        try {
            const res = await axios.get(`/api/user/listing/${currentUser.rest._id}`)
            const data = res.data;
            setListing(data)
        } catch (error) {
            setError(error.message)
        }
    }

    const handleDelete=async(listing)=>{
try {
    const userConfirm = window.confirm("Do u want to delete This Listing")
    if(userConfirm){
    const res = await axios.delete(`/api/listing/deletelisting/${listing._id}`)
    if (res.status === 200) {
        window.location.reload();
    }
  }
} catch (error) {
    setError(error.message)
}
    }


  return (
    <>
  <div className='max-w-7xl mx-auto p-3 my-7'>
    <div className='flex flex-wrap gap-6 justify-center '>
    {listings.map((listing) => (
      <div  key={listing._id} 
      //onClick={()=>navigate(`/showlisting/${listing._id}`)}
      className="bg-slate-300 h-auto w-[400px] rounded-lg cursor-pointer hover:scale-105 ">
        <ListingimgSlider className='rounded-lg rounded-b-none' images={listing.image}/>
        <h2 className='text-2xl p-2'><span className='font-bold'>Name:</span>{listing.name}</h2>
        <p className='text-sm px-2'><span className='font-bold'>Description:</span>{listing.description}</p>
        <p className='text-lg px-2'><span className='font-bold'>Address:</span>{listing.address}</p>
        <p className='text-lg px-2'><span className='font-bold'>Area: </span>{listing.area}sqft</p>
        <p className='text-lg px-2'
        style={{textDecoration:listing.discountprice > 0 ? 'line-through' : null }}><span className='font-bold'>Price:</span> ₹{listing.price}</p>
        <p
         style={{display:listing.discountprice === 0 ? "none" : "block"}}
        className='text-lg px-2'><span className='font-bold'>Discount Price:</span> ₹{listing.discountprice}</p>
        <div className='flex justify-between p-3'>
        <button 
        className='px-8 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:scale-105'
        onClick={() =>navigate(`/editsinglelisting/${listing._id}`)}>Edit</button>
                <button 
        className='px-6 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:scale-105'
        onClick={() => navigate(`/showlisting/${listing._id}`)}>Show</button>
        <button 
        className='px-6 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:scale-105'
        onClick={() => handleDelete(listing)}>Delete</button>
      </div>
      </div>
    ))}
  </div>
  </div>
    </>
  )
}

export default ShowAllListing