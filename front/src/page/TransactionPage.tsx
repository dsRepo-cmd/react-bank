import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Page from "../component/page/Page";
import Grid from "../component/grid/Grid";
import BackLinkMenu from "../component/back-link-menu/BackLinkMenu";

import { ResData, SERVER_IP, Transaction } from "../util/consts";
import TransactionContent from "../container/transaction-content/TransactionContent";
import { REQUEST_ACTION_TYPE, initialState, reducer } from "../util/reduser";
import Loader from "../component/loader/Loader";
import Skeleton from "../component/skeleton/Skeleton";

// ==========================================================

const TransactionPage: React.FC = () => {
  const { transactionId } = useParams<{
    transactionId: string;
  }>();

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  // Send Data=============================================

  useEffect(() => {
    const fetchTransaction = async () => {
      dispatch({ type: REQUEST_ACTION_TYPE.LOADING });

      try {
        const res = await fetch(`${SERVER_IP}/transaction/${transactionId}`);

        const data: ResData = await res.json();
        console.log(data);
        if (res.ok) {
          setTransaction(data.session.transaction);
          dispatch({ type: REQUEST_ACTION_TYPE.SUCCESS });
        }
      } catch (error: any) {}
    };
    fetchTransaction();
  }, [transactionId]);

  if (transaction === null) {
    return (
      <Page backgroundColor="#F5F5F7">
        <Grid>
          <BackLinkMenu title="Transaction" />
          <Skeleton height={40} width={160} marginBottom="32px" />
          <Skeleton border="12px" height={140} width={"100%"} />
          <Loader />;
        </Grid>
      </Page>
    );
  }

  // ====================================================

  return (
    <Page backgroundColor="#F5F5F7">
      <Grid>
        {state.status === REQUEST_ACTION_TYPE.LOADING && <Loader />}

        <BackLinkMenu title="Transaction" />
        <TransactionContent transaction={transaction} />
      </Grid>
    </Page>
  );
};

export default TransactionPage;
