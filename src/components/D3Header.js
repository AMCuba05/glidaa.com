import React from "react";
import ParticlesAnimation from "./ParticlesAnimation";
import ScrollAnimation from "./ScrollAnimation";

const D3Header = React.memo(({ texts }) => {
  return (
    <div style={{position: "absolute", top: "0", width: "98.8vw" }}>
      <div className="particles__container" style={{ zIndex:10}}>
        <ParticlesAnimation />
        <ScrollAnimation />
      </div>

      <div style={{ height: "50px", display: "flex" }}></div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: "10px",
          zIndex: "100",
        }}
      >
        <p style={{ fontWeight: "bolder", fontSize: "40px" }}>
          <span style={{ color: "#c3c8d6" }}>{"{"}Explainer</span> Page
          <sup style={{ fontWeight: "bolder", fontSize: "20px" }}>&#8482;</sup>
          {"}"}
        </p>
        <div
          className="card"
          style={{
            margin: "20px",
            width: "80%",
            padding: "15px",
            opacity: "0.8",
          }}
        >
          <p style={{ fontWeight: "bolder", fontSize: "20px" }}>{texts[0]}</p>
          <p
            style={{
              fontWeight: "bolder",
              fontSize: "20px",
              color: "#c3c8d6",
            }}
          >
            {texts[1]}
          </p>
          <p style={{ fontWeight: "bolder", fontSize: "20px" }}>{texts[2]}</p>
        </div>
      </div>
    </div>
  );
});

export default D3Header;
