import React from 'react';
import * as dashjss from 'dashjs';

export default class VideoPlayer extends React.Component {
  state = {};
  componentDidUpdate() {
    const url = 'https://explainerpage-assets.s3.amazonaws.com/salmonvideos/00topfull.mp4';
    const video = this.player;
    const Dashjs = dashjss.MediaPlayer().create();
    Dashjs.initialize(video, url, true);
  }
  render() {
    return (
      <div>
        <video ref={(player) => (this.player = player)} autoPlay={true} muted={true} controls />
      </div>
    );
  }
}
