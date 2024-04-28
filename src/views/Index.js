import React, { useState } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import '../w3.css'
import url from '../url'
import Switch from '@mui/material/Switch';
import BasicElements from "./index-sections/BasicElements.js";
import Tabs from "./index-sections/Tabs.js";
import Carousel from "./index-sections/Carousel.js";
import TangaUbutumwa from "./index-sections/TangaUbutumwa";
import AccountAvatar from "./index-sections/AccountAvatar.js";

function Index() {
  const  getCookie=()=> {
    let name = 'language' + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const [language,setLanguage]=useState(getCookie()==''?'Kinya':getCookie());
  const [login,setLogin]=useState(false)
  const [closed,setClosed]=useState(false)
  const [checkeed,setCheckeed]=useState(true)
  const [services,setServices]=useState()
  const [monetize,setMonetize]=useState()
  const [photos,setPhotos]=useState()
  const [user,setUser]=useState({});
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  function setCookie( cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (360 * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = "language" + "=" + cvalue + ";" + expires ;
  }
  function handleChange (){
    setCheckeed(!checkeed)
    if(language=='Kinya'){
      setLanguage('Eng');
      setCookie('Eng');
    }else{
      setLanguage('Kinya');
      setCookie('Kinya');
    }
  }

 function closePopup (){
  setCookie('Kinya');
  setClosed(!closed)
 }

  React.useEffect(() => {
    const getCookie=(cname)=>{
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    const FetchUser=(async ()=>{
      const response = await fetch(`https://${url}/user`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          //  'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({a121200909:getCookie('121200909')}) // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      const userResponce = await response.json();
      if(userResponce){
        if(userResponce.loginStatus!=='not logged In'){
          setLogin(true);
          setUser(userResponce)
       }
      }
      
   
     })()
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  },[]);
  return (
    <>
      <IndexNavbar  services={services} photos={photos} monetize={monetize}  login={login} user={user} language={language}/>
      <div className="wrapper">
        <IndexHeader user={user}  language={language}/>
        <div className="main">
          <BasicElements setServices={setServices}  login={login} user={user} language={language} />
          <Tabs setMonetize={setMonetize}  login={login} user={user}  language={language}/>
          <Carousel setPhotos={setPhotos} login={login} user={user}  language={language}/>
          <TangaUbutumwa login={login} user={user}  language={language} />
          <AccountAvatar login={login} user={user}  language={language}/>
        </div>
        <div style={getCookie()==''||closed?{display:"block"}:{display:"none"}} className="w3-modal">
          <div style={window.innerWidth>900?{width:'40%',backgroundColor:'#1d91c7',color:'white',marginTop:'10%'}:{width:'40%',backgroundColor:'#1d91c7',color:'white',marginTop:'40%'}} className="w3-modal-content w3-card w3-round w3-padding w3-animate-opacity">
          <center><img style={{width:'40%'}} src={require("assets/img/LongLogo.avif")} alt="logo"/></center>
          <center><h5>Murakaza neza .... You are welcome</h5></center>
          <center>English <Switch  onChange={handleChange} {...label} checked={checkeed} color="default"/> Kinyarwanda</center>
          <center><p style={{fontSize:'15px'}}>If you preffer the defaul language selected, <a onClick={closePopup} style={{color:'red',cursor:'pointer'}}>close</a> this popup</p></center>
          <center><p style={{fontSize:'15px'}}>Niba ukunze ururimi taguhitiyemo kanda <a   onClick={closePopup}style={{color:'red',cursor:'pointer'}}>aha</a> gufunga</p></center>
          </div>
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
