import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthStack = createNativeStackNavigator();

const authRoutes = (
    <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
)

export default authRoutes;