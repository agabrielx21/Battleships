import {Text, TouchableOpacity} from 'react-native'
import {useEffect, useState} from "react";
import {createGame, listGames, loadGame} from "../../api";
import {useAuth} from "../../hooks/authContext";
import GameListItem from "../../components/gameListItem";
import styled from "styled-components/native";
import {useNavigation} from "@react-navigation/native";
import {GameRouteNames} from "../../router/routeNames";

const Container = styled.SafeAreaView`
    display: flex;
    flex: 1;
    padding: 8px;
`

const GameList = styled.ScrollView`
`

const MenuScreen = () => {
    const auth = useAuth();
    const [games, setGames] = useState<any[]>([]);

    useEffect(() => {
        listGames(auth.token).then(setGames);
    }, []);

    const navigation = useNavigation<any>();

    const handleAddGame = async () => {
        await createGame(auth.token);
        await listGames(auth.token).then(setGames);
    }

    return (
        <Container>
            <TouchableOpacity onPress={handleAddGame}><Text>Create Game</Text></TouchableOpacity>
            <GameList>
                {games.filter(game => game.status === 'CREATED').map(game => (
                    <GameListItem status={game.status} id={game.id} key={game.id} onPress={() =>
                        navigation.navigate(GameRouteNames.LOBBY, {gameId: game.id})
                    } />
                ))}

            </GameList>
        </Container>
    )
}

export default MenuScreen;