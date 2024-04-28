import React,{useState} from "react";
import { TextField,InputAdornment,Alert,Snackbar } from "@mui/material";
import { createTheme, ThemeProvider,IconButton } from "@mui/material";
import DarkFooter from "components/Footers/DarkFooter.js";
import url from '../../url'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  InputGroup,
  Container,
  Spinner,
  Row,
} from "reactstrap";
import { useNavigate, useNavigation } from "react-router-dom";

// core components

function SignUp() {
  const nav=useNavigate()
  const isPhoneNumberValid=/^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  const isPasswordStrong=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [message,setMessage]=React.useState(<></>)
  const [loading,setLoading]=React.useState(<></>)
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
  const [password, setPassword] = React.useState();
  const [displayOtp, setDisplayOtp] = React.useState(false);
  const [cpassword, setCpassword] = React.useState();
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [OtpWhastapp, setOtpWhastapp] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowCPassword = () => setShowCPassword(!showCPassword);
  const handleMouseDownCPassword = () => setShowCPassword(!showCPassword);
  const someChangeHandler = (e) => setPassword(e.target.value);
  const someChangeHandlerC = (e) => setCpassword(e.target.value);
  
  const signup={"name":name,"password":password,"phone":phone,"Email":email}
  const otp={"code":OtpWhastapp}
  const postSignup=async ()=>{
    setLoading(<Spinner size="sm">Loading...</Spinner>)
      const response = await fetch(`https://${url}/registerNewUser`, {
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
        body: JSON.stringify(signup), // body data type must match "Content-Type" header
      });
      const loginResponce = await response.json();
      if(loginResponce['Message']){
        setDisplayOtp(!displayOtp);
      }
      if(loginResponce['Message']){
        setLoading(<></>)
        setMessage( <Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
        <Alert
          onClose={setMessage(<></>)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
         {loginResponce['Message']}
         </Alert>
         </Snackbar>)
      }else{
        setLoading(<></>)
        setMessage( <Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
        <Alert
          onClose={setMessage(<></>)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
         {'The user with this email exists please use another email'}
         </Alert>
         </Snackbar>)
      };
   
   
  }
  const otpAuthenticate=async ()=>{
    setLoading(<Spinner size="sm">Loading...</Spinner>)
      const response = await fetch(`https://${url}/checkOtp`, {
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
        body: JSON.stringify(otp), // body data type must match "Content-Type" header
      });
      const OTPResponce = await response.json();
      if(OTPResponce['otp']=='valid'){
        setLoading(<></>)
       setTimeout(()=>{nav('/login-page')},3000) 
       setMessage( <Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
       <Alert
         onClose={setMessage(<></>)}
         severity="success"
         variant="filled"
         sx={{ width: '100%' }}
       >
        your OTP {OTPResponce['otp']}
        </Alert>
        </Snackbar>)
      }else{
        setLoading(<></>)
        setMessage( <Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
        <Alert
          onClose={setMessage(<></>)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
         {OTPResponce['otp']}
         </Alert>
         </Snackbar>)
      };
   
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
          <Container className={!displayOtp?'w3-animate-opacity':'w3-hide'}>
            <Row>
              <Card className="card-signup" style={window.innerWidth>900?{marginTop:'-10%'}:{marginTop:'-40%'}} data-background-color="blue">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <CardTitle className="title-up" tag="h3">
                      {language == "Eng" ? "Signup" : "Iyandikishe"}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border" + (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <TextField
                        style={{ width: "100%" }}
                        inputProps={{
                          style: { height: "10%", color: "white" },
                        }}
                        color="secondary"
                        onChange={(e)=>{setName(e.target.value)}}
                        value={name}
                        label={language == "Eng" ? " Name " : " Izina  "}
                      />
                      <br />
                      <br />
                    </InputGroup>
                   
                      <TextField
                        label={
                          language == "Eng"
                            ? " Create a password "
                            : " Hanga ijambo ryibanga "
                        }
                      style={{ width: "100%" }}
                      inputProps={{ style: { height: "10%", color: "white" } }}
                      color="secondary"
                      variant="outlined"
                      value={password}
                      type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                      onChange={someChangeHandler}
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                               <></>
                              ) : (
                               <></>
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <br />
                    <br />
                   
                    <TextField
                      label={
                        language == "Eng"
                          ? " Confirm password "
                          : " Ongera wandike ijambo ryibanga "
                      }
                      style={{ width: "100%" }}
                      inputProps={{ style: { height: "10%", color: "white" } }}
                      color="secondary"
                      variant="outlined"
                      value={cpassword}
                      type={showCPassword ? "text" : "password"} // <-- This is where the magic happens
                      onChange={someChangeHandlerC}
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowCPassword}
                              onMouseDown={handleMouseDownCPassword}
                            >
                              {showCPassword ? (
                               <></>
                              ) : (
                                <></>
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <br />
                    <br />
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
                    <br />
                    <TextField
                      style={{ width: "100%" }}
                      inputProps={{ style: { height: "10%", color: "white" } }}
                      color="secondary"
                      type="email"
                      onChange={(e)=>{setEmail(e.target.value)}}
                      value={email}
                      label={
                        language == "Eng"
                          ? " Your  Email "
                          : "  imeli yanyu "
                      }
                    />
                    <br />
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-neutral btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => {
                      e.preventDefault();
                      if(password!==''&&email!==''&&phone!==''&&name!==''){
                        postSignup()
                      }else{
                        alert(`${ language == "Eng"   ? " Please fill in the required information in the form " : " Uzuza neza iyi fishi kugirango ukomeze "
                    }`)
                      }
                    }}
                      size="lg"
                    >
                      {language == "Eng" ? "Submit" : " Tanga "} {loading}
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Row>
          </Container>
          <Container className={displayOtp?'w3-animate-opacity':'w3-hide'}style={{display:'block'}} >
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
                  <center><p style={{color:'#fff',margin:'0%',fontSize:'17px'}}>{language == "Eng"? " Wait for 5 min , if the code is not yet in your whatsapp messages "
                          : " Rindira iminota itanu niba code itaraza muri message zawe a whatsapp , nitaza hamagara +250 723 960 452 "}</p></center>
                 
                  <br/>
                  <br/>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      className="btn-neutral btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) =>{ 
                        e.preventDefault();
                        if(OtpWhastapp.length>0){
                          otpAuthenticate() 
                        }
                        }}
                      size="lg"
                    >
                      {language == "Eng" ? "Submit" : " Tanga Code"} {loading}
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Row>
          </Container>
          {message}
        </ThemeProvider>
        <DarkFooter />
      </div>
    </>
  );
}

export default SignUp;
