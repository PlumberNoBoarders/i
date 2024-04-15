import React from "react";
import { Link } from "react-router-dom";
import { TextField,InputAdornment } from "@mui/material";
import IndexNavbar from "components/Navbars/IndexNavbar";
import { createTheme, ThemeProvider,IconButton } from "@mui/material";
import Visibility from "@mui/.icons-material-YqzbhoCZ/Visibility";
import VisibilityOff from "@mui/.icons-material-YqzbhoCZ/VisibilityOff";
import DarkFooter from "components/Footers/DarkFooter.js";
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
  Row,
} from "reactstrap";

// core components

function SignUp(language) {
  const [OtpWhastapp, setOtpWhastapp] = React.useState('')
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
       
          <Container className='w3-animate-opacity' style={{display:'block'}} >
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
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                      {language == "Eng" ? "Submit" : " Tanga Code"}
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Row>
          </Container>
        </ThemeProvider>
        <DarkFooter />
      </div>
    </>
  );
}

export default SignUp;
