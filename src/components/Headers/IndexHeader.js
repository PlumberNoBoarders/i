/*eslint-disable*/
import React,{useState} from "react";

// reactstrap components
import { Container,Button } from "reactstrap";
import { TextField,Snackbar } from "@mui/material";
import url from '../../url'
import Alert from '@mui/material/Alert'
import {
  Spinner
} from "reactstrap";
import { createTheme, ThemeProvider,IconButton } from "@mui/material";
import { Link,useLocation } from "react-router-dom";
// core components

function IndexHeader({language}) {
  let pageHeader = React.createRef();
  const GrandMessage=React.useRef()
  const [message,setMessage]=useState(<></>)
  const [loading,setLoading]=useState(<></>)
  const location=useLocation()
  const [scheduleName,setScheduleName]=useState('')
  const [scheduleEmail,setScheduleEmail]=useState('')
  const [schedulePhone,setSchedulePhone]=useState('')
  const [scheduleProblem,setScheduleProblem]=useState('')
  const schedule= async ()=>{
    setLoading(<Spinner size="sm">Loading...</Spinner>)
    const response = await fetch(`http://${url}/schedule`, {
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
        <Snackbar open={true} autoHideDuration={5000} onClose={()=>{setMessage(<></>)}}>
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
  let message1=language=='Kinya'?"Iyo itiyo iva cyangwa yapfumutse,":'When a pipe leaks,',message2=language=='Kinya'?'Imena amazi agera kuri 1 metero kibe Kumunsi .':"Through the leaking nose, it discharge almost a whole cubic centimeter of water ",message3=language=='Kinya'?"Kandi bidakosowe  bikaba byateza igihombo cy'amafaranga 30,000 RWF mwuko kwezi.":"And this leakage if not repaired , One can make a loss of 30,000 RWF",message4=language=='Kinya'?'Duhamagare tugukize icyo guhombo.':'Call us and we prevent such loss'

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#fff",
      },
    },
  });
  React.useEffect(() => {
      if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
      }
  });

  React.useEffect(()=>{
    let cusor=document.createElement('span')
    cusor.innerText='|'
    cusor.className='w3-animate-cursor' 
      setTimeout(()=>{ 
      let currentIntext1=0
      let currentIntext2=0
      let currentIntext3=0
      let currentIntext4=0
      const lineOne=setInterval(()=>{
     
        if(message1.length>currentIntext1){
          currentIntext1=currentIntext1+1
          GrandMessage.current.innerText=message1.slice(0,currentIntext1)+'|'
        }else{ 
          clearInterval(lineOne) 
          setTimeout(()=>{  
            const lineTwo=setInterval(()=>{
            if(message2.length>currentIntext2){
              currentIntext2=currentIntext2+1
              GrandMessage.current.innerText=message1+'\n'+message2.slice(0,currentIntext2)+'|'
            }else{
              clearInterval(lineTwo) 
              setTimeout(()=>{  
              const lineThree=setInterval(()=>{
                if(message3.length>currentIntext3){
                  currentIntext3=currentIntext3+1
                  GrandMessage.current.innerText=message1+'\n'+message2+'\n'+message3.slice(0,currentIntext3)+'|'
                }else{
                  clearInterval(lineThree) 
                  setTimeout(()=>{  
                  const lineFour=setInterval(()=>{
                    if(message3.length>currentIntext4){
                      currentIntext4=currentIntext4+1
                      GrandMessage.current.innerText=message1+'\n'+message2+'\n'+message3+'\n'+message4.slice(0,currentIntext4)+'|'
                    }else{
                      GrandMessage.current.innerText=message1+'\n'+message2+'\n'+message3+'\n'+message4
                      GrandMessage.current.appendChild(cusor)
                      clearInterval(lineFour) 
                    }
                    },70)},2000)
                }
                },70)},2000)
            }
           
          },70)},2000)
         
      
        }
      }
      ,70)},4000)
  },[location.pathname])
  return (
    <>
      <div className="page-header clear-filter" style={{width:'100%'}} filter-color="blue">
        <div
          className="page-header-image"
         
          style={{
            backgroundImage: "url(" + require("assets/img/header.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <br/>
        <br/>
       <ThemeProvider theme={theme}>
        <Container style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
        <div className=" w3-padding" style={window.innerWidth>900?{height:'fit-content',width:'45%'}:{height:'fit-content',width:'100%'}}>
       <div className="w3-animate-opacity">
          <h3 style={{height: "10%",marginBottom:'0%', color: "white"}} >{ language == "Eng"
              ? " Call us "
              : "  Duhamagare kuri "}</h3>
              <Link   to={'tel:+250723960452'} style={{ textDecoration: 'none' }}><p style={window.innerWidth>900?{fontSize:'300%',marginTop:'0%',fontWeight:'bolder'}:{fontSize:'200%',marginTop:'0%',fontWeight:'bolder'}}>+250-723-960-452</p></Link>   
         </div>  
          <h4 style={{height: "10%",marginBottom:'0%',textAlign:'left',fontWeight:'bolder', color: "white"}}>{language=='Kinya'?'Waruziko!':'Did you know?that'}</h4>
          <h5 ref={GrandMessage} style={window.innerWidth>900?{height: "10%",marginBottom:'0%',textAlign:'left',fontWeight:'bolder', color: "white"}:{height: "360px",marginBottom:'2%',textAlign:'left',fontWeight:'bolder', color: "white"}}><span className="w3-animate-cursor">|</span></h5>
          </div>
         {window.innerWidth>900&&<div className="w3-card w3-round w3-padding" style={window.innerWidth>900?{height:'fit-content',backgroundColor:'#05a4ee',width:'45%'}:{height:'fit-content',backgroundColor:'#05a4ee',width:'100%'}}>
          <h3 style={{height: "10%", color: "white",fontWeight:'bolder',marginBottom:'2%'}}>{ language == "Eng"
              ? " Shedule a service with us "
              : "  Uzuza ifishi ikurikira  "}</h3>
           <p style={{height: "10%",marginBottom:'0%', color: "white"}}>{ language == "Eng"
              ? ""
              : "  Iyi fishi iduhuza nawe mukiriya mwiza niba ukeneye servisi wayuzuza cyangwa ukaduhamagara kuri "}</p>
              <Link   to={'tel:+250790457824'} style={{ textDecoration: 'none' }}><p style={{fontSize:'120%'}}>+250-723-960-452</p></Link>   
         <TextField
          style={{ width: "100%" }}
          inputProps={{ style: { height: "10%", color: "white" } }}
          color="secondary"
          value={scheduleName}
          onChange={(e)=>setScheduleName(e.target.value)}
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
          value={scheduleEmail}
          onChange={(e)=>setScheduleEmail(e.target.value)}
          type="email"
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
              : "  Servisi mukeneye  "
          }
          />
          <Button
            className="btn-neutral btn-round"
            color="info"
            href="#pablo"
            onClick={schedule}
            size="lg"
           >
            {loading} {language=='Eng'?"Submit":'Tanga'}
          </Button>
          </div>}
       
       </Container>
       </ThemeProvider>
       {message}
      </div>
    </>
  );
}

export default IndexHeader;
