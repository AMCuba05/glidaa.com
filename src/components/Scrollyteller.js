import React, { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import { Card } from "react-bootstrap";

import className from "classnames";
import { iOS, isSafari } from "./iosSupport";
import { create } from "@lottiefiles/lottie-interactivity";
import { useInView } from "react-intersection-observer";

import D3Header from "./D3Header";
import LottiePlayer from "./LottiePlayer";
import WaterAnimation from "./WaterAnimation";
import MyGallery from "./Gallery";
import Chart from "./Chart";
import WaypointCard from "./WaypointCard";

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
  const [cityID, setCityID] = useState(0);
  const [indexDiv, setIndexDiv] = useState(-1);
  const viewers = [
    useInView(),
    useInView(),
    useInView(),
    useInView(),
    useInView(),
    useInView(),
    useInView(),
    useInView(),
    useInView(),
    useInView(),
    useInView(),
    useInView(),

  ]
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

  const onMainStepEnter = () => {
    const contenedores = document.querySelectorAll(".left-side");
    setIndexDiv(-1);
    contenedores.forEach((lottie, i) => {
      lottie.style.display = "none";
    });
  };
  const onStepCityEnter = (i, j) => {
    onStepEnter(i);
    setCityID(j + 1);
  };
  const onStepEnter = (data) => {
    // console.log(data);
    // const newpoint = indexDiv === data ? false : true;
    // if (newpoint && indexDiv >= 0 && leftSideDiv.length > indexDiv)
    //   leftSideDiv[indexDiv].style.display = "none";
    // if (newpoint && data >= 0 && leftSideDiv.length > data)
    //   leftSideDiv[data].style.display = "flex";
    // setIndexDiv(data);
  };

  useEffect(() => {
    document.querySelectorAll("lottie-player").forEach((lottie, i) => {
      lottie.addEventListener("load", function (e) {
        create({
          mode: "scroll",
          autoplay: true,
          player: `#lottie${lottie.id.split("lottie")[1]}`,
          container: `#step${Math.trunc(lottie.id.split("lottie")[1]) + 1}`,
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
        // console.log(lotties[i][0].frames);
        const canvasdiv = lottie.shadowRoot.querySelectorAll(
          ".main > .animation"
        );
        if (canvasdiv && canvasdiv.length > 0) {
          const canvasdivNodes = canvasdiv[0].childNodes;
          if (canvasdivNodes) {
            const canvas = canvasdivNodes[2];
            if (canvas) {
              const w = canvas.width;
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
    <div className="Scrollyteller">
      <section
        className="main Scrollyteller__section"
        style={{
          zIndex: 3,
        }}
      >
        <div className="graphic">
          <div
            className="left-side video"
            key={0}
            style={{
              display: (viewers[0][1])?'flex':'none',
            }}
          >
            <D3Header texts={items[0].map((e) => e.description)} />
          </div>
          <div
            className={isSafarioIos}
            style={{
              display: (viewers[1][1]) ?'flex':'none',
              width: "100%",
              height: "100%",
              transformOrigin: "0px 0px 0px",
            }}
            id={`canvascontainer${0}`}
            key={1}
          >
            <LottiePlayer
              className="left-side"
              id={`lottie0`}
              mode="seek"
              src={items[1][0].data}
              key={0}
              renderer="canvas"
            />
          </div>
          {items.length > 0
            ? cardScroll.map((left, i) => {
                switch (left[0].slideType) {
                  case "video":
                    return (
                      <div
                        className="left-side video"
                        key={i + 1}
                        style={{
                          display: (viewers[i+2][1]) ?'flex':'none',
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
                          display: (viewers[i+2][1]) ?'flex':'none',
                          width: "100%",
                          transformOrigin: "0px 0px 0px",
                        }}
                        id={`canvascontainer${i}`}
                        key={i + 1}
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
                          key={i + 1}
                          style={{
                            display: (viewers[i+2][1]) ?'flex':'none',
                          }}
                        >
                          <WaterAnimation />
                        </div>
                      );
                    } else return null;
                  case "porfolio":
                    return (
                      <div
                        className="left-side video"
                        id={`portafolio${i}`}
                        key={i + 1}
                        style={{display: (viewers[i+2][1]) ?'flex':'none',}}
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
          <div
            className="left-side"
            style={{
              display: (viewers[11][1]) ?'flex':'none',
              marginTop: "30px",
              flexDirection: "column",
            }}
          >
            <Chart waipointId={cityID}></Chart>
          </div>
        </div>

        <div className="scroller" id="scroller">
          <div className="step_header" style={{ height: "270vh" }}>
            <div
              className={className("step step__div")}
              id={`step${0}`}
              key={0}
              
            >
              <WaypointCard
              
                i={0}
                text={items[0].map((e) => e.description)}
                onStepEnter={onStepEnter}
                leftSideDiv={leftSideDiv}
                isLoading={isLoading}
                Ref = {viewers[0][0]}
                />
            </div>
          </div>
          <div className={className("step step__div")} id={`step${1}`} key={1} ref = {viewers[1][0]}>
            <WaypointCard
              i={1}
              text={[items[1][0].description]}
              onStepEnter={onStepEnter}
              leftSideDiv={leftSideDiv}
              isLoading={isLoading}
              Ref = {viewers[1][0]}
            />
          </div>

          {cardScroll.length > 0
            ? cardScroll.map((narr, i) => (
                <div
                  className={className("step step__div", {
                    hiddenclass: i === 7,
                  })}
                  id={`step${i + 2}`}
                  key={i}
                  
                >
                  <WaypointCard
                    i={i + 2}
                    text={narr?.map((card) => card.description)}
                    onStepEnter={onStepEnter}
                    leftSideDiv={leftSideDiv}
                    isLoading={isLoading}
                    Ref = {viewers[i+2][0]}
                  />
                </div>
              ))
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
          <div
            className={className("step step__div")}
            id={`step${11}`}
            key={11}
            
          >
            <WaypointCard
              i={11}
              changeWaypoint={true}
              text={items[2].map((city) => city.description)}
              onStepEnter={onStepCityEnter}
              leftSideDiv={leftSideDiv}
              isLoading={isLoading}
              Ref = {viewers[11][0]}
            />
          </div>
        </div>
      </section>
      {/* <Chart
        texts={items[2].map((e) => (
          <Card>
            <Card.Body>
              <Card.Text>{e.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      /> */}

      <WaterAnimation />
      <div className="div__waterAnimation">
        <div className="div__waterAnimation___flex">
          <div style={{ boxShadow: "2px 2px 10px white" }}>
            <Card style={{ top: "40" }}>
              <Card.Body>
                <Card.Text>
                  To make the next step please book a time in our calendar for a
                  discovery session.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <a
            href="https://calendly.com/sccastleman/"
            target="_blank"
            rel="noopener noreferrer"
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
  );
};

export default Scrollyteller;
