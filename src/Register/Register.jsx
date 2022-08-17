import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
export default function Register() {

  const nav = useNavigate()
    const [values, setValues] = React.useState({
        
        password: '',
        
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    let [User ,SetUset]=useState({
    first_name:"",
    last_name:"" ,
    email:"",
    password:"",
    age:""
   })
   let[flag ,setFlag]=useState(false)
   let[msg ,setmsg]=useState([])
   let[errorMsg ,seErrortMsg]=useState([])
   
   function addUser(e){
    let deepArr={...User}
    
    deepArr[e.target.name]=e.target.value
    SetUset(deepArr)
    
   }
   async function sedData(e){
    e.preventDefault()
    

    if(ValUser()==true){
      setFlag(true)
      let {data} =await axios.post('https://route-egypt-api.herokuapp.com/signup',User)
      
      
      if(data.message=='success'){
        nav('/login')
      }else{
        setmsg(data.message)
      }
      
      setFlag(false)
      if(data.message.includes('citizen validation failed: email: email already registered')){
        setmsg('Email Already Registered')
    }
    }
    
    
    
    
        
        
      
   }


   function ValUser(){
    let rules =Joi.object({
      first_name:Joi.string().alphanum().min(3).max(15).required(),
      last_name:Joi.string().alphanum().min(3).max(15).required() ,
      email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','org','eg','net']}}).required(),
      password:Joi.string().pattern(/^[A-Z]/).required(),
      age:Joi.number().min(15).max(80).integer().required()
    })
    
    
    let x =rules.validate(User,{abortEarly:false})
    
    if(x.error!==undefined){
      seErrortMsg(x.error.details)
      return false
    }else{
      return true
    }
    
   }



   
  return (
    <>

    
    <div className="container p-5 my-5 ">
    
    <h2 className='text-white mt-5 m-0 p-3 bg-dark rounded-3'>Registeration Form</h2>
        <form onSubmit={(event)=>{sedData(event)}} className='p-5 rounded-3 form'>
        
            <TextField id="outlined-basic" className='my-3'  onChange={(event)=>{addUser(event)}} name='first_name' label="First Name" variant="outlined" />
            {errorMsg.length>0? errorMsg.map((error,i)=>{
              if(error.message.includes('first_name')){
                if(error.message.includes('alpha-numeric')){
                  error.message='First Name Contains Characters Only'
                }
                return <p className='d-block text-danger fw-bold'key={i}>{error.message}</p>
              }
            
            }):''}
            <TextField id="outlined-basic" className='my-3' onChange={(event)=>{addUser(event)}} name='last_name' label="Last Name" variant="outlined" />
            {errorMsg.length>0? errorMsg.map((error,i)=>{
              if(error.message.includes('last_name')){
                if(error.message.includes('alpha-numeric')){
                  error.message='Last Name Contains Characters Only'
                }
                return <p className='d-block text-danger fw-bold' key={i}>{error.message}</p>
              }
            
            }):''}
            <TextField id="outlined-basic" className='my-3' onChange={(event)=>{addUser(event)}} name='email' label="Email" variant="outlined" />
            {errorMsg.length>0? errorMsg.map((error,i)=>{
              if(error.message.includes('email')){
                
                return <p className='d-block text-danger fw-bold' key={i}>{error.message}</p>
              }
            
            }):''}
            <TextField id="outlined-basic" className='my-3' onChange={(event)=>{addUser(event)}} name='age' label="Age" variant="outlined" />
            {errorMsg.length>0? errorMsg.map((error,i)=>{
              if(error.message.includes('age')){
                return <p className='d-block text-danger fw-bold' key={i}>{error.message}</p>
              }
            
            }):''}
            <FormControl className='my-3'   variant="outlined" >
                
          <InputLabel  htmlFor="outlined-adornment-password">Password</InputLabel>
          
          <OutlinedInput 
          
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onKeyUp={(event)=>{addUser(event)}}
            onChange={handleChange('password') }
            endAdornment={
                
              <InputAdornment   position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  
                  
                >
                  
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                
              </InputAdornment>
            }
            
            label="Password"
            name='password'
            
          />
          {errorMsg.length>0? errorMsg.map((error,i)=>{
              if(error.message.includes('password')){
                return <p className='d-block text-danger my-3 fw-bold' key={i}>{error.message}</p>
              }
            
            }):''}
            
        </FormControl >
        <Button type='submit' className='btn btn-info px-3 py-2 fw-bold fs-6' variant="outlined"  > Submit &nbsp;
        {flag ==true? <div><i className="fa-solid fa-spinner fa-spin-pulse"></i></div>: <SendIcon />}
        </Button>
           
        </form>
        {msg=='Failed'?<h2 className='text-danger my-3'>{msg}</h2>:<h2 className='text-success my-3'>{msg}</h2>}
    </div>
    </>
    
  )
}
