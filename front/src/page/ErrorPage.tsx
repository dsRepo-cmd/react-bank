import React from 'react'
import Page from '../component/page/Page'
import Grid from '../component/grid/Grid'
import Header from '../component/header/Header'
import BackLink from '../component/back-link-menu/BackLinkMenu'

const ErrorPage: React.FC = () => {
  return (
    <Page>
      <Grid>
        <BackLink />
        <Header title="Page not found"></Header>
      </Grid>
    </Page>
  )
}

export default ErrorPage
