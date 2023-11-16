import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {GiCancel} from 'react-icons/gi'

import {Link ,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import SearchListing from '../pages/SearchListing'

function Header() {
const navigate = useNavigate()
  const {currentUser} = useSelector(state => state.user)
  const [search , setSearch] = useState('');
  const [clearSearch , setClearSearch]= useState(false)


  const handelSearch=async(e)=>{
    e.preventDefault();
    if(search.length >= 3){
      navigate(`/search?search=${search}`)
      setClearSearch(true)
    }
  }
  const clearSearchnow = () => {
    setSearch('');
    setClearSearch(false) // Clear the search input field
    navigate('/')// Call the clearSearchResults function to reset the state
  };

  return (
    <header className='bg-slate-400 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3' >
    <Link to={'/'}>
    <h1 className='font-bold text-lg sm:text-xl flex flex-wrap '>
      <span className='text-white'>Sr</span>
      <span className='text-slate-700'>Estate</span>
    </h1>
    </Link>
    <form 
    className='bg-slate-100 p-2 rounded-lg flex items-center'> 
<input
value={search}
onChange={(e)=>setSearch(e.target.value)}
className='bg-transparent focus:outline-none w-24 sm:w-64' 
type='text' placeholder='Search...'/>
{ clearSearch ? (
<GiCancel onClick={clearSearchnow} size={20} className='cursor-pointer text-slate-500' />
)
:(
<AiOutlineSearch onClick={handelSearch} size={20} className='cursor-pointer text-slate-500' />

)}

    </form>
    <ul className='flex gap-4 text-slate-700 font-bold items-center'>
      <li className='hidden sm:inline hover:scale-105 hover:text-slate-500'><Link to={'/'}>Home</Link></li>
      <li className='hidden sm:inline hover:scale-105 hover:text-slate-500'><Link to={'/about'}>About</Link></li>
      {
        currentUser.rest ? (<Link to={"/profile"}><img src={currentUser.rest?.avtar} alt='image.jpg'
        className='rounded-full h-8 w-8 sm:h-10 sm:w-10 cursor-pointer object-cover'/></Link>)
        :(<li className=' hover:scale-105 bg-slate-700 px-2 py-1 rounded-lg text-white text-center'><Link to={'/signin'}>Sign In</Link></li>) 
      }

    </ul>
    </div>
  
    </header>
  )
}

export default Header