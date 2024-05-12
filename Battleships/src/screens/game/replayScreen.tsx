import { Text } from 'react-native'
import styled from "styled-components/native";
import Table from "../../components/table";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/authContext";
import {useRoute} from "@react-navigation/native";
import {Game, Move, useGameContext} from "../../hooks/gameContext";
import {getUser, loadGame} from "../../api";

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

const ReplayScreen = () => {
    const auth = useAuth();
    const route = useRoute<any>();

    const [myGrid, setMyGrid] = useState<Array<Array<string | number>>>(Array.from({ length: 10 }, () => Array(10).fill(0)));
    const [oppGrid, setOppGrid] = useState<Array<Array<string | number>>>(Array.from({ length: 10 }, () => Array(10).fill(0)));
    const [game, setGame] = useState<Game>()
    const [user, setUser] = useState<any>({ user: { id: '', email: '' }, gamesPlayed: 0, gamesLost: 0, gamesWon: 0, currentlyGamesPlaying: 0 });

    useEffect(() => {
        loadGame(auth.token, route.params.gameId).then(setGame);
        getUser(auth.token).then(setUser);
    }, []);

    const handleReplay = async () => {
        if (game?.moves){
            for (let i = 0; i < game.moves.length; i++) {
                const xIndex = game.moves[i].x.charCodeAt(0) - 'A'.charCodeAt(0);
                const yIndex = game.moves[i].y - 1;
                const updatedGrid = game.moves[i].playerId === user.user.id ? [...oppGrid] : [...myGrid];
                updatedGrid[yIndex][xIndex] = game.moves[i].result ? 'X' : '-';
                game.moves[i].playerId === user.user.id ? setOppGrid(updatedGrid) : setMyGrid(updatedGrid);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

    };

    return (
        <Container>
            <Text>Your map</Text>
            <Table grid={myGrid}></Table>

            <Text>Opponent's map</Text>
            <Table grid={oppGrid}></Table>

            <Button onPress={handleReplay}>
                <Text>Replay</Text>
            </Button>
        </Container>
    )
}

export default ReplayScreen;