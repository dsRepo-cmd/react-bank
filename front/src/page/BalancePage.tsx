import React, { useState, useEffect, useCallback, useReducer } from "react";
import Page from "../component/page/Page";
import Grid from "../component/grid/Grid";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { FIELD_NAME, ResData, SERVER_IP, Transaction } from "../util/consts";
import BalanceList from "../container/balance-list/BalanceList";
import BalancePanel from "../container/balance-panel/BalancePanel";
import { REQUEST_ACTION_TYPE, initialState, reducer } from "../util/reduser";
import Skeleton from "../component/skeleton/Skeleton";
import Loader from "../component/loader/Loader";

const BalancePage: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  const convertData = useCallback(() => {
    return JSON.stringify({
      [FIELD_NAME.USER_ID]: auth?.state.user?.id,
    });
  }, [auth?.state.user?.id]);

  const fetchBalanceData = useCallback(async () => {
    dispatch({ type: REQUEST_ACTION_TYPE.LOADING });
    try {
      const res = await fetch(`${SERVER_IP}/balance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(),
      });

      const data: ResData = await res.json();

      if (res.ok) {
        dispatch({ type: REQUEST_ACTION_TYPE.SUCCESS });

        setBalance(data.session.balance);

        if (data.session.transactions !== null) {
          setTransactions(data.session.transactions);
        }
      }
    } catch (error: any) {
      dispatch({
        type: REQUEST_ACTION_TYPE.SET_FORM_ERRORS,
      });
      console.error("Error fetching data:", error);
    }
  }, [convertData]);

  useEffect(() => {
    fetchBalanceData();
  }, [fetchBalanceData]);

  return (
    <Page>
      <BalancePanel status={state.status} balance={balance} />
      <Grid>
        {state.status === REQUEST_ACTION_TYPE.LOADING && (
          <>
            <Loader />
            <Skeleton border="8px" height={46} width={"95%"} />
            <Skeleton border="8px" height={46} width={"95%"} />
            <Skeleton border="8px" height={46} width={"95%"} />
            <Skeleton border="8px" height={46} width={"95%"} />
            <Skeleton border="8px" height={46} width={"95%"} />
            <Skeleton border="8px" height={46} width={"95%"} />
            <Skeleton border="8px" height={46} width={"95%"} />
            <Skeleton border="8px" height={46} width={"95%"} />
          </>
        )}

        {state.status === REQUEST_ACTION_TYPE.SUCCESS && (
          <BalanceList
            onTransactionClick={(id) => navigate(`/transaction/${id}`)}
            transactions={transactions}
          />
        )}
      </Grid>
    </Page>
  );
};

export default BalancePage;
