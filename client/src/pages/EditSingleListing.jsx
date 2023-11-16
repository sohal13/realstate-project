import React, { useEffect, useState } from 'react'
import {app} from '../firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import axios from 'axios'
import {BsCurrencyRupee} from 'react-icons/bs'
import {AiOutlineAreaChart} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom'


const CreateListing = () => {

    const {currentUser} = useSelector(state=>state.user)
    const navigate = useNavigate();
    const prmsid = useParams()

     const [file , setFile]=useState([])
     const [formData ,setFormData]=useState({
        image:[],
        name:"",
        description:"",
        address:"",
        price:0,
        discountprice:0,
        area:0,

     });
     const [loading,setLoading] = useState(false)
     const [imageError,setImageError] = useState(false)

     useEffect(()=>{
        const getListData = async()=>{
            const id = prmsid.id
            const Listing = await axios.get(`/api/listing/singlelist/${id}`)
            const data = await Listing.data;
            if(data.succcess===false){
                console.log(data.error);
            }
            setFormData(data)
          
        }
        getListData()
     },[])

     const handelImageSubmit=()=>{
            if(file.length > 0 && file.length + formData.image.length < 7){
                
                setLoading(true);
                setImageError(false);
                const promise = [];

                for(let i=0;i<file.length;i++){
                    promise.push(storeImage(file[i]));
                }
                Promise.all(promise).then((urls)=>{
                    setFormData({...formData,image:formData.image.concat(urls)
                    });
                    setImageError(false);
                    setLoading(false)
                  
                }).catch((error)=>{
                    setImageError("image upload failed (2 mb max per images)")
                    setLoading(false)
                })
            }else{
                setImageError("Select an Image/You can Only upload up to 6 iamges")
            setLoading(false);
            }

        }



     const storeImage=async(file)=>{
        return new Promise((resolve,reject)=>{
            const storage = getStorage(app)
            const filename = new Date().getTime()+file.name;
            const storageRef = ref(storage,filename)
            const uploadTask = uploadBytesResumable(storageRef ,file);
            uploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const process = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(`uploded ${process}`);
                  },
                (error)=>{
                    reject(error)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL)=>{
                        resolve(downloadURL)
                    });
                }
            )
        })
     }

     const handelImageDelete=(index)=>{
            setFormData({
                ...formData,
                image:formData.image.filter((_,i)=>i !== index)
            });
     };

const handelChange=(e)=>{
    setFormData({
        ...formData,[e.target.id]:e.target.value,
    })
}

const handelUploadData =async (e)=>{
    e.preventDefault();
    try {
        if(formData.image.length <1 ) return setImageError("you must upload at list 1 image")
        if(formData.price < formData.discountprice ) return setImageError("discount price must be lower then price")
        setLoading(true);
        setImageError(false)
        const res = await axios.post(`/api/listing/editsinglelisting/${prmsid.id}`,{...formData,
        userRef:currentUser.rest._id})
        const data = await res.data;

        if(data.succcess === false){
            setImageError(data.message)
        }
        setLoading(false)
        navigate(`/showlisting/${data.updatedListing._id}`)
    } catch (error) {
        setImageError(error.message)
    }
  
}

    return (
        <div className='max-w-4xl mx-auto p-3'>
            <h1 className='text-3xl font-bold text-center my-7'>Edit Your Listing Property</h1>

            <form onSubmit={handelUploadData} className='flex flex-col sm:flex-row gap-4 justify-between'>
                <div className=' flex flex-col gap-3 flex-1'>
                    <input
                        type='text'
                        placeholder='Name..'
                        id="name"
                        className='py-3 rounded-lg px-3'
                        required
                        onChange={handelChange}
                        value={formData.name}
                    />
                    <textarea
                        type='text'
                        placeholder='Description..'
                        id="description"
                        className='py-3 rounded-lg px-3'
                        required
                        onChange={handelChange}
                        value={formData.description}
                    />
                    <input
                        type='text'
                        placeholder='Address..'
                        id="address"
                        className='py-3 rounded-lg px-3'
                        required
                        onChange={handelChange}
                        value={formData.address}
                    />
                    <div className='flex justify-between gap-3 flex-wrap'>

                        <div className='flex gap-3 items-center ' >
                        <div className='flex justify-center bg-white rounded-lg'>
                            <BsCurrencyRupee size={25} className='self-center'/>
                            <input
                                type='number'
                                id='price'
                                className='py-3 rounded-lg bg-transparent'
                                required
                                onChange={handelChange}
                                value={formData.price}
                            />
                            </div>
                            <p className='flex flex-col text-center '>Regular price</p>

                        </div>
                        
                        <div className='flex gap-3 items-center '>
                            <div className='flex justify-center bg-white rounded-lg'>
                            <BsCurrencyRupee size={25} className='self-center'/>
                            <input
                                type='number'
                                id='discountprice'
                                className='py-3 rounded-lg  bg-transparent'
                                required
                                onChange={handelChange}
                                value={formData.discountprice}
                            />
                            </div>
                            <p className='flex flex-col text-center '>Discount price
                            </p>
                        </div>
                        <div className='flex gap-4 items-center ' >
                        <div className='flex justify-center bg-white rounded-lg'>
                            <AiOutlineAreaChart size={25} className='self-center'/>
                            <input
                                type='number'
                                id='area'
                                className='py-3 rounded-lg bg-transparent'
                                required
                                onChange={handelChange}
                                value={formData.area}
                            />
                            </div>
                            <p className='flex flex-col text-center '>Area
                                <span> ( sq ft )</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                <p className='font-bold'>Image:<span className='font-thin'>The First image will be the cover (max 6)</span></p>
                    <div className='flex flex-row justify-between gap-2'>
                        <input
                        multiple
                        onChange={(e)=>setFile(e.target.files)}
                            type='file'
                            id='image'
                            accept='image/*'
                            className='p-3 border border-gray-700 rounded-lg w-full' />
                        <button 
                        type='button'
                        disabled={loading}
                        onClick={handelImageSubmit}
                        className='border-spacing-7 border border-gray-700 rounded-lg text-[15px] text-gray-700 px-2 hover:scale-105 hover:bg-green-600'>
                            {loading ? "Uploading..." : "upload"}</button>
                    </div>
                    {
                                formData?.image.length >0 && formData?.image.map((url,index)=>(
                    <div className='flex w-full justify-between px-3 border border-gray-300 rounded-lg py-1'
                    key={index}>
                                    <img 
                                    className='h-20 w-32 self-center object-center rounded-sm'
                                    src={url} alt='listimage.jpg'
                                    />
                                    <button
                                    type='button'
                                    onClick={()=>handelImageDelete(index)}
                                     className='bg-red-500 h-10 px-4 self-center rounded-lg capitalize'>DELETE</button>
                                    </div>
        
                                ))
                            }
                    <p className='text-red-600 text-sm'>{imageError && imageError}</p>
                    <button 
                    type='submit'
                    className='bg-green-500 rounded-lg py-2 text-white hover:scale-105' >{loading ? "Updating...":"Update Property"}</button>
      
                </div>
            </form>
        </div>
    )
}

export default CreateListing