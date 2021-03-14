import { css, jsx } from "@emotion/core";

export const narrativeStyle = css`
  img {
    max-width: 100%;
  }

  .scrollyTeller-lottie-height {
    
  }
  .left-side {
    height: 100vh;
    display: none;
    animation: fadeIn ease 3s !important;
    -webkit-animation: fadeIn ease 3s !important;
    -moz-animation: fadeIn ease 3s !important;
    -o-animation: fadeIn ease 3s !important;
    -ms-animation: fadeIn ease 3s !important;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-o-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-ms-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .video {
    transition: opacity ease 1s;
  }

  .graphic {
    flex-basis: 50%;
    position: sticky;
    top: 0;
    width: 100%;
    height: 75vh;
    align-self: flex-start;
  }
  .data {
    font-size: 5rem;
    text-align: center;
  }

  .card-text {
    font-size: 18px !important;
    line-height: 1.3;
  }
  .step {
    text-align: center;
    padding: 10%;
    width: 100%;
    min-height: 100vh;
    height: max-content;
  }
  .card {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
    text-align: center;
    padding: 10%;
    background: #3584f7;
    color: white;
    font-weight: bold;
    width: 100%;
  }
  .blurb {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 3%;
    text-align: center;
    font-size: 24px;
    min-height: 50%;
  }
  .desc {
    display: flex;
    align-items: center;
  }
  .btn {
    color: #575757;
  }
  .card-text-s {
    padding: 10%;
    font-size: 24px !important;
  }

  lottie-player {
    transition: all ease 100ms;
    height: 100vh;
  }

  .main {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 940px) {
    .main {
      grid-template-columns: 1fr 300px;
    }
  }

  @media screen and (max-width: 600px) {
    .main {
      grid-template-columns: 1fr;
    }
    .step {
      position: relative;
      z-index: 100;
      opacity: 0.9;
      padding-top: 50px;
    }
  }
`;
