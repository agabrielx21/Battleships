import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from "../hooks/authContext";
import authRoutes from "./authRouter";
import gameRoutes from "./gameRouter";

const Router:React.FC = () => {
    const auth = useAuth();

    return(
        <NavigationContainer>
            {auth.token ? gameRoutes : authRoutes}
        </NavigationContainer>
    )
}

export default Router;