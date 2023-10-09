import React, { useContext, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../component/page/Page'
import BackLink from '../component/back-link-menu/BackLinkMenu'
import Header from '../component/header/Header'
import Input from '../component/input/Input'
import { Button } from '../component/button/Button'
import Prefix from '../component/prefix/Prefix'
import Alert from '../component/alert/Alert'
import {
  FIELD_ERR,
  FIELD_NAME,
  LABLE_NAME,
  PLACEHOLDER_NAME,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
  ResData,
  SERVER_IP,
} from '../util/consts'
import Grid from '../component/grid/Grid'
import StatusBar from '../component/status-bar/StatusBar'
import { AuthContext } from '../App'
import {
  REQUEST_ACTION_TYPE,
  initialState,
  reducer,
} from '../util/reduser'

const { EMAIL, PASSWORD } = FIELD_NAME

// =============================================================

const SignupPage: React.FC = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
  )

  // check Error===============================================

  const checkError = () => {
    const { email, password } = state.formValues

    const errors = {
      [EMAIL]: '',
      [PASSWORD]: '',
    }

    if (email.length < 1) {
      errors[EMAIL] = FIELD_ERR.IS_EMPTY
    } else if (email.length > 30) {
      errors[EMAIL] = FIELD_ERR.IS_BIG
    } else if (!REG_EXP_EMAIL.test(email)) {
      errors[EMAIL] = FIELD_ERR.EMAIL
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

    if (check) signup()
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

  const signup = async () => {
    try {
      const res = await fetch(
        `http://${SERVER_IP}/signup`,
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

        navigate('/signup-confirm')
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
      [EMAIL]: state.formValues[EMAIL],
      [PASSWORD]: state.formValues[PASSWORD],
    })
  }

  // =====================================================

  return (
    <Page>
      <Grid>
        <StatusBar />
        <BackLink />
        <Header
          title="Sign up"
          text="Choose a registration method"
        />
        <Input
          error={state.formErrors[EMAIL]}
          name={EMAIL}
          placeholder={PLACEHOLDER_NAME.EMAIL}
          label={LABLE_NAME.EMAIL}
          onChange={(value) => handleChange(EMAIL, value)}
        />
        <Input
          error={state.formErrors[PASSWORD]}
          name={PASSWORD}
          placeholder={PLACEHOLDER_NAME.PASSWORD}
          label={LABLE_NAME.PASSWORD}
          password
          onChange={(value) =>
            handleChange(PASSWORD, value)
          }
        />
        <Prefix
          text="Already have an account?"
          link="/signin"
          linkText="Sign In"
        />
        <Button onClick={hundleSubmit}>Continue</Button>
        <Alert text={state.alert} />
      </Grid>
    </Page>
  )
}

export default SignupPage
