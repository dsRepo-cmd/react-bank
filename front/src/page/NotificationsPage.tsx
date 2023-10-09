import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react'
import Page from '../component/page/Page'
import BackLink from '../component/back-link-menu/BackLinkMenu'
import Grid from '../component/grid/Grid'
import StatusBar from '../component/status-bar/StatusBar'
import { AuthContext } from '../App'
import {
  BACKGROUND_COLOR,
  FIELD_NAME,
  Notifications,
  ResData,
  SERVER_IP,
} from '../util/consts'
import NotificationsList from '../container/notifications-list/NotificationsList'

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<
    Notifications[]
  >([])
  const auth = useContext(AuthContext)

  const getNotifications = useCallback(async () => {
    try {
      const res = await fetch(
        `http://${SERVER_IP}/notifications`,
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
        if (data.session.notifications !== null)
          setNotifications(data.session.notifications)
      }
    } catch (error: any) {}
  }, [auth])

  const convertData = () => {
    return JSON.stringify({
      [FIELD_NAME.USER_ID]: auth?.state.user?.id,
    })
  }

  useEffect(() => {
    getNotifications()
  }, [getNotifications])

  return (
    <Page backgroundColor={BACKGROUND_COLOR.LIGHT_WHITE}>
      <Grid>
        <StatusBar />
        <BackLink title="Notifications" />
        <NotificationsList notifications={notifications} />
      </Grid>
    </Page>
  )
}

export default NotificationsPage
