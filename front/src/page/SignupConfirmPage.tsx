import React, { useReducer } from "react";
import Page from "../component/page/Page";
import BackLink from "../component/back-link-menu/BackLinkMenu";
import Header from "../component/header/Header";
import Input from "../component/input/Input";
import { Button } from "../component/button/Button";
import Alert from "../component/alert/Alert";
import Grid from "../component/grid/Grid";
import {
  FIELD_ERR,
  FIELD_NAME,
  LABLE_NAME,
  PLACEHOLDER_NAME,
  ResData,
  SERVER_IP,
} from "../util/consts";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { REQUEST_ACTION_TYPE, initialState, reducer } from "../util/reduser";
import { AUTH_ACTION_TYPE } from "../util/authReduser";
import Loader from "../component/loader/Loader";

const { CODE } = FIELD_NAME;

// ==============================================================

const SignupConfirmPage: React.FC = () => {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  // set Error ================================================

  const emailCode = window.localStorage.getItem("code");

  const checkError = () => {
    const { code } = state.formValues;

    const errors = {
      [CODE]: "",
    };

    if (code.length < 1) {
      errors[CODE] = FIELD_ERR.IS_EMPTY;
    } else if (code.length > 6) {
      errors[CODE] = FIELD_ERR.IS_EMPTY;
    }

    dispatch({
      type: REQUEST_ACTION_TYPE.SET_FORM_ERRORS,
      payload: errors,
    });

    return Object.values(errors).every((error) => !error);
  };
  // Submit / input================================================

  const hundleSubmit = () => {
    const check = checkError();

    if (check) sendCode();
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
  const sendCode = async () => {
    dispatch({ type: REQUEST_ACTION_TYPE.LOADING });
    try {
      const res = await fetch(`${SERVER_IP}/signup-confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(),
      });

      const data: ResData = await res.json();

      if (res.ok) {
        if (auth) {
          auth.dispatch({
            type: AUTH_ACTION_TYPE.LOGIN,
            payload: {
              token: data.session.token,
              user: data.session.user,
            },
          });
        }
        dispatch({ type: REQUEST_ACTION_TYPE.SUCCESS });
        navigate("/balance");
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
      [CODE]: Number(state.formValues[CODE]),
      token: auth?.state.token,
    });
  };

  // ==============================================================

  return (
    <Page>
      <Grid>
        {state.status === REQUEST_ACTION_TYPE.LOADING && <Loader />}
        <BackLink />

        <Header title="Confirm account" text="Write the code you received" />
        <Input
          error={state.formErrors[CODE]}
          name={CODE}
          placeholder={PLACEHOLDER_NAME.CODE}
          label={LABLE_NAME.CODE}
          onChange={(value) => handleChange(CODE, value)}
        />

        <Button onClick={hundleSubmit}>Confirm</Button>
        {emailCode && <div>{emailCode}</div>}
        <Alert text={state.alert} />
      </Grid>
    </Page>
  );
};

export default SignupConfirmPage;
