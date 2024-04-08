import React, { useRef, useState } from "react";
import { TextField, createTheme, ThemeProvider } from "@mui/material";
// reactstrap components
import {
  Button,
  Spinner,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'
import '../../w3.css'
// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import { useNavigate } from "react-router-dom";
function ProfilePage() {
  const nav = useNavigate()
  const commisionsRef=useRef()
  const [language, setLanguage] = useState('Kinya');
  const [user, setUser] = useState('');
  const [commisions,setCommisions]= useState([])
  const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [commissionClientname, setCommissionClientname] = React.useState('');
  const [commissionClientPhone, setCommissionClientPhone] = React.useState('');
  const [commissionClientDiscription, setCommissionClientDiscription] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [paymentNumber, setPaymentNumber] = React.useState('');
  const [streetNumber, setStreetNumber] = React.useState('');
  const [city, setCity] = React.useState('');
  const [province, setProvince] = React.useState('');
  const [message, setMessage] = React.useState(<></>)
  const [loading, setLoading] = React.useState(<></>);
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
  const UpdateAcceptedTerms = async () => {
    setLoading(<Spinner size="sm">Loading...</Spinner>)
    const response = await fetch(`http://localhost:3000/UpdateGrowthTerms`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ 'accepted': true, 'Id': user._id }), // body data type must match "Content-Type" header
    });
    const Responce = await response.json();
    if (Responce['Message'] == 'success') {
      setLoading(<></>)
      nav('/landing-page')
    } else {
      setMessage(<>
        <Snackbar open={true} autoHideDuration={2000} onClose={() => { setMessage(<></>) }}>
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
  const postCommisions= async ()=>{
    setCommisions([...commisions,{ CommissionName: "Munaziri Bienaime",CommissionPhoneNumber :  "0790457824",CommissionServiceDetails : "Arashaka ravabon" ,CommissionStatus  :   "InProgress"}])
   if(commissionClientname!==''&&commissionClientPhone!==''&&commissionClientDiscription!==''){
    setLoading(<Spinner size="sm">Loading...</Spinner>)
    const response = await fetch(`http://localhost:3000/NewCommision`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ 'Commission_name': commissionClientname, 'Commision_Phone': commissionClientPhone,'Commision_Discription': commissionClientDiscription , 'id': user._id  }), // body data type must match "Content-Type" header
    });
    const Responce = await response.json();
    
    if (Responce['Message'] == 'success') {
      setCommissionClientname('');
      setCommissionClientPhone('');
      setCommissionClientDiscription('');
      setLoading(<></>);
      setMessage(<>
      <Snackbar open={true} autoHideDuration={2000} onClose={() => { setMessage(<></>) }}>
      <Alert
        onClose={setMessage(<></>)}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {Responce['Message']}
      </Alert>
      </Snackbar></>)
    } else {
      setMessage(<>
        <Snackbar open={true} autoHideDuration={2000} onClose={() => { setMessage(<></>) }}>
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

   }else{
    setMessage(<>
      <Snackbar open={true} autoHideDuration={2000} onClose={() => { setMessage(<></>) }}>
        <Alert
          onClose={setMessage(<></>)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
         {language == 'Eng' ? 'Fill in correctly!!' : 'Uzuza neza!!!'}
        </Alert>
      </Snackbar>
    </>)
   }
  }
  const UpdateInfo = async () => {
    setLoading(<Spinner size="sm">Loading...</Spinner>)
    const response = await fetch(`http://localhost:3000/UpdateInfo`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ 'name': name, 'email': email, 'Id': user._id }), // body data type must match "Content-Type" header
    });
    const Responce = await response.json();
    if (Responce['Message'] == 'success') {
      setLoading(<></>)
      window.location.reload()
    } else {
      setMessage(<>
        <Snackbar open={true} autoHideDuration={2000} onClose={() => { setMessage(<></>) }}>
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
  const UpdateAddress = async () => {
    setLoading(<Spinner size="sm">Loading...</Spinner>)
    const response = await fetch(`http://localhost:3000/UpdateAddress`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ 'streetNumber': streetNumber, 'city': city, 'province': province, 'Id': user._id }), // body data type must match "Content-Type" header
    });
    const Responce = await response.json();
    if (Responce['Message'] == 'success') {
      setLoading(<></>)
      window.location.reload()
    } else {
      setMessage(<>
        <Snackbar open={true} autoHideDuration={8000} onClose={() => { setMessage(<></>) }}>
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
  const UpdatePaymentNumber = async () => {
    setLoading(<Spinner size="sm">Loading...</Spinner>)
    const response = await fetch(`http://localhost:3000/UpdatePaymentNumber`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ 'paymentNumber': paymentNumber, 'Id': user._id }), // body data type must match "Content-Type" header
    });
    const Responce = await response.json();
    if (Responce['Message'] == 'success') {
      setLoading(<></>);
      window.location.reload();
    } else {
      setMessage(<>
        <Snackbar open={true} autoHideDuration={2000} onClose={() => { setMessage(<></>) }}>
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
  React.useEffect(() => {
    const FetchUser = (async () => {
      const response = await fetch(`http://localhost:3000/user`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Credentials": true
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      const userResponce = await response.json();
      if (userResponce !== 'not logged In') {
        setUser(userResponce);
        (async () => {
          const response = await fetch(`http://localhost:3000/CommisionsCurrentUser`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "omit", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({'id': userResponce._id }), // body data type must match "Content-Type" header
        });
          const respond = await response.json();
          setCommisions(respond.commisions)
   
        })()
      }
    })();
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
      <IndexNavbar />
      <div className="wrapper">
        <ProfilePageHeader user={user} commisions={commisions} language={language} />
        <div className="section">
          <Container>
            <div className="button-container">
              <Button onClick={() => { user.Account_Activated_For_Growth_Program ? nav('/landing-page') : setModalOpen(!modalOpen) }} className="btn-round" color="info" size="lg">
                {language == 'Eng' ? "Advertise" : "Amamaza"}
              </Button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
              <div style={window.innerWidth > 900 ? { width: '40%' } : { width: '100%' }}>
                <h2 className={window.innerWidth > 900 ? "w3-cursive" : "w3-monospace"}>{language == 'Eng' ? 'Your  Info' : ' Amakuru yawe'}</h2>
                <ThemeProvider theme={theme}>
                  <h5 >
                    {language == 'Eng' ? 'Name' : 'Izina'} : {user && user.userName}
                    <br />
                    <div style={displayEditables ? { display: 'none' } : { display: 'block' }} className="w3-animate-opacity">
                      <TextField onChange={(e) => setName(e.target.value)} value={name} color="secondary" label=" Name " />
                    </div>
                    {language == 'Eng' ? 'Email' : 'Aderesi ya imeli'}  :  {user && user.Email}
                    <br />
                    <div style={displayEditables ? { display: 'none' } : { display: 'block' }} className="w3-animate-opacity">
                      <TextField onChange={(e) => setEmail(e.target.value)} value={email} color="secondary" label=" Email " />
                    </div>
                    <Button onClick={() => { setDisplayEditables(!displayEditables) }}>{displayEditables ? language == 'Eng' ? 'Edit' : 'Bihindure' : language == 'Eng' ? 'Close edits' : 'Funga'}</Button>
                    <br />
                    <Button onClick={() => { nav('/new_otp') }}>{displayEditables ? language == 'Eng' ? 'Change Phonumber' : 'Hindura Telephone Watanze' : language == 'Eng' ? 'Close edits' : 'Funga'}</Button>
                    {!displayEditables ? <Button onClick={UpdateInfo} className="w3-animate-opacity">{loading}{'  '}{language == 'Eng' ? 'Save' : 'Emeza'}</Button> : ''}
                  </h5>
                </ThemeProvider>
              </div>
              <div style={window.innerWidth > 900 ? { width: '40%' } : { width: '100%' }}>
                <h2 className={window.innerWidth > 900 ? "w3-cursive" : "w3-monospace"}>{language == 'Eng' ? 'Your Location or Address' : ' Aderesi yawe '}</h2>
                <ThemeProvider theme={theme}>
                  <h5 >
                    {language == 'Eng' ? 'Country' : 'Igihugu'} : {user && user.Address['County']}
                    <br />
                    <div style={displayEditablesLocation ? { display: 'none' } : { display: 'block' }} className="w3-animate-opacity">
                      <TextField color="secondary" disabled={true} label={language == 'Eng' ? 'Country' : 'Igihugu'} />
                    </div>
                    {language == 'Eng' ? 'Street' : 'Umuhanda'}  :   {user && user.Address['Street']}
                    <br />
                    <div style={displayEditablesLocation ? { display: 'none' } : { display: 'block' }} className="w3-animate-opacity">
                      <TextField onChange={(e) => { setStreetNumber(e.target.value) }} value={streetNumber} color="secondary" label={language == 'Eng' ? 'Street' : 'Umuhanda'} />

                    </div>
                    {language == 'Eng' ? 'City' : 'Umujyi'} :  {user && user.Address['City']}
                    <br />

                    <div style={displayEditablesLocation ? { display: 'none' } : { display: 'block' }} className="w3-animate-opacity">
                      <TextField color="secondary" onChange={(e) => { setCity(e.target.value) }} value={city} label={language == 'Eng' ? 'City' : 'Umujyi'} />
                    </div>
                    {language == 'Eng' ? 'Province' : 'Intara'} :  {user && user.Address['Province']}
                    <br />

                    <div style={displayEditablesLocation ? { display: 'none' } : { display: 'block' }} className="w3-animate-opacity">
                      <TextField color="secondary" onChange={(e) => { setProvince(e.target.value) }} value={province} label={language == 'Eng' ? 'Province' : 'Intara'} />
                    </div>
                    <Button onClick={() => { setDisplayEditablesLocation(!displayEditablesLocation) }}>{displayEditablesLocation ? language == 'Eng' ? 'Edit' : 'Bihindure' : language == 'Eng' ? 'Close edits' : 'Funga'}</Button>
                    {!displayEditablesLocation ? <Button onClick={UpdateAddress} className="w3-animate-opacity">{loading}{'  '}{language == 'Eng' ? 'Save' : 'Emeza'}</Button> : ''}
                  </h5>
                </ThemeProvider>
              </div>
            <div style={window.innerWidth > 900 ? { width: '90%' } : { width: '100%' }}>
                <h4 className={window.innerWidth > 900 ? "w3-cursive" : "w3-monospace"}>{language == 'Eng' ? 'Payment methods' : ' Uburyo  Wishyurwa '}</h4>
                <ThemeProvider theme={theme}>
                  <h5>
                    {language == 'Eng' ? 'Payment methods' : 'Uburyo bukoreshwa wishyurwa'}  :  MTN (MOMO) {user && user.paymentNumber}
                    <br />
                    <div style={displayEditablesPaymentMethods ? { display: 'none' } : { display: 'block' }} className="w3-animate-opacity">
                      <TextField color="secondary" label={language == 'Eng' ? 'Payment methods' : 'Uburyo bukoreshwa wishyurwa'} />
                    </div>
                    <Button onClick={() => { setDisplayEditablesPaymentMethods(!displayEditablesPaymentMethods) }}>{displayEditablesPaymentMethods ? language == 'Eng' ? 'Edit' : 'Bihindure' : language == 'Eng' ? 'Close edits' : 'Funga'}</Button>
                    {!displayEditablesPaymentMethods ? <Button onClick={UpdatePaymentNumber} className="w3-animate-opacity">{loading}{'  '}{language == 'Eng' ? 'Save' : 'Emeza'}</Button> : ''}
                  </h5>
                </ThemeProvider>
              </div>
            </div>
            <div>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">{language == 'Eng' ? "Use the following form to make a Commission" : "Koresha ahakurikira gukora kommissiyo"}</h4>
                <form className="w3-container">
                  <p>
                  <label style={{textDecoration:'underline'}}>{language == 'Eng' ? "Name" : "Izina"}</label>
                    <input value={commissionClientname} onChange={(e)=>setCommissionClientname(e.target.value)} className="w3-input w3-border" placeholder={language == 'Eng' ? "Name of the client you found for us" : "Izina ry'umukiriya watuboneye"} type="text"/></p>
                  <p>
                    <label style={{textDecoration:'underline'}}>{language == 'Eng' ? "Phone number" : "Telefone"}</label>
                    <input value={commissionClientPhone} onChange={(e)=>setCommissionClientPhone(e.target.value)} className="w3-input w3-border" placeholder={language == 'Eng' ? "Whatsapp number would be better" : "bibaye byiza telefone yaba iri kuri whatsapp "} type="text"/>
                    </p>
                  <p>
                    <label style={{textDecoration:'underline'}}>{language == 'Eng' ? "Addition Info" : "Amakuru y'ibyashaka"}</label>
                    <textarea value={commissionClientDiscription} onChange={(e)=>setCommissionClientDiscription(e.target.value)} className="w3-input w3-border" placeholder={language == 'Eng' ? "You can include the propsed pricing and other discription of services he/she needs" : "Tubwire ibyo akeneye n'amafaranga arigutanga uyazi wayongeramo"} type="text"> 
                    </textarea>
                    </p>
                </form>
                {message}
                 <Button onClick={postCommisions}>{loading}{"  "}{language == 'Eng' ? "Proceed" : "Tanga Komisiyo yawe"}</Button>
              </Col>
            </div>
            <center><h4 style={{fontFamily:'fantasy'}}>Komisiyo wakoze</h4></center>
            <div ref={commisionsRef} style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
            {commisions.map((commision)=>(
              <div style={window.innerWidth>900?{width:'20vw',padding:'2%',margin:'1% 1% 1% 0%'}:{width:'100%',textAlign:'center',padding:'2%',margin:'1% 0% 1% 0%'}} className="w3-card  w3-round">
              <h5><b>Izina :</b></h5>
              <p><b>{commision.CommissionName}</b></p>
              <h5><b>Telefone :</b></h5>
              <p><b>{commision.CommissionPhoneNumber}</b></p> 
              <h5><b>Ibyo akeneye:</b></h5>
              <p><b>{commision.CommissionServiceDetails}</b></p> 
              <p><b>Commission status: {commision.CommissionStatus}</b></p>
          </div>
            ))
            }
           </div>
          </Container>
        </div>
        <div className="w3-modal" style={modalOpen ? { display: 'block' } : { display: "none" }}>
          <div className="w3-modal-content  w3-animate-zoom" style={window.innerWidth > 900 ? { marginTop: '1%' } : { marginTop: '30%' }}>
            <br />
            <span onClick={() => { setModalOpen(!modalOpen) }} style={window.innerWidth > 900 ? { padding: '1%', margin: '2%' } : { padding: '5%', margin: '1%' }} className="w3-hover-red w3-circle">&times;</span>
            <br />
            <center><img src={require("assets/img/warning.png")} style={{ width: '20%' }} /><h4>Icyitonderwa</h4></center>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: "2%" }}>
              <p style={{ width: '100%', padding: '3%', textAlign: 'left' }}>
                Mwiyi porogaramu nta sezerano plumberswithnoborders igiranye n'umuntu wari we wese uyikoresha. Amafaranga yose atangwa ku  bayikoresha atangwa kubwende bwa plumberswithnoborders.ltd bigendeye kunyungu za plumberswithnoborders.
                kandi plumberswithnoborders yemerewe kuyifunga igihe cy'aricyo cyose izaba iteza igihombo cyangwa bitakiri munyungu za plumberswithnoborders .
              </p>
              <b> <p style={{ margin: '0%', fontWeight: '300' }}>kanda hano niba wemeye ibyo hejuru</p></b>
              <input className="w3-check" checked={acceptedTermsAndConditions} onChange={() => { setAcceptedTermsAndConditions(!acceptedTermsAndConditions) }} type="checkbox" />
            </div>
            <center><Button onClick={() => { UpdateAcceptedTerms() }} disabled={!acceptedTermsAndConditions}>
              Komeza {loading}
            </Button></center>
            {message}
          </div>

          <div>
          </div>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default ProfilePage;
