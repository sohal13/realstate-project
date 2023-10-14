import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className='bg-slate-300 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3' >
    <Link to={'/'}>
    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap '>
      <span className='text-slate-500'>Sr</span>
      <span className='text-slate-700'>Estate</span>
    </h1>
    </Link>
    <form className='bg-slate-100 p-2 rounded-lg flex items-center'> 
<input 
className='bg-transparent focus:outline-none w-24 sm:w-64' 
type='text' placeholder='Search...'/>
<AiOutlineSearch size={20} className='cursor-pointer text-slate-500'/>
    </form>
    <ul className='flex gap-4 text-slate-700 font-bold '>
      <li className='hidden sm:inline hover:scale-105 hover:text-slate-500'><Link to={'/'}>Home</Link></li>
      <li className='hidden sm:inline hover:scale-105 hover:text-slate-500'><Link to={'/about'}>About</Link></li>
      <li className=' hover:scale-105 hover:text-slate-500'><Link to={'/signup'}>Sign-Up</Link></li>

    </ul>
    </div>
  
    </header>
  )
}

export default Header