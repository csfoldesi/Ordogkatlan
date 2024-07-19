import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { useEffect } from "react";

function App() {
  const { commonStore, accoutStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      accoutStore.getUser();
    }
  }, [commonStore, accoutStore]);

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
