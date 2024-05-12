import {Text, TouchableOpacity} from 'react-native'
import {useEffect, useState} from "react";
import {createGame, getUser, listGames, loadGame} from "../../api";
import {useAuth} from "../../hooks/authContext";
import GameListItem from "../../components/gameListItem";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";
import {GameRouteNames} from "../../router/routeNames";

const Container = styled.SafeAreaView`
    display: flex;
    flex: 1;
    padding: 8px;
    margin-bottom: 20px;
`

const GameList = styled.ScrollView`
`

const MenuScreen = () => {
    const auth = useAuth();
    const [games, setGames] = useState<any[]>([]);
    const [user, setUser] = useState<any>([]);

    useEffect(() => {
        getUser(auth.token).then(setUser);
        listGames(auth.token).then(setGames);
    }, []);

    const navigation = useNavigation<any>();

    const handleAddGame = async () => {
        await createGame(auth.token);
        await listGames(auth.token).then(setGames);
    }

    return (
        <Container>
            <TouchableOpacity onPress={handleAddGame}><Text>New Game</Text></TouchableOpacity>
            <GameList>
                {games.filter(game => game.status === 'CREATED' && game.player1Id === user.user.id).map(game => (
                    <GameListItem status={game.status} id={game.id} key={game.id} onPress={() =>
                        navigation.navigate(GameRouteNames.CONFIG, {gameId: game.id})
                    } />
                ))}
            </GameList>
            <Text>{'\n'}My games</Text>
            <GameList>
                {games.filter(game => game.status === 'ACTIVE' && (game.player1Id === user.user.id || game.player2Id === user.user.id)).map(game => (
                    <GameListItem status={game.status} id={game.id} key={game.id} onPress={() =>
                        navigation.navigate(GameRouteNames.TABLE, {gameId: game.id})
                    } />
                ))}
            </GameList>
            <Text>{'\n'}Join a game</Text>
            <GameList>
                {games.filter(game => game.status === 'CREATED' && game.player1Id !== user.user.id).map(game => (
                    <GameListItem status={game.status} id={game.id} key={game.id} onPress={() =>
                        navigation.navigate(GameRouteNames.LOBBY, {gameId: game.id})
                    } />
                ))}
            </GameList>
            <Text>{'\n'}Game history</Text>
            <GameList>
                {games.filter(game => game.status === 'FINISHED' && (game.player1Id === user.user.id || game.player2Id === user.user.id)).map(game => (
                    <GameListItem status={game.status} id={game.id} key={game.id} onPress={() =>
                        navigation.navigate(GameRouteNames.REPLAY, {gameId: game.id})
                    } />
                ))}
            </GameList>
        </Container>
    )
}

export default MenuScreen;