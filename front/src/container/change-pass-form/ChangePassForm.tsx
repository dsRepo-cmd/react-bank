import React, { useContext, useReducer } from "react";
import Input from "../../component/input/Input";
import { Button } from "../../component/button/Button";
import Alert from "../../component/alert/Alert";
import {
  FIELD_ERR,
  FIELD_NAME,
  LABLE_NAME,
  PLACEHOLDER_NAME,
  REG_EXP_PASSWORD,
  ResData,
  SERVER_IP,
} from "../../util/consts";
import { AuthContext } from "../../App";
import { REQUEST_ACTION_TYPE, initialState, reducer } from "../../util/reduser";

const { NEW_PASSWORD, EMAIL, PASSWORD } = FIELD_NAME;

// =======================================================================

const ChangePassForm: React.FC = () => {
  const auth = useContext(AuthContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  // check Error================================================================
  const checkError = () => {
    const { newPassword, password } = state.formValues;

    const errors = {
      [PASSWORD]: "",
      [NEW_PASSWORD]: "",
    };

    if (password.length < 1) {
      errors[PASSWORD] = FIELD_ERR.IS_EMPTY;
    } else if (!REG_EXP_PASSWORD.test(password)) {
      errors[PASSWORD] = FIELD_ERR.PASSWORD;
    }
    if (newPassword.length < 1) {
      errors[NEW_PASSWORD] = FIELD_ERR.IS_EMPTY;
    } else if (!REG_EXP_PASSWORD.test(password)) {
      errors[NEW_PASSWORD] = FIELD_ERR.PASSWORD;
    }

    dispatch({
      type: REQUEST_ACTION_TYPE.SET_FORM_ERRORS,
      payload: errors,
    });

    return Object.values(errors).every((error) => !error);
  };
  // check input/submit ================================================================

  const hundleSubmit = () => {
    const check = checkError();

    if (check) changePassword();
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

  const changePassword = async () => {
    try {
      const res = await fetch(
        `${SERVER_IP}/settings-password`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: convertDataPassword(),
        }
      );

      const data: ResData = await res.json();

      if (res.ok) {
        auth?.dispatch({
          type: "LOGIN",
          payload: {
            token: data.session.token,
            user: data.session.user,
          },
        });

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

  const convertDataPassword = () => {
    return JSON.stringify({
      [NEW_PASSWORD]: state.formValues[NEW_PASSWORD],
      [PASSWORD]: state.formValues[PASSWORD],
      [EMAIL]: auth?.state.user?.email,
    });
  };

  // =======================================================================

  return (
    <>
      <Input
        error={state.formErrors[PASSWORD]}
        name={PASSWORD}
        placeholder={PLACEHOLDER_NAME.PASSWORD}
        label={LABLE_NAME.OLD_PASSWORD}
        onChange={(value) => handleChange(PASSWORD, value)}
        password
      />
      <Input
        error={state.formErrors[NEW_PASSWORD]}
        onChange={(value) => handleChange(NEW_PASSWORD, value)}
        name={NEW_PASSWORD}
        placeholder={PLACEHOLDER_NAME.NEW_PASSWORD}
        label={LABLE_NAME.NEW_PASSWORD}
        password
      />
      <Button outline onClick={hundleSubmit} small>
        Save Password
      </Button>
      <Alert success={state?.data} text={state.alert} />
    </>
  );
};

export default ChangePassForm;
