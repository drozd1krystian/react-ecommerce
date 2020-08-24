import React from "react";
import Button from "../../components/forms/Button";

import "./style.scss";
import { Link } from "react-router-dom";

const NotFoundTempalte = ({ type, ...otherProps }) => {
  return (
    <>
      <div className="not__found wrap full__height">
        <h1 className="big__header">404</h1>
        <div className="info">Oops! {type} not found! :(</div>
        <Button>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    </>
  );
};

export default NotFoundTempalte;
