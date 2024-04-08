import React, { useRef, useState } from "react";
import '../../w3.css'
import { Link } from "react-router-dom";
function AccountAvatar({login,language,user}) {
  const [scrollRef,setScrollRef]=useState(false)
  window.onscroll=(e)=>{
    setTimeout(()=>{
         if(window.scrollY<750){
      setScrollRef(false)
    }else{
       setScrollRef(true)
    }
    },4000)
 
  }

  return (
    <div  style={window.innerWidth > 900?{position:'fixed',bottom:'4%',width:'fit-content',left:'90%',textAlign:'center',backgroundColor:'rgb(0,0,0,0)',cursor:'pointer'}:{position:'fixed',bottom:'1%',width:'fit-content',left:'80%',textAlign:'center',backgroundColor:'rgb(0,0,0,0)',cursor:'pointer'}}>
     {user.userName?<div className={scrollRef?'w3-animate-right':'w3-hide'}>
       <Link to={'/profile-page'}>
      <div className="w3-animate-bubbble" style={window.innerWidth > 900?{width:'100%',aspectRatio:'1/1',color:'white',fontSize:'40px',margin:'6%',fontFamily:'cursive',backgroundColor:'#0274A8'}:{width:'100%',fontSize:'40px',margin:'6%',color:'white',aspectRatio:'1/1',fontFamily:'cursive',backgroundColor:'#0274A8'}} >{user.userName.slice(0,1)}</div>
      </Link>
      <p  style={window.innerWidth > 900?{fontWeight:'bolder',fontSize:'15px',color:'#003C57'}:{display:'none'}}><b>{user.userName.slice(0,8)}</b></p>
      </div>:<div className={scrollRef?'w3-animate-right':'w3-hide'}>
       <Link to={'/login-page'}>
      <img className="w3-animate-bubbble"  style={window.innerWidth > 900?{width:'50%',aspectRatio:'1/1'}:{width:'50%',aspectRatio:'1/1'}}  src={require('../../assets/img/default-avatar.png')}/>
      </Link>
      <p  style={window.innerWidth > 900?{fontWeight:'bolder',color:'#003C57'}:{display:'none'}}><b>{language?"My Account":"Konti yange"}</b></p>
      </div>}
    </div>
  );
}

export default AccountAvatar;
