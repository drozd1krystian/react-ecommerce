import React, { useEffect } from "react";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";

const MainLayout = (props) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="main">
      <Header {...props} />
      {props.children}
      <Footer />
    </div>
  );
};

export default MainLayout;
