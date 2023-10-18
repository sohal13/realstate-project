import { useState } from 'react'
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import UserProfile from './pages/UserProfile'
import Header from './components/Header'
import PrivateRout from './components/PrivateRout'
import SignPrivateRout from './components/signPrivateRout'
import CreateListing from './pages/CreateListing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route element={<SignPrivateRout/>}>
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      </Route>
      <Route element={<PrivateRout/>}>
      <Route path='/profile' element={<UserProfile/>} />
      <Route path='/createlisting' element={<CreateListing/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
