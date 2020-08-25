import React from "react";
import "../Product/style.scss";
import "./style.scss";

import Skeleton from "react-loading-skeleton";

const SkeletonCard = (props) => {
  return (
    <div className="card">
      <div className="card__content">
        <div className="photo--default"></div>
        <div className="details">
          <Skeleton width={200} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
