import React from "react";
// import { Canvas, useFrame } from 'react-three-fiber';
// import { Helmet } from 'react-helmet';
import * as THREE from "three";
import "../../styles.css";
import "intersection-observer";
import Scrollyteller from "../../components/Scrollyteller.js";
// COMPONENTS...
import StoreyTeller from "../storeyTeller";

export default function Content() {
  return (
    <>
      <div>
        <Scrollyteller />
      </div>
    </>
  );
}
