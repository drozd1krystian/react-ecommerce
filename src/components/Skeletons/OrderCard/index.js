import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../../Pages/CheckoutPage/style.scss";

const OrderCard = () => {
  return (
    <div className="order">
      <div className="order__header">
        <Skeleton width={200} />
        <Skeleton width={200} />
        <Skeleton width={200} />
      </div>
      <div className="order__items">
        <div className="item">
          <div className="item__photo">
            <Skeleton width={`100%`} height={100} />
          </div>
          <div className="item__details">
            <span className="detail detail--name">
              <Skeleton width={200} />
            </span>
            <span className="detail">
              <Skeleton width={200} />
            </span>
            <span className="detail">
              <Skeleton width={200} />
            </span>
          </div>
        </div>
      </div>
      <div className="order__summary">
        <span className="detail detail--total">
          <Skeleton width={100} />
        </span>
        <span className="detail text--bold">
          <Skeleton width={100} />
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
