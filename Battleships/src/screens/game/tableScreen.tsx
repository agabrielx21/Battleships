import {Text, TouchableOpacity} from 'react-native'
import {useEffect, useState} from "react";
import {createGame, listGames, loadGame} from "../../api";
import {useAuth} from "../../hooks/authContext";
import GameListItem from "../../components/gameListItem";
import styled from "styled-components/native";

const Container = styled.View`
    display: flex;
    flex: 1;
    padding: 8px;
`

const GameList = styled.ScrollView`
`

const TableScreen = () => {
    const auth = useAuth();
    const [games, setGames] = useState<any[]>([]);

    useEffect(() => {
        listGames(auth.token).then(setGames);
    }, []);

    const handleAddGame = async () => {
        await createGame(auth.token);
        await listGames(auth.token).then(setGames);
    }

    return (
        <Container>
            <TouchableOpacity onPress={handleAddGame}><Text>Create Game</Text></TouchableOpacity>
            <GameList>
                {games.map(game => (
                    <GameListItem status={game.status} id={game.id} key={game.id} onPress={() => loadGame(auth.token, game.id)} />
                ))}

            </GameList>
        </Container>
    )
}

export default TableScreen;