import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Page from "../component/page/Page";
import Grid from "../component/grid/Grid";
import StatusBar from "../component/status-bar/StatusBar";
import BackLinkMenu from "../component/back-link-menu/BackLinkMenu";

import { ResData, SERVER_IP, Transaction } from "../util/consts";
import TransactionContent from "../container/transaction-content/TransactionContent";

// ==========================================================

const TransactionPage: React.FC = () => {
  const { transactionId } = useParams<{
    transactionId: string;
  }>();

  const [transaction, setTransaction] = useState<Transaction | null>(null);

  // Send Data=============================================

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`${SERVER_IP}/transaction/${transactionId}`);

        const data: ResData = await res.json();
        console.log(data);
        if (res.ok) {
          setTransaction(data.session.transaction);
        }
      } catch (error: any) {}
    };
    fetchTransaction();
  }, [transactionId]);

  if (transaction === null) {
    return <div>Loading...</div>;
  }

  // ====================================================

  return (
    <Page backgroundColor="#F5F5F7">
      <Grid>
        <StatusBar />
        <BackLinkMenu title="Transaction" />
        <TransactionContent transaction={transaction} />
      </Grid>
    </Page>
  );
};

export default TransactionPage;
