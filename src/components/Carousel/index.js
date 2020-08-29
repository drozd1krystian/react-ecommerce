import React, { useRef } from "react";
import "./style.scss";

import Product from "../../components/Product/index";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import SkeletonCard from "../Skeletons/SkeletonCard";

const Carousel = ({ header, list }) => {
  const scroller = useRef(null);

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
          {list.length > 0
            ? list.map((el, index) => {
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
