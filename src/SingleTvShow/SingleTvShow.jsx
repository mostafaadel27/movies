import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Button from '@mui/material/Button';
import img2 from'../img/screen-0.jpg'
import {Typography} from '@mui/material'
import { Link } from 'react-router-dom'
export default function SingleTvShow() {
    let {id}= useParams();
    let [tvDetails,setTvDetails]=useState({})
    let [genres,setGenres]=useState({})
    let [poster,setPoster]=useState({})
    let [tvVideo,serTvVideos]=useState([])
    let [actors,setActors]=useState([])
    async function getDetails (){
        
        let {data}=await axios.get('https://api.themoviedb.org/3/tv/'+id+'?api_key=eba8b9a7199efdcb0ca1f96879b83c44')
        
        setTvDetails(data)
        setGenres(data.genres)
        setPoster(data.last_episode_to_air.still_path)
        
    }
    async function getvideos (){
        
        let {data}=await axios.get('https://api.themoviedb.org/3/tv/'+id+'/videos?api_key=eba8b9a7199efdcb0ca1f96879b83c44&page')
        
        
        serTvVideos(data.results)
        
    }


    let y= tvVideo.length-1
    
    function next_prev(next){
        let frame =document.getElementById('video')
        
        if(next===true){
            if(y >0){
                y-=1
                let n =frame.src='https://www.youtube.com/embed/'+tvVideo[y].key
            }
            
        }else{
            if(y<tvVideo.length-1){
                y+=1
                
                let p =frame.src='https://www.youtube.com/embed/'+tvVideo[y].key
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
    async function getactor (){
        
        let {data}=await axios.get('https://api.themoviedb.org/3/tv/'+id+'/credits?api_key=eba8b9a7199efdcb0ca1f96879b83c44&page')
        
        setActors(data.cast)
        
    }










    useEffect(()=>{
        getDetails ()
        getvideos ()
        getactor ()
    },[])
    
  return (
    <>
    <div className='pof disaply' onClick={hiden}  id='togled'>
        <div >
        
        <iframe width="900" height="550" id ='video' disabled={true} src={tvVideo.length>0?"https://www.youtube.com/embed/"+tvVideo[tvVideo.length-1].key:''} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;fullscreen" ></iframe>
        
        <div onClick={(e)=>{next_prev(true); e.stopPropagation()}}><i className="fa-solid fa-arrow-left fs-1 fw-bold" ></i></div>
        <div  onClick={(e)=>{next_prev(false); e.stopPropagation()}}><i className="fa-solid fa-arrow-right fs-1 fw-bold"></i></div>
        
        </div>
    
    <div>
    
    </div>
    
    </div>
    <div className="background-image vh-100" style={{backgroundImage:`url(${(poster!==null && poster.still_path!==undefined)?'https://image.tmdb.org/t/p/original/'+poster.still_path:'https://image.tmdb.org/t/p/original/'+tvDetails.backdrop_path} )`}}>
        <div className="layer"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className='poster'>
                        
                        <img className='w-100 rounded-3' src={'https://image.tmdb.org/t/p/original'+tvDetails.poster_path} alt="" />
                              
                    
                              
                    </div>
                </div>
                <div className="col-md-8 ">
                          <div className=' w-100 mx-4 rounded-3    py-3'>
                              <h2 className='mb-2 '>{tvDetails.name}</h2>
                              <p className='p-4 fs-5'>{tvDetails.overview}</p>
                              {genres.length>0? genres.map((category,i)=>{
                                  return <h6 key={i} className='d-inline-block me-3 ms-2 text-wh border border-info p-2 my-2 rounded-3'>{category.name}</h6>
                              }):''}
                             <Button variant="text" size="medium" disableElevation className='text-danger d-block my-4 mx-0' onClick={show}><i className="fa-brands fa-youtube fs-1 "></i></Button> 
                          </div>
                      </div>
            </div>
        </div>
    </div>
    <div className="container">
        <div className="row">
        {actors.map((person,i)=>{
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
