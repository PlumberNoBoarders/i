import React ,{useRef,useEffect}from "react";
import {useSearchParams,useParams} from "react-router-dom";
import "./styles.css";
import "../../w3.css"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import CardModal from "../index-sections/CardModal";
import {
  Button,
  Modal,
  ModalBody
} from "reactstrap";
function Card({ card,Id,language }) {
  const [searchQuerry, setSearchQuerry]=useSearchParams({n:''})
  const {param} = useParams()
  const [modal1,setModal1]=React.useState(false)
  const modal=useRef(null)
  useEffect(()=>{
   if(parseInt(param)==Id){
    setModal1(true)
   }
    modal.current.addEventListener('click',(e)=>{
      console.log('dcdcdc')
      if(window.innerWidth > 900){
        if(e.target.children[0] !== undefined){
        if(e.target.tabIndex==e.target.children[0].tabIndex){
          setModal1(!modal1)
        }
  }}}
 )  
},[modal1])
  return (
    <>
    <div  style={window.innerWidth > 900?{color:'white',margin:'2%',cursor:'pointer',width:'15%'}:{color:'white',margin:'2%',cursor:'pointer',width:'46%'}} className="card-box w3-card w3-hover-shadow">
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        loop={true}
        mousewheel={true}
        cssMode={true}
        pagination
        modules={[Pagination, Navigation]}
        className="swiper-container"
      >
        {card.imgSrc.map((src, i) => (
          <SwiperSlide key={i}>
            <img src={src} className="card-img" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="low-Info" onClick={()=>{setModal1(!modal1)}} style={window.innerWidth > 900?{}:{textAlign:'center'}}>
      <br/>
      <h3 className="card-title" style={window.innerWidth > 900?{color:'#0274A8',fontSize:'15px',margin:'1%'}:{fontFamily:"monospace"}}><b>{card.title.slice(0,8)}</b></h3>
      <p style={window.innerWidth > 900?{color: "#003c57",fontSize:'12px',margin:'.5%'}:{fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontSize:'15px',marginTop:'-20px',textAlign:'left'}}>{card.desc.slice(0,7)}</p>
      <p style={window.innerWidth > 900?{color: "#003c57",fontSize:'12px',margin:'.5%'}:{fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontSize:'15px',marginTop:'-20px',textAlign:'left'}}>Status: {card.status}</p>
      <p style={window.innerWidth > 900?{color: "#003c57",fontSize:'12px',margin:'.5%'}:{fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontSize:'15px',marginTop:'-20px',textAlign:'left'}}>Category: {card.category}</p>
      <p style={window.innerWidth > 900?{ margin: "0.2rem", fontSize: "1rem"}:{fontFamily:"monospace"}}>
        <p style={window.innerWidth > 900?{ fontWeight: "600" ,color:"#003c57",margin:'0%' }:{fontFamily:"FontAwesome",fontSize:'15px',fontWeight:'bolder',marginTop:'-10px',marginBottom:'-10px',textAlign:'left'}}>{card.price} RWF</p>
      </p>
      </div>
      <div ref={modal}  style={modal1?{display:'block'}:{display:'none'}} className="w3-modal">
   <div className="w3-modal-content w3-animate-left" style={window.innerWidth > 900?{position:'fixed',right:'0%',top:'0%',height:'100%',width:'50%'}:{position:'relative',left:'-1%',top:'-6%',borderRadius:'12px',height:'105%',width:'90%',overflow:'scroll'}}>
     {card?
            <div >
              <button
                className="close"
                type="button"
                style={{position:'absolute',left:'1%',top:'1%'}}
                onClick={()=>{setModal1(!modal1)}}
              >
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </button>
          
            <br/>
            <div style={window.innerWidth > 900?{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap',height:'fit-content',justifyContent:'space-around'}:{display:'none'}}>
         
            <h2 style={{width:'100%',color:'#0274A8',textAlign:'center',fontWeight:'700'}}  className="w3-monospace">{card.title.slice(0,8)}</h2>
            <div style={{width:'35%'}}>
            <Swiper
              slidesPerView={1}
              spaceBetween={15}
              loop={true}
              mousewheel={true}
              cssMode={true}
              pagination
              modules={[Pagination, Navigation]}
              className="swiper-container"
            >
              {card.imgSrc.map((src, i) => (
                <SwiperSlide key={i}>
                  <img src={src} className="card-img" />
                </SwiperSlide>
              ))}
            </Swiper>
            </div>
            <div style={{width:'50%'}}>
              <h3  className="w3-monospace" style={{color:"#01405d",marginBottom:'0%'}}><b style={{fontSize:'16px'}}>Price:</b> <br/></h3>
              <h3 className="w3-monospace" style={{color:"#01405d",marginTop:'-3%',marginBottom:'-3%'}}>{card.price} RWF</h3>
              <span  style={{color:"#01405d",marginTop:'0%'}}><b style={{fontSize:'12px'}} >Discription:</b> <br/> {card.desc.slice(0,250)}</span>
            </div>
            <div style={{width:'40%'}}>
              <br/>
              <br/>
              <h3  className="w3-monospace" style={{color:"#01405d",marginBottom:'0%'}}><b style={{fontSize:'16px'}}>Category:</b> <br/></h3>
              <h3 className="w3-monospace" style={{color:"#01405d",marginTop:'-3%',marginBottom:'-3%',textTransform:'capitalize'}}>{card.category}</h3>
              <span  style={{color:"#01405d",marginTop:'0%'}}><b style={{fontSize:'12px'}} >specification:</b>
              <span  style={{color:"#01405d",marginTop:'0%'}}><b style={{fontSize:'12px'}} ></b>
               <br/>Number of peices :{card.specification.numberOfPeices}
               <br/> Weight {card.specification.kg} grams
               <br/> Radius {card.specification.radius} Inches
               <br/> Materail : {card.specification.material} 
               </span>
              </span>
            </div>
            <div style={{width:'50%',aspectRatio:'2.5/1',color:'black',borderRadius:'10px',margin:'2%',backgroundColor:'black'}}>
               <h1>VideoSpace</h1>
            </div>
            </div>
            <div style={window.innerWidth > 900?{display:'none'}:{display:'block'}}>
            <h2 style={{width:'100%',color:'#0274A8',textAlign:'center',fontWeight:'700'}}  className="w3-monospace">{card.title.slice(0,8)}</h2>
            <div style={{width:'100%'}}>
            <Swiper
              slidesPerView={1}
              spaceBetween={15}
              loop={true}
              mousewheel={true}
              cssMode={true}
              pagination
              modules={[Pagination, Navigation]}
              className="swiper-container"
            >
              {card.imgSrc.map((src, i) => (
                <SwiperSlide key={i}>
                  <img src={src} className="card-img" />
                </SwiperSlide>
              ))}
            </Swiper>
            </div>
            <div style={{width:'80%',margin:'5%'}}>
              <h3  className="w3-monospace" style={{color:"#01405d",marginBottom:'0%'}}><b style={{fontSize:'16px'}}>Price:</b> <br/></h3>
              <h3 className="w3-monospace" style={{color:"#01405d",marginTop:'-3%',marginBottom:'-3%'}}>{card.price} RWF</h3>
              <span  style={{color:"#01405d",marginTop:'0%'}}><b style={{fontSize:'12px'}} >Discription:</b> <br/> {card.desc.slice(0,250)}</span>
            </div>
            <div style={{width:'95%',aspectRatio:'2/1',color:'black',borderRadius:'10px',margin:'2%',backgroundColor:'black'}}>
               <h1>VideoSpace</h1>
            </div>
            <div  style={{width:'80%',margin:'5%'}}>
              <h3  className="w3-monospace" style={{color:"#01405d",marginBottom:'0%'}}><b style={{fontSize:'16px'}}>Category:</b> <br/></h3>
              <h3 className="w3-monospace" style={{color:"#01405d",marginTop:'-3%',marginBottom:'-3%',textTransform:'capitalize'}}>{card.category}</h3>
              <span  style={{color:"#01405d",marginTop:'0%'}}><b style={{fontSize:'12px'}} >specification:</b>
               <br/>Number of peices :{card.specification.numberOfPeices}
               <br/> Weight {card.specification.kg} grams
               <br/> Radius {card.specification.radius} Inches
               <br/> Materail : {card.specification.material} 
               </span>
            </div>
            </div>
             </div>
            :<h1>Loading ... </h1>}
            <div className="modal-footer" style={{display:'flex',display:'fixed',bottom:'0%',left:'0%',flexDirection:'row',justifyContent:'space-between'}}>
              <Button color="default" type="button">
                Add to Cart
              </Button>
              <Button
                color="danger"
                type="button"
                onClick={()=>{setModal1(!modal1)}}
              >
                Close
              </Button>
            </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default Card;
