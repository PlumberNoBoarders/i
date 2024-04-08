import React , {useState} from "react";
import { TextField,createTheme,ThemeProvider } from "@mui/material";
// reactstrap components
import {
  Button,
  NavItem,
  Input,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import '../../w3.css'
// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import { invalid } from "moment";

function ProfilePage() {
  const [language,setLanguage]=useState('Kinya')
  const [authenticateAdmin, setAuthenticateAdmin] = React.useState(true);
  const [invalidPin, setInvalidPin] = React.useState(false);
  const [pinValue, setPinValue] = React.useState('');
  const [displayEditables, setDisplayEditables] = React.useState(true);
  const [displayEditablesLocation, setDisplayEditablesLocation] = React.useState(true);
  const [displayEditablesPaymentMethods, setDisplayEditablesPaymentMethods] = React.useState(true);
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#0274A8",
      },
    },
  });
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
    
      <div className="wrapper">
       {!authenticateAdmin &&
       <div style={{position:'absolute',width:'100%',height:'95%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <ThemeProvider theme={theme}>
         <TextField
            margin="normal"
            color="secondary"
            fullWidth
            style={{width:'40%'}}
            label=" Enter your password "
            type='password'
             onChange={(e)=>{if(e.target.value.length<=8){setPinValue(e.target.value);setInvalidPin(false)}else{setInvalidPin(true)}}}
             value={pinValue}
            className='w3-card'
          />
         
         {invalidPin&&<p style={{color:'red',fontSize:'12px'}} className="w3-animate-shake">Exceeded , Invalid pin</p>}
          </ThemeProvider>
        </div>}
       {authenticateAdmin &&<div className="section">
          <Container>
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',alignItems:'center'}}>
            <div style={window.innerWidth > 900?{width:'40%'}:{width:'100%'}}>
            <h2 className={window.innerWidth > 900?"w3-cursive":"w3-monospace"}>{language=='Eng'?'Your  Info':' Amakuru yawe'}</h2>
            <ThemeProvider theme={theme}>
            <h5 >
            {language=='Eng'?'Name':'Izina'} : Ryan Scheinder
            <br/>
              <div style={displayEditables?{display:'none'}:{display:'block'}} className="w3-animate-opacity">
              <TextField  color="secondary" label=" Name "/>
              </div>
              {language=='Eng'?'Email':'Aderesi ya imeli'}  :  ryanscheinder@gmail.com
              <br/>
              <div style={displayEditables?{display:'none'}:{display:'block'}} className="w3-animate-opacity">
              <TextField color="secondary"   label=" Email "/>
        
              </div>
              {language=='Eng'?'Phone-number':'Telephone'} :  +250-790-457-824
              <br/>
        
              <div style={displayEditables?{display:'none'}:{display:'block'}} className="w3-animate-opacity">
              <TextField  color="secondary"   label=" Phone number "/>
              </div>
              <Button onClick={()=>{setDisplayEditables(!displayEditables)}}>{displayEditables?language=='Eng'?'Edit':'Hindura amakuru yawe':language=='Eng'?'Close edits':'Funga'}</Button>
              {!displayEditables?<Button className="w3-animate-opacity">{language=='Eng'?'Save':'Bika amakuru'}</Button>:''}
            </h5>
            </ThemeProvider>
            </div>
            <div style={window.innerWidth > 900?{width:'40%'}:{width:'100%'}}>
            <h2 className={window.innerWidth > 900?"w3-cursive":"w3-monospace"}>{language=='Eng'?'Your Location or Address':' Aderesi yawe '}</h2>
            <ThemeProvider theme={theme}>
            <h5 >
            {language=='Eng'?'District':'Akarere'} : Gasabo
            <br/>
              <div style={displayEditablesLocation?{display:'none'}:{display:'block'}} className="w3-animate-opacity">
              <TextField  color="secondary" label=" District "/>
              </div>
              {language=='Eng'?'Sector':'Umurenge'}  :  Kimironko
              <br/>
              <div style={displayEditablesLocation?{display:'none'}:{display:'block'}} className="w3-animate-opacity">
              <TextField color="secondary"   label=" Sector "/>
        
              </div>
              {language=='Eng'?'Village':'Umudugudu'} : Rindiro
              <br/>
        
              <div style={displayEditablesLocation?{display:'none'}:{display:'block'}} className="w3-animate-opacity">
              <TextField  color="secondary"   label=" Village "/>
              </div>
              {language=='Eng'?'Google address':'Aderesi ya Google'} : KG 128 st 28
              <br/>
        
              <div style={displayEditablesLocation?{display:'none'}:{display:'block'}} className="w3-animate-opacity">
              <TextField  color="secondary"   label=" Google address "/>
              </div>
              <Button onClick={()=>{setDisplayEditablesLocation(!displayEditablesLocation)}}>{displayEditablesLocation?language=='Eng'?'Edit':'Hindura amakuru yawe':language=='Eng'?'Close edits':'Funga'}</Button>
              {!displayEditablesLocation?<Button className="w3-animate-opacity">{language=='Eng'?'Save':'Bika amakuru'}</Button>:''}
            </h5>
            </ThemeProvider>
            </div>
            <div style={window.innerWidth > 900?{width:'40%'}:{width:'100%'}}>
            <h2 className={window.innerWidth > 900?"w3-cursive":"w3-monospace"}>{language=='Eng'?'Payment methods':' Uburyo ukoresha wishyura cyangwa Wishyurwa '}</h2>
            <ThemeProvider theme={theme}>
            <h5>
              {language=='Eng'?'Payment methods':'Uburyo wakunze wishyure'}  :  MTN (MOMO) (+250790457824)
              <br/>
              <div style={displayEditablesPaymentMethods?{display:'none'}:{display:'block'}} className="w3-animate-opacity">
              <TextField color="secondary"   label=" change your payment number "/>
              </div>
              {language=='Eng'?'Payouts methods':'Uburyo wakunze wishyurwa'} :  MTN (MOMO) (+250790457824)
              <br/>  
              <div style={displayEditablesPaymentMethods?{display:'none'}:{display:'block'}} className="w3-animate-opacity">
              <TextField color="secondary"   label=" change your payout number "/>
              </div>        
              <Button onClick={()=>{setDisplayEditablesPaymentMethods(!displayEditablesPaymentMethods)}}>{displayEditablesPaymentMethods?language=='Eng'?'Edit':'Hindura amakuru yawe':language=='Eng'?'Close edits':'Funga'}</Button>
              {!displayEditablesPaymentMethods?<Button className="w3-animate-opacity">{language=='Eng'?'Save':'Bika amakuru'}</Button>:''}
            </h5>
            </ThemeProvider>
            </div>
            <div style={{width:'40%',opacity:'0'}}>

            </div>
            </div>
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">{language=='Eng'?"Your orders":"Ibyo watumije"}</h4>
              </Col>
              <TabContent className="gallery" activeTab={"pills"}>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              
              </TabContent>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">{language=='Eng'?"Your Receits":"Inyemeza bwishyu yawe"}</h4>
              </Col>
              <TabContent className="gallery" activeTab={"pills"}>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              
              </TabContent>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">{language=='Eng'?"Your Returns":"Ibyasubijwe"}</h4>
              </Col>
              <TabContent className="gallery" activeTab={"pills"}>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              <img
                alt="..."
                style={window.innerWidth>900?{width:'30%',margin:'1%',borderRadius:'10px'}:{width:'45%',margin:'1%',borderRadius:'10px'}}
                src={require("assets/img/bg1.jpg")}
                ></img>
              
              </TabContent>
            </Row>
          </Container>
        </div>}
        <div style={!authenticateAdmin ?{position:'absolute',width:'100%',bottom:'0%'}:{position:'static',width:'100%'}}>
        <DefaultFooter />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
