import React, {useEffect} from 'react'
import { Text } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { GameContext, useGameContext} from "../../hooks/gameContext";

const TableScreen = () => {
    const route = useRoute<any>();
    const gameContext = useGameContext();
    console.log(gameContext);

    useEffect(() => {
        gameContext.loadGame(route.params.gameId)
    }, [])


    return (
        <Text>Game</Text>
    )
}

export default () => (
    <GameContext>
        <TableScreen/>
    </GameContext>
);