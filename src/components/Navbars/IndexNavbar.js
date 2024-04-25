import React , {useRef} from "react";
import { Link,useNavigate,useLocation } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function IndexNavbar({language,services,photos, monetize}) {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const location=useLocation()
  let service=''
  let monetiz=''
  let pictures=''
  const nav = useNavigate();
  React.useEffect(() => {
    service=services;
    monetiz=monetize;
    pictures=photos
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 59 ||
        document.body.scrollTop > 59
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 60 ||
        document.body.scrollTop < 60
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} style={{backgroundColor:'#0274A8',height:'10%'}} expand="md">
        <Container>
          <div className="navbar-translate">
            <Link to={'/plumbum'}>
            <NavbarBrand
              id="navbar-brand"
            >
             <img style={window.innerWidth > 900?{width:'20%',height:'20%',objectFit:'cover'}:{width:'30%',height:'30%',marginTop:'-12%',objectFit:'cover'}} src={require("assets/img/LongLogo.png")}/>
            </NavbarBrand>
            </Link>
            <UncontrolledTooltip target="#navbar-brand">
             Plumbers with no borders
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav   navbar>
            <NavLink
                
                  onClick={(e) => {
                    e.preventDefault(); 
                    if(location.pathname!=='/plumbum'){nav('/plumbum')}
                    setCollapseOpen(false)
                     service.current.scrollIntoView();
                  }}
                  style={{ display:'flex' , flexDirection:'row',cursor:'pointer'}} 
                >
                 <i style={{fontSize:'14px',padding:'5%'}} className="fa-solid fa-file"></i>
                  <p >{language=='Eng'?'Services':'Serivisi'}</p>
            </NavLink>

              <NavLink
                
                  onClick={(e) => {
                    e.preventDefault();
                    if(location.pathname!=='/plumbum'){nav('/plumbum')}
                    setCollapseOpen(!collapseOpen)
                    monetiz.current.scrollIntoView();
                  }}
                  style={{ display:'flex' , flexDirection:'row',cursor:'pointer'}} 
                >
                 <i style={{fontSize:'14px',padding:'5%'}} className="fa-solid fa-rectangle-ad"></i>
                  <p >{language=='Eng'?'Commissioners':'Komissiyoneri'}</p>
              </NavLink>
              <NavLink
                
                  onClick={(e) => {
                    e.preventDefault(); 
                     if(location.pathname=='/plumbum'){nav('/plumbum')}
                    setCollapseOpen(false)
                    pictures.current.scrollIntoView();
                  }}
                  style={{ display:'flex' , flexDirection:'row',cursor:'pointer'}} 
                >
                 <i style={{fontSize:'14px',padding:'5%'}}  class="fa-solid fa-image"></i>
                  <p >{language=='Eng'?'Pictures':'Amafoto'}</p>
              </NavLink>
              <NavItem>
                <NavLink
                  href="https://twitter.com/PNWb001"
                  target="_blank"
                  id="twitter-tooltip"
                >
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://web.facebook.com/profile.php?id=61555855564549 "
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.instagram.com/plumbum.i"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
