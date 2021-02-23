import React, { useEffect } from 'react'
import lottieweb from 'lottie-web'
import JsonData from '../assets/data/animation.json'
/* Shapes */
const AnimationPlay = (props) =>{
    const {ID, url} = props 
    useEffect(() => {
        const Fetchdata = async () =>{
            const fetchResult = await fetch(url);
            const auxAnimationData = await fetchResult.json();
            var svgContainer = document.getElementById(ID);
        var animItem = lottieweb.loadAnimation({
            wrapper: svgContainer,
            animType: 'canvas',
            loop: true,
            animationData: auxAnimationData,
        });
        }
        Fetchdata()
        
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
} 
export default AnimationPlay