import axios from 'axios'
import React, { useEffect, useState } from 'react'

import img2 from'../img/screen-0.jpg'
import {Typography} from '@mui/material'
import {Link} from'react-router-dom'
export default function Home() {
    const [trendfilm ,setTrendfilm] = useState([])
    const [trendtv ,setTrendtv] = useState([])
    const [trendperson ,setperson] = useState([])
    async function getData(media,setFun){
      let {data}=await axios.get('https://api.themoviedb.org/3/trending/'+media+'/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44')
      let movieData=data.results
      
      
      setFun(movieData)
    }
    useEffect(()=>{
      getData('movie',setTrendfilm)
      getData('tv',setTrendtv)
      getData('person',setperson)
      

    },[])
    

  return (
    <>
        
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <div className="layer"></div>
    <img src={trendfilm.length>0? 'https://image.tmdb.org/t/p/original/'+trendfilm[0].backdrop_path:''} className="d-block w-100" alt="..."/>
      <div className='info'>
        <h2 className='mx-3'>{trendfilm.length>0?trendfilm[0].title:''}</h2>
        
        <p className='mx-3 border border-danger rounded-3 p-2 my-3 fs-5 fw-bold'>{trendfilm.length>0?trendfilm[0].media_type.toUpperCase():''}</p>
      </div>
    </div>
    <div className="carousel-item">
      <div className="layer"></div>
    <img src={trendtv.length>0? 'https://image.tmdb.org/t/p/original/'+trendtv[0].backdrop_path:''} className="d-block w-100" alt="..."/>
    <div className='info'>
        <h2 className='mx-3'>{trendtv.length>0?trendtv[0].original_name:''}</h2>
        
        <p className='mx-3 border border-danger rounded-3 p-2 my-3 fs-5 fw-bold'>{trendtv.length>0?trendtv[0].media_type.toUpperCase():''}</p>
      </div>
    </div>
    <div className="carousel-item">
      <div className="layer"></div>
    <img src={trendfilm.length>0? 'https://image.tmdb.org/t/p/original/'+trendfilm[1].backdrop_path:''} className="d-block w-100" alt="..."/>
    <div className='info'>
        <h2 className='mx-3'>{trendfilm.length>0?trendfilm[1].title:''}</h2>
        
        <p className='mx-3 border border-danger rounded-3 p-2 my-3 fs-5 fw-bold'>{trendfilm.length>0?trendfilm[1].media_type.toUpperCase():''}</p>
      </div>
    </div>
    <div className="carousel-item">
      <div className="layer"></div>
    <img src={trendtv.length>0? 'https://image.tmdb.org/t/p/original/'+trendtv[1].backdrop_path:''} className="d-block w-100" alt="..."/>
    <div className='info'>
        <h2 className='mx-3'>{trendtv.length>0?trendtv[1].original_name:''}</h2>
        
        <p className='mx-3 border border-danger rounded-3 p-2 my-3 fs-5 fw-bold'>{trendtv.length>0?trendtv[1].media_type.toUpperCase():''}</p>
      </div>
    </div>
    <div className="carousel-item">
      <div className="layer"></div>
    <img src={trendfilm.length>0? 'https://image.tmdb.org/t/p/original/'+trendfilm[2].backdrop_path:''} className="d-block w-100" alt="..."/>
    <div className='info'>
        <h2 className='mx-3'>{trendfilm.length>0?trendfilm[2].title:''}</h2>
        
        <p className='mx-3 border border-danger rounded-3 p-2 my-3 fs-5 fw-bold'>{trendfilm.length>0?trendfilm[2].media_type.toUpperCase():''}</p>
      </div>
    </div>
    <div className="carousel-item">
      <div className="layer"></div>
    <img src={trendtv.length>0? 'https://image.tmdb.org/t/p/original/'+trendtv[2].backdrop_path:''} className="d-block w-100" alt="..."/>
    <div className='info'>
        <h2 className='mx-3'>{trendtv.length>0?trendtv[0].original_name:'' }</h2>
        
        <p className='mx-3 border border-danger rounded-3 p-2 my-3 fs-5 fw-bold'>{trendtv.length>0?trendtv[2].media_type.toUpperCase():''}</p>
      </div>
    </div>
  </div>
  
</div>

    <div className="container-fluid mt-5  my-5 px-5">
      <div className="header my-5">
      <i className="fa-solid fa-film text-danger fw-bold text-center fs-4 mx-3"></i>
      <h2 className='m-0 text-dark'>Treanding Movie</h2>
      
      </div>
      
      <div className="row">
        {trendfilm.slice(0,8).map((film,i)=>{
          
          return <div className="col-md-3" key={i}>
          <Link to={'/singlemovie/'+film.id}>
          <div className="card my-3">
            <img src={'https://image.tmdb.org/t/p/original/'+film.poster_path} className="card-img-top" alt="..."/>
            <div className="card-body py-4">
              <Typography variant='h5'  className="card-text text-dark m-0" noWrap={true}>{film.title}</Typography>
              <p className='rate text-dark ms-4 text-center  fw-bold border border-info p-2 rounded-2'>{film.vote_average.toFixed(1)}</p>
            </div>
          </div>
          </Link>
        </div>
        })}
        
      </div>
      <div className="bord"></div>
    </div>

    <div className="container-fluid  my-5 px-5">
      <div className="header my-5">
      <i className="fa-solid fa-tv text-danger fw-bold text-center fs-4 mx-3"></i>
      
      <h2 className='m-0 text-dark'>Treanding Tv Show</h2>
      
      </div>
      
      <div className="row">
        {trendtv.slice(0,8).map((tv,i)=>{

          return <div className="col-md-3" key={i}>
            <Link to={'/singletvshow/'+tv.id}>
          <div className="card my-3">
            <img src={'https://image.tmdb.org/t/p/original/'+tv.poster_path} className="card-img-top" alt="..."/>
            <div className="card-body py-4">
              <Typography variant='h5'  className="card-text text-dark m-0" noWrap={true}>{tv.name}</Typography>
              <p className='rate text-dark ms-4 text-center  fw-bold border border-info p-2 rounded-2'>{tv.vote_average.toFixed(1)}</p>
            </div>
          </div>
          </Link>
        </div>
        })}
        
      </div>
      
    </div>
    
        
        
    </>
  )
}
