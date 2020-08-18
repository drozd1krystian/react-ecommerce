import React, { useState, useEffect } from "react";
import "./style.scss";
import { useSelector } from "react-redux";

const mapState = ({ cart }) => ({
  loadingScreen: cart.loadingScreen,
});

const LoadingScreen = (props) => {
  const [isLoading, setIsLoading] = useState(null);
  const { loadingScreen } = useSelector(mapState);

  useEffect(() => {
    if (loadingScreen.isLoading) setIsLoading(true);
    else setIsLoading(false);
  }, [isLoading, loadingScreen]);

  return (
    <div className="loader">
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-thumb">
            <div className="loading-bar"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
