import React, { useEffect, useState, useReducer } from "react";
import Page from "../component/page/Page";
import BackLink from "../component/back-link-menu/BackLinkMenu";
import Grid from "../component/grid/Grid";
import StatusBar from "../component/status-bar/StatusBar";
import Input from "../component/input/Input";
import PaymentSystemList from "../container/payment-system-list/PaymentSystemList";
import {
  BACKGROUND_COLOR,
  FIELD_ERR,
  FIELD_NAME,
  PLACEHOLDER_NAME,
  REG_EXP_MONEY,
  ResData,
  SERVER_IP,
} from "../util/consts";
import { AuthContext } from "../App";
import Alert from "../component/alert/Alert";
import { REQUEST_ACTION_TYPE, initialState, reducer } from "../util/reduser";
import FieldTitle from "../component/field-title/FieldTitle";
import Divider from "../component/divider/Divider";

const { SUM, EMAIL, PAY_SYSTEM } = FIELD_NAME;

// =======================================================================

const RecivePage: React.FC = () => {
  const auth = React.useContext(AuthContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [isDataSent, setIsDataSent] = useState(false);

  const checkError = function () {
    const { [SUM]: amount } = state.formValues;
    const errors = {
      [SUM]: "",
    };

    if (amount.length < 1) {
      errors[SUM] = FIELD_ERR.IS_EMPTY;
    } else if (amount.length > 8) {
      errors[SUM] = FIELD_ERR.IS_BIG;
    } else if (!REG_EXP_MONEY.test(amount)) {
      errors[SUM] = FIELD_ERR.MONEY;
    }

    dispatch({
      type: REQUEST_ACTION_TYPE.SET_FORM_ERRORS,
      payload: errors,
    });

    return Object.values(errors).every((error) => !error);
  };

  const hundleSubmit = function (name: string, value: string) {
    const check = checkError();
    if (check) {
      dispatch({
        type: REQUEST_ACTION_TYPE.SET_FORM_VALUES,
        payload: {
          ...state.formValues,
          [name]: value,
        },
      });
      setIsDataSent(true);
    }
  };

  const handleChange = function (name: string, value: string) {
    dispatch({
      type: REQUEST_ACTION_TYPE.SET_FORM_VALUES,
      payload: {
        ...state.formValues,
        [name]: value,
      },
    });
  };

  const fetchData = async function () {
    try {
      const res = await fetch(`http://${SERVER_IP}/recive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(),
      });

      const data: ResData = await res.json();

      if (res.ok) {
        dispatch({
          type: REQUEST_ACTION_TYPE.SUCCESS,
          payload: true,
        });

        return dispatch({
          type: REQUEST_ACTION_TYPE.SET_ALERT,
          payload: data.message,
        });
      }

      dispatch({
        type: REQUEST_ACTION_TYPE.SUCCESS,
        payload: false,
      });

      dispatch({
        type: REQUEST_ACTION_TYPE.SET_ALERT,
        payload: data.message,
      });
    } catch (error: any) {
      dispatch({
        type: REQUEST_ACTION_TYPE.SET_ALERT,
        payload: error.toString(),
      });
    }
  };

  const convertData = function () {
    return JSON.stringify({
      [SUM]: Number(state.formValues[SUM]),
      [EMAIL]: auth?.state.user?.email,
      [PAY_SYSTEM]: state.formValues[PAY_SYSTEM],
    });
  };

  useEffect(() => {
    if (isDataSent) {
      fetchData();
      setIsDataSent(false);
    }
  }, []);

  return (
    <Page backgroundColor={BACKGROUND_COLOR.LIGHT_WHITE}>
      <Grid>
        <StatusBar />
        <BackLink title="Receive" />
        <FieldTitle text="Receive amount" />
        <Input
          error={state.formErrors[SUM]}
          name={SUM}
          placeholder={PLACEHOLDER_NAME.AMOUNT}
          onChange={(value) => handleChange(SUM, value)}
        />
        <Divider />
        <FieldTitle text="Payment system" />

        <PaymentSystemList onChange={hundleSubmit} />
        <Alert success={state.data} text={state.alert} />
      </Grid>
    </Page>
  );
};

export default RecivePage;
