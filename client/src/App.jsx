import { useState } from 'react'
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import UserProfile from './pages/UserProfile'
import Header from './components/Header'
import PrivateRout from './components/PrivateRout'
import SignPrivateRout from './components/SignPrivateRout'
import CreateListing from './pages/CreateListing'
import ShowListing from './pages/ShowListing'
import ShowAllListing from './pages/ShowAllListing'
import EditSingleListing from './pages/EditSingleListing'
import SearchListing from './pages/SearchListing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/listing' element={<ShowAllListing/>} />
      <Route path='/showlisting/:id' element={<ShowListing/>} />
      <Route path='/search' element={<SearchListing/>}/>
      <Route element={<SignPrivateRout/>}>
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      </Route>
      <Route element={<PrivateRout/>}>
      <Route path='/profile' element={<UserProfile/>} />
      <Route path='/createlisting' element={<CreateListing/>} />
      <Route path='/editsinglelisting/:id' element={<EditSingleListing/>} />

      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
