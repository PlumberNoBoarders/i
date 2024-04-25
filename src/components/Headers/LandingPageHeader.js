import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function LandingPageHeader({language}) {
  let pageHeader = React.createRef();

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
  return (
    <>
      <div className="page-header">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/growth.png") + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
        <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
          <Container>
            <h4 className="title">{language=='Eng'?"Welcome , Thank you for accepting to take part in our growth of plumbers with no borders":'Murakaze neza , Murakoze kuba mwemeye gushyigikira gukura kwa plumberswithnoborder.ltd'}</h4>
            <div className="text-center">
            <p className="title" style={{fontSize:'13px'}} >{language=='Eng'?"Any enquiry on this program click bellow to whatsapp us":'Ugize ikibazo kijyane niyi program yatwndikira kuri nimero ikurikira'}</p>

              <Button
               style={{width:'fit-content'}}
                color="info"
                onClick={()=>{window.open('https://api.whatsapp.com/send/?phone=250790457824&text=Hello+Plumberswithnoborders+&app_absent=0')}}
              >
                <div style={{display:'flex',flexDirection:'row'}}>
                <i className="fab fa-whatsapp" style={{marginRight:'1%',fontSize:'25px'}}></i>
                   <b style={{fontSize:'15px',marginTop:'3px', marginLeft:'3px',whiteSpace:'nowrap'}}>+250-723-960-452</b>
                  </div>
              </Button>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
               <p>{language=='Eng'?"Scroll to continue":"Reba ibikuriraho"}</p>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LandingPageHeader;
