import React, {useEffect} from 'react'
import {Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {GameContext, useGameContext} from "../../hooks/gameContext";
import {joinGame} from "../../api";
import {useAuth} from "../../hooks/authContext";
import {GameRouteNames} from "../../router/routeNames";

const LobbyScreen = () => {
    const auth = useAuth();

    const route = useRoute<any>();
    const gameContext = useGameContext();

    useEffect(() => {
        gameContext.loadGame(route.params.gameId)
    }, [])

    const navigation = useNavigation<any>();

    const handleJoinGame = async () => {
        await joinGame(auth.token, route.params.gameId);
        navigation.navigate(GameRouteNames.TABLE, {gameId: gameContext.game?.id})
    }

    return (
        <>
            <Text>
                Game Id: {gameContext.game?.id} {'\n'}
                Opponent: {gameContext.game?.player1.email} {'\n'}
            </Text>
            <TouchableOpacity onPress={handleJoinGame}>
                <Text>Join Game</Text>
            </TouchableOpacity>
        </>
    )
}

export default () => (
    <GameContext>
        <LobbyScreen/>
    </GameContext>
);