import React from "react";

import "../VideoBackground.css";

const VideoBackground = React.memo(({ src }) => {
  const mobile = require(`../assets/images/${src}-mobile.gif`);
  const pc = require(`../assets/images/${src}.gif`);

  return (
    <div style={{ position: "absolute", top: "0", width: "98.8vw" }}>
      <picture>
        <source srcSet={mobile} media="(max-width: 650px)"></source>
        <source srcSet={pc}></source>
        <img
          srcSet={pc}
          alt="videobackground"
          style={{ width: "100%", height: "100vh" }}
        ></img>
      </picture>
    </div>
  );
});

export default VideoBackground;
