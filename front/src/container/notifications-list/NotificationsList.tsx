import React from 'react'
import cl from './notifications.module.css'
import { getTimeAgoString } from '../../util/getDate'
import bellIco from './svg/bell.svg'
import warningIco from './svg/danger.svg'

interface Notifications {
  id: number
  userId: number
  type: string
  message: string
  date: string
}
interface NotificationsProps {
  notifications: Notifications[]
}

const NotificationsList: React.FC<NotificationsProps> = ({
  notifications,
}) => {
  return (
    <ul className={cl.list}>
      {notifications?.map((notification: Notifications) => (
        <li className={cl.item} key={notification.id}>
          <img
            src={
              notification.type === 'Warning'
                ? warningIco
                : bellIco
            }
            alt="Ico"
          />
          <div className={cl.item__info}>
            <div className={cl.item__message}>
              {notification.message}
            </div>
            <div className={cl.item__text}>
              {notification.type}{' '}
              <span className={cl.item__dote}></span>{' '}
              {getTimeAgoString(notification.date)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default NotificationsList
