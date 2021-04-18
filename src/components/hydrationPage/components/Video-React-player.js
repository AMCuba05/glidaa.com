import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
const Video = (props) => {
  const { src, display } = props;
  const [playing, setPlaying] = useState(true);
  const [loop, setLoop] = useState(true);
  const [muted, setMuted] = useState(true);
  const [load, setLoad] = useState(false);
  const handlePlay = () => {
    console.log('onPlay');
    setPlaying(true);
  };
  const handlePause = () => {
    console.log('onPause');
    setPlaying(false);
  };
  const handleEnded = () => {
    console.log('onEnded');
    setPlaying(loop);
  };
  console.log('url', src);

  return (
    <div
      className="left-side video"
      style={{
        display: display || !display & !load ? 'flex' : 'none',
      }}
    >
      <div className="video__div">
        <div style={{ width: '100%', height: '100%' }}>
          <ReactPlayer
            className="react-player"
            width="100%"
            height="100%"
            muted={muted}
            url={src}
            playing={playing}
            loop={loop}
            onReady={() => {
              setLoad(true);
              console.log('onReady', src);
            }}
            //onStart={() => console.log('onStart')}
            onPlay={handlePlay}
            onPause={handlePause}
            onBuffer={() => console.log('onBuffer')}
            onSeek={(e) => console.log('onSeek', e)}
            onEnded={handleEnded}
            onError={(e) => console.log('onError', e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Video;
