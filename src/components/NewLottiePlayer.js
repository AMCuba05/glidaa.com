import React, { Component, useEffect, useState } from "react";
import Lottie from "react-lottie";
 import animationD from '../assets/data/animation.json';

const ControlledLottie = props=> {
    const {url, ID} = props
    const [isStopped, setIsStopped] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [animationData, setAnimationData] = useState({
        path: url,
        source: {}
    })
    // animationData: "https://assets3.lottiefiles.com/packages/lf20_XZ3pkn.json",
    if(url === "https://assets1.lottiefiles.com/packages/lf20_0b2i1axl.json") console.log(url)
    useEffect(() => {
        const Fetchdata = async () =>{
            setIsLoading(true)
            const fetchResult = await fetch(animationData.path);
            const auxAnimationData = await fetchResult.json();
            setAnimationData({...animationData, source: auxAnimationData})
            setIsLoading(false)
        }
        Fetchdata()
        
        // const canvas = document.querySelectorAll(`lottie-player > #${ID}`)

        // console.log(`canvas: ${canvas}`)
  }, [animationData.path])
  useEffect(() => {
    document.querySelectorAll(`#${ID}`).forEach((lottie, i) => {
        lottie.shadowRoot.querySelectorAll(".main > .animation").forEach((l, i) =>{
            // l[0].canvas.width  = 600;
            // l[0].canvas.height = 600;
            console.log("hijos:",i,l)
            observer.observe(l, observerOptions);
        });
    });
  }, [isLoading])
  const observer = new MutationObserver((mutationList) => { 
    mutationList.forEach((mutation)=> {
    if(mutation.addedNodes.length){
        if(mutation.addedNodes[0].tagName === 'CANVAS'){
            mutation.addedNodes[0].heigth = 600
            mutation.addedNodes[0].width = 600
            //console.log("Añadido", mutation.addedNodes[0]);
        }
    }
   if(mutation.removedNodes.length){
    //console.log("Eliminado", mutation.removedNodes[0]);
    }
   //console.log(mutation.type);
    
    })
   });

// Opcions para el observer 
const observerOptions = { 
 attributes: true, 
 childList: true, 
 subtree: true,
 characterData: false,
 attributeOldValue: false,
 characterDataOldValue: false
};

    const buttonStyle = {
      display: "inline-block",
      margin: "10px auto",
      marginRight: "10px",
      border: "none",
      color: "white",
      backgroundColor: "#647DFF",
      borderRadius: "2px",
      fontSize: "15px"
    };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData:animationData.source,
      
    //   animationData:animationD,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    if(isLoading) return(<div>Cargando...</div>)
    return (
      <div className="controlled">
          <lottie-player
          id={ID}
            autoplay
            //loop
            mode="seek"
            src={url}
            renderer="canvas"
            >
        </lottie-player>
        {/* <Lottie
          options={defaultOptions}
          height={600}
          width={600}
          isStopped={isStopped}
          isPaused={isPaused}
          renderer="canvas"
        /> */}
      </div>
    );
}

export default ControlledLottie;