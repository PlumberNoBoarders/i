import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  Spinner,
  InputGroup,
  Container,
  Col
} from "reactstrap";
import url from '../../url'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import { Link } from "react-router-dom";

function LoginPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [message,setMessage]=React.useState('')
  const [loading,setLoading]=React.useState(<></>)
  const [email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState('')
  const loginData={"Email":email,"password":password}
  function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  const loginFunc=async ()=>{
    setLoading(<Spinner size="sm">Loading...</Spinner>)
      const response = await fetch(`http://${url}/login`, {
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
        body: JSON.stringify(loginData), // body data type must match "Content-Type" header
      });
      const result = await response.json();
     if(result){
      setLoading(<></>)
      if(result['Message']=='Logged in')
      {
        setCookie(result['cName'],result['cValue'],result['days'])
        setMessage(<Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
      <Alert
        onClose={setMessage(<></>)}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
       {result['Message']}
      </Alert>
    </Snackbar>)}else{
      setMessage(<Snackbar open={true} autoHideDuration={2000} onClose={()=>{setMessage(<></>)}}>
      <Alert
        onClose={setMessage(<></>)}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
       {result['Message']}
      </Alert>
    </Snackbar>)
    }
     }
  }
  const loginGoogle= async ()=>{
    setLoading(<Spinner size="sm">Loading...</Spinner>)
    const loginTab=window.open(`http://${url}/auth/google`);
    console.log(loginTab)
  }
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <IndexNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("assets/img/now-logo.png")}
                      ></img>
                    </div>
                  </CardHeader>
                  {/* <Button
                      block
                      className="btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => {e.preventDefault();loginGoogle()}}
                      size="lg"
                    >
                      Login with google <i class="fa-brands fa-google"></i> {loading}
                    </Button> */}
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email..."
                        type="email"
                        onChange={(e)=>{setEmail(e.target.value)}}
                        value={email}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i class="fa-solid fa-key"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Your Password"
                        type="password"
                        onChange={(e)=>{setPassword(e.target.value)}}
                        value={password}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        if(!email==""&&password!=="")
                       { loginFunc()}}}
                      size="lg"
                    >
                     Login  {loading}
                    </Button>
                    <Link to={'/signup-page'}>
                    <div className="pull-left">
                      <h6 className="link">
                        
                          Create Account
                       
                      </h6>
                    </div>
                    </Link>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                         Reset password
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        {message}
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;
