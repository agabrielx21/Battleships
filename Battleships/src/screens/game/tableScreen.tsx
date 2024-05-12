import React, { useEffect, useState } from 'react';
import {GameContext, Ship, Strike, useGameContext, User} from '../../hooks/gameContext';
import {Button, Text, View} from 'react-native';
import { useAuth } from "../../hooks/authContext";
import { useRoute } from "@react-navigation/native";
import {getUser, listGames, mapConfig, sendStrike} from "../../api";
import {Picker} from "@react-native-picker/picker";

const TableScreen = () => {
    const auth = useAuth();
    const route = useRoute<any>();
    const gameContext = useGameContext();
    const [user, setUser] = useState<any>({ user: { id: '', email: '' }, gamesPlayed: 0, gamesLost: 0, gamesWon: 0, currentlyGamesPlaying: 0 });

    const [myGrid, setMyGrid] = useState<Array<Array<string | boolean>>>(Array.from({ length: 10 }, () => Array(10).fill(false)));
    const [oppGrid, setOppGrid] = useState<Array<Array<string | boolean>>>(Array.from({ length: 10 }, () => Array(10).fill(false)));
    const [strike, setStrike] = useState<Partial<Strike>>({});

    useEffect(() => {
        getUser(auth.token).then(setUser);
    }, [user.user]);

    useEffect(() => {
        gameContext.loadGame(route.params.gameId);
    }, [gameContext.game]);

    useEffect(() => {
        if (gameContext.game?.shipsCoord) {
            const updatedMyGrid = [...myGrid];
            gameContext.game.shipsCoord.forEach((ship) => {
                const xIndex = ship.x.charCodeAt(0) - 'A'.charCodeAt(0);
                const yIndex = ship.y - 1;
                updatedMyGrid[yIndex][xIndex] = true;
            });
            setMyGrid(updatedMyGrid);
        }

    }, [gameContext.game]);

    useEffect(() => {
        if (gameContext.game?.moves) {
            gameContext.game.moves.forEach(move => {
                const { x, y, playerId, result } = move;
                const xIndex = x.charCodeAt(0) - 'A'.charCodeAt(0);
                const yIndex = y - 1;
                const updatedGrid = playerId === user.user.id ? [...oppGrid] : [...myGrid];
                updatedGrid[yIndex][xIndex] = result ? 'X' : '-';
                playerId === user.user.id ? setOppGrid(updatedGrid) : setMyGrid(updatedGrid);
            });
        }
    }, [gameContext.game]);

    const handleStrike = async () => {
        if (!strike.x || !strike.y)
            alert('The strike cannot be sent');
        else
            await sendStrike(auth.token, route.params.gameId, strike.x, strike.y);
    };

    return (
        <>
            {gameContext.game?.status === 'MAP_CONFIG' ? (
                <Text>Waiting for opponent to place the ships...</Text>
            ) : (
                <>
                    <Text>Your Grid:</Text>
                    {myGrid.map((row, rowIndex) => (
                        <View key={rowIndex} style={{ flexDirection: 'row' }}>
                            {row.map((cell, colIndex) => (
                                <Text key={colIndex}>{typeof cell === 'boolean' ? (cell ? '1' : '0') : cell}</Text>
                            ))}
                        </View>
                    ))}
                    <Text>{'\n'}Opponent's Grid:</Text>
                    {oppGrid.map((row, rowIndex) => (
                        <View key={rowIndex} style={{ flexDirection: 'row' }}>
                            {row.map((cell, colIndex) => (
                                <Text key={colIndex}>{typeof cell === 'boolean' ? (cell ? '1' : '0') : cell}</Text>
                            ))}
                        </View>
                    ))}

                    {gameContext.game?.playerToMoveId !== user.user.id ?
                        (
                            <Text>{'\n'}Wait for opponent's turn...</Text>
                        ): (
                            <>
                                <Text>{'\n'}It is your turn</Text>
                                <Text>Enter details for the strike:</Text>
                                <Picker
                                    selectedValue={strike.x}
                                    onValueChange={(itemValue: any) => setStrike(prev => ({...prev, x: itemValue}))}
                                >
                                    <Picker.Item label="Select x axis" value=''/>
                                    <Picker.Item label="A" value="A"/>
                                    <Picker.Item label="B" value="B"/>
                                    <Picker.Item label="C" value="C"/>
                                    <Picker.Item label="D" value="D"/>
                                    <Picker.Item label="E" value="E"/>
                                    <Picker.Item label="F" value="F"/>
                                    <Picker.Item label="G" value="G"/>
                                    <Picker.Item label="H" value="H"/>
                                    <Picker.Item label="I" value="I"/>
                                    <Picker.Item label="J" value="J"/>
                                </Picker>
                                <Picker
                                    selectedValue={strike.y}
                                    onValueChange={(itemValue: any) => setStrike(prev => ({...prev, y: itemValue}))}
                                >
                                    <Picker.Item label="Select y axis" value={0}/>
                                    <Picker.Item label="1" value={1}/>
                                    <Picker.Item label="2" value={2}/>
                                    <Picker.Item label="3" value={3}/>
                                    <Picker.Item label="4" value={4}/>
                                    <Picker.Item label="5" value={5}/>
                                    <Picker.Item label="6" value={6}/>
                                    <Picker.Item label="7" value={7}/>
                                    <Picker.Item label="8" value={8}/>
                                    <Picker.Item label="9" value={9}/>
                                    <Picker.Item label="10" value={10}/>
                                </Picker>
                                <Button title="Strike" onPress={handleStrike}/>
                            </>
                        )
                    }

                </>
            )
            }
        </>
    )
};

export default () => (
    <GameContext>
        <TableScreen />
    </GameContext>
);
