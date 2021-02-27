import React, { useEffect, useState, useCallback } from "react";
import { Waypoint } from "react-waypoint";
import { Card } from "react-bootstrap";

import className from "classnames";
import { iOS, isSafari } from "./iosSupport";
import { create } from "@lottiefiles/lottie-interactivity";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

import D3Header from "./D3Header";
import LottiePlayer from "./LottiePlayer";
import ControlledLottie from "./NewLottiePlayer";
import WaterAnimation from "./WaterAnimation";
import MyGallery from "./Gallery";
import Chart from "./Chart";
import AnimationPlay from "./AnimationPlay";
import lottieweb from "lottie-web";

import itemsJSON from "../assets/data/items.json";
import background from "../assets/images/background.png";
import background2 from "../assets/images/background2.png";
import VideoBackground from "./VideoBackground";
import "../assets/styles/components/newScrollyteller.css";

const NewScrollyteller = () => {
  const narration = require("../assets/data/narration.json");
  const [items, setItems] = useState(itemsJSON);
  const [isOpen, setIsGalleryOpen] = useState(false);
  const [isOverlay, setOverlay] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [leftSideDiv, setLeftSideDiv] = useState(null);

  const isSafarioIos = className(
    `left-side ${isSafari() || iOS() ? "scrollyTeller-lottie-height" : ""}`
  );

  let cardScroll = items ? [...items].splice(3, items.length - 1) : null;
  cardScroll = cardScroll ? cardScroll.splice(0, cardScroll.length - 1) : null;

  let lotties = items ? [...items].filter((e) => e[0].frames !== "") : null;

  const handleGalleryClick = useCallback(
    (val) => {
      if (val !== 7) return;
      console.log("val:", val);
      setIsGalleryOpen(true);
    },
    [isOpen]
  );

  const handleOnclose = (event) => {
    setIsGalleryOpen(false);
  };
  let indexDiv = -1;
  const onMainStepEnter = () => {
    const contenedores = document.querySelectorAll(".left-side");
    contenedores.forEach((lottie, i) => {
      if (i == 0) {
        lottie.style.display = "flex";
        console.log(lottie);
      } else {
        lottie.style.display = "none";
      }
    });
  };
  const onStepEnter = (data) => {
    const newpoint = indexDiv === data - 1 ? false : true;
    console.log("newpoint",newpoint)
    if (newpoint && indexDiv >= 0 && leftSideDiv.length > indexDiv)
      leftSideDiv[indexDiv].style.display = "none";
    if (newpoint && data - 1 >= 0 && leftSideDiv.length > data - 1)
      leftSideDiv[data - 1].style.display = "flex";
    indexDiv = data - 1;
    console.log("enter", data -1,indexDiv);
  };
  const onstepLeave = (data) => {
    //     const newpoint = indexDiv===data -1?false:true;
    //     console.log("leave",data,newpoint?"new point":"not new pint",leftSideDiv)
    //     indexDiv = data -1
    // if(newpoint && indexDiv>=0 && leftSideDiv.length>indexDiv) leftSideDiv[indexDiv].style.display = "none"
  };

  useEffect(() => {
    // lottieweb.loadAnimation({
    //     container: document.getElementById('animation'), // the dom element
    //     renderer: 'canvas',
    //     loop: true,
    //     autoplay: true,
    //     animationData: animation, // the animation data
    //     rendererSettings: {
    //       preserveAspectRatio: 'xMinYMin slice', // Supports the same options as the svg element's preserveAspectRatio property
    //       clearCanvas: true,
    //     }
    //   });
    document.querySelectorAll("lottie-player").forEach((lottie, i) => {
      const canvasdiv = lottie.shadowRoot.querySelectorAll(
        ".main > .animation"
      );
      if (canvasdiv && canvasdiv.length > 0) {
        observer.observe(canvasdiv[0], observerOptions);
      }
      // if(i===1) lottie.load(animation)
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
        const father = lottie.parentElement;
        if (father.id.includes("canvascontainer")){
            console.log("Not show",i,father.style.display)
            if(father.style.display==="block")
            father.style.display = "none";
        }
      });
      lottie.addEventListener("frame", function (e) {
        const canvasdiv = lottie.shadowRoot.querySelectorAll(
          ".main > .animation"
        );
        if (canvasdiv && canvasdiv.length > 0) {
          const canvasdivNodes = canvasdiv[0].childNodes;
          if (canvasdivNodes) {
            const canvas = canvasdivNodes[2];
            if (canvas) {
              canvas.width = canvas.width;
              lottie.resize();
            }
          }
        }
        //canvasdiv[0].canvas.width = canvasdiv[0].canvas.width
      });
    });
    setLeftSideDiv(document.querySelectorAll(".left-side"));
    console.log("leftSideDiv:", leftSideDiv);
    setLoading(true);
  }, []);

  const observer = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        console.log(mutation.addedNodes);
        if (mutation.addedNodes[0].tagName === "CANVAS") {
          console.log(mutation.addedNodes[0]);
          //mutation.addedNodes[0].heigth = mutation.addedNodes[0].heigth
          //console.log("Añadido", mutation.addedNodes[0]);
        }
      }
      if (mutation.removedNodes.length) {
        //console.log("Eliminado", mutation.removedNodes[0]);
      }
      //console.log(mutation.type);
    });
  });

  // Opcions para el observer
  const observerOptions = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: false,
    attributeOldValue: false,
    characterDataOldValue: false,
  };

  return (
    <div>
      <picture>
        <source srcSet={background2} media="(max-width: 650px)"></source>
        <source srcSet={background2}></source>
        <img
          className="newScrollyteller__img__background"
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
                  renderer="canvas"
                ></lottie-player>
              </div>
              <div className="scroller">
                <Waypoint
                  fireOnRapidScroll={true}
                  onEnter={
                    leftSideDiv && isLoading
                      ? () => {
                          onMainStepEnter();
                        }
                      : null
                  }
                >
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
        ) : null}

        <div className="main">
          <div className="graphic">
            {items.length > 0
              ? cardScroll.map((left, i) => {
                  switch (left[0].slideType) {
                    case "video":
                      return (
                        <div
                          className="left-side video"
                          key={i}
                          style={{
                            display: "none",
                          }}
                        >
                          <VideoBackground src={left[0].data} />
                        </div>
                      );
                    case "2d":
                      console.log(left[0].data);
                      return (
                        <div
                            className={`left-side ${
                                isSafari() || iOS()
                                ? "scrollyTeller-lottie-height"
                                : ""
                            }`}
                            style={{
                            display: "block",
                            width: "100%",
                            height: "100%",
                            transformOrigin: "0px 0px 0px",
                          }}
                          id={`canvascontainer${i}`}
                          key={i}
                        >
                          <LottiePlayer
                            className="left-side"
                            id={`lottie${i + 1}`}
                            mode="seek"
                            src={left[0].data}
                            key={i + 1}
                            renderer="canvas"
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
                    case "3d":
                      if (left[0].data === "dark") {
                        return (
                          <div
                            className="left-side video"
                            key={i}
                            style={{
                              display: "none",
                            }}
                          >
                            <WaterAnimation />
                          </div>
                        );
                      }
                      break;
                    case "porfolio":
                      return (
                        <div
                          className="left-side video"
                          id={`portafolio${i}`}
                          key={i}
                          // style={{
                          //     display: "none"
                          // }}
                        >
                          {/* {isOpen && ( */}
                          <MyGallery
                            isOpen={isOpen}
                            lightboxWillClose={handleOnclose}
                            ID={`portafolio${i}`}
                            isLoad={isLoading}
                          />
                          {/* )} */}
                          {/* {!isOpen && <MyGallery />} */}
                        </div>
                      );
                      break;

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
                    <div
                      className={`step step__div ${
                        i === 7
                          & "hiddenclass"
                      }`}
                      id={`step${i + 1}`}
                      key={i + 1}
                    >
                      {narr ? (
                        narr.map((card, j) => (
                          <div
                            className="desc"
                            id={`desc${i + 1}-${j + 1}`}
                            key={`${i}-${j}`}
                            style={{ height: "100vh" }}
                          >
                            <Waypoint
                              fireOnRapidScroll={true}
                              onEnter={
                                leftSideDiv && isLoading
                                  ? () => {
                                      onStepEnter(i + 1);
                                    }
                                  : null
                              }
                            >
                              <Card>
                                <Card.Body>
                                  <Card.Text>{card.description}</Card.Text>
                                </Card.Body>
                              </Card>
                            </Waypoint>
                          </div>
                        ))
                      ) : (
                        <div className="desc" id={`desc${i + 1}`} key={`${i}`}>
                          <Card>
                            <Card.Body>
                              <Card.Text>Loading</Card.Text>
                            </Card.Body>
                          </Card>
                        </div>
                      )}
                    </div>
                  );
                })
              : narration.map((narr) => (
                  <div
                    className="step"
                    id={`step${narr.key}`}
                    style={{ marginBottom: "100px" }}
                    key={narr.key}
                  >
                    <div className="desc" id={"desc" + narr.key}>
                      <Waypoint
                        fireOnRapidScroll={true}
                        onEnter={
                          leftSideDiv && isLoading
                            ? () => {
                                onStepEnter(narr.key);
                              }
                            : null
                        }
                      >
                        <Card>
                          <Card.Body>
                            <Card.Text>{narr.description}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Waypoint>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div>
        <Chart
          texts={items[2].map((e) => (
            <Card>
              <Card.Body>
                <Card.Text>{e.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        />
      </div>
      <div>
        <Chart
          texts={items[2].map((e) => {
            return (
              <Card >
                <Card.Body>
                  <Card.Text>{e.description}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        />
      </div>
      <div style={{ position: "relative" }}>
        <WaterAnimation />
        <div className="div__waterAnimation">
          <div className="div__waterAnimation___flex">
            <div style={{ boxShadow: "2px 2px 10px white" }}>
              <Card style={{ top: "40" }}>
                <Card.Body>
                  <Card.Text>
                    To make the next step please book a time in our calendar for
                    a discovery session.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <a href="https://calendly.com/sccastleman/60min" target="_blank">
              <div className="bookTimeBtn">
                <span style={{ color: "white", padding: "10px" }}>
                  {items.length > 0 ? items[12][0].description : "loading..."}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewScrollyteller;
