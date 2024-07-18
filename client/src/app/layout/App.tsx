import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "3em" }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
