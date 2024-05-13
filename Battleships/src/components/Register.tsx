import React, {useState} from "react";
import styled from "styled-components/native";
import {Text} from "react-native";

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

export interface IRegister {
    onSubmit: (email: string, password: string) => void
    goToLogin: () => void;
}

const Register: React.FC<IRegister> = ({onSubmit, goToLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => onSubmit(email, password)

    return (
        <Container>
            <Input onChangeText={setEmail} keyboardType="email-address" placeholder="Email"/>
            <Input onChangeText={setPassword} secureTextEntry placeholder="Password"/>
            <Button onPress={handleSubmit}>
                <Text>Register</Text>
            </Button>
            <Button onPress={goToLogin}>
                <Text>Already have an account? Log in</Text>
            </Button>
        </Container>
    )
}

export default Register;
