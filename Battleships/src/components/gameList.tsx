import React from 'react';
import GameListItem, { IGameListItem } from './gameListItem';
import styled from "styled-components/native";

const Container = styled.ScrollView`
    max-height: 150px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 5px;
`

// @ts-ignore
const GameList = ({games, filterFunction, navigation, goTo }) => (
    <Container>
        {games.filter(filterFunction).map((game: React.JSX.IntrinsicAttributes & IGameListItem) => (
            <GameListItem
                key={game.id}
                {...game}
                onPress={() => navigation.navigate(goTo, { gameId: game.id })}
            />
        ))}
    </Container>
);

export default GameList;
