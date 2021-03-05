import React, { useEffect } from "react";
import Gallery from "react-grid-gallery";

import image1 from "../assets/images/buttonSML01.png";
import image2 from "../assets/images/buttonSML02.png";
import image3 from "../assets/images/buttonSML03.png";
import image4 from "../assets/images/buttonSML04.png";
import image5 from "../assets/images/buttonSML05.png";
import image6 from "../assets/images/buttonSML06.png";
import image7 from "../assets/images/buttonSML07.png";
import image8 from "../assets/images/buttonSML08.png";
import porfolio01 from "../assets/images/porfolio01.png";
import porfolio02 from "../assets/images/porfolio02.png";
import porfolio03 from "../assets/images/porfolio03.png";
import porfolio04 from "../assets/images/porfolio04.png";
import porfolio05 from "../assets/images/porfolio05.png";
import porfolio06 from "../assets/images/porfolio06.png";
import porfolio07 from "../assets/images/porfolio07.png";
import porfolio08 from "../assets/images/porfolio08.png";
import "../Gallery.css";

const IMAGES = [
  {
    src: porfolio01,
    thumbnail: image1,
    thumbnailWidth: 170,
    thumbnailHeight: 130,
    alt: "Abbott Diagnostics",
    caption: "Abbott Diagnostics",
  },
  {
    src: porfolio02,
    thumbnail: image2,
    thumbnailWidth: 170,
    thumbnailHeight: 130,
    alt: "NSW Government Transport Department",
    caption: "NSW Government Transport Department",
  },
  {
    src: porfolio03,
    thumbnail: image3,
    thumbnailWidth: 170,
    thumbnailHeight: 130,
    alt: "Skycoin",
    caption: "Skycoin",
  },
  {
    src: porfolio04,
    thumbnail: image4,
    thumbnailWidth: 170,
    thumbnailHeight: 130,
    alt: "Reuters",
    caption: "Reuters",
  },
  {
    src: porfolio05,
    thumbnail: image5,
    thumbnailWidth: 170,
    thumbnailHeight: 130,
    alt: "News Ltd",
    caption: "News Ltd",
  },
  {
    src: porfolio06,
    thumbnail: image6,
    thumbnailWidth: 170,
    thumbnailHeight: 130,
    alt: "Governemnet Insurance Regulator",
    caption: "Governemnet Insurance Regulator",
  },
  {
    src: porfolio07,
    thumbnail: image7,
    thumbnailWidth: 170,
    thumbnailHeight: 130,
    alt: "Pharmacy Guild of Australia",
    caption: "Pharmacy Guild of Australia",
  },
  {
    src: porfolio08,
    thumbnail: image8,
    thumbnailWidth: 170,
    thumbnailHeight: 130,
    alt: "Woolworths Supermarkets",
    caption: "Woolworths Supermarkets",
  },
];

const MyGallery = ({ isOpen, lightboxWillClose, isLoad, ID }) => {
  const styleSmall = () =>{
    return ({
      marginLeft: '0px',
      marginTop: '0px',
      cursor: 'pointer',
      width: '100%',
      height: '100%',
    });
 } 
  const tileViewportStyle = () =>{
    return ({
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    });
 } 
  useEffect(() => {
    if (isLoad) {
      document.querySelectorAll(`#${ID}`).forEach((portfolio, i) => {
        portfolio.style.display = "none";
      });
    }
  }, [isLoad, ID]);
  return (
    <div className="gallery">
      <div
        className="gallery__divblock"
        id="gallery"
      >
        <Gallery
          backdropClosesModal={true}
          enableImageSelection={false}
          images={IMAGES}
          isOpen={isOpen}
          lightboxWillClose={lightboxWillClose}
          thumbnailStyle={styleSmall}
          tileViewportStyle={tileViewportStyle}
        />
      </div>
    </div>
  );
};

export default MyGallery;
