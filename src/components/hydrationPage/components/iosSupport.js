export const iOS = () => {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};

export const isSafari = () => {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("safari") !== -1) {
    if (ua.indexOf("chrome") > -1) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
