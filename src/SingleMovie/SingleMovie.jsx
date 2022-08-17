import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Button from '@mui/material/Button';
import img2 from'../img/screen-0.jpg'
import {Typography} from '@mui/material'

export default function SingleMovie() {

    
    let [filmDetails,setFilmDetails]=useState({})
    let [poster,setPoster]=useState({})
    let [filmVideo,serFilmVideos]=useState([])
    let [actors,setActors]=useState([])
    let [genres,serGenres]=useState({})
    let {id}= useParams();
    async function getDetails (){
        
        let {data}=await axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=eba8b9a7199efdcb0ca1f96879b83c44')
        setFilmDetails(data)
        serGenres(data.genres)
        setPoster(data.belongs_to_collection)
        
    }
    async function getactor (){
        
        let {data}=await axios.get('https://api.themoviedb.org/3/movie/'+id+'/credits?api_key=eba8b9a7199efdcb0ca1f96879b83c44&page')
        
        setActors(data.cast)
        
    }
    async function getvideos (){
        
        let {data}=await axios.get('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=eba8b9a7199efdcb0ca1f96879b83c44&page')
        
        
        serFilmVideos(data.results)
        
    }
    let y= filmVideo.length-1
    
    function next_prev(next){
        let frame =document.getElementById('video')
        
        if(next===true){
            if(y >0){
                y-=1
                let n =frame.src='https://www.youtube.com/embed/'+filmVideo[y].key
            }
            
        }else{
            if(y<filmVideo.length-1){
                y+=1
                
                let p =frame.src='https://www.youtube.com/embed/'+filmVideo[y].key
            }
        }
        
    }
    function hiden(){
        let togle=document.getElementById('togled')
        togle.classList.add('disaply')
        let i =document.getElementById('video').src;
        let k =document.getElementById('video').src =''
            k =document.getElementById('video').src =i

    }
    function show(){
        let togle=document.getElementById('togled')
        togle.classList.remove('disaply')

    }
    
    
    useEffect(()=>{
        getDetails ()
        getvideos ()
        getactor ()
        
    },[])
    
    

  return (
    <>
    
    <div className='pof disaply' onClick={hiden}  id='togled'>
        <div>
        
        <iframe width="900" height="550" id ='video' disabled={true} src={filmVideo.length>0?"https://www.youtube.com/embed/"+filmVideo[filmVideo.length-1].key:''} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;fullscreen" ></iframe>
        
        
        
        </div>
        <div className='pos'>
        <div onClick={(e)=>{next_prev(true); e.stopPropagation()}}><i className="fa-solid fa-arrow-left fs-1 fw-bold" ></i></div>
        <div  onClick={(e)=>{next_prev(false); e.stopPropagation()}}><i className="fa-solid fa-arrow-right fs-1 fw-bold"></i></div>
        </div>
    
    <div>
    
    </div>
    
    </div>
    <div className="background-image vh-100" style={{backgroundImage:`url(${(poster!==null && poster.backdrop_path!==null)?'https://image.tmdb.org/t/p/original/'+poster.backdrop_path:'https://image.tmdb.org/t/p/original/'+filmDetails.backdrop_path} )`}}>
        <div className="layer"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className='poster'>
                        <div className='image'>
                        <img className='w-100 rounded-3' src={'https://image.tmdb.org/t/p/original'+filmDetails.poster_path} alt="" />
                        </div>
                        
                              
                    
                              
                    </div>
                </div>
                <div className="col-md-8 ">
                          <div className=' w-100 mx-4 rounded-3 text   py-3'>
                              <h2 className='mb-2 '>{filmDetails.title}</h2>
                              <p className='p-4 fs-5 overview'>{filmDetails.overview}</p>
                              {genres.length>0? genres.map((category ,i)=>{
                                  return <h6 key={i} className=' category d-inline-block me-3 ms-2 text-wh border border-info p-2 my-2 rounded-3'>{category.name}</h6>
                              }):''}
                             <Button variant="text" size="medium" disableElevation className='text-danger d-block my-4 mx-0' onClick={show}><i className="fa-brands fa-youtube fs-1 "></i></Button> 
                          </div>
                      </div>
            </div>
        </div>
    </div>
    <div className="container">
        <div className="row">
        {actors.map((person , i)=>{
          return <div className="col-md-3 h-100" key={i}>
          <div className="card my-3" >
            <img src={person.profile_path!==null?'https://image.tmdb.org/t/p/original/'+person.profile_path:img2} className="card-img-top h-auto" alt="..."/>
            <div className="card-body py-4">
              <Typography variant='h5'  className="card-text text-dark m-0" noWrap={true}>{person.name}</Typography>
              
            </div>
          </div>
        </div>
        })}
        </div>
    </div>
    </>
  )
}
