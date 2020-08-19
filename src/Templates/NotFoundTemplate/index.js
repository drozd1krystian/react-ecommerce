import React from "react";
import Button from "../../components/forms/Button";

import "./style.scss";
import { Link } from "react-router-dom";

const NotFoundTempalte = ({ type, ...otherProps }) => {
  return (
    <>
      <div className="not-found wrap full-height">
        <h1 className="big-header">404</h1>
        <div className="info">Oops! {type} not found! :(</div>
        <Button>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    </>
  );
};

export default NotFoundTempalte;
