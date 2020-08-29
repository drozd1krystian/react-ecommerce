import React from "react";
import "../../../Pages/ProductDetails/style.scss";
import Skeleton from "react-loading-skeleton";

export const ProductDeatilsCard = () => {
  return (
    <div className="content">
      <div className="images">
        {Array(6)
          .fill()
          .map((_, index) => (
            <div className="img" key={index}>
              <Skeleton width={`100%`} height={400} />
            </div>
          ))}
      </div>
      <div className="description">
        <h2 className="py2 field">
          <Skeleton width={`100%`} height={30} />
        </h2>
        <span className="field">
          <Skeleton width={100} height={30} />
        </span>
        <p className="py2 field">
          <Skeleton width={`100%`} height={20} />
          <Skeleton width={`100%`} height={20} />
          <Skeleton width={`100%`} height={20} />
          <Skeleton width={`100%`} height={20} />
          <Skeleton width={`100%`} height={20} />
          <Skeleton width={`100%`} height={20} />
          <Skeleton width={`100%`} height={20} />
        </p>
        <p className="field">
          <Skeleton width={`100%`} height={20} />
        </p>
        <div className="description__sizes mb2">
          {Array(6)
            .fill()
            .map((_, index) => (
              <Skeleton width={`33.333%`} height={50} key={index} />
            ))}
        </div>
        <Skeleton width={`100%`} height={50} />
      </div>
    </div>
  );
};
