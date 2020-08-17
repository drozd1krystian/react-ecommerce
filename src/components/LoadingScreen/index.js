import React from "react";
import "./style.scss";

const LoadingScreen = (props) => {
  return (
    <div className="loading-screen">
      <div className="loading-thumb">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
