import React,{useState,useRef} from "react";
import MagicDropzone from "react-magic-dropzone";
// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import "../../w3.css";
import "./gridImages.css";

// core components
import IndexNavbar from "../../components/Navbars/IndexNavbar";
import LandingPageHeader from "../../components/Headers/LandingPageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";

function LandingPage() {
  const [modalIopen, setModalIopen] = React.useState(false);
  const [login, setLogin] = React.useState(true);
  const [user,setUser]=useState({})
  const [videoDurationExceeded,setVideoDurationExceeded]=useState(false)
  const [gihamyaVideoFile,setGihamyaVideoFile]=React.useState('')
  const checkVideoDuration=useRef(null);
  const [proof,setProof]=useState({
    value: "video/mp4",
    previews: [].slice(0,1),
  })
  const [modalIopenOne, setModalIopenOne] = React.useState(false);
  const [gihamya, setGihamya] = React.useState(false);
  const [language, setLanguage] = React.useState("Kinya");
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
      if(checkVideoDuration.current.duration > 15){
        setVideoDurationExceeded(!videoDurationExceeded)
        window.alert("The video's duration exceeds 15 seconds , It will not be uploaded")
       }
      if(!videoDurationExceeded){
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
       }
    },100)
  };
  const finalGihamya= async()=>{
   const data ={"Video":gihamyaVideoFile,'userName':user.userName,'phoneNumber':user.phoneNumber}

    const response = await fetch(`http://localhost:3000/gihamya`, {
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
          <div className="section section-about-us">
            <Container>
              <Row>
                <Col className="ml-auto mr-auto text-center" md="8">
                  <h2 className="title">
                    {language == "Eng" ? "Where do you start from?" : "Bikorwa bite?"}
                  </h2>
                  <div
              style={
                window.innerWidth > 900
                  ? {
                      width: "40%",
                      textAlign:'center',
                      aspectRatio: "1/1.5",
                      marginLeft:'30%',
                      backgroundColor: "black",
                      marginBottom: "4%",
                    }
                  : {
                      width: "80%",
                      marginBottom: "10%",
                      aspectRatio: "1/1.5",
                      backgroundColor: "black",
                    }
              }
              className="w3-round"
            >
              <p>Hello</p>
            </div>
                </Col>
              </Row>
            </Container>
          </div>
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
              <p>
                {language == "Eng"
                  ? "This video will demonstrate how to upload proof"
                  : "Iyi video yerekana uko batatanga gihamya"}
              </p>
            </div>
            <div
              style={
                window.innerWidth > 900
                  ? {
                      width: "27%",
                      aspectRatio: "1/1.5",
                      backgroundColor: "black",
                      marginBottom: "4%",
                    }
                  : {
                      width: "80%",
                      marginBottom: "10%",
                      aspectRatio: "1/1.5",
                      backgroundColor: "black",
                    }
              }
              className="w3-round"
            >
              <p>Hello</p>
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
              src="https://images.unsplash.com/photo-1533420896084-06d2bce5365f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
            />

            {window.innerWidth > 900 ? (
              <div className="hoverToactivite">
                <i className="fa-solid fa-circle-down" title="download"></i>{" "}
                <i
                  className="fa-solid fa-tv"
                  onClick={() => setModalIopen(!modalIopen)}
                  title="Expand"
                ></i>
              </div>
            ) : (
              <div className="hoverToactiviteMobile">
                <i className="fa-solid fa-circle-down" title="download"></i>{" "}
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
                src="https://images.unsplash.com/photo-1533420896084-06d2bce5365f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
              />
            </div>
          </div>
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
              src="https://images.unsplash.com/photo-1533420896084-06d2bce5365f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
            />

            {window.innerWidth > 900 ? (
              <div className="hoverToactivite">
                <i className="fa-solid fa-circle-down" title="download"></i>{" "}
                <i
                  className="fa-solid fa-tv"
                  onClick={() => setModalIopen(!modalIopen)}
                  title="Expand"
                ></i>
              </div>
            ) : (
              <div className="hoverToactiviteMobile">
                <i className="fa-solid fa-circle-down" title="download"></i>{" "}
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
                src="https://images.unsplash.com/photo-1533420896084-06d2bce5365f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
              />
            </div>
          </div>
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
                <div  style={window.innerWidth > 900?{width:'100%'}:{}} className="panel post">
                  <a >
                    <span style={window.innerWidth < 900?{fontSize:'50px'}:{}}>5000 <b style={window.innerWidth > 900?{fontSize:'50px'}:{fontSize:'20px'}}> RWF</b></span> <span style={window.innerWidth < 900?{fontSize:'18px',marginTop:'-10%'}:{fontSize:'18px',marginTop:'-5%'}}>Available on first next month</span>
                  </a>
                </div>
              
                <div style={window.innerWidth > 900?{width:'100%',textAlign:'center'}:{}} className="panel page">
                  <a >
                    <span>5 </span>tsapp status days
                  </a>
                </div>
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
              <center><h3 style={{marginBottom:'-5%',color:'#0274A8'}}><b>Hello</b></h3></center>
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
                    <video
                      controls
                      muted
                      autoPlay
                      key={i}
                      ref={checkVideoDuration}
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
                : <p style={window.innerWidth > 900?{textAlign:'center'}:{width:'90%',textAlign:'center'}}>{language=='Eng'?"Click to choose or Drag and drop proof video ":"kanda hano uhitemo videwo ya gihamya"}</p>}
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
