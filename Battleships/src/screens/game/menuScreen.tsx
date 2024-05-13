import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { createGame, getUser, listGames } from "../../api";
import { useAuth } from "../../hooks/authContext";
import GameSection from '../../components/gameSection';
import {GameRouteNames} from "../../router/routeNames";

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
    margin-bottom: 10px;
`

const MenuScreen = () => {
    const auth = useAuth();
    const [games, setGames] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser(auth.token).then(setUser);
        listGames(auth.token).then(setGames);
    }, []);

    const handleLogout = async () => {
        await auth.logout();
    }

    const handleAddGame = async () => {
        await createGame(auth.token);
        await listGames(auth.token).then(setGames);
    }

    const handleRefresh = async () => {
        await listGames(auth.token).then(setGames);
    }

    const navigation = useNavigation();

    return (
        <Container>
            <GameSection
                title="New Games"
                games={games}
                filterFunction={(game) => game.status === 'CREATED' && game.player1Id === user.user.id}
                navigation={navigation}
                goTo={GameRouteNames.CONFIG}
                showButton={true}
                buttonLabel="Create new game"
                onButtonPress={handleAddGame}
            />
            <GameSection
                title="Join Game"
                games={games}
                filterFunction={(game) => game.status === 'CREATED' && game.player1Id !== user.user.id}
                navigation={navigation}
                goTo={GameRouteNames.LOBBY}
                showButton={false}
                onButtonPress={undefined}
                buttonLabel={undefined}
            />
            <GameSection
                title="My Active Games"
                games={games}
                filterFunction={(game) => game.status === 'ACTIVE' && (game.player1Id === user.user.id || game.player2Id === user.user.id)}
                navigation={navigation}
                goTo={GameRouteNames.TABLE}
                showButton={false}
                buttonLabel={undefined}
                onButtonPress={undefined}
            />
            <GameSection
                title="Game History"
                games={games}
                filterFunction={(game) => game.status === 'FINISHED' && (game.player1Id === user.user.id || game.player2Id === user.user.id)}
                navigation={navigation}
                goTo={GameRouteNames.REPLAY}
                showButton={false}
                buttonLabel={undefined}
                onButtonPress={undefined}
            />
            <Button onPress={handleRefresh} >
                <Text>Refresh game list</Text>
            </Button>
            <Button onPress={handleLogout}>
                <Text>Log out</Text>
            </Button>
        </Container>
    );
}

export default MenuScreen;
