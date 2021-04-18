import React, { useEffect, useRef, useState } from 'react';
import '@lottiefiles/lottie-player';
import { create } from '@lottiefiles/lottie-interactivity';

const LottiePlayer = React.memo((props) => {
  const { frames, src, mode, renderer,id } = props;
  const [change, setChange] = useState(false)
  const ref = useRef();
  useEffect(() => {
    setChange(true)
  }, [src,frames])
  useEffect(() => {
    console.log("Change",change)
    if(change){
      setChange(!change)
    }
    if (ref.current) {
      const lottie = ref.current;
      console.log('Lottie', lottie);
      lottie.addEventListener('load', function (e) {
        create({
          mode: 'scroll',
          autoplay: false,
          player: lottie,
          container: `#step${Math.trunc(id.split('lottie')[1])}`,
          actions: [
            {
              visibility: [0, 0.8],
              type: 'seek',
              frames: [0, frames],
            },
          ],
        });
      });
      lottie.addEventListener('frame', function (e) {
        const canvasdiv = lottie.shadowRoot.querySelectorAll('.main > .animation');
        if (canvasdiv && canvasdiv.length > 0) {
          const canvasdivNodes = canvasdiv[0].childNodes;
          if (canvasdivNodes) {
            const canvas = canvasdivNodes[2];
            if (canvas) {
              lottie.resize();
            }
          }
        }
      });
    }
  }, [src, frames, ref.current,id,change]);


  return (
    <>
    {
      frames && src && !change?
      <lottie-player
      ref={ref}
      frames={frames}
      src={src}
        mode={mode}
        renderer={renderer}
        rendererSettings={{
          clearCanvas: true,
          resizeMode: 'center',
        }}
        ></lottie-player>:null
      }
    </>
  );
});

export default LottiePlayer;
