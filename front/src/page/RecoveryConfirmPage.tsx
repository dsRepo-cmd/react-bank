import React, { useReducer } from 'react'
import Page from '../component/page/Page'
import BackLink from '../component/back-link-menu/BackLinkMenu'
import Header from '../component/header/Header'
import Input from '../component/input/Input'
import { Button } from '../component/button/Button'
import Alert from '../component/alert/Alert'
import Grid from '../component/grid/Grid'
import {
  FIELD_ERR,
  FIELD_NAME,
  LABLE_NAME,
  PLACEHOLDER_NAME,
  REG_EXP_PASSWORD,
  ResData,
  SERVER_IP,
} from '../util/consts'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../component/status-bar/StatusBar'
import { AuthContext } from '../App'
import {
  REQUEST_ACTION_TYPE,
  initialState,
  reducer,
} from '../util/reduser'

const { CODE, PASSWORD, NEW_PASSWORD } = FIELD_NAME

// ===========================================================

const RecoveryConfirmPage: React.FC = () => {
  const auth = React.useContext(AuthContext)

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const navigate = useNavigate()

  // check Error ===============================================

  const checkError = () => {
    const { code, password } = state.formValues
    const errors = {
      [CODE]: '',
      [PASSWORD]: '',
    }

    if (code.length < 1) {
      errors[CODE] = FIELD_ERR.IS_EMPTY
    } else if (code.length > 6) {
      errors[CODE] = FIELD_ERR.IS_BIG
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

  // check Input/Submit  ===============================================

  const hundleSubmit = () => {
    const check = checkError()

    if (check) recoveryAcc()
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

  const recoveryAcc = async () => {
    try {
      const res = await fetch(
        `http://${SERVER_IP}/recovery-confirm`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: convertData(),
        },
      )

      const data: ResData = await res.json()

      if (res.ok) {
        if (auth) {
          auth.dispatch({
            type: 'LOGIN',
            payload: {
              token: data.session.token,
              user: data.session.user,
            },
          })
        }
        navigate('/balance')
      }

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

  const convertData = () => {
    return JSON.stringify({
      [CODE]: Number(state.formValues[CODE]),
      [PASSWORD]: state.formValues[PASSWORD],
    })
  }

  // ===========================================================

  return (
    <Page>
      <Grid>
        <StatusBar />
        <BackLink />

        <Header
          title="Confirm account"
          text="Write the code you received"
        />

        <Input
          error={state.formErrors[CODE]}
          name={CODE}
          placeholder={PLACEHOLDER_NAME.CODE}
          label="Code"
          onChange={(value) => handleChange(CODE, value)}
        />

        <Input
          error={state.formErrors[PASSWORD]}
          name={NEW_PASSWORD}
          placeholder={PLACEHOLDER_NAME.NEW_PASSWORD}
          label={LABLE_NAME.NEW_PASSWORD}
          onChange={(value) =>
            handleChange(PASSWORD, value)
          }
          password
        />

        <Button onClick={hundleSubmit}>
          Restore password
        </Button>

        <Alert text={state.alert} />
      </Grid>
    </Page>
  )
}

export default RecoveryConfirmPage
