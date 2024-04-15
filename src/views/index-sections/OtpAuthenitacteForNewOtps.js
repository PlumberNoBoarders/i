import React from "react";
import { TextField,InputAdornment } from "@mui/material";
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

function OtpAuthenitacteForNewOtps(language) {
  const isPhoneNumberValid=/^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  const isPasswordStrong=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  const [password, setPassword] = React.useState();
  const [loading,setLoading]=React.useState(<></>);
  const [displayOtp, setDisplayOtp] = React.useState(false);
  const [message,setMessage]=React.useState(<></>)
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [OtpWhastapp, setOtpWhastapp] = React.useState('');

  const newOtp={"email":email,"phone":phone};
  const otp={"code":OtpWhastapp}

  const submitNewOtp=async ()=>{
    setLoading(<Spinner size="sm">Loading...</Spinner>)
      const response = await fetch(`http://${url}/whatsappTwofactorAuth`, {
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
        body: JSON.stringify(newOtp), // body data type must match "Content-Type" header
      });
      const Responce = await response.json();
      if(Responce){
        setLoading(<></>)
        if(Responce['Email']=='valid'){
          setTimeout(()=>{setDisplayOtp(!displayOtp);},3000)
          setMessage(<> 
            <Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
             <Alert
               onClose={setMessage(<></>)}
               severity="success"
               variant="filled"
               sx={{ width: '100%' }}
             >
              {Responce['Message']}
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
      };
  }
  const otpAuthenticate=async ()=>{
    setLoading(<Spinner size="sm">Loading...</Spinner>)
    const response = await fetch(`http://localhost:3000/checkOtp`, {
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
      body: JSON.stringify(otp), // body data type must match "Content-Type" header
    });
    const Responce = await response.json();
     if(Responce){
      setLoading(<></>)
      if(Responce['otp']=='valid'){
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
     }}
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
        {!displayOtp&&<Container className={!displayOtp?'w3-animate-opacity':'w3-hide'}>
            <Row>
              <Card className="card-signup" style={window.innerWidth>900?{marginTop:'-10%'}:{marginTop:'-40%'}} data-background-color="blue">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <CardTitle className="title-up" tag="h3">
                      {language == "Eng" ? "Whatsapp number" : "Duhe Nimero iri kuri whatsapp"}
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
                      type="email"
                      onChange={(e)=>{setEmail(e.target.value)}}
                      value={email}
                      label={
                        language == "Eng"
                          ? " Your registered Email "
                          : "  Emeli watanze Wiyandikisha "
                      }
                    />
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
                          ? " Your whatsapp Phonenumber "
                          : "  Telefone yanyu iri kuri whatsapp "
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
                        if(!phone==''&&!email==''){
                          submitNewOtp()
                        } 
                      }}
                      size="lg"
                    >
                      {loading}  {language == "Eng" ? "Submit" : " Tanga Nimero"}
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Row>
          </Container>}
         {displayOtp&&<Container className={displayOtp?'w3-animate-opacity':'w3-hide'}>
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
                  <center><a onClick={(e)=>{e.preventDefault();setDisplayOtp(!displayOtp)}}> {language == "Eng" ? "Click to change the whatsapp-number again" : "Kanda hano guhindura nimero ya whatsapp nanone"}</a></center>
                  <br/>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-neutral btn-round"
                      color="info"
                      onClick={(e) =>{ 
                        e.preventDefault();
                        if(OtpWhastapp.length>0){
                          otpAuthenticate() 
                        }
                        }}
                      size="lg"
                    >
                        {loading}   {language == "Eng" ? "Submit" : " Tanga Code "}
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

export default OtpAuthenitacteForNewOtps;
