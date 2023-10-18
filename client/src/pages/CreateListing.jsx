import React from 'react'

const CreateListing = () => {
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
                            type='file'
                            id='image'
                            accept='image/*'
                            className='p-3 border border-gray-700 rounded-lg w-full' />
                        <button className='border-spacing-7 border border-gray-700 rounded-lg text-[15px] text-gray-700 px-2 hover:scale-105 hover:bg-green-600'>upload</button>
                    </div>
                    <button className='bg-green-500 rounded-lg py-2 text-white hover:scale-105' >Upload Property</button>
                </div>
            </form>
        </div>
    )
}

export default CreateListing