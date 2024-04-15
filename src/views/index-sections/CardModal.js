import React,{useEffect} from 'react'
import "../../w3.css"
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {Button } from "reactstrap";
export default function CardModal(modal1, setModal1,card,language) {
    console.log(card)
    const modal=React.useRef(null)
     useEffect(()=>{
       modal.current.addEventListener('click',(e)=>{
       if(e.target.children[0] !== undefined){
      if(e.target.tabIndex==e.target.children[0].tabIndex){
        setModal1(!modal1)
      }
     }}
    )})
  return (
    <div ref={modal}  style={modal1?{display:'block'}:{display:'none'}} className="w3-modal">
   <div className="w3-modal-content w3-animate-right" style={{position:'fixed',right:'0%',top:'0%',height:'100%',width:'50%'}}>
     {card?
            <div>
            <div className="modal-header justify-content-center">
              <button
                className="close"
                type="button"
                style={{position:'absolute',left:'1%',top:'1%'}}
                onClick={()=>{setModal1(!modal1)}}
              >
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </button>
              <h4 className="title title-up">{card.title.slice(0,8)}</h4>
            </div>
            <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <div style={{width:'50%'}}>
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
            </div>
             </div>
            :<h1>Loading ... </h1>}
            <div className="modal-footer" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
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
  )
}
