import React from 'react';

import '../assets/styles/components/VideoBackground.css';

const VideoBackground = React.memo(({ src }) => {
  return (
    <div className="video__div">
      <picture>
        <img src={src} alt="videobackground" style={{ width: '100%', height: '100vh' }}></img>
      </picture>
    </div>
  );
});

export default VideoBackground;
