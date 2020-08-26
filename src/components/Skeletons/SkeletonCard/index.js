import React from "react";
import "../../../components/Product/style.scss";
import "./style.scss";

import Skeleton from "react-loading-skeleton";

const SkeletonCard = (props) => {
  return (
    <div className="card">
      <div className="card__content">
        <div className="photo--default"></div>
        <div className="details">
          <span className="details__name">
            <Skeleton width={`100%`} />
          </span>
          <span className="details__price">
            <Skeleton width={`100%`} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
