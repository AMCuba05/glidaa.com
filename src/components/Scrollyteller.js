/** @jsx jsx */
import { useEffect, useState, useCallback } from "react";
import { jsx } from "@emotion/core";
import { Card } from "react-bootstrap";
import { Scrollama, Step } from "react-scrollama";
import { narrativeStyle } from "../helper/constants";

//mport scrollama from "scrollama";

import { Waypoint } from "react-waypoint";

import { create } from "@lottiefiles/lottie-interactivity";

import VideoBackground from "./VideoBackground";

import MyGallery from "./Gallery";
import FlockAnimation from "./FlockAnimation";
import WaterAnimation from "./WaterAnimation";

import Chart from "./Chart";
import D3Header from "./D3Header";
import LottiePlayer from "./LottiePlayer";

import background from "../assets/images/background.png";
import background2 from "../assets/images/background2.png";
import load from "../assets/images/load.gif";

import itemsJSON from "../assets/data/items.json";

import { iOS, isSafari } from "./iosSupport";

import { Player, Controls } from '@lottiefiles/react-lottie-player';

// import button from "../button.svg";
// import { TangentSpaceNormalMap } from "three";

//** values ​​handled in percentages, example 25 = 25% ***********/
const fadeIn = 15; // the lottie appears completely when this percentage is reached
const fadeOut = 85; // the lottie starts to disappear when this percentage is reached

/****************** */

// console.log(myScrollyTellerInstance);

const narration = require("../assets/data/narration.json");

function Scrollyteller() {
  // const [data, setData] = useState("1");
  // const [progress, setProgress] = useState(0);
  // const progress = useRef(0)

  const [isOpen, setIsGalleryOpen] = useState(false);
  const [isOverlay, setOverlay] = useState(true);

  const [items, setItems] = useState(itemsJSON);
  console.log(items);
  function reloadScrollBars() {
    document.documentElement.style.overflow = "auto"; // firefox, chrome
    document.body.scroll = "yes"; // ie only
    window.scrollTo({ top: 0 });
  }

  function unloadScrollBars() {
    document.documentElement.style.overflow = "hidden"; // firefox, chrome
    document.body.scroll = "no"; // ie only
    window.scrollTo({ top: 0 });
  }

  const setLoading = (val) => {
    setOverlay(val);
    if (!val) {
      reloadScrollBars();
    } else {
      unloadScrollBars();
    }
  };

  let cardScroll = items ? [...items].splice(3, items.length - 1) : null;
  cardScroll = cardScroll ? cardScroll.splice(0, cardScroll.length - 1) : null;

  let lotties = items ? [...items].filter((e) => e[0].frames != "") : null;
  // console.log(lotties);
  // useEffect(() => {
  //   // setLoading(true);
  //   // Tabletop.init({
  //   //   key:
  //   //     "https://docs.google.com/spreadsheets/d/1RfjhL5U0DvF1P6FtedRA4JuODHe0d1s8XbGgNKHmfdM/edit#gid=0",
  //   //   simpleSheet: false,
  //   // })
  //   //   .then((items) => {
  //   //     let auxItems = [];
  //   //     let value = "1";

  //   //     for (let i = 0; i < items["Sheet2"].elements.length; i++) {
  //   //       let auxArray = items["Sheet2"].elements.filter(
  //   //         (e) => e.slide === value
  //   //       );

  //   //       i += auxArray.length;
  //   //       i--;

  //   //       value = items["Sheet2"].elements[i + 1]?.slide;

  //   //       auxItems.push(auxArray);
  //   //     }

  //   //     setItems(auxItems);
  //   //     console.log(JSON.stringify(auxItems));
  //   //     setTimeout(() => {
  //   //       setLoading(false);
  //   //     }, 30);
  //   //   })
  //   //   .catch((err) => {
  //   //     setLoading(false);
  //   //     console.warn(err)
  //   //   });
  // }, []);

  // useEffect(() => {
  //   // instantiate the scrollama
  //   const scroller = scrollama();

  //   // setup the instance, pass callback functions
  //   scroller
  //     .setup({
  //       step: ".step",
  //     })
  //     .onStepEnter((response) => {
  //       // { element, index, direction }
  //       if (response.index === 1) {
  //         response.element.style.background = "none";
  //       } else if (response.index === 2) {
  //         response.element.style.background = "none";
  //       } else {
  //         response.element.style.background = "none";
  //       }
  //     })
  //     .onStepExit((response) => {
  //       if (response.index === 1) {
  //         response.element.style.background = "none";
  //       } else if (response.index === 2) {
  //         response.element.style.background = "none";
  //       } else {
  //         response.element.style.background = "none";
  //       }
  //     });

  //   // setup resize event
  //   window.addEventListener("resize", scroller.resize);

  //   return () => window.removeEventListener("resize", scroller.resize);
  // }, []);

  // useEffect(() => {
  //   const actSlide = document.querySelector(`.left-side:nth-child(${data})`);

  //   if (actSlide) {
  //     const auxFadeIn = fadeIn / 100;
  //     const auxFadeOut = fadeOut / 100;
  //     actSlide.style.opacity = "1";

  //     // if (!actSlide.classList.contains("video")) {
  //     //   if (items.length > 1) {
  //     //     if (progress <= auxFadeIn) {
  //     //       actSlide.style.opacity = `${progress * (1 / auxFadeIn)}`;
  //     //     } else if (progress > auxFadeIn && progress < auxFadeOut) {
  //     //       actSlide.style.opacity = "1";
  //     //     } else {
  //     //       actSlide.style.opacity = `${
  //     //         (1 - progress) * (1 / (1 - auxFadeOut))
  //     //       }`;
  //     //     }
  //     //   }
  //     // } else {
  //     //   if (progress <= 5 / 100) {
  //     //     actSlide.style.opacity = "0";
  //     //   } else if (progress > 5 / 100 && progress < auxFadeOut) {
  //     //     actSlide.style.opacity = "1";
  //     //   } else {
  //     //     actSlide.style.opacity = "0";
  //     //   }
  //     // }
  //   }
  // }, [data]);

  useEffect(() => {
    document.querySelectorAll("lottie-player").forEach((lottie, i) => {
      lottie.addEventListener("load", function (e) {
        create({
          mode: "scroll",
          autoplay: true,
          player: `#lottie${lottie.id.split("lottie")[1]}`,
          container: `#step${lottie.id.split("lottie")[1]}`,
          actions: [
            {
              visibility: [0.1, 0.8],
              type: "seek",
              frames: [0, lotties[i][0].frames],
            },
          ],
        });
      });
    });
  }, []);

  const onStepEnter = (data) => {
    console.log("------------------");
    document.querySelectorAll(".left-side").forEach((lottie, index) => {
      lottie.style.display = index + 1 == data ? "block" : "none";
    });

    // document.querySelector('.content').style.display = data >= 8 ? 'block' : 'none';
    // setData(data);
    // setProgress(0);
    // progress.current = 0;
  };

  // const onStepExit = ({ element }) => {
  //   // console.log(element)
  //   setProgress(0);
  //   // progress.current = 0;
  //   // element.style.backgroundColor = "#fff";
  // };

  // const onStepProgress = ({ element, progress }) => {
  //   // console.log(element)
  //   // console.log(progress)
  //   // progress.current = ActProgress;
  //   setProgress(progress);
  //   // this.setState({ progress });
  // };

  const handleGalleryClick = useCallback(
    (val) => {
      if (val != 7) return;
      setIsGalleryOpen(true);
    },
    [isOpen]
  );

  const handleOnclose = (event) => {
    setIsGalleryOpen(false);
  };

  return (
    <div>
      {/* {isOverlay && <div className="overlay">
        <img src={background} alt="background" style={{ position: 'fixed', 'top': "0", left: '0', "width": "100vw", height: "100vh", zIndex: '9999999' }}></img>
        <div className="progressBar-container"> <div  alt="loading" className="loading"></div>
        </div>
      </div>} */}
      <picture>
        <source srcSet={background2} media="(max-width: 650px)"></source>
        <source srcSet={background2}></source>
        <img
          src={background}
          alt="background"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            zIndex: "-1",
          }}
        ></img>
      </picture>
      <div css={narrativeStyle}>
        {items.length > 0 ? (
          <div>
            <D3Header texts={items[0].map((e) => e.description)} />

            <div className="main" style={{ marginBottom: "200px" }}>
              <div className="graphic">
                <lottie-player
                  className="left-side"
                  id={`lottie0`}
                  mode="seek"
                  src={items[1][0].data}
                  key={0}
                  renderer='canvas'
                ></lottie-player>
              </div>
              <div className="scroller">
                {
                  <Waypoint>
                    <div
                      className="step"
                      id={`step0`}
                      style={{
                        marginBottom: "120px",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <div className="desc" id={`desc0`} key={`0`}>
                        <Card>
                          <Card.Body>
                            <Card.Text>{items[1][0].description}</Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </Waypoint>
                }
              </div>
            </div>
          </div>
        ) : null}

        <div className="main">
          <div className="graphic">
            {items.length > 0
              ? cardScroll.map((left, i) => {
                  if (left[0].slideType === "video") {
                    return (
                      <div className="left-side video" key={i}>
                        <VideoBackground src={left[0].data} />
                      </div>
                    );
                  } else 
                  if (left[0].slideType === "2d") {
                    console.log("d2")
                    return (
                      <div
                        className={`left-side ${
                          isSafari() || iOS()
                            ? "scrollyTeller-lottie-height"
                            : ""
                        }`}
                        key={i}
                      >
                        
                        {/* <Player
                          // src={items[1][0].data}
                          // src = "https://assets9.lottiefiles.com/packages/lf20_jfmjd0wo.json"
                          src={left[0].data}
                          id={`lottie${i + 1}`}
                          key={i}
                          autoplay
                          loop
                          style={{ height: '500px', width: '500px' }}
                        >
                          <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
                        </Player> */}
                      
                        <LottiePlayer
                          className="left-side"
                          id={`lottie${i + 1}`}
                          mode="seek"
                          src={left[0].data}
                          //src={items[1][0].data}
                          key={i+1}
                          renderer='canvas'
                        />
                      </div>
                    );
                  } else if (left[0].slideType === "3d") {
                    if (left[0].data === "dark") {
                      return (
                        <div className="left-side video" key={i}>
                          <WaterAnimation />
                        </div>
                      );
                    }
                  } else if (left[0].slideType === "porfolio") {
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
                  }

                  return null;
                })
              : null}
          </div>

          <div className="scroller" id="scroller">
            {cardScroll.length > 0
              ? cardScroll.map((narr, i) => {
                  return (
                    <Waypoint
                      onEnter={() => {
                        onStepEnter(i + 1);
                      }}
                      key={i + 1}
                    >
                      <div
                        onClick={() => handleGalleryClick(i)}
                        className="step"
                        id={`step${i + 1}`}
                        style={{
                          marginBottom: "120px",
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
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
                    onEnter={() => {
                      onStepEnter(narr.key);
                    }}
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
          texts={items[2].map((e) => {
            return (
              <Card css={narrativeStyle}>
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
        <div
          style={{
            position: "relative",
            top: "40",
            display: "grid",
            placeItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {
              <div
                style={{
                  boxShadow: "2px 2px 10px white",
                }}
              >
                <Card style={{ top: "40" }}>
                  <Card.Body>
                    <Card.Text>
                      To make the next step please book a time in our calendar
                      for a discovery session.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            }

            <a
              href="https://calendly.com/sccastleman/60min"
              target="_blank"
            >
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
}

export default Scrollyteller;
