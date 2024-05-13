import React, {useState} from 'react';
import GameList from './gameList';
import styled from "styled-components/native";
import {Text} from "react-native";

const ToggleContainer = styled.View`
    width: 80%;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`

const Button = styled.TouchableOpacity`
    text-align: center;
    padding: 10px 15px;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 10px;
`

const ToggleButton = styled.TouchableOpacity`
`

// @ts-ignore
const GameSection = ({title, games, filterFunction, navigation, goTo, showButton, buttonLabel, onButtonPress}) => {
    const [active, setActive] = useState(false);

    return (
        <ToggleContainer>
            <ToggleButton onPress={() => setActive(!active)}>
                <Text>
                    {title}
                </Text>
            </ToggleButton>
            {active && <GameList games={games} filterFunction={filterFunction} navigation={navigation} goTo={goTo}/>}
            {showButton && active && (
                <Button onPress={onButtonPress}>
                    <Text>
                        {buttonLabel}
                    </Text>
                </Button>
            )}
        </ToggleContainer>
    );
};

export default GameSection;
