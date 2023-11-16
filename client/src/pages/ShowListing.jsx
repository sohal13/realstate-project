import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { SingleListimgSlider } from '../components/SingleListimgSlider';
import { HiLocationMarker } from 'react-icons/hi'
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';


const ShowListing = () => {

  const prmsid = useParams()
  const {currentUser} = useSelector(state=>state.user)

  const [formData , setFormData] = useState([]);
  const [contact , setContact] = useState(false);
  const [loading , setLoading] = useState(false)


  useEffect(()=>{
    const getListData = async()=>{
      try {
        setLoading(true)
        const id = prmsid.id
        const res = await axios.get(`/api/listing/singlelist/${id}`)
        const data = await res.data;
        if(data.succcess===false){
            console.log(data.error);
        }
        setLoading(false)
          setFormData([data]);
  
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false)
      }
      
    }
    getListData()
 },[])

  return (
    <div className=''>
      {
        !loading ? (
      formData.map((data)=>(
          <div key={data._id} className='max-w-full mx-auto'>
            <SingleListimgSlider
            images={data.image}/>
            <div className='sm:max-w-[75%] mx-auto my-7 px-2' >
              <h1 className='text-3xl mb-5 '>{data.name}</h1>
               <h1 className='flex text-gray-600 gap-1'>
                <span className='font-bold text-black'>Location:-</span>
                <HiLocationMarker className='text-green-500 ' size={25}/>{data.address}</h1>
            <h1 className='flex items-center font-bold gap-1'>Area:- <span className='font-normal text-gray-600'> {data.area}sqft</span></h1>
            <h1 className=''>
            <span className='font-bold'>Price:-</span>
              <span className='line-through  text-[14px] text-gray-500'>₹{data.price} </span>
            <span className='text-green-600'> ₹{data.discountprice}</span>
            </h1>
            <p className='font-bold mb-4'>Description :-
            <span className='text-gray-600 font-normal'>{data.description}</span></p>
            
            {currentUser && data.userRef !== currentUser.rest._id && !contact && (  <button 
              onClick={()=>setContact(true)}
              className='bg-green-600 w-full py-2 text-white rounded-lg hover:scale-105'>Contact LandLord</button>
              )
}
{contact && <Contact data={data}/>}
</div>
          </div>
        ))
        ):(<h1 className='text-center text-3xl'>Loading...</h1>)
      }
    </div>

  )
}

export default ShowListing