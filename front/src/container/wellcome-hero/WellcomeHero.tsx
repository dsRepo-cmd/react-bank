import React from "react";
import cl from "./WellcomeHero.module.css";
import safe from "./svg/safe.png";
const WellcomeHero: React.FC = () => {
  return (
    <div className={cl.hero}>
      <h1 className={cl.title}>Hello!</h1>
      <p className={cl.text}>Wellcome to bank app</p>

      <img className={cl.img} src={safe} alt="safe" />
    </div>
  );
};

export default WellcomeHero;
