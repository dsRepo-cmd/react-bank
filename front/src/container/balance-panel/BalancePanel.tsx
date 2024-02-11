import React from "react";
import cl from "./BalancePanel.module.css";
import { useNavigate } from "react-router-dom";
import { REQUEST_ACTION_TYPE } from "../../util/reduser";

interface BalancePanelProps {
  balance: number;
  status: REQUEST_ACTION_TYPE;
}

const BalancePanel: React.FC<BalancePanelProps> = ({ balance, status }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={cl.back}>
        <div className={cl.header}>
          <div
            onClick={() => navigate("/settings")}
            className={cl.settings}
          ></div>
          <p className={cl.title}>Main wallet</p>
          <div
            onClick={() => navigate("/notifications")}
            className={cl.notifications}
          ></div>
        </div>

        {status === REQUEST_ACTION_TYPE.LOADING && (
          <h2 className={cl.balance}>Loading...</h2>
        )}

        {status === REQUEST_ACTION_TYPE.SUCCESS && (
          <h1 className={cl.balance}>$ {balance.toFixed(2)}</h1>
        )}

        <div className={cl.buttons}>
          <div onClick={() => navigate("/recive")} className={cl.recive}></div>
          <div onClick={() => navigate("/send")} className={cl.send}></div>
          <span className={cl.buttons__text}>Receive</span>
          <span className={cl.buttons__text}>Send</span>
        </div>
      </div>
    </>
  );
};

export default BalancePanel;
