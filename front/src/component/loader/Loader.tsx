import React from "react";
import cl from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={cl.loader_container}>
      <div className={cl.lds_default}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
