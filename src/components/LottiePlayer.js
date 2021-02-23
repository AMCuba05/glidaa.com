import React from "react";
import "@lottiefiles/lottie-player";
import { Player, Controls } from '@lottiefiles/react-lottie-player';

const LottiePlayer = React.memo((props) => {
  console.log(props)
  return (
    <>
    {/* <Player
      id={props.id}
      mode={props.mode}
      src={props.src}
      key={props.key}
      renderer={props.renderer}
      autoplay
      loop
      style={{ height: '500px', width: '500px' }}
    >
       <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
    </Player> */}
      <lottie-player 
      {...props}
      ></lottie-player>
    </>
  );
});

export default LottiePlayer;
