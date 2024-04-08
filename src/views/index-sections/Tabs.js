import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Button,
  Row,
  Col,
} from "reactstrap";

// core components

function Tabs(language) {
  const [iconPills, setIconPills] = React.useState("1");
  const [pills, setPills] = React.useState("1");
  return (
    <>
      <div  id='Monetize' style={{textAlign:'center'}} className="section section-tabs">
        <Container>
              <h4 className="category">{language=='Eng'?"Make money with your internet":"Byaza umusaruro murandasi.Twamamariza tukwishyure"}</h4>
              <h5 className="category">{language=='Eng'?"How does it work , follow these steps":"Bikorwa bite , Kurikira iz' intambwe"}</h5>
              <center>
              <div style={window.innerWidth > 900?{width:'50%',aspectRatio:'1.7/1',borderRadius:'7% 93% 5% 95% / 92% 8% 92% 8%',textAlign:'center',background:'black',color:'black'}:{width:'100%',aspectRatio:'1.7/1',borderRadius:'7% 93% 5% 95% / 92% 8% 92% 8%',textAlign:'center',background:'black',color:'black'}}>
              <iframe style={{height:'100%',width:'100%',borderRadius:'inherit'}} src="https://www.youtube.com/embed/KHtJcZgRTdc?si=fcCTSO_1BtmwKMlR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
              </center>
        </Container>
      </div>
    </>
  );
}

export default Tabs;
