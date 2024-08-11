import { NavLink } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
  const { accoutStore } = useStore();
  const { isLoggedIn } = accoutStore;

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/">
          Most megy
        </Menu.Item>
        <Menu.Item as={NavLink} to="/program">
          Program
        </Menu.Item>
        <Menu.Item as={NavLink} to="/test">
          Test
        </Menu.Item>
        {isLoggedIn ? (
          <Menu.Item as={NavLink} to="/selected-program">
            Saját program
          </Menu.Item>
        ) : (
          <Menu.Item as={NavLink} to="/register">
            Regisztráció
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
});
