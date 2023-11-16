import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation , useNavigate } from 'react-router-dom';

const SearchListing = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const search = new URLSearchParams(location.search).get('search');
    const [searchData, setSearchData] = useState([])
    const [loading ,setLoading] = useState(false)
    const [showMore,setShowMore] = useState(false)

    useEffect(() => {
        const getListing = async () => {
                try {
                    setLoading(true)
                    const res = await axios.get(`/api/listing/search?search=${search}`);
                    const data = res.data;

                    if (data.success === false) {
                        console.log(data.error);
                    }
                    if(data.length < 8){
                        setShowMore(true)
                    }else{
                        setShowMore(false);
                    };
             
                    setSearchData(data)
                    setLoading(false)
                } catch (error) {
                    console.log(error.message);
                    setLoading(false)
                }
        }
        getListing();
    }, [])

    const showMorefunction=async()=>{
        setLoading(true)
        setShowMore(false)
        const numberofData = searchData.length;
        const startIndex = numberofData
        const urlPrams = new URLSearchParams(location.search);
        urlPrams.set('startIndex',startIndex);
        const searchQuery = urlPrams.toString();
        console.log(searchQuery);
        const res = await axios.get(`/api/listing/search?${searchQuery}`);
        const data = res.data;
        if(data.length > 9){
            setShowMore(false)
        }

        setSearchData((prevData)=>[...prevData,...data])
        setLoading(false)
    }

    //console.log(searchData);
    function truncateDescription(description, maxLength) {
        if (description.length > maxLength) {
          return description.substring(0, maxLength) + '...';
        }
        return description;
      }


    return (
        <div className='max-w-7xl mx-auto p-3 my-7'>
{
    !loading ? (
    <div className='flex flex-col items-center'>
        <div className='flex flex-wrap gap-6 justify-center '>
        {searchData.map((data) => (
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
    )
                }
export default SearchListing