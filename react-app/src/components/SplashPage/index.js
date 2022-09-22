import React from "react";
import "./SplashPage.css";
import { useEffect, useState } from "react";
const SplashPage = () => {
  const [url, setUrl] = useState(
    "https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png"
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const scrollImg = [
      "https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png",
      "https://www.instagram.com/static/images/homepage/screenshots/screenshot3.png/94edb770accf.png",
      "https://www.instagram.com/static/images/homepage/screenshots/screenshot2.png/4d62acb667fb.png",
    ];

    let scroll = setInterval(() => {
      if (index === 2) {
        setIndex(0);
      } else {
        setIndex((index) => index + 1);
      }
      return setUrl(scrollImg[index]);
    }, 3500);
    return () => clearInterval(scroll);
  }, [index, url]);

  return (
    <div className="splash-container">
      <img
        src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png"
        alt="image"
      />
      <img className="image-slider" src={url} alt="scroll" />
    </div>
  );
};

export default SplashPage;
