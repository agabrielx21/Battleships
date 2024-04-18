import styled from "styled-components/native";
import Register from "./src/components/Register";
import Login from "./src/components/Login";

const Container = styled.SafeAreaView`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    gap: 40px;
`

export default function App() {
    return (
    <Container>
      <Register />
      <Login />
    </Container>
  );
}
