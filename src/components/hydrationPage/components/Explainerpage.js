import React, { useEffect, useState } from 'react';
import { iOS, isSafari } from './iosSupport';
import className from 'classnames';
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';

import LottiePlayer from './LottiePlayer';
import WaypointCard from './WaypointCard';

import '../assets/styles/components/Scrollyteller.css';
//import Video from './Video-React-player';
import Videojs from './Videojs';
//import VideoDash from './VideoDash'

const Explainerpage = (props) => {
  const { width, ref } = useResizeDetector();
  const {itemJsonFile} = props;
  const [itemJson, setItemJson] = useState([]);
  useEffect(() => {
    if(!itemJsonFile){
      fetch(process.env.PUBLIC_URL + '/items.json?v=' + Date.now())
      .then((response) => response.json())
      .then((data) => {
        setItemJson(data);
      })
      .catch(function (err) {
        console.log('Error: ', err);
      });
    }else{
      console.log("ExplainerPage:",itemJsonFile)
      setItemJson(itemJsonFile);
    }
  }, [itemJsonFile]);
  const isSafarioIos = className(`left-side ${isSafari() || iOS() ? 'scrollyTeller-lottie-height' : ''}`);

  const [componentNumberstate, setComponentNumberstate] = useState([]);

  

  return (
    <div ref={ref} className="Scrollyteller">
      <section className="main Scrollyteller__section">
        <div className="graphic">
          {itemJson?.length > 0
            ? itemJson.map((left, i) => {
                switch (left[0].slideType) {
                  case 'video':
                    return (
                      <Videojs
                        width = {width}
                        key={i}
                        src={componentNumberstate[i] ? left[0].data : left[0].data}
                        visible={componentNumberstate[i]}
                        display={componentNumberstate[i]}
                      />
                    );
                  case 'text':
                    return (
                      <div
                        className="left-side text video"
                        key={i}
                        style={{
                          display: componentNumberstate[i] ? 'flex' : 'none',
                        }}
                      >
                        <div />
                      </div>
                    );

                  case '2d':
                    return (
                      <div
                        className={isSafarioIos}
                        style={{
                          display: componentNumberstate[i] ? 'flex' : 'none',
                          width: '100%',
                          transformOrigin: '0px 0px 0px',
                        }}
                        id={`canvascontainer${i}`}
                        key={i}
                      >
                        {
                          <LottiePlayer className="left-side" id={`lottie${i}`} mode="seek" src={left[0].data} key={i} renderer="canvas" frames={left[0].frames}/>
                        }
                      </div>
                    );
                  default:
                    return null;
                }
              })
            : null}
        </div>
        <div className="scroller" id="scroller">
          {itemJson?.length > 0
            ? itemJson.map((narr, i) => (
                <WaypointCard
                  key={i}
                  setComponentNumberstate={setComponentNumberstate}
                  componentNumberstate={componentNumberstate}
                  i={i}
                  text={narr?.map((card) => card.description)}
                  isText={narr[0].slideType === 'text'}
                  isFirst={i === 0}
                  isLast={i === itemJson.length - 1}
                />
              ))
            : <WaypointCard
            key={0}
            setComponentNumberstate={setComponentNumberstate}
            componentNumberstate={componentNumberstate}
            i={0}
            text={["Loading"]}
            isText={false}
            isFirst={true}
            isLast={true}
          />
          }
        </div>
      </section>
    </div>
  );
};

export default Explainerpage;
