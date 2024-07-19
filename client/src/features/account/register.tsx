import { Button, Container, Form, Input, Label, Message } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { FormStatus } from "../../app/common/enum";

export default observer(function Register() {
  const { accoutStore } = useStore();
  const { formStatus, resetStatus, register } = accoutStore;

  useEffect(() => {
    resetStatus();
  }, [resetStatus]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register({ email: event.currentTarget.email.value });
  };

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        success={formStatus === FormStatus.Success}
        error={formStatus === FormStatus.Error}
        loading={formStatus === FormStatus.Loading}>
        <Form.Field>
          <Label>Email</Label>
          <Input placeholder="Email" type="email" id="email" />
        </Form.Field>
        <Message success header="Sikeres regisztráció" content="A belépéshez szükséges linket elküldtük email-ben." />
        <Message error header="Hiba történt" content="A regisztráció közben hiba történt." />
        <Button type="submit">Regisztráció</Button>
      </Form>
    </Container>
  );
});
