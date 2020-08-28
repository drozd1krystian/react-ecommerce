import React, { useRef, useState, useEffect } from "react";
import "./style.scss";

import Product from "../../components/Product/index";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import SkeletonCard from "../Skeletons/SkeletonCard";

import list from "../../assets/nike20.json";

const Carousel = ({ header }) => {
  const scroller = useRef(null);
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const getRandomProducts = () => {
      let arr = [];
      if (list.length > 0) {
        for (let i = 0; i < 7; i++) {
          arr.push(list[i]);
        }
      }
      setCarouselItems(arr);
    };
    getRandomProducts();
  }, [setCarouselItems]);

  const scrollRight = () => {
    scroller.current.scrollBy({
      left: Math.floor(scroller.current.offsetWidth * 23 * 0.01),
      behavior: "smooth",
    });
  };
  const scrollLeft = () => {
    scroller.current.scrollBy({
      left: -Math.floor(scroller.current.offsetWidth * 23 * 0.01),
      behavior: "smooth",
    });
  };

  return (
    <>
      <h3 className="p1">{header}</h3>
      <div className="carousel">
        <div className="carousel__items" ref={scroller}>
          {carouselItems.length > 0
            ? carouselItems.map((el, index) => {
                return <Product key={index} product={el} />;
              })
            : Array(7)
                .fill()
                .map((_, index) => <SkeletonCard key={index} />)}
        </div>
        <div className="btn--left" onClick={scrollLeft}>
          <AiOutlineLeft />
        </div>
        <div className="btn--right" onClick={scrollRight}>
          <AiOutlineRight />
        </div>
      </div>
    </>
  );
};

Carousel.defaultProps = {
  list: [],
};

export default Carousel;
