import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

const [landData , setLandData]= useState([]);
const [loading , setLoading] = useState(false);
const [showMore,setShowMore] = useState(false)


useEffect(()=>{
  const handelData =async()=>{
try {
  setLoading(true)
  const res = await axios(`/api/listing/get`)
  const data = res.data;
  if(data.length > 3){
    setShowMore(true)
}
  if(data.success === true){
    console.log(data.error);
  }
  setLandData(data)
  setLoading(false)
} catch (error) {
  console.log(error);
  setLoading(false)
}
  }
  handelData();
},[])

const showMorefunction=async()=>{
  setLoading(true)
  setShowMore(false)
  const numberofData = landData.length;
  const startIndex = numberofData
  const urlPrams = new URLSearchParams(location.search);
  urlPrams.set('startIndex',startIndex);
  const searchQuery = urlPrams.toString();

  const res = await axios.get(`/api/listing/get?${searchQuery}`);
  const data = res.data;
  if(data.length < 4){
      setShowMore(false)
  }

  setLandData((prevData)=>[...prevData,...data])
  setLoading(false)
}

function truncateDescription(description, maxLength) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
}

  return (
    <div className="max-w-7xl mx-auto p-3 my-7">
      <div className='max-w-6xl mx-auto flex flex-col gap-6 p-10'>
<h1 className='text-2xl lg:text-6xl font-bold font-sans text-slate-600'>Find your next <span className='text-slate-400'>perfect </span>
<br/>
place with ease</h1>
<div className='text-gray-400 text-xs sm:text-sm '>
  SrEstate is the best place to find your next perfect place to live.
  <br/>
  we have a wide range of properties for you to choose from.
  <br/>
  <h1 className='text-blue-500 font-bold mt-5'>Start Exploring...</h1>
</div>
      </div>
      <div>

      </div>
      <div className=''>
      {
    !loading ? (
    <div className='flex flex-col items-center'>
        <div className='flex flex-wrap gap-6 justify-center '>
        {landData.map((data) => (
            <div className='w-64 h-auto bg-slate-300 rounded-lg hover:scale-105' 
            key={data._id}>
                <img src={data.image[0]}
                className='rounded-t-lg' alt='image' />
                <div className='p-1' >
                    <h1 className='text-3xl'>{data.name}</h1>
                    <p className='font-bold'>Description :-
                        <span className='text-gray-600 font-normal'>
                            {truncateDescription(data.description,15)}</span></p>
                </div>
                <button 
className='w-full py-2 bg-green-500 text-white rounded-b-lg cursor-pointer'
onClick={() => navigate(`/showlisting/${data._id}`)}>Show</button>
            </div>
        ))}
    </div>
    {showMore && <button 
    onClick={showMorefunction}
    className='mt-5 bg-green-600 px-6 py-2 rounded-lg text-white'>Show More</button> }
    </div>
    
    ):("Loading...")
}
    
      </div>
    </div>
  )
}

export default Home