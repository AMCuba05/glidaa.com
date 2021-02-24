import React, { useEffect, useState, useCallback } from "react";
import { Waypoint } from "react-waypoint";
import { Card } from "react-bootstrap";

import className from 'classnames'
import { iOS, isSafari } from "./iosSupport";
import { create } from "@lottiefiles/lottie-interactivity";
import { Player, Controls } from '@lottiefiles/react-lottie-player';

import D3Header from "./D3Header";
import LottiePlayer from "./LottiePlayer";
import ControlledLottie from './NewLottiePlayer'
import WaterAnimation from "./WaterAnimation";
import MyGallery from "./Gallery";
import Chart from "./Chart";
import AnimationPlay from './AnimationPlay'

import itemsJSON from "../assets/data/items.json";
import background from "../assets/images/background.png";
import background2 from "../assets/images/background2.png";
import VideoBackground from "./VideoBackground";
import '../assets/styles/components/newScrollyteller.css'

const NewScrollyteller = () => {
    const narration = require("../assets/data/narration.json");
    const [items, setItems] = useState(itemsJSON);
    const [isOpen, setIsGalleryOpen] = useState(false);
    const [isOverlay, setOverlay] = useState(true);
    const [isLoading, setLoading] = useState(false);
    
    const isSafarioIos = className(`left-side ${
        isSafari() || iOS()
            ? "scrollyTeller-lottie-height"
            : ""
        }`)

    let cardScroll = items ? [...items].splice(3, items.length - 1) : null;
    cardScroll = cardScroll ? cardScroll.splice(0, cardScroll.length - 1) : null;
    
    let lotties = items ? [...items].filter((e) => e[0].frames !== "") : null;

    const handleGalleryClick = useCallback(
        (val) => {
          if (val !== 7) return;
          setIsGalleryOpen(true);
        },
        [isOpen]
      );
    
      const handleOnclose = (event) => {
        setIsGalleryOpen(false);
      };

      const onStepEnter = (data) => {
        document.querySelectorAll(".left-side").forEach((lottie, index) => {
          lottie.style.display = index + 1 === data ? "flex" : "none";
        });
      };

      useEffect(() => {
        document.querySelectorAll("lottie-player").forEach((lottie, i) => {
            const canvasdiv= lottie.shadowRoot.querySelectorAll(".main > .animation")
            if(canvasdiv && canvasdiv.length>0) {
                observer.observe(canvasdiv[0], observerOptions);
            }
          lottie.addEventListener("load", function (e) {
            create({
                mode: "scroll",
                autoplay: true,
                player: `#lottie${lottie.id.split("lottie")[1]}`,
                container: `#step${lottie.id.split("lottie")[1]}`,
                actions: [
                {
                  visibility: [0, 0.8],
                  type: "seek",
                  frames: [0, lotties[i][0].frames],
                },
              ],
            });
          });
          lottie.addEventListener("frame", function (e) {
              const canvasdiv= lottie.shadowRoot.querySelectorAll(".main > .animation")
              if(canvasdiv && canvasdiv.length>0) {
                  const canvasdivNodes = canvasdiv[0].childNodes
                if(canvasdivNodes) {
                    const canvas = canvasdivNodes[2]
                    if(canvas){ 
                        console.log(canvas)
                        canvas.width = canvas.width
                        lottie.resize()
                    }
                }
                
            }
            //canvasdiv[0].canvas.width = canvasdiv[0].canvas.width
          });
        });
        setLoading(true)
      }, []);

      const observer = new MutationObserver((mutationList) => { 
        mutationList.forEach((mutation)=> {
        if(mutation.addedNodes.length){
            if(mutation.addedNodes[0].tagName === 'CANVAS'){
                console.log(mutation.addedNodes[0])
                //mutation.addedNodes[0].heigth = mutation.addedNodes[0].heigth
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

    return (
    <div>
        <picture>
            <source srcSet={background2} media="(max-width: 650px)"></source>
            <source srcSet={background2}></source>
            <img className="newScrollyteller__img__background"
            src={background}
            alt="background"
            ></img>
        </picture>
        <div>
            {items.length > 0 ? (
            <>
                <D3Header texts={items[0].map((e) => e.description)} />
                <div className="main mainmargin">
                    <div className="graphic">
                        <lottie-player
                            id={`lottie0`}
                            mode="seek"
                            src={items[1][0].data}
                            key={0}
                            renderer='canvas'
                        ></lottie-player>
                    </div>
                    <div className="scroller">
                        <Waypoint>
                            <div className="step step__div" id={`step0`}>
                                <div className="desc" id={`desc0`} key={`0`}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Text>{items[1][0].description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </Waypoint>
                    </div>
                </div>
            </>
            )
            : null}

            <div className="main">
                <div className="graphic">
                    
                    

                    {items.length > 0
                    ? cardScroll.map((left, i) => {
                        switch (left[0].slideType) {
                            case 'video':
                                return (
                                    <div className="left-side video" key={i}>
                                        <VideoBackground src={left[0].data}/>
                                    </div>
                                );
                            case '2d':
                                return (
                                    <div 
                                        className="left-side"
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            height: "100%",
                                            transformOrigin: "0px 0px 0px"
                                        }}
                                        id={`canvascontainer${i}`}
                                        key={i}>
                                            <LottiePlayer
                                                className="left-side"
                                                id={`lottie${i + 1}`}
                                                mode="seek"
                                                src={left[0].data}
                                                //src={items[1][0].data}
                                                key={i+1}
                                                renderer='canvas'
                                            />
                                        {/* <AnimationPlay ID={`canvascontainer${i}`} url={left[0].data}/> */}
                                    {/* <LottiePlayer
                                        className="left-side"
                                        id={`lottie${i + 1}`}
                                        mode="seek"
                                        src={left[0].data}
                                        //src={items[1][0].data}
                                        key={i}
                                        renderer='canvas'
                                    /> */}
                                    </div>
                                    // <div className={isSafarioIos} key={i}>
                                    //     <ControlledLottie url={left[0].data} ID={`ControlledLottie${i}`}/>
                                    // </div>
                                );
                            case '3d':
                                if (left[0].data === 'dark') {
                                    return (
                                        <div className="left-side video" key={i}>
                                            <WaterAnimation />
                                        </div>
                                    );
                                    }
                                break
                            case 'portafolio':
                                return (
                                    <div className="left-side video" key={i}>
                                        {isOpen && (
                                            <MyGallery
                                                isOpen={isOpen}
                                                lightboxWillClose={handleOnclose}
                                            />
                                        )}
                                        {!isOpen && <MyGallery />}
                                    </div>
                                    );
                                break
                        
                            default:
                                return null;
                                break;
                        }
                        

                    })
                    : null}
                </div>

                <div className="scroller" id="scroller">
                    {cardScroll.length > 0
                    ? cardScroll.map((narr, i) => {
                        return (
                            <Waypoint
                                onEnter={isLoading?() => { onStepEnter(i + 1)}:null}
                                key={i + 1}
                            >
                            <div
                                onClick={() => handleGalleryClick(i)}
                                className="step step__div"
                                id={`step${i + 1}`}
                            >
                            {narr ? (
                                narr.map((card, j) => (
                                    <div
                                        className="desc"
                                        id={`desc${i + 1}-${j + 1}`}
                                        key={`${i}-${j}`}
                                        style={{ height: "100vh" }}
                                    >
                                        <Card>
                                            <Card.Body>
                                                <Card.Text>{card.description}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))
                                ) : (
                                    <div
                                        className="desc"
                                        id={`desc${i + 1}`}
                                        key={`${i}`}
                                    >
                                    <Card>
                                        <Card.Body>
                                            <Card.Text>Loading</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                                    )}
                            </div>
                            </Waypoint>
                        );
                        })
                    : narration.map((narr) => (
                            <Waypoint
                                onEnter={isLoading?() => { onStepEnter(narr.key)}:null}
                                key={narr.key}
                            >
                                <div
                                    className="step"
                                    id={`step${narr.key}`}
                                    style={{ marginBottom: "100px" }}
                                >
                                <div className="desc" id={"desc" + narr.key}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Text>{narr.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                                </div>
                            </Waypoint>
                        ))}
                </div>
            </div>
        </div>
        <div>
            <Chart
                texts={items[2].map((e) =>(
                    <Card>
                        <Card.Body>
                            <Card.Text>{e.description}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            />
        </div>
        <div style={{ position: "relative" }}>
            <WaterAnimation />
            <div className="div__waterAnimation">
                <div className="div__waterAnimation___flex">
                    <div style={{ boxShadow: "2px 2px 10px white"}}>
                        <Card style={{ top: "40" }}>
                            <Card.Body>
                                <Card.Text>
                                    To make the next step please book a time in our calendar
                                    for a discovery session.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <a
                        href="https://calendly.com/sccastleman/60min"
                        target="_blank"
                    >
                        <div className="bookTimeBtn">
                            <span>
                                {items.length > 0 ? items[12][0].description : "loading..."}
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default NewScrollyteller
