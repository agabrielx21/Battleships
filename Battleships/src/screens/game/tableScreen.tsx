import React, {useEffect} from 'react'
import { Text } from 'react-native';
import { GameContext, useGameContext} from "../../hooks/gameContext";
import {useAuth} from "../../hooks/authContext";
import {useRoute} from "@react-navigation/native";

const TableScreen = () => {
    const auth = useAuth();

    const route = useRoute<any>();
    const gameContext = useGameContext();

    useEffect(() => {
        gameContext.loadGame(route.params.gameId)
    }, [])

    return (
        <>
            <Text>
                Game Id: {gameContext.game?.id} {'\n'}
                Player1: {gameContext.game?.player1.email} {'\n'}
                Player2: {gameContext.game?.player2?.email} {'\n'}
                Place your ships on the map {'\n'}
            </Text>
        </>
    )
}

export default () => (
    <GameContext>
        <TableScreen/>
    </GameContext>
);