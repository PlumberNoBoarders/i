import React,{useEffect} from "react";

// reactstrap components
import {Container} from "reactstrap";

// core components

function Tabs({language,setMonetize}) {
  const [iconPills, setIconPills] = React.useState("1");
  const [pills, setPills] = React.useState("1");
  const Monetise = React.useRef()
  useEffect(()=>{
    setMonetize(Monetise);
  },[])
  return (
    <>
      <div ref={Monetise} id='Monetize' style={{textAlign:'center'}} className="section section-tabs">
        <Container>
              <h4 className="category">{language=='Eng'?"Make money with your internet , Be our commissioner!!":"Byaza umusaruro murandasi.duhuza nabakiriya tukwishyure"}</h4>
              <h5 className="category">{language=='Eng'?"Follow the video":"Bikorwa bite , Kurikira videwo ikurikira"}</h5>
              <center>
              <div style={window.innerWidth > 900?{width:'35%',aspectRatio:'1/1.5',borderRadius:'7% 93% 5% 95% / 92% 8% 92% 8%',textAlign:'center',background:'black',color:'black'}:{width:'100%',aspectRatio:'1.7/1',borderRadius:'7% 93% 5% 95% / 92% 8% 92% 8%',textAlign:'center',background:'black',color:'black'}}>
              <iframe style={{height:'100%',width:'100%',borderRadius:'inherit'}} src="https://www.youtube.com/embed" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
              </center>
        </Container>
      </div>
    </>
  );
}

export default Tabs;
