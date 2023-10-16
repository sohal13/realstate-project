import { useState } from 'react'
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Signout from './pages/Signout'
import Signin from './pages/Signin'
import UserProfile from './pages/UserProfile'
import Header from './components/Header'
import PrivateRout from './components/PrivateRout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/signout' element={<Signout/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route element={<PrivateRout/>}>
      <Route path='/profile' element={<UserProfile/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
