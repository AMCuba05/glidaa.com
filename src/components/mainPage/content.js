import React from "react";
// import { Canvas, useFrame } from 'react-three-fiber';
// import { Helmet } from 'react-helmet';
import * as THREE from "three";
import "../../styles.css";
import "intersection-observer";
import Scrollyteller from "../../components/Scrollyteller.js";
import NewScrollyteller from '../../components/NewScrollyteller'
// COMPONENTS...
import StoreyTeller from "../storeyTeller";
import AnimationPlay from "../AnimationPlay";

export default function Content() {
  return (
    <>
      <div>
        {/* <Scrollyteller /> */}
        <NewScrollyteller/>
      </div>
    </>
  );
}
