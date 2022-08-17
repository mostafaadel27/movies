
import { Link, NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Nav({set,isLogin}) {
  
  const nav = useNavigate()
  
  function clear(){
   let z= localStorage.removeItem('token')
    nav('/login')
    set(null)
  }
  return (
    
    <>
    
    <nav className="navbar navbar-expand-lg  position-fixed w-100 sty  top-0 ">

  <div className="container ">
    <a className="navbar-brand text-danger" href="#"><span className='fw-bold fs-3'>Movie</span>Test</a>
    <button className="navbar-toggler text-danger" data-bs-toggle="collapse" data-bs-target="#navbar">
    <i className="fa-solid fa-bars"></i>
    </button>
    <div className="navbar-collapse collapse text-center" id="navbar">
      <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0 text-white">
        <li className="nav-item mx-2 fw-bold fs-6 text-white ">
        
          <NavLink style={({ isActive }) =>{return  {borderBottom: isActive ?' 3px solid #192847' : ''} }} className={isLogin!==null?"nav-link text-danger ":'nav-link text-danger disabled'} aria-current="page" to='home'>Treanding</NavLink>
        </li>
        <li className="nav-item mx-2 fw-bold fs-6">
          <NavLink style={({ isActive }) =>{return  { borderBottom: isActive ?' 3px solid #192847' : ''} }} className={isLogin!==null?"nav-link text-danger ":'nav-link text-danger disabled'} to='movies'>Movies</NavLink>
        </li>
        <li className="nav-item mx-2 fw-bold fs-6">
          <NavLink style={({ isActive }) =>{return  { borderBottom: isActive ?' 3px solid #192847' : ''} }} className={isLogin!==null?"nav-link text-danger ":'nav-link text-danger disabled'} to='tv_show'>Tv Show</NavLink>
        </li>
        <li className="nav-item mx-2 fw-bold fs-6">
          <NavLink style={({ isActive }) =>{return  { borderBottom: isActive ?' 3px solid #192847' : ''} }}  className={isLogin!==null?"nav-link text-danger ":'nav-link text-danger disabled'}  to='lastes'>Top Rated</NavLink>
        </li>
        <li className="nav-item mx-2 fw-bold fs-6">
          <NavLink style={({ isActive }) =>{return  { borderBottom: isActive ?' 3px solid #192847' : ''} }} className={isLogin!==null?"nav-link text-danger ":'nav-link text-danger disabled'}  to='popular'>Popular</NavLink>
        </li>
        
      {isLogin==null?
      <>
      <ul className='navbar-nav mx-5'>
        <li className="nav-item mx-2 fw-bold fs-6">
          <NavLink style={({ isActive }) =>{return  { borderBottom: isActive ?' 3px solid #192847' : ''} }} className="nav-link text-danger" to='/'>Sign Up</NavLink>
        </li>
        <li className="nav-item mx-2 fw-bold fs-6">
          <NavLink style={({ isActive }) =>{return  { borderBottom: isActive ?' 3px solid #192847' : ''} }} className="nav-link text-danger " to='login'>Log In</NavLink>
        </li>
      </ul>
      </>
      :<li className="nav-item mx-2 fw-bold fs-6">
      <a className="nav-link text-danger mx-5"  onClick={clear}>Log Out</a>
    </li>}
        
      </ul>
      
      
      
    </div>
  </div>
</nav>



    
    </>
    
  )
}
