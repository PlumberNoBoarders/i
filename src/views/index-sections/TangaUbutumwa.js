import React from "react";
import { TextField } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
import {
  Spinner
} from "reactstrap";
import url from '../../url'
import {createTheme,ThemeProvider } from "@mui/material";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row
} from "reactstrap";

// core components

function TangaUbutumwa(language) {
  const [ubutumwa, setUbutumwa] = React.useState('');
  const [loading, setLoading] = React.useState(<></>);
  const [message, setMessage] = React.useState(<></>);
  const tangaUbutumwa= async ()=>{
    setLoading(<Spinner size="sm">Loading...</Spinner>)
    const response = await fetch(`http://${url}/TangaUbutumwa`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({'message':ubutumwa}), // body data type must match "Content-Type" header
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
           Murakoze kutugezaho inyunganizi , igitekerezo , Inama ,n' ibindi bitwerekeyeho, bitweretse ko mudushyigikiye , turabashimiye 
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
          backgroundPosition: "top center",
          minHeight: "700px"
        }}
      >
        <ThemeProvider theme={theme}>
        <Container>
          <Row>
            <Card className="card-signup" data-background-color="blue">
              <Form action="" className="form" method="">
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                   {language=='Eng'?"Suggestion Box":"Dusigire ibitekerezo / Inyunganizi"}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <TextField  style={{width:'100%'}} multiline={true}  inputProps={{style: { height:'100px',color:'white'}}}  onChange={(e)=>{setUbutumwa(e.target.value)}} value={ubutumwa}  color="secondary"   label={language=='Eng'?" Message ":' Ubutumwa '}/>

                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    className="btn-neutral btn-round"
                    color="info"
                    href="#pablo"
                    onClick={(e) => {e.preventDefault();tangaUbutumwa()}}
                    size="lg"
                  >
                   {loading} {language=='Eng'?"Submit":'Tanga'}
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Row>
        </Container>
        </ThemeProvider>
        {message}
      </div>
    </>
  );
}

export default TangaUbutumwa;
