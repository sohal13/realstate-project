import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({data}) => {
    const [landLord , setLandLord] = useState({});
    const [message , setMessage] = useState('')
    const [loading , setLoading] = useState(false)

    useEffect(()=>{

 const handelContact=async(e)=>{
    try {
      setLoading(true)
      const res = await axios.get(`/api/listing/contactLandLord/${data._id}`);
      const user = await res.data;
      if(data.succcess===false){
          console.log(data.error);
      }
      setLoading(false)
      setLandLord(user)
    } catch (error) {
      console.log("error",error);
      setLoading(false)
    }
 }
handelContact()
    },[])


  return (
    <>
        { !loading ? (
            landLord && (
                <div className=''>
                    
                    <p>Land Owner = <span>{landLord.username}</span></p>
                    <p>Phone Number = <span>{landLord.phone}</span></p>
                    <p>Email = <span>{landLord.email}</span></p>
                    <textarea
                    rows={3}
                    onChange={(e)=>setMessage(e.target.value)}
                    placeholder='Send email to Land Owner'
                    id='message'
                    name='message'
                    value={message}
                    className='w-full bg-gray-2100 px-2 mt-2 rounded-lg'
                    />
                   {/*<Link to={`mailto:${landLord.email}?subject=Regarding ${data.name}&body=${message}`}>
                    <p
                    className='w-full bg-green-600 text-white py-2 rounded-lg hover:scale-105 text-center'>Sned Mail
                    </p>
            </Link>*/}
            <Link to={`mailto:${landLord.email}?subject=Regarding ${data.name}&body=${message}`}>
            <p className='w-full bg-green-600 text-white py-2 rounded-lg hover:scale-105 text-center'>Send Now</p>
              </Link>
                </div>
            )
        ):("Loading..")
        }
    </>
  )
}

export default Contact