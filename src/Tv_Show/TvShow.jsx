import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

import img2 from'../img/screen-0.jpg'
import {Typography} from '@mui/material'
import {Pagination} from '@mui/material';
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
export default function TvShow() {
    let [trendtv ,setTrendtv] = useState([])
    const [page ,setpage] = useState(1)
    const [fiterVal ,setFilterVal] = useState('')
    const [totalPages ,setTotalPages] = useState()
    const [SortName ,setSortName] = useState('Defult')
    const [searchData ,setShearcData] = useState([])
    async function getData(){
        let {data}=await axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&page='+parseInt(page))
        let tvData=data.results
        let total =data.total_pages
        setTrendtv(tvData)
        setTotalPages(total)
        setShearcData(data.results)
      }
      function sortVote(c,d){
        let arr=[...trendtv]
        arr.sort((a, b)=>{return a.vote_average > b.vote_average ? c : d}).map((item)=>{
          return{item}
        })
        
        setTrendtv(arr)
        
      }
      function search(e){
        if(e.target.value==''){
          setTrendtv(searchData)
        }else{
         let x= searchData.filter(item=>item.name.toLowerCase().includes(e.target.value.toLowerCase()))
         setTrendtv(x)
        }
        setFilterVal(e.target.value)
      }
      function sortTitle(c,d){
        let arr=[...trendtv]
        arr.sort((a, b)=>{return a.name > b.name ? c : d}).map((item)=>{
          return{item}
        })
        
        setTrendtv(arr)
      }
       
      useEffect(()=>{
        getData()
      },[page])
      
  const handleChange = (event, value) => {
    
    setpage(value);
  };


  
  return (
    <>
    
    <div className="container-fluid pt-5 my-5 px-5">
      <div className="header my-5 mt-5 pt-5">
      <FormControl variant="standard" onInput={(value)=>{search(value)}} >
        <InputLabel htmlFor="input-with-icon-adornment" className='text-danger'>
          Search
        </InputLabel>
        <Input 
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon className='text-danger' />
            </InputAdornment>
          }
        />
      </FormControl>
      
      </div>
      <div className='sort p-4'>
        <h4 className='text-danger mx-3'>Sort By: </h4>
      <Dropdown  variant="dark" >
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="dark" style={{paddingRight:'50px'}} className='dropdown-toggle'>
        {SortName}
      </Dropdown.Toggle>

      <Dropdown.Menu variant="Danger" >
      <Dropdown.Item onClick={()=>{getData();setSortName('Defult')}}>Defult</Dropdown.Item>
        <Dropdown.Item  onClick={()=>{sortVote(-1,1);setSortName('Rate (High > Low)')}}> Rate (High > Low)</Dropdown.Item>
        <Dropdown.Item onClick={()=>{sortVote(1,-1);setSortName('Rate (Low > Higt)')}}>Rate (Low > Higt)</Dropdown.Item>
        <Dropdown.Item onClick={()=>{sortTitle(1,-1);setSortName('Name (A - Z)')}}>Name (A - Z)</Dropdown.Item>
        <Dropdown.Item onClick={()=>{sortTitle(-1,1);setSortName('Name (Z - A)')}}>Name (Z - A)</Dropdown.Item>
        
        
      </Dropdown.Menu>
    </Dropdown>
      
      </div>
      <div className="row ">

        {trendtv.map((tv , i)=>{
          return <div className="col-md-3" key={i}>
            <Link to={'/singletvshow/'+tv.id}>
            
            <div className="card my-3" >
            <img src={tv.poster_path !== null?'https://image.tmdb.org/t/p/original/'+tv.poster_path:img2}  className="card-img-top" alt="..."/>

            <div className="card-body py-4">

              <Typography variant='h5'  className="card-text text-dark m-0" noWrap={true}>{tv.name}</Typography>
              <p className='rate text-dark ms-4 text-center  fw-bold border border-info p-2 rounded-2'>{tv.vote_average.toFixed(1)}</p>
            </div>
          </div>
            </Link>
          
        </div>
        })}
        <div className='d-flex justify-content-center  pt-5'>
        <Pagination count={totalPages}  component='h2'  color='error' size="large"  showFirstButton showLastButton page={page} onChange={handleChange} />
        </div>
        
      </div>
      
    </div>
    </>
  )
}
