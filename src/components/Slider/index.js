import React from "react";
import "./style.scss";
import { useState, useRef, useCallback, useEffect } from "react";

import Slide from "./Slide";

import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";

const slides = [
  {
    id: 0,
    title: "Discover the\nlifestyle",
    subTitle: "Our collection is fits on every body type.",
    btnContent: "Shop now",
    image: banner1,
  },
  {
    id: 1,
    title: "Find your\nstyle",
    subTitle: "Keep up with the modern designs.",
    btnContent: "Shop now",
    image: banner2,
  },
  {
    id: 2,
    title: "Summer Sale\n60% Off",
    subTitle: "Latest collection has just dropped!",
    btnContent: "Shop now",
    image: banner3,
  },
];

const TIMEOUT_DURATION = 5000;

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef(null);

  const slide = useCallback(() => {
    const nextSlide = (activeSlide + 1) % slides.length;
    setActiveSlide(nextSlide);
  }, [activeSlide]);

  const changeToSlide = (slideIndex) => {
    if (!isAnimating) setActiveSlide(slideIndex);
  };

  useEffect(() => {
    const setSlideTimeout = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(slide, TIMEOUT_DURATION);

      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    };

    setSlideTimeout();

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(setSlideTimeout);
    };
  }, [activeSlide, slide]);

  return (
    <div className="slider__wrapper">
      <div className="controls">
        {slides.map(({ id }) => (
          <div
            key={id}
            onClick={() => changeToSlide(id)}
            className={
              activeSlide === id ? "control control--active" : "control"
            }
          ></div>
        ))}
      </div>
      {slides.map(({ id, title, subTitle, btnContent, image, smallImage }) => (
        <Slide
          key={id}
          title={title}
          subTitle={subTitle}
          btnContent={btnContent}
          image={image}
          smallImage={smallImage}
          isActive={activeSlide === id}
        />
      ))}
    </div>
  );
};

export default Slider;
