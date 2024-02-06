import React, { useReducer } from "react";
import Page from "../component/page/Page";
import BackLink from "../component/back-link-menu/BackLinkMenu";
import Header from "../component/header/Header";
import Input from "../component/input/Input";
import { Button } from "../component/button/Button";
import Alert from "../component/alert/Alert";
import {
  FIELD_ERR,
  FIELD_NAME,
  LABLE_NAME,
  PLACEHOLDER_NAME,
  REG_EXP_EMAIL,
  ResData,
  SERVER_IP,
} from "../util/consts";
import Grid from "../component/grid/Grid";
import { useNavigate } from "react-router-dom";
import StatusBar from "../component/status-bar/StatusBar";
import { REQUEST_ACTION_TYPE, initialState, reducer } from "../util/reduser";

const { EMAIL } = FIELD_NAME;

// ==============================================================

const RecoveryPage: React.FC = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  // checkError===============================================

  const checkError = () => {
    const { email } = state.formValues;
    const errors = {
      [EMAIL]: "",
    };

    if (email.length < 1) {
      errors[EMAIL] = FIELD_ERR.IS_EMPTY;
    } else if (email.length > 30) {
      errors[EMAIL] = FIELD_ERR.IS_BIG;
    } else if (!REG_EXP_EMAIL.test(email)) {
      errors[EMAIL] = FIELD_ERR.EMAIL;
    }

    dispatch({
      type: REQUEST_ACTION_TYPE.SET_FORM_ERRORS,
      payload: errors,
    });

    return Object.values(errors).every((error) => !error);
  };

  // check Input/Submit==================================================

  const hundleSubmit = () => {
    const check = checkError();

    if (check) sendData();
  };

  const handleChange = (name: string, value: string) => {
    dispatch({
      type: REQUEST_ACTION_TYPE.SET_FORM_VALUES,
      payload: {
        ...state.formValues,
        [name]: value,
      },
    });
  };

  // Send Data=============================================

  const sendData = async () => {
    try {
      const res = await fetch(`${SERVER_IP}/recovery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(),
      });

      const data: ResData = await res.json();

      if (res.ok) {
        if (data.code) window.localStorage.setItem("code", data.code);

        navigate("/recovery-confirm");
      }

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

  const convertData = () => {
    return JSON.stringify({
      [EMAIL]: state.formValues[EMAIL],
    });
  };

  // ==============================================================

  return (
    <Page>
      <Grid>
        <StatusBar />
        <BackLink />

        <Header title="Recover password" text="Choose a recovery method" />

        <Input
          error={state.formErrors[EMAIL]}
          name={EMAIL}
          placeholder={PLACEHOLDER_NAME.EMAIL}
          label={LABLE_NAME.EMAIL}
          onChange={(value) => handleChange(EMAIL, value)}
        />

        <Button onClick={hundleSubmit}>Send code</Button>

        <Alert text={state.alert} />
      </Grid>
    </Page>
  );
};
export default RecoveryPage;
