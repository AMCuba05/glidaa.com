import React, { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import { Card } from "react-bootstrap";

import className from "classnames";
import { iOS, isSafari } from "./iosSupport";
import { create } from "@lottiefiles/lottie-interactivity";

import D3Header from "./D3Header";
import LottiePlayer from "./LottiePlayer";
import WaterAnimation from "./WaterAnimation";
import MyGallery from "./Gallery";
import Chart from "./Chart";

import itemsJSON from "../assets/data/items.json";
import background from "../assets/images/background.png";
import background2 from "../assets/images/background2.png";
import VideoBackground from "./VideoBackground";
import "../assets/styles/components/Scrollyteller.css";

const Scrollyteller = () => {
  const narration = require("../assets/data/narration.json");
  const [isOpen, setIsGalleryOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [leftSideDiv, setLeftSideDiv] = useState(null);
  const items = itemsJSON;

  const isSafarioIos = className(
    `left-side ${isSafari() || iOS() ? "scrollyTeller-lottie-height" : ""}`
  );

  let cardScroll = items ? [...items].splice(3, items.length - 1) : null;
  cardScroll = cardScroll ? cardScroll.splice(0, cardScroll.length - 1) : null;

  let lotties = items ? [...items].filter((e) => e[0].frames !== "") : null;

  const handleOnclose = (event) => {
    setIsGalleryOpen(false);
  };
  let indexDiv = -1;
  const onMainStepEnter = () => {
    const contenedores = document.querySelectorAll(".left-side");
    indexDiv = -1;
    contenedores.forEach((lottie, i) => {
      lottie.style.display = "none";
    });
  };
  const onStepEnter = (data) => {
    const newpoint = indexDiv === data - 1 ? false : true;
    if (newpoint && indexDiv >= 0 && leftSideDiv.length > indexDiv)
      leftSideDiv[indexDiv].style.display = "none";
    if (newpoint && data - 1 >= 0 && leftSideDiv.length > data - 1)
      leftSideDiv[data - 1].style.display = "flex";
    indexDiv = data - 1;
  };

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
              visibility: [0, 0.8],
              type: "seek",
              frames: [0, lotties[i][0].frames],
            },
          ],
        });
        const father = lottie.parentElement;
        if (father.id.includes("canvascontainer")) {
          if (father.style.display === "block") father.style.display = "none";
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
              const w = canvas.width
              canvas.width = w;
              lottie.resize();
            }
          }
        }
      });
    });
    setLeftSideDiv(document.querySelectorAll(".left-side"));
    setLoading(true);
  }, []);

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
                      return (
                        <div
                          className={isSafarioIos}
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
                        </div>
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
                      }else return null
                    case "porfolio":
                      return (
                        <div
                          className="left-side video"
                          id={`portafolio${i}`}
                          key={i}
                        >
                          <MyGallery
                            isOpen={isOpen}
                            lightboxWillClose={handleOnclose}
                            ID={`portafolio${i}`}
                            isLoad={isLoading}
                          />
                        </div>
                      );

                    default:
                      return null;
                  }
                })
              : null}
          </div>

          <div className="scroller" id="scroller">
            {cardScroll.length > 0
              ? cardScroll.map((narr, i) => {
                  return (
                    <div
                      className={className("step step__div", {
                        hiddenclass: i === 7,
                      })}
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
            <a href="https://calendly.com/sccastleman/" target="_blank" rel="noopener noreferrer">
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

export default Scrollyteller;
