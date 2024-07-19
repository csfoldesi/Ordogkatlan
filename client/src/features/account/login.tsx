import { observer } from "mobx-react-lite";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import { FormStatus } from "../../app/common/enum";
import { Dimmer, Loader, Message, Segment } from "semantic-ui-react";

export default observer(function Login() {
  const { token } = useParams<{ token: string }>();
  const { accoutStore } = useStore();
  const { formStatus, login, user } = accoutStore;
  const location = useLocation();

  useEffect(() => {
    if (token) {
      login(token);
    }
  }, [login, token]);

  if (user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return (
    <>
      {formStatus === FormStatus.Loading && (
        <Segment>
          <Dimmer active inverted>
            <Loader>Bejelentkezés</Loader>
          </Dimmer>
        </Segment>
      )}
      {formStatus === FormStatus.Error && (
        <Message negative>
          <Message.Header>Sikertelen bejelentkezés</Message.Header>
        </Message>
      )}
    </>
  );
});
