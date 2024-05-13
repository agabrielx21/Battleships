import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {GameRouteNames} from "./routeNames";
import {Text} from 'react-native'
import MenuScreen from "../screens/game/menuScreen";
import LobbyScreen from "../screens/game/lobbyScreen";
import ConfigScreen from "../screens/game/configScreen";
import TableScreen from "../screens/game/tableScreen";
import ReplayScreen from "../screens/game/replayScreen";

const GameStack = createNativeStackNavigator();

const gameRoutes = (
    <GameStack.Navigator>
        <GameStack.Screen name={GameRouteNames.MENU} component={MenuScreen} options={{
            headerTitle: (props) => <Text {...props}>Menu</Text>
        }}/>
        <GameStack.Screen name={GameRouteNames.LOBBY} component={LobbyScreen} options={{
            headerTitle: (props) => <Text {...props}>Lobby</Text>
        }}/>
        <GameStack.Screen name={GameRouteNames.CONFIG} component={ConfigScreen} options={{
            headerTitle: (props) => <Text {...props}>Map configuration</Text>
        }}/>
        <GameStack.Screen name={GameRouteNames.TABLE} component={TableScreen} options={{
            headerTitle: (props) => <Text {...props}>Game</Text>
        }}/>
        <GameStack.Screen name={GameRouteNames.REPLAY} component={ReplayScreen} options={{
            headerTitle: (props) => <Text {...props}>Replay</Text>
        }}/>
    </GameStack.Navigator>
)

export default gameRoutes;