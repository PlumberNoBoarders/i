import React,{useState,useRef} from "react";
import MagicDropzone from "react-magic-dropzone";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import "../../w3.css";
import "./gridImages.css";
import url from '../../url'
import { Snackbar,Alert } from "@mui/material";
// core components
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import LandingPageHeader from "../../components/Headers/LandingPageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";


function LandingPage() {
  const [adverts,setAdverts]=useState('')
 
  const [modalIopen, setModalIopen] = React.useState(false);
  const [login, setLogin] = React.useState(true);
  const [user,setUser]=useState({})
  const [message,setMessage]=useState(<></>)
  const [gihamyaVideoFile,setGihamyaVideoFile]=React.useState('')
  const [proof,setProof]=useState({
    value: "image/jpeg, image/png,image/avif, .avif, .jpg, .jpeg, .png",
    previews: [].slice(0,1),
  })
  const [modalIopenOne, setModalIopenOne] = React.useState(false);
  const [gihamya, setGihamya] = React.useState(false);
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
  const getCookie2=(cname)=>{
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

  const [language,setLanguage]=React.useState(getCookie()==''?'Kinya':getCookie());
  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    })
  }
  const onDropBoq= (accepted, rejected, links) => {
    accepted = accepted.map((v) => v.preview);
    var newPreviews = [...proof.previews, ...accepted, ...links];
    setProof({
      previews: newPreviews,
    });
    setTimeout(()=>{
        newPreviews.map((v)=>{
          fetch(v).then(function(response) {
            return response.blob();
          }).then(function(myBlob) {
          var file = new File([myBlob], "name");
          blobToBase64(file).then((e)=>{
            setGihamyaVideoFile(e)
           })
        
          });
        })
    },100)
  };
  const finalGihamya= async()=>{
   const data ={"Pic":gihamyaVideoFile,'userName':user.userName,'phoneNumber':user.phoneNumber}

    const response = await fetch(`https://${url}/gihamya`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
   const Responce = await response.json();
   if(Responce['Message']=='proof uplaoded'){
    setTimeout(()=>{setProof({value:"video/mp4",previews:[]})},200)
    setMessage(<> 
      <Snackbar open={true} autoHideDuration={5000} onClose={()=>{setMessage(<></>)}}>
       <Alert
         onClose={setMessage(<></>)}
         severity="success"
         variant="filled"
         sx={{ width: '100%' }}
       >
       {Responce['Message']}
       </Alert>
     </Snackbar>
     </>);
  }else{
    setMessage(<> 
      <Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
       <Alert
         onClose={setMessage(<></>)}
         severity="error"
         variant="filled"
         sx={{ width: '100%' }}
       >
        {'The video was not uploaded'}
       </Alert>
     </Snackbar>
     </>)
  }
  }
  
  React.useEffect(() => {
    const FetchAdverts=(async ()=>{
      const response = await fetch(`https://${url}/getAdvert`, {
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
      const adResponce = await response.json();
      if(adResponce){
        console.log(adResponce)
        if(adResponce['adverts']){
          setAdverts(adResponce['adverts'])
       }
      }
      
   
     })()

     const FetchUser=(async ()=>{
      const response = await fetch(`https://${url}/user`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          //  'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({a121200909:getCookie2('121200909')}) // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      const userResponce = await response.json();
      if(userResponce){
        if(userResponce.loginStatus!=='not logged In'){
          setLogin(true);
          setUser(userResponce)
       }
      }
      
   
     })()
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <LandingPageHeader language={language} />
        <div id="First-Time">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            id="Video-section"
          >
            <div
              style={{ width: "100%", textAlign: "center" }}
              className="description"
            >
              <h4 style={{marginTop:'0%'}} className="title">
                {language == "Eng"
                  ? "This video will demonstrate how to upload proof"
                  : "Iyi video yerekana uko batatanga gihamya"}
              </h4>
            </div>
            <div
              style={
                window.innerWidth > 900
                  ? {
                      width: "27%",
                      aspectRatio: "1/1.5",
                      backgroundColor: "black",
                      marginBottom: "4%",
                      borderRadius:'5%'
                    }
                  : {
                      width: "80%",
                      marginBottom: "10%",
                      aspectRatio: "1/1.5",
                      backgroundColor: "black",
                      borderRadius:'5%'
                    }
              }
              className="w3-round"
            >
                            <iframe style={{height:'100%',width:'100%',borderRadius:'inherit'}} src="httpss://www.youtube.com/embed/KHtJcZgRTdc?si=fcCTSO_1BtmwKMlR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
          </div>
        </div>
        <div style={window.innerWidth > 900?{backgroundColor:'#0274A8',position:'fixed',color:'white',padding:'1%',bottom:'5%',left:'2%',height:'50px',borderRadius:'10px',cursor:'pointer'}:{backgroundColor:'#0274A8',position:'fixed',color:'white',padding:'3%',bottom:'5%',left:'2%',height:'50px',borderRadius:'10px',cursor:'pointer'}} onClick={()=>{setModalIopenOne(!modalIopenOne)}} className="w3-card">
        {window.innerWidth>900?language == "Eng"
                      ? 'Check your perfomance'
                      : "Aho ugejeje":<i class="fa-solid fa-money-bill-transfer"></i>}
        </div>
        <div style={window.innerWidth > 900?{backgroundColor:'#1ba802',position:'fixed',color:'white',padding:'1%',bottom:'5%',right:'2%',height:'50px',borderRadius:'10px',cursor:'pointer'}:{backgroundColor:'#1ba802',position:'fixed',color:'white',padding:'3%',bottom:'5%',right:'2%',height:'50px',borderRadius:'10px',cursor:'pointer'}} onClick={()=>{setGihamya(!gihamya)}} className="w3-card">
        {window.innerWidth>900?language == "Eng"
                      ? 'Upload the proof'
                      : "Kanda hano gutanga gihamya":<i class="fa-solid fa-file-arrow-up"></i>}
        </div>
        <div
          id="pictures"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <h4 className="title" style={{ width: "100%", textAlign: "center" }}>
            {language == "Eng"
              ? "Choose adverts in the followings"
              : "Hitamo muraya akurikira"}
          </h4>
         {adverts!==''?adverts.map((advert)=>(<>
          <div
            style={
              window.innerWidth > 900
                ? { width: "16%", aspectRatio: "1/1.5", borderRadius: "20px" }
                : { borderRadius: "30px", width: "80%", aspectRatio: "1/1.5" }
            }
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "inherit",
                padding: "5%",
              }}
              src={'https://'+url+advert.advertUrl}
            />

            {window.innerWidth > 900 ? (
              <div className="hoverToactivite">
                <i className="fa-solid fa-circle-down" onClick={()=>{window.open('https://'+url+advert.advertUrl)}} title="download"></i>{" "}
                <i
                  className="fa-solid fa-tv"
                  onClick={() => setModalIopen(!modalIopen)}
                  title="Expand"
                ></i>
              </div>
            ) : (
              <div className="hoverToactiviteMobile">
                <i className="fa-solid fa-circle-down" onClick={()=>{window.open('https://'+url+advert.advertUrl)}}  title="download"></i>{" "}
                <i
                  className="fa-solid fa-tv"
                  onClick={() => setModalIopen(!modalIopen)}
                  title="Expand"
                ></i>
              </div>
            )}
          </div>
          <div
            style={modalIopen ? { display: "block" } : { display: "none" }}
            className="w3-modal"
          >
            <span
              onClick={() => {
                setModalIopen(!modalIopen);
              }}
              style={
                window.innerWidth > 900
                  ? {
                      padding: "1%",
                      margin: "2%",
                      fontSize: "25px",
                      color: "white",
                    }
                  : {
                      padding: "5%",
                      fontSize: "25px",
                      margin: "1%",
                      color: "white",
                    }
              }
              className="w3-hover-red w3-circle"
            >
              <b>&times;</b>
            </span>
            <div
              className="w3-modal-content w3-animate-zoom "
              style={{ width: "50%" }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "inherit",
                }}
                src={'https://'+url+advert.advertUrl}
              />
            </div>
          </div>
          </>)):<></>}
          <div style={modalIopenOne?{ display: "block" }:{ display:'none'}} className="w3-modal">
            <div
              className="w3-modal-content w3-animate-zoom "
              style={{ width: "100%",marginTop:'-8%',backgroundColor:'#1d9cf000' }}
            >
                  <span
              onClick={() => {
                setModalIopenOne(!modalIopenOne);
              }}
              style={
                window.innerWidth > 900
                  ? {
                      padding: "1%",
                      margin: "1%",
                      marginTop: "-40%",
                      fontSize: "25px",
                      color: "white",
                    }
                  : {
                      padding: "5%",
                      fontSize: "25px",
                      margin: "1%",
                      color: "white",
                    }
              }
              className="w3-hover-red w3-circle"
            >
              <b>&times;</b>
            </span>
              <div className="container">

                {user&&user.Alegible_For_Growth_Program==true?<><div  style={window.innerWidth > 900?{width:'100%'}:{}} className="panel post">
                  <a >
                    <span style={window.innerWidth < 900?{fontSize:'50px'}:{}}>{user&&user.Whatsapp*170} <b style={window.innerWidth > 900?{fontSize:'50px'}:{fontSize:'20px'}}> RWF</b></span> <span style={window.innerWidth < 900?{fontSize:'18px',marginTop:'-10%'}:{fontSize:'18px',marginTop:'-5%'}}>Available on first next month</span>
                  </a>
                </div>
                <div style={window.innerWidth > 900?{width:'100%',textAlign:'center'}:{}} className="panel page">
                  <a >
                    <span>{user&&user.Whatsapp}</span>tsapp status days
                  </a>
                </div></>:<>
                <div style={window.innerWidth > 900?{width:'100%',height:'20%',textAlign:'center'}:{}} className="panel user">
                  <a >
                  Twifuzaga kubamenya . <br/><br/> Mwaduhamagare kuri <a href="tel:+250723960452">+250723960452</a> kugirango tumenye abo dukorana nabo neza
                  </a>
                </div>
                </>}

              </div>
            </div>
          </div>
          <div style={gihamya?{ display: "block" }:{ display:'none'}} className="w3-modal">
            <div
              className="w3-modal-content w3-animate-opacity "
              style={{ width: "100%",marginTop:'-8%',backgroundColor:'#1d9cf000' }}
            >
                  <span
              onClick={() => {
                setGihamya(!gihamya);
              }}
              style={
                window.innerWidth > 900
                  ? {
                      padding: "1%",
                      margin: "1%",
                      marginTop: "-40%",
                      fontSize: "25px",
                      color: "white",
                    }
                  : {
                      padding: "5%",
                      fontSize: "25px",
                      margin: "1%",
                      color: "white",
                    }
              }
              className="w3-hover-red w3-circle"
            >
              <b>&times;</b>
            </span>
              <div className="w3-modal-content">
                <br/>
              <center><h3 style={{marginBottom:'-5%',color:'#0274A8'}}><b>{language=="Eng"?"Click bellow to submit proof":"Tanga gihamya hano"}</b></h3></center>
               <center>
            <div style={{height:'70vh',padding:'4%'}}>
           {login?<MagicDropzone
            accept={proof.value}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "thin dashed #c2c2c2",
              background: "#fcfcfc",
              width:'100%',
              height:'90%',
              overflowY:'scroll',
              minHeight: "inherit",
              padding: "16px 11px",
              borderRadius: "5px",
              margin: "40px 0",
            }}
            onDrop={proof.previews.length <= 0?onDropBoq:()=>{alert("Videwo wemerewe n'imwe gusa")}}
           
            className="w3-scroll-bar"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {proof.previews.length > 0
                ? proof.previews.map((v, i) => (
                    <img
                      key={i}
                      className="w3-animate-opacity"
                      alt=""
                      style={window.innerWidth > 900?{
                        margin: "5px",
                        width: "400px",
                        height: "300px",
                        border: "thin solid rgba(64, 64, 64, 0.15)",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }:{
                        margin: "5px",
                        width: "90%",
                        height: "300px",
                        border: "thin solid rgba(64, 64, 64, 0.15)",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                      src={v}
                    />
                  ))
                : <p style={window.innerWidth > 900?{textAlign:'center'}:{width:'90%',textAlign:'center'}}>{language=='Eng'?"Click to choose or Drag and drop proof screen-shot ":"kanda hano uhitemo screen-shot ya gihamya"}</p>}
            </div>
          </MagicDropzone>:<h5 style={{color:'#003C57',width:'80%'}}><b>{language=="Eng"?"login to have access":"Injira muri konti yanyu cyangwa ufunugure indi kugirango ubone uburyo . "}</b></h5>}
          </div>
          {proof.previews.length > 0?
          <div>
          <Button onClick={finalGihamya}   style={{backgroundColor:"#0274A8"}} size="lg" color="info" className="w3-animate-opacity" type="button">
             <b>{language=='Eng'?"Submit your Proof":"Tanga Gihamya"}  </b>
          </Button>
      
          <Button onClick={()=>setProof({value:"video/mp4",previews:[]})}   style={{backgroundColor:"#a80202"}} size="lg" color="info" className="w3-animate-opacity" type="button">
             <b>{language=='Eng'?"Remove your video":"Kuraho videwo  watanze"}  </b>
          </Button>
          {message}
          </div>
              :''}
               </center>
              </div>
            </div>
          </div>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default LandingPage;
