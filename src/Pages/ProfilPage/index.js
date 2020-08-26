import React, { useEffect, useState } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { getOrders } from "../../firebase/utils";
import OrderCard from "./../../components/Skeletons/OrderCard";
import { FaRegSadTear } from "react-icons/fa";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const ProfilPage = (props) => {
  const { currentUser } = useSelector(mapState);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const timestampToDate = (timestamp) => {
    return timestamp.toDate().toLocaleDateString();
  };

  useEffect(() => {
    const fetchData = () => {
      if (!currentUser) return;
      setTimeout(async () => {
        try {
          const data = await getOrders(currentUser);
          setOrders(data);
        } catch (e) {
          setOrders([]);
        }
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, [currentUser]);

  return (
    <div className="column">
      {!currentUser && <Redirect to="/" />}
      {orders.length === 0 && loading && (
        <div className="orders">
          {Array(10)
            .fill()
            .map((_, index) => (
              <OrderCard key={index} />
            ))}
        </div>
      )}
      {orders.length === 0 && !loading && (
        <div className="height--full empty">
          <h2 className=" p1 text--center">No orders completed</h2>
          <p className="icon--big text--center ">
            <FaRegSadTear />
          </p>
          <Link to="/" className="btn btn--light btn--round btn--slide">
            <span>Continue Shopping</span>
          </Link>
        </div>
      )}
      {orders.length > 0 && (
        <>
          <h2 className=" p1 text--center">Orders Completed</h2>
          <div className="orders">
            {orders.map((order) => (
              <div className="order">
                <div className="order__header">
                  <span className="field">ID: {order.id}</span>
                  <span className="field">
                    Date: {timestampToDate(order.createdDate)}
                  </span>
                  <span className="field">Payment: {order.payment}</span>
                </div>
                <div className="order__items">
                  {order.cart.map((item) => (
                    <div className="item" key={item.productId}>
                      <div className="item__photo">
                        <img
                          src={item.images[0]}
                          alt={item.productName}
                          className="photo__img"
                        />
                      </div>
                      <div className="item__details">
                        <span className="detail detail--name">
                          {item.productName}
                        </span>
                        <span className="detail">
                          {item.amount}x ${item.salePrice}
                        </span>
                        <span className="detail">
                          ${(item.amount * item.salePrice).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order__summary">
                  <span className="detail detail--total">Total: </span>
                  <span className="detail text--bold">${order.cartTotal} </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilPage;
