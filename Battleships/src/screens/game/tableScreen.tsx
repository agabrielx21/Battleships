import React from 'react'
import { Text } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { GameContext, useGameContext} from "../../hooks/gameContext";

const TableScreen = () => {
    console.log("Entered")
    const route = useRoute();
    const game = useGameContext();

    console.log(game);

    return (
        <Text>Game</Text>
    )
}

export default () => {
    <GameContext>
        <TableScreen/>
    </GameContext>
};