import React, {useState} from "react";
import styled from "styled-components/native";
import {Text} from 'react-native'

const Container = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px;
`

const Input = styled.TextInput`
    width: 100%;
    height: 30px;
    border: 1px solid;
    margin-bottom: 10px;
    padding: 8px;
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
            <Input onChangeText={setEmail} keyboardType={'email-address'} />
            <Input onChangeText={setPassword} secureTextEntry />
            <Button onPress={handleSubmit}>
                <Text>Log in</Text>
            </Button>
            <Button onPress={goToRegister}>
                <Text>Register</Text>
            </Button>
        </Container>
    )
}

export default Login;
