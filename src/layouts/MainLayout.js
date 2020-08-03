import React from "react";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";

const MainLaout = (props) => {
  return (
    <div className="main">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default MainLaout;
