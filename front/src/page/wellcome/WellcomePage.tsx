import React from 'react'
import safe from './safe.png'
import classes from './WellcomePage.module.css'
import { Button } from '../../component/button/Button'
import Page from '../../component/page/Page'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../../component/status-bar/StatusBar'

export const WellcomePage: React.FC = () => {
  const navigate = useNavigate()

  const hundleSignup = () => {
    navigate('/signup')
  }

  const hundleSignin = () => {
    navigate('/signin')
  }
  return (
    <Page>
      <div className={classes.hero}>
        <StatusBar />
        <h1 className={classes.title}>Hello!</h1>
        <p className={classes.text}>Wellcome to bank app</p>

        <img
          className={classes.img}
          src={safe}
          alt="safe"
        />
      </div>
      <div className={classes.footer}>
        <Button onClick={hundleSignup}>Sign up</Button>
        <Button onClick={hundleSignin} outline>
          Sign in
        </Button>
      </div>
    </Page>
  )
}
