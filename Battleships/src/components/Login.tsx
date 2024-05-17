import React, {useState} from "react";
import styled from "styled-components/native";
import {Text} from 'react-native'

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 50px;
`

const Input = styled.TextInput`
    width: 100%;
    height: 50px;
    border: 1px solid;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 5px;
`

const Button = styled.TouchableOpacity`
`

export interface ILogin {
    onSubmit: (email: string, password: string) => void;
    goToRegister: () => void;
}

const Login: React.FC<ILogin> = ({onSubmit, goToRegister}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => onSubmit(email, password);

    return (
        <Container>
            <Input onChangeText={setEmail} keyboardType={'email-address'}/>
            <Input onChangeText={setPassword} secureTextEntry/>
            <Button onPress={handleSubmit}>
                <Text>Log in</Text>
            </Button>
            <Button onPress={goToRegister}>
                <Text>Don't have an account? Register</Text>
            </Button>
        </Container>
    )
}

export default Login;
