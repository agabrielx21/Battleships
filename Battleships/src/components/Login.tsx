import {Alert, Button} from "react-native";
import styled from "styled-components/native";
import {useState} from "react";
import {login} from "../api";
import {useNavigation} from "@react-navigation/native";

const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 50px;
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

    const navigation = useNavigation<any>();
    const goToRegister = () => {
        navigation.navigate('Register')
    }

    return (
        <Container>
            <Input onChangeText={setEmail} keyboardType={'email-address'} />
            <Input onChangeText={setPassword} secureTextEntry />
            <Button title={"Login"} onPress={async () => {
                try {
                    const response = await login(email, password);
                    // console.log("Login response:", response);
                    Alert.alert('Login status', 'Login with success');
                } catch (error) {
                    console.error("Login error:", error);
                }
            }} />

            <Button title={"Register"} onPress={() => goToRegister()} />
        </Container>
    )
}

export default Login;
