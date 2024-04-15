import React from "react";
import { Routes,Router,useSearchParams} from "react-router-dom";
import Card from "./card";

import "./styles.css";
import "../../w3.css"
import { Row } from "reactstrap";

function Cards({ list },language) {
   const [modal1, setModal1] = React.useState(false);
//   const modal=useRef()
//   const Clicked=()=>{
//     modal.current.style.display='block'
//   }
//  const close=()=>{
//   modal.current.style.display='none'
//  }
//  useEffect(()=>{ modal.current.addEventListener('click',(e)=>{
//    if(e.target.children[0] !== undefined){
//   if(e.target.tabIndex==e.target.children[0].tabIndex){
//     modal.current.style.display='none'
//   }
//  }}
// )})

  return (
    <>
    <div className="cards-flex" style={{display: 'flex',paddingTop: '0%',justifyContent: 'center',alignItems: 'center',flexWrap: 'wrap',backgroundColor: 'white'}}>
      {list.map((card, i) => (
        <>
      
        <Card  modal1={modal1} Id={i}  card={card} language={language} setModal1={setModal1} key={i} />
       
        </>
      ))}
    </div>
    </>
  );
}

export default Cards;
