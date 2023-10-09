import React, { useContext, useReducer } from 'react'
import Input from '../../component/input/Input'
import { Button } from '../../component/button/Button'
import Alert from '../../component/alert/Alert'
import {
  FIELD_ERR,
  FIELD_NAME,
  LABLE_NAME,
  PLACEHOLDER_NAME,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
  ResData,
  SERVER_IP,
} from '../../util/consts'
import { AuthContext } from '../../App'
import {
  REQUEST_ACTION_TYPE,
  initialState,
  reducer,
} from '../../util/reduser'

const { NEW_EMAIL, PASSWORD, EMAIL } = FIELD_NAME
// =======================================================================

const ChangeEmailForm: React.FC = () => {
  const auth = useContext(AuthContext)

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
  )

  // check Error =============================================

  const checkError = () => {
    const { newEmail, password } = state.formValues

    const errors = {
      [NEW_EMAIL]: '',
      [PASSWORD]: '',
    }

    if (newEmail.length < 1) {
      errors[NEW_EMAIL] = FIELD_ERR.IS_EMPTY
    } else if (newEmail.length > 30) {
      errors[NEW_EMAIL] = FIELD_ERR.IS_BIG
    } else if (!REG_EXP_EMAIL.test(newEmail)) {
      errors[NEW_EMAIL] = FIELD_ERR.EMAIL
    }

    if (password.length < 1) {
      errors[PASSWORD] = FIELD_ERR.IS_EMPTY
    } else if (!REG_EXP_PASSWORD.test(password)) {
      errors[PASSWORD] = FIELD_ERR.PASSWORD
    }

    dispatch({
      type: REQUEST_ACTION_TYPE.SET_FORM_ERRORS,
      payload: errors,
    })

    return Object.values(errors).every((error) => !error)
  }
  // Check input/submit ===============================================

  const hundleSubmit = () => {
    const check = checkError()

    if (check) changeEmail()
  }

  const handleChange = (name: string, value: string) => {
    dispatch({
      type: REQUEST_ACTION_TYPE.SET_FORM_VALUES,
      payload: {
        ...state.formValues,
        [name]: value,
      },
    })
  }

  // Send Data=============================================

  const changeEmail = async () => {
    try {
      const res = await fetch(
        `http://${SERVER_IP}/settings-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: convertDataEmail(),
        },
      )

      const data: ResData = await res.json()

      if (res.ok) {
        auth?.dispatch({
          type: 'LOGIN',
          payload: {
            token: data.session.token,
            user: data.session.user,
          },
        })

        dispatch({
          type: REQUEST_ACTION_TYPE.SUCCESS,
          payload: true,
        })

        return dispatch({
          type: REQUEST_ACTION_TYPE.SET_ALERT,
          payload: data.message,
        })
      }

      dispatch({
        type: REQUEST_ACTION_TYPE.SUCCESS,
        payload: false,
      })

      dispatch({
        type: REQUEST_ACTION_TYPE.SET_ALERT,
        payload: data.message,
      })
    } catch (error: any) {
      dispatch({
        type: REQUEST_ACTION_TYPE.SET_ALERT,
        payload: error.toString(),
      })
    }
  }

  const convertDataEmail = () => {
    return JSON.stringify({
      [NEW_EMAIL]: state.formValues[NEW_EMAIL],
      [PASSWORD]: state.formValues[PASSWORD],
      [EMAIL]: auth?.state?.user?.email,
    })
  }

  // =======================================================================

  return (
    <>
      <Input
        error={state.formErrors[NEW_EMAIL]}
        name={NEW_EMAIL}
        placeholder={PLACEHOLDER_NAME.NEW_EMAIL}
        label={LABLE_NAME.NEW_EMAIL}
        onChange={(value) => handleChange(NEW_EMAIL, value)}
      />
      <Input
        error={state.formErrors[PASSWORD]}
        onChange={(value) => handleChange(PASSWORD, value)}
        name={PASSWORD}
        placeholder={PLACEHOLDER_NAME.PASSWORD}
        label={LABLE_NAME.OLD_PASSWORD}
        password
      />
      <Button outline onClick={hundleSubmit} small>
        Save Email
      </Button>
      <Alert success={state.data} text={state.alert} />
    </>
  )
}

export default ChangeEmailForm
