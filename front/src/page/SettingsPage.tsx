import React from "react";
import Page from "../component/page/Page";
import { Button } from "../component/button/Button";
import { BACKGROUND_COLOR } from "../util/consts";
import Grid from "../component/grid/Grid";
import { useNavigate } from "react-router-dom";
import StatusBar from "../component/status-bar/StatusBar";
import BackLinkMenu from "../component/back-link-menu/BackLinkMenu";
import { AuthContext } from "../App";
import ChangeEmailForm from "../container/change-email-form/ChangeEmailForm";
import ChangePassForm from "../container/change-pass-form/ChangePassForm";
import FieldTitle from "../component/field-title/FieldTitle";
import Divider from "../component/divider/Divider";
import { AUTH_ACTION_TYPE } from "../util/authReduser";

const SettingsPage: React.FC = () => {
  const auth = React.useContext(AuthContext);

  const navigate = useNavigate();

  const hundleLogout = () => {
    if (auth) {
      auth.dispatch({ type: AUTH_ACTION_TYPE.LOGOUT });
    }

    navigate("/");
  };

  // ====================================================

  return (
    <Page backgroundColor={BACKGROUND_COLOR.WHITE}>
      <Grid small>
        <StatusBar />
        <BackLinkMenu title="Settings" />

        <FieldTitle text="Change email" />
        <ChangeEmailForm />
        <Divider />

        <FieldTitle text="Change password" />
        <ChangePassForm />
        <Divider />

        <Button danger onClick={hundleLogout} outline small>
          Log out
        </Button>
      </Grid>
    </Page>
  );
};

export default SettingsPage;
