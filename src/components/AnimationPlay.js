import React, { useEffect } from 'react'
import lottieweb from 'lottie-web'
/* Shapes */
const AnimationPlay = React.memo((props) =>{
    const {ID, url} = props 
    useEffect(() => {
    //     const Fetchdata = async () =>{
    //         const fetchResult = await fetch(url);
    //         const auxAnimationData = await fetchResult.json();
            var svgContainer = document.getElementById(ID);
            lottieweb.loadAnimation({
                container: svgContainer, // the dom element
                renderer: 'canvas',
                animType: 'canvas',
                loop: false,
                path: url,
                autoplay: false,
                mode: 'seek',
                //animationData: auxAnimationData, // the animation data
                rendererSettings: {
                  //context: canvasContext, // the canvas context
                  preserveAspectRatio: 'xMidYMid meet',
                  //scaleMode: 'noScale',
                  clearCanvas: true,
                  //progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
                  //hideOnTransparent: true //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
                }
                });
        // var animItem = lottieweb.loadAnimation({
        //     wrapper: svgContainer,
        //     animType: 'canvas',
        //     loop: false,
        //     animationData: auxAnimationData,
        //     mode: 'seek',
        //     rendererSettings: {
        //         preserveAspectRatio: 'xMidYMid meet',
        //         clearCanvas: true
        //     }
        // });
        // }
        //Fetchdata()
        
        // const canvas = document.querySelectorAll(`lottie-player > #${ID}`)

        // console.log(`canvas: ${canvas}`)
  }, [url])

    
        console.log(url)
        
        return null
    // return(
    //     <div id={ID}
    //     style={{
    //         display: "block",
    //         width: "100%",
    //         height: "100%",
    //         transformOrigin: "0px 0px 0px"
    //     }}/>
    // )
})
export default AnimationPlay