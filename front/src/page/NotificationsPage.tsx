import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useReducer,
} from "react";
import Page from "../component/page/Page";
import BackLink from "../component/back-link-menu/BackLinkMenu";
import Grid from "../component/grid/Grid";
import { AuthContext } from "../App";
import {
  BACKGROUND_COLOR,
  FIELD_NAME,
  Notifications,
  ResData,
  SERVER_IP,
} from "../util/consts";
import NotificationsList from "../container/notifications-list/NotificationsList";
import { REQUEST_ACTION_TYPE, initialState, reducer } from "../util/reduser";
import Loader from "../component/loader/Loader";
import Skeleton from "../component/skeleton/Skeleton";

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const auth = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const convertData = useCallback(() => {
    return JSON.stringify({
      [FIELD_NAME.USER_ID]: auth?.state.user?.id,
    });
  }, [auth?.state.user?.id]);

  const getNotifications = useCallback(async () => {
    dispatch({ type: REQUEST_ACTION_TYPE.LOADING });
    try {
      const res = await fetch(`${SERVER_IP}/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(),
      });

      const data: ResData = await res.json();

      if (res.ok && data.session.notifications !== null) {
        dispatch({ type: REQUEST_ACTION_TYPE.SUCCESS });
        setNotifications(data.session.notifications);
      }
    } catch (error: any) {
      console.error("Error fetching notifications:", error);
    }
  }, [convertData]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <Page backgroundColor={BACKGROUND_COLOR.LIGHT_WHITE}>
      <Grid>
        <BackLink title="Notifications" />
        {state.status === REQUEST_ACTION_TYPE.LOADING && (
          <>
            <Loader />
            <Skeleton width={"100%"} height={68} />
            <Skeleton width={"100%"} height={68} />
            <Skeleton width={"100%"} height={68} />
            <Skeleton width={"100%"} height={68} />
            <Skeleton width={"100%"} height={68} />
            <Skeleton width={"100%"} height={68} />
            <Skeleton width={"100%"} height={68} />
            <Skeleton width={"100%"} height={68} />
          </>
        )}

        {state.status === REQUEST_ACTION_TYPE.SUCCESS && (
          <NotificationsList notifications={notifications} />
        )}
      </Grid>
    </Page>
  );
};

export default NotificationsPage;
