import logo from './logo.svg';
import './App.css';
import Nav from './NavBar/Nav';
import Home from './Home/Home';
import { Routes, Route} from "react-router-dom";
import Movie from './Movie/Movie';
import TvShow from './Tv_Show/TvShow';
import SingleMovie from './SingleMovie/SingleMovie';
import Register from './Register/Register';
import Login from './Login/LogIn';
import { useEffect, useState } from 'react';
import Protectedroute from './protectedroute/Protectedroute';
import SingleTvShow from './SingleTvShow/SingleTvShow';
import TopRated from './TopRated/TopRated';
import Popular from './Popular/Popular';
import { useNavigate } from 'react-router-dom';
function App() {
  const nav = useNavigate()
  let[isLogin,setLogin]=useState(null)
  function check(){
    
     let token= localStorage.getItem('token')
     setLogin(token)

  }
  useEffect(()=>{
    let log =localStorage.getItem('token')
    setLogin(log) 
    
    
    
},[isLogin])

  
  return (
    
    <>
    
    <Nav set={setLogin} isLogin={isLogin}/>
    
   
    { <Routes>
      <Route path='home' element={<Protectedroute><Home/></Protectedroute> }/>
      <Route path='movies' element={<Protectedroute><Movie/></Protectedroute> }/>
      <Route path='tv_show' element={<Protectedroute><TvShow/></Protectedroute>}/>
      <Route path='singlemovie/:id' element={<Protectedroute><SingleMovie/></Protectedroute>}/>
      <Route path='singletvshow/:id' element={<Protectedroute><SingleTvShow/></Protectedroute>}/>
      <Route path='/' element={<Register/>}/>
      <Route path='login' element={<Login   login={check}/>}/>
      <Route path='lastes' element={<Protectedroute><TopRated/></Protectedroute>}/>
      <Route path='popular' element={<Protectedroute><Popular/></Protectedroute>}/>
    </Routes> } 

   
    </>
    
      
      
    
  );
}

export default App;

























