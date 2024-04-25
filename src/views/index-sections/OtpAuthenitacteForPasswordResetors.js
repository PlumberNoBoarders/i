import React from "react";
import { Link } from "react-router-dom";
import { TextField,InputAdornment } from "@mui/material";
import IndexNavbar from "components/Navbars/IndexNavbar";
import { createTheme, ThemeProvider,IconButton } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
import url from '../../url'
import DarkFooter from "components/Footers/DarkFooter.js";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Spinner,
  Container,
  Row,
} from "reactstrap";

// core components

function OtpAuthenitacteForPasswordResetors() {
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
  const [language,setLanguage]=React.useState(getCookie()==''?'Kinya':getCookie());
  const isPhoneNumberValid=/^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  const isPasswordStrong=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  const [password, setPassword] = React.useState('');
  const [displayOtp, setDisplayOtp] = React.useState('phone');;
  const [phone, setPhone] = React.useState('');
  const [OtpWhastapp, setOtpWhastapp] = React.useState('');
  const [message,setMessage]=React.useState(<></>);
  const [loading,setLoading]=React.useState(<></>);
  const step_1={"phone":phone};
  const step_2={"phone":phone,"code":OtpWhastapp}
  const step_3={"phone":phone,"code":OtpWhastapp,"password":password}
  const reset_1=async ()=>{
    setLoading(<Spinner size="sm">Loading...</Spinner>)
      const response = await fetch(`http://${url}/resetpassword_1`, {
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
        body: JSON.stringify(step_1), // body data type must match "Content-Type" header
      });
      const result = await response.json();
     if(result){
      setLoading(<></>)
      if(result['Phone']=='valid'){  
      setTimeout(()=>{setDisplayOtp('otp');},3000)
    
      setMessage(<> 
        <Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
         <Alert
           onClose={setMessage(<></>)}
           severity="success"
           variant="filled"
           sx={{ width: '100%' }}
         >
          {result['Message']}
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
          {result['Message']}
         </Alert>
       </Snackbar>
       </>)
       }
     }
  }
  const reset_2=async ()=>{
      setLoading(<Spinner size="sm">Loading...</Spinner>)
      const response = await fetch(`http://${url}/checkOtp`, {
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
        body: JSON.stringify(step_2), // body data type must match "Content-Type" header
      });
      const Responce = await response.json();
       if(Responce){
         setLoading(<></>)
        if(Responce['otp']=='valid'){
          setTimeout(()=>{setDisplayOtp('reset');},3000)
          setMessage(<> 
            <Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
             <Alert
               onClose={setMessage(<></>)}
               severity="success"
               variant="filled"
               sx={{ width: '100%' }}
             >
              {Responce['otp']}
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
           {Responce['otp']}
          </Alert>
        </Snackbar>
        </>)
        }
       }
  }
  const reset_3=async ()=>{
    setLoading(<Spinner size="sm">Loading...</Spinner>)
      const response = await fetch(`http://${url}/resetpassword_3`, {
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
        body: JSON.stringify(step_3), // body data type must match "Content-Type" header
      });
      const result = await response.json();
      if(result){
        setLoading(<></>)
        setMessage(<> 
          <Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
           <Alert
             onClose={setMessage(<></>)}
             severity="success"
             variant="filled"
             sx={{ width: '100%' }}
           >
            {result['Message']}
           </Alert>
         </Snackbar>
         </>)
      }
  }

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#0274A8",
      },
    },
  });
  return (
    <>
   <div
        className="section section-signup"
        style={{
          backgroundImage: "url(" + require("assets/img/bg11.jpg") + ")",
          backgroundSize: "cover",
          height:'120vh',
          backgroundPosition: "top center"
        }}
      >
        <ThemeProvider theme={theme}>
         {displayOtp=='phone'&&<Container className={displayOtp=='phone'?'w3-animate-opacity':'w3-hide'}>
            <Row>
              <Card className="card-signup" style={window.innerWidth>900?{marginTop:'-10%'}:{marginTop:'-40%'}} data-background-color="blue">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <CardTitle className="title-up" tag="h3">
                      {language == "Eng" ? "Anothe Whatsapp number" : "Duhe Indi nimero iri kuri whatsapp"}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                  <br/>
                  <br/>
                  <br/>
                  <TextField
                      style={{ width: "100%" }}
                      inputProps={{ style: { height: "10%", color: "white" } }}
                      color="secondary"
                      onChange={(e)=>{setPhone(e.target.value.replace(/[^0-9+() -.]/g,''))}}
                      value={phone}
                      label={
                        language == "Eng"
                          ? "  Phonenumber use when registering "
                          : "  Telefone wakoresheje wiyandikisha "
                      }
                    />
                    <br />  
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-neutral btn-round"
                      color="info"
                      onClick={(e) => {
                        e.preventDefault();
                        if(!phone==''){
                          reset_1();
                        } 
                      }}
                      size="lg"
                    >
                      {loading}{language == "Eng" ? "Submit" : " Tanga Nimero"}
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Row>
          </Container>}
         {displayOtp=='otp'&&<Container className={displayOtp=='otp'?'w3-animate-opacity':'w3-hide'}>
            <Row>
              <Card className="card-signup" style={window.innerWidth>900?{marginTop:'-10%'}:{marginTop:'-40%'}} data-background-color="blue">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <CardTitle className="title-up" tag="h4">
                      {language == "Eng" ? "OTP authentication" : "Andika kode ije muri message za whatsapp"}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                  <br/>
                  <br/>
                  <br/>
                  <br/> 
                  <br/>
                 
                    <TextField
                      label={
                        language == "Eng"
                        ? " Otp code from your whatsapp messages "
                        : " Kode yandike aha "
                      }
                      style={{ width: "100%" }}
                      inputProps={{ style: { height: "10%", color: "white" } }}
                      color="secondary"
                      variant="outlined"
                      value={OtpWhastapp}
                      onChange={(e)=>{setOtpWhastapp(e.target.value)}}
                    />
                 
                  <br/>
                  <br/>
                  <center><p style={{color:'#fff',margin:'0%',fontSize:'17px'}}>{language == "Eng"? " Wait for 5 min , if the code is not yet in your whatsapp messages call  +250 723 960 452 or "
                          : " Rindira iminota itanu niba code itaraza muri message zawe a whatsapp , nitaza hamagara +250 723 960 452 cyangwa "}</p></center>
                  <br/>
                  <br/>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-neutral btn-round"
                      color="info"
                      onClick={(e) =>{ 
                        e.preventDefault();
                        if(OtpWhastapp.length>0){
                          reset_2()
                        }
                        }}
                      size="lg"
                    >
                      {loading} {language == "Eng" ? "Submit" : " Tanga Code "}
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Row>
          </Container>}
          {displayOtp=='reset' && <Container className={displayOtp=='reset'?'w3-animate-opacity':'w3-hide'}>
            <Row>
              <Card className="card-signup" style={window.innerWidth>900?{marginTop:'-10%'}:{marginTop:'-40%'}} data-background-color="blue">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <CardTitle className="title-up" tag="h4">
                      {language == "Eng" ? "Now change your whatsapp" : "Ngaho hindura ijambo ryawe ry'ibanga"}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                  <br/>
                  <br/>
                  <br/>
                  <br/> 
                  <br/>
                 
                    <TextField
                      label={
                        language == "Eng"
                        ? "Your new password"
                        : " Ijambo ryibanga rishya "
                      }
                      style={{ width: "100%" }}
                      inputProps={{ style: { height: "10%", color: "white" } }}
                      color="secondary"
                      variant="outlined"
                      type="password"
                      value={password}
                      onChange={(e)=>{setPassword(e.target.value)}}
                    />
                 
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-neutral btn-round"
                      color="info"
                      onClick={(e) =>{ 
                        if(password.length>0){
                          reset_3();
                        }
                        }}
                      size="lg"
                    >
                     {loading}{language == "Eng" ? "Submit" : " Tanga "}
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Row>
          </Container>}
       
        </ThemeProvider>
        {message}
        <DarkFooter />
      </div>
    </>
  );
}

export default OtpAuthenitacteForPasswordResetors;
