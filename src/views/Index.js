import React, { useState } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import '../w3.css'
import BasicElements from "./index-sections/BasicElements.js";
import Tabs from "./index-sections/Tabs.js";
import Carousel from "./index-sections/Carousel.js";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
import TangaUbutumwa from "./index-sections/TangaUbutumwa";
import AccountAvatar from "./index-sections/AccountAvatar.js";

function Index() {
  const [language,setLanguage]=useState('Kinya');
  const [login,setLogin]=useState(false)
  const [user,setUser]=useState({})
  const changeLanguage=()=>{
    if(language=='Kinya'){
      setLanguage('Eng')
    }else{
      setLanguage('Kinya')
    }
  }
 
  React.useEffect(() => {
    const FetchUser=(async ()=>{
      const response = await fetch(`http://localhost:3000/user`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Credentials":true
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      const userResponce = await response.json();
      if(userResponce.loginStatus!=='not logged In'){
         setLogin(true);
         setUser(userResponce)
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
      <IndexNavbar login={login} user={user} language={language}/>
      <div className="wrapper">
        <IndexHeader login={login} user={user}  language={language}/>
        <div className="main">
          <BasicElements login={login} user={user} language={language} />
          <Tabs  login={login} user={user}  language={language}/>
          <Carousel login={login} user={user}  language={language}/>
          <TangaUbutumwa login={login} user={user}  language={language} />
          <AccountAvatar login={login} user={user}  language={language}/>
        </div>
      
        <DarkFooter />
      </div>
    </>
  );
}

export default Index;
