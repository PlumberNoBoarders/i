import React, { useState } from "react";
import "../../w3.css"
import MagicDropzone from "react-magic-dropzone";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider,IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
import {
  Spinner
} from "reactstrap";
import {
  Button,
  Container,
} from "reactstrap";


function BasicElements({language,login}) {
  const [scheduleName,setScheduleName]=useState('')
  const [scheduleEmail,setScheduleEmail]=useState('')
  const [schedulePhone,setSchedulePhone]=useState('')
  const [scheduleProblem,setScheduleProblem]=useState('')
  const [loading,setLoading]=useState(<></>)
  const [message,setMessage]=useState(<></>)
  const schedule= async ()=>{
    setLoading(<Spinner size="sm">Loading...</Spinner>)
    const response = await fetch(`http://localhost:3000/schedule`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({'name':scheduleName,'email':scheduleEmail,'phone':schedulePhone,'problem':scheduleProblem}), // body data type must match "Content-Type" header
    });
    const Responce = await response.json();
    if(Responce['Message']=='success'){
      setLoading(<></>)
      setMessage(<> 
        <Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
         <Alert
           onClose={setMessage(<></>)}
           severity="success"
           variant="filled"
           sx={{ width: '100%' }}
         >
           Murakoze kutugezaho ikibazo mufite turabahamagara mukanya
         </Alert>
       </Snackbar>
       </>)
    }else{
      setMessage(<> 
        <Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
         <Alert
           onClose={setMessage(<></>)}
           severity="error"
           variant="filled"
           sx={{ width: '100%' }}
         >
          {Responce['Message']}
         </Alert>
       </Snackbar>
       </>)
    }
   }
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#fff",
      },
    },
  });

  
  return (
    <>
      <div className="section section-basic" id="basic-elements" style={{width:'100%'}}>
        <Container>         
          <center>
               
          <ThemeProvider theme={theme}>
          {window.innerWidth<900&& <div className="w3-card w3-round w3-padding" style={window.innerWidth>900?{height:'fit-content',backgroundColor:'#05a4ee',width:'45%'}:{height:'fit-content',backgroundColor:'#05a4ee',width:'100%',zIndex:'10000',marginTop:'-66%'}}>
          <h3 style={{height: "10%", color: "white",fontWeight:'bolder',marginBottom:'2%'}}>{ language == "Eng"
              ? " Shedule a service with us "
              : "  Uzuza ifishi ikurikira  "}</h3>
           <p style={{height: "10%",marginBottom:'0%', color: "white"}}>{ language == "Eng"
              ? ""
              : "  Iyi fishi iduhuza nawe mukiriya mwiza niba ukeneye servisi wayuzuza cyangwa ukaduhamagara kuri "}</p>
              <Link   to={'tel:+250790457824'} style={{ textDecoration: 'none' }}><p style={{fontSize:'120%'}}>+250-790-457-824</p></Link>   
         <TextField
          style={{ width: "100%" }}
          inputProps={{ style: { height: "10%", color: "white" } }}
          color="secondary"
          value={scheduleName}
          onChange={(e)=>setScheduleName(e.target.value)}
          type="email"
          label={
            language == "Eng"
              ? " Your Name "
              : "  Amazina yanyu "
          }
          />
          
          <br/>
          <br/>
         <TextField
          style={{ width: "100%" }}
          inputProps={{ style: { height: "10%", color: "white" } }}
          color="secondary"
          type="email"
          value={scheduleEmail}
          onChange={(e)=>setScheduleEmail(e.target.value)}
          label={
            language == "Eng"
              ? " Your Email "
              : "  Imeli yanyu "
          }
          />
          <br/>
          <br/>
         <TextField
          style={{ width: "100%" }}
          inputProps={{ style: { height: "10%", color: "white" } }}
          color="secondary"
          value={schedulePhone}
          onChange={(e)=>setSchedulePhone(e.target.value)}
          label={
            language == "Eng"
              ? " Your Phonenumber "
              : "  Telephone yanyu "
          }
          />
          <br/>
          <br/>
         <TextField
          multiline
          style={{ width: "100%",height:'40%' }}
          inputProps={{ style: { height: "10%", color: "white" } }}
          color="secondary"
          value={scheduleProblem}
          onChange={(e)=>setScheduleProblem(e.target.value)}
          label={
            language == "Eng"
              ? " The service you need (Feel free to explain) "
              : "  Servisi mukeneye "
          }
          />
          <Button
            className="btn-neutral btn-round"
            color="info"
            href="#pablo"
            onClick={(e) =>{ e.preventDefault();schedule()}}
            size="lg"
           >
            {loading} {language=='Eng'?"Submit":'Tanga'}
          </Button>
          </div>}
          </ThemeProvider>
          </center>
        <div id='services'>
        <center><h4 className="title" style={{color:'#003C57'}}><b>{language=='Eng'?"what we offer":"Serivisi dutanga"}</b></h4></center>
        <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',alignItems:"center",paddingTop:'5%'}}>
        <div className=" w3-round w3-margin-top " style={{textAlign:'center',width:'100%',color:'white',cursor:'pointer',height:'fit-content',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
            <img className="w3-animate-bubbble" style={window.innerWidth>900?{width:"30%",borderRadius:'27% 73% 27% 73% / 60% 32% 68% 40% '}:{width:"100%",borderRadius:'27% 73% 27% 73% / 60% 32% 68% 40% '}} src={require("assets/img/repairing.png")}/>
             <div style={window.innerWidth>900?{color:'#0274A8',textAlign:'center',width:"60%"}:{color:'#0274A8',textAlign:'center',width:"100%"}}>
            <h2 ><b>{language=="Eng"?"Mantainance":"Kuzibura Imiyoboro"}</b></h2>
            <h4 style={window.innerWidth>900?{color:'#003C57',textAlign:'left',width:"100%"}:{color:'#003C57',textAlign:'center',fontSize:'20px',width:"100%"}}>
              {language=="Eng"?
              "Is your bathroom or kitchen sink taking forever to drain?  Are clogged drains causing frustration and inconvenience in your home?  We can help! Introducing top-notch domestic drainage solutions for sinks, bathrooms, and washrooms!  Our expert plumbers will ensure your drains flow smoothly and efficiently, so you can spend less time worrying and more time enjoying your home.Don't wait until a small clog becomes a major headache! Call us today for a free quote and experience the peace of mind that comes with a well-functioning drainage system."
              :
              "Ubwuhagiro bwawe cyangwa igikoni cyawe kimaze igihe cyarazibye bikagusebya cyangwa bikakurya ahantu? Twagufasha ! reka abapromberi kabuhariwe  bagufashe wigire muzindi gahunda n' abashyitsi ntibagucishemo ijisho "}
              </h4>
            </div>
        </div>
        <div className=" w3-round w3-margin-top " style={{textAlign:'center',width:'100%',color:'white',cursor:'pointer',height:'fit-content',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',alignItems:'center'}}>
         <div   style={window.innerWidth>900?{color:'#0274A8',textAlign:'center',width:"60%"}:{color:'#0274A8',textAlign:'center',width:"100%"}}>
            <h2 ><b>{language=="Eng"?"Plumbing Installation":"Gushyira Amazi munyubako"}</b></h2>
            <h4 style={window.innerWidth>900?{color:'#003C57',textAlign:'left',width:"100%"}:{color:'#003C57',textAlign:'center',fontSize:'20px',width:"100%"}}>
              {language=="Eng"?
              "Is your bathroom or kitchen stuck in the plumbing past?  Tired of outdated fixtures and tired functionality?  Let's transform your space! We specialize in brand new plumbing installations for bathrooms and kitchens in Kigali.  From sparkling sinks to luxurious showers, we bring your vision to life. Don't settle for a bathroom or kitchen that doesn't inspire you!  Call us today for a free consultation!  We'll discuss your vision and answer any questions you may have."
              :
              " Ese uracyakoresha ubwuhagiro bwakera bukurura amasazi cyangwa byabikoni byuzuye imyotsi cyangwa bwabwiyuhagiro bwakikiye ? Jyana n'iterambere ! Reka  abapromberi kabuhariwe bakubakire ubwiyuhagiro, igikoni cyangwa ubwiherero bujyanye na viziyo ! Erega ibyacu byose biba bishashagirana  "}
              </h4>
              
         </div>
         <img className="w3-animate-bubbble" style={window.innerWidth>900?{width:"30%",borderRadius:'27% 73% 27% 73% / 60% 32% 68% 40% '}:{width:"100%",borderRadius:'27% 73% 27% 73% / 60% 32% 68% 40% '}} src={require("assets/img/damascene.png")}/>          
        </div>
        <div className=" w3-round w3-margin-top " style={{textAlign:'center',width:'100%',color:'white',cursor:'pointer',height:'fit-content',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',alignItems:'center'}}>
        <img className="w3-animate-bubbble" style={window.innerWidth>900?{width:"40%",borderRadius:'27% 73% 27% 73% / 60% 32% 68% 40% '}:{width:"100%",marginBottom:'10%',borderRadius:'27% 73% 27% 73% / 60% 32% 68% 40% '}} src={require("assets/img/waterleak.png")}/>            

         <div style={window.innerWidth > 900?{color:'#0274A8',width:"50%"}:{color:'#0274A8',width:"100%"}}>
            <h2 ><b>{language=="Eng"?"Leaks repair":"Gukora ahangiritse"}</b></h2>
            <h4 style={window.innerWidth>900?{color:'#003C57',textAlign:'left',width:"100%"}:{color:'#003C57',textAlign:'center',fontSize:'20px',width:"100%"}}>
              {language=="Eng"?
              "Are you tired of the constant drip, drip, drip of leaking pipes driving up your water bill and causing damage to your home? Don't let those pesky leaks go unresolved any longer! Our expert team specializes in efficiently and effectively fixing leaking and dripping pipes, saving you money on your water bill and preventing further damage to your property."
              :
              " Waruziko! Iyo itiyo iva cyangwa yapfumutse,Imena amazi agera kuri 1 metero kibe Kumunsi  Kandi bidakosowe bikaba byateza igihombo cy'amafaranga 30,000 RWF mwuko kwezi. Duhamagare tugukize icyo guhombo.  "}
              </h4>
         </div>
        </div>
        <div className=" w3-round w3-margin-top " style={{textAlign:'center',width:'100%',color:'white',cursor:'pointer',height:'fit-content',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',alignItems:'center'}}>
         <div style={window.innerWidth > 900?{color:'#0274A8',textAlign:'center',width:"50%"}:{color:'#0274A8',textAlign:'center',width:"100%"}}>
            <h2 ><b>{language=="Eng"?"Firefighting system installation":"Irinde Inkongi y'umuriro"}</b></h2>
            <h4 style={window.innerWidth>900?{color:'#003C57',textAlign:'left',width:"100%"}:{color:'#003C57',textAlign:'center',fontSize:'20px',width:"100%"}}>
              {language=="Eng"?
              "Protecting your property and loved ones from the devastating effects of fire is paramount. That's why our expert team specializes in providing comprehensive firefighting system installation services tailored to your specific needs. From residential homes to commercial buildings, we're here to ensure your safety with reliable and efficient firefighting systems."
              :
              " Kwirinda biruta kwivuza kandi impanuka ntawe iteguza  , Rinda ibyawe n'abawe inkongi y'umuriro . Reka abapromberi kabuhariwe bakubakire sisteme zirwanya inkongi y'umuriro m'uburyo bwihuse kandi bwizewe   "}
              </h4>
         </div>
         <img className="w3-animate-bubbble" style={window.innerWidth>900?{width:"40%",borderRadius:'27% 73% 27% 73% / 60% 32% 68% 40% '}:{width:"100%",borderRadius:'27% 73% 27% 73% / 60% 32% 68% 40% '}} src={require("assets/img/fire-fighting-water-supply.webp")}/>            
        </div>
        <div className=" w3-round w3-margin-top " style={window.innerWidth > 900?{textAlign:'center',width:'100%',color:'white',cursor:'pointer',height:'fit-content',display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',alignItems:'center'}:{textAlign:'center',width:'100%',color:'white',cursor:'pointer',height:'fit-content',display:'flex',flexDirection:'column-reverse',justifyContent:'space-around',alignItems:'center'}}>
        <img className="w3-animate-bubbble" style={window.innerWidth > 900?{width:"40%",borderRadius:'27% 73% 27% 73% / 60% 32% 68% 40% '}:{width:"100%",borderRadius:'27% 73% 27% 73% / 60% 32% 68% 40% '}} src={require("assets/img/Domestic-gas-installations3.webp")}/>            
         <div style={window.innerWidth > 900?{color:'#0274A8',textAlign:'center',width:"50%"}:{color:'#0274A8',textAlign:'center',width:"100%"}}>
            <h2 ><b>{language=="Eng"?"Gas system installation":"Tandukana n'ibicupa bya gaze munzu."}</b></h2>
            <h4 style={window.innerWidth > 900?{color:'#003C57',textAlign:'left',width:"100%"}:{color:'#003C57',textAlign:'center',fontSize:'20px',width:"100%"}}>
              {language=="Eng"?
              "Thinking about upgrading to the power and convenience of natural gas? Look no further! We offer expert gas system installation for homes and businesses in Kigali. Natural gas provides a cleaner, more efficient way to fuel your appliances.  From cozy fireplaces to powerful stoves and tankless water heaters, enjoy the benefits of gas without the hassle."
              :
              " Inkongi 80% zo mungo ziterwa nuko yafunzwe nabi mugihe itagikoreshwa , kandi Icupa ryagaze ryagukorera byinshi birenze guteka , Ryashyushya amazi y'koga cyangwa Koza , Ryakumisha imyenda kunyubako zitagira aho kwanika  "}
              </h4>
         </div>
        </div>
        </div>
        {message}
        </div>
     
        </Container>
      
      </div>
    </>
  );
}

export default BasicElements;
