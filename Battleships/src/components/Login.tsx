import {Alert, Button} from "react-native";
import styled from "styled-components/native";
import {useState} from "react";
import {login} from "../api";

const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const Input = styled.TextInput`
    width: 80%;
    font-size: 30px;
    padding: 4px;
    border: 1px solid black;
`

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const alert = () =>
        Alert.alert('Login status', 'Login with success');

    return (
        <Container>
            <Input onChangeText={setEmail} keyboardType={'email-address'} ></Input>
            <Input onChangeText={setPassword} secureTextEntry ></Input>
            <Button title={"Login"} onPress={ async () => {
                const response = await login(email, password);
                alert()
            }} />
        </Container>
    )
}

export default Login