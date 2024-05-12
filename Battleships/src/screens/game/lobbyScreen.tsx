import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { GameContext, useGameContext } from "../../hooks/gameContext";
import { joinGame } from "../../api";
import { useAuth } from "../../hooks/authContext";
import { GameRouteNames } from "../../router/routeNames";
import styled from "styled-components/native";
import TextCard from '../../components/card'

const Container = styled.SafeAreaView`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 8px;
    margin-bottom: 20px;
`

const Button = styled.TouchableOpacity`
    text-align: center;
    padding: 10px 15px;
    border: 1px solid black;
    border-radius: 10px;
    margin-top: 20px;
`

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
        navigation.navigate(GameRouteNames.CONFIG, {gameId: route.params.gameId});
    }

    return (
        <Container>
            <TextCard
                text={" Game Id: " + gameContext.game?.id + "\n " +
                    "Opponent: " + gameContext.game?.player1.email + "\n"
                }
            />
            <Button onPress={handleJoinGame}>
                <Text>Join Game</Text>
            </Button>

        </Container>
    )
}

export default () => (
    <GameContext>
        <LobbyScreen/>
    </GameContext>
);
