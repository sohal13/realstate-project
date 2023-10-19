import React, { useState } from 'react'
import {app} from '../firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'

const CreateListing = () => {

     const [file , setFile]=useState([])
     const [formData ,setFormData]=useState({
        image:[],
     });
     const [loading,setLoading] = useState(false)
     const [imageError,setImageError] = useState(false)
console.log(formData);

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

    return (
        <div className='max-w-4xl mx-auto p-3'>
            <h1 className='text-3xl font-bold text-center my-7'>List Your Property</h1>

            <form className='flex flex-col sm:flex-row gap-4 justify-between'>
                <div className=' flex flex-col gap-3 flex-1'>
                    <input
                        type='text'
                        placeholder='Name..'
                        id="name"
                        className='py-3 rounded-lg px-3'
                        required
                    />
                    <textarea
                        type='text'
                        placeholder='Description..'
                        id="discription"
                        className='py-3 rounded-lg px-3'
                        required
                    />
                    <input
                        type='text'
                        placeholder='Address..'
                        id="address"
                        className='py-3 rounded-lg px-3'
                        required
                    />
                    <div className='flex justify-between gap-3 flex-wrap'>

                        <div className='flex gap-3 items-center ' >
                            <input
                                type='number'
                                id='price'
                                className='py-3 rounded-lg p-3'
                                required
                            />
                            <p className='flex flex-col text-center '>Regular price
                                <span> ( ₹ )</span>
                            </p>

                        </div>
                        
                        <div className='flex gap-3 items-center '>
                            
                            <input
                                type='number'
                                id='discountprice'
                                className='py-3 rounded-lg  p-3'
                                required
                            />
                            <p className='flex flex-col text-center '>Discount price
                                <span>( ₹ )</span>
                            </p>
                        </div>
                        <div className='flex gap-4 items-center ' >
                            <input
                                type='number'
                                id='area'
                                className='py-3 rounded-lg p-3'
                                required
                            />
                            <p className='flex flex-col text-center '>Total Area
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
                    <button className='bg-green-500 rounded-lg py-2 text-white hover:scale-105' >Upload Property</button>
                </div>
            </form>
        </div>
    )
}

export default CreateListing