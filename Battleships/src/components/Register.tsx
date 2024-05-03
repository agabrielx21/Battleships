import React, {useState} from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

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
            <Input onChangeText={setEmail} keyboardType="email-address" />
            <Input onChangeText={setPassword} secureTextEntry />
            <Button onPress={handleSubmit}>
                <Text>Register</Text>
            </Button>
            <Button onPress={goToLogin}>
                <Text>Log in</Text>
            </Button>
        </Container>
    )
}

export default Register;