import React, { useReducer } from 'react'
import Page from '../../component/page/Page'
import BackLink from '../../component/back-link-menu/BackLinkMenu'

import Input from '../../component/input/Input'
import { Button } from '../../component/button/Button'
import Prefix from '../../component/prefix/Prefix'
import Alert from '../../component/alert/Alert'
import Grid from '../../component/grid/Grid'
import StatusBar from '../../component/status-bar/StatusBar'
import { AuthContext } from '../../App'
import {
  BACKGROUND_COLOR,
  FIELD_ERR,
  FIELD_NAME,
  LABLE_NAME,
  PLACEHOLDER_NAME,
  REG_EXP_EMAIL,
  REG_EXP_MONEY,
  ResData,
  SERVER_IP,
} from '../../util/consts'
import {
  REQUEST_ACTION_TYPE,
  initialState,
  reducer,
} from '../../util/reduser'

const { PAY_TO, SUM, EMAIL } = FIELD_NAME
// ===========================================================

const SendPage: React.FC = () => {
  const auth = React.useContext(AuthContext)

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
  )

  // check Error =============================================

  const checkError = (): boolean => {
    const { [PAY_TO]: email, [SUM]: amount } =
      state.formValues
    const errors = {
      [PAY_TO]: '',
      [SUM]: '',
    }

    if (email.length < 1) {
      errors[PAY_TO] = FIELD_ERR.IS_EMPTY
    } else if (email.length > 30) {
      errors[PAY_TO] = FIELD_ERR.IS_BIG
    } else if (!REG_EXP_EMAIL.test(email)) {
      errors[PAY_TO] = FIELD_ERR.EMAIL
    }

    if (amount.length < 1) {
      errors[SUM] = FIELD_ERR.IS_EMPTY
    } else if (!REG_EXP_MONEY.test(amount)) {
      errors[SUM] = FIELD_ERR.MONEY
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
    console.log(check)
    if (check) sendAmount()
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

  // Send Amount==============================================

  const sendAmount = async () => {
    try {
      const res = await fetch(`http://${SERVER_IP}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: convertData(),
      })
      const data: ResData = await res.json()

      if (res.ok) {
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

  const convertData = () => {
    return JSON.stringify({
      [SUM]: Number(state.formValues[SUM]),
      [EMAIL]: auth?.state.user?.email,
      [PAY_TO]: state.formValues[PAY_TO],
    })
  }

  // ===========================================================
  return (
    <Page backgroundColor={BACKGROUND_COLOR.LIGHT_WHITE}>
      <Grid>
        <StatusBar />
        <BackLink title="Send" />

        <Input
          error={state.formErrors[PAY_TO]}
          name={PAY_TO}
          placeholder={PLACEHOLDER_NAME.SEND_EMAIL}
          label={LABLE_NAME.EMAIL}
          onChange={(value) => handleChange(PAY_TO, value)}
        />

        <Input
          error={state.formErrors[SUM]}
          name={SUM}
          placeholder={PLACEHOLDER_NAME.AMOUNT}
          label={LABLE_NAME.AMOUNT}
          onChange={(value) => handleChange(SUM, value)}
        />

        <Prefix
          text="Forgot your password?"
          link="/recovery"
          linkText="Restore"
        />

        <Button onClick={hundleSubmit}>Send</Button>

        <Alert success={state.data} text={state.alert} />
      </Grid>
    </Page>
  )
}

export default SendPage
