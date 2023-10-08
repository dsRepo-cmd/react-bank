import React, { useReducer } from 'react'
import Page from '../../component/page/Page'
import BackLink from '../../component/back-link-menu/BackLinkMenu'
import Header from '../../component/header/Header'
import Input from '../../component/input/Input'
import { Button } from '../../component/button/Button'
import Alert from '../../component/alert/Alert'
import Grid from '../../component/grid/Grid'
import {
  FIELD_ERR,
  FIELD_NAME,
  LABLE_NAME,
  PLACEHOLDER_NAME,
  ResData,
  SERVER_IP,
} from '../../util/consts'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../../component/status-bar/StatusBar'
import { AuthContext } from '../../App'
import {
  REQUEST_ACTION_TYPE,
  initialState,
  reducer,
} from '../../util/reduser'

const { CODE } = FIELD_NAME

// ==============================================================

const SignupConfirmPage: React.FC = () => {
  const auth = React.useContext(AuthContext)
  const navigate = useNavigate()

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
  )

  // set Error ================================================

  const checkError = () => {
    const { code } = state.formValues

    const errors = {
      [CODE]: '',
    }

    if (code.length < 1) {
      errors[CODE] = FIELD_ERR.IS_EMPTY
    } else if (code.length > 6) {
      errors[CODE] = FIELD_ERR.IS_EMPTY
    }

    dispatch({
      type: REQUEST_ACTION_TYPE.SET_FORM_ERRORS,
      payload: errors,
    })

    return Object.values(errors).every((error) => !error)
  }
  // Submit / input================================================

  const hundleSubmit = () => {
    const check = checkError()

    if (check) sendCode()
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
  const sendCode = async () => {
    try {
      const res = await fetch(
        `http://${SERVER_IP}/signup-confirm`,
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
      token: auth?.state.token,
    })
  }

  // ==============================================================

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
          label={LABLE_NAME.CODE}
          onChange={(value) => handleChange(CODE, value)}
        />

        <Button onClick={hundleSubmit}>Confirm</Button>

        <Alert text={state.alert} />
      </Grid>
    </Page>
  )
}

export default SignupConfirmPage
