import React, { useEffect, useState } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getOrders } from "../../firebase/utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const ProfilPage = (props) => {
  const { currentUser } = useSelector(mapState);
  const [orders, setOrders] = useState([]);

  const timestampToDate = (timestamp) => {
    return timestamp.toDate().toLocaleDateString();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      try {
        const data = await getOrders(currentUser);
        setOrders(data);
      } catch (e) {
        setOrders([]);
      }
    };
    fetchData();
  }, [currentUser]);

  return (
    <div className="column">
      {!currentUser && <Redirect to="/" />}
      {orders.length === 0 && (
        <h2 className=" p1 text--center">No orders completed</h2>
      )}
      {orders.length > 0 && (
        <>
          <h2 className=" p1 text--center">Orders Completed</h2>
          <div className="orders">
            {orders.map((order) => (
              <div className="order" key={order.id}>
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
