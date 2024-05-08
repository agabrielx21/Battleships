import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthRouteNames, GameRouteNames} from "./routeNames";
import { Text } from 'react-native'
import TableScreen from "../screens/game/tableScreen";

const GameStack = createNativeStackNavigator();

const gameRoutes = (
    <GameStack.Navigator initialRouteName={AuthRouteNames.LOGIN}>
        <GameStack.Screen name={GameRouteNames.TABLE} component={TableScreen}  options={{
            headerTitle: (props) => <Text {...props}>Game</Text> }} />

    </GameStack.Navigator>
)

export default gameRoutes;