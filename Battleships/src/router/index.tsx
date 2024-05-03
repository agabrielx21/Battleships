import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import authRoutes from "./authRouter";


const Router:React.FC = () => {
    return(
        <NavigationContainer>
            {authRoutes}
        </NavigationContainer>
    )
}

export default Router;