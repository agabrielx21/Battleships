import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthRouteNames} from "./routeNames";
import { Text } from 'react-native'
import RegisterScreen from "../screens/auth/registerScreen";
import LoginScreen from "../screens/auth/loginScreen";

const AuthStack = createNativeStackNavigator();

const authRoutes = (
    <AuthStack.Navigator initialRouteName={AuthRouteNames.LOGIN}>
        <AuthStack.Screen name={AuthRouteNames.REGISTER} component={RegisterScreen}  options={{
            headerTitle: (props) => <Text {...props}>Register</Text> }} />
        <AuthStack.Screen name={AuthRouteNames.LOGIN} component={LoginScreen} options={{
            headerTitle: (props) => <Text {...props}>Login</Text> }} />
    </AuthStack.Navigator>
)

export default authRoutes;