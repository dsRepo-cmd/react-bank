import React from 'react'
import { Button } from '../component/button/Button'
import Page from '../component/page/Page'
import { useNavigate } from 'react-router-dom'
import Grid from '../component/grid/Grid'
import WellcomeHero from '../container/wellcome-hero/WellcomeHero'

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
      <WellcomeHero />
      <Grid>
        <Button onClick={hundleSignup}>Sign up</Button>
        <Button onClick={hundleSignin} outline>
          Sign in
        </Button>
      </Grid>
    </Page>
  )
}
