import React, {useEffect, useState} from 'react';
import {GameContext, Ship, useGameContext} from '../../hooks/gameContext';
import {useAuth} from '../../hooks/authContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text, View, StyleSheet, Button, TextInput} from 'react-native';
import {Picker} from "@react-native-picker/picker";
import {mapConfig} from "../../api";
import {GameRouteNames} from "../../router/routeNames";

const ConfigScreen = () => {
    const auth = useAuth();
    const route = useRoute<any>();
    const gameContext = useGameContext();

    const [ships, setShips] = useState<Ship[]>([]);
    const [currentShip, setCurrentShip] = useState<Partial<Ship>>({});
    const [grid, setGrid] = useState<Array<Array<number>>>(Array.from({length: 10}, () => Array(10).fill(0)));

    const validateShip = (ship: Partial<Ship>): boolean => {
        if (!ship.x || !ship.y || !ship.size || !ship.direction)
            return false;

        // Check if any of the cells the ship will occupy are already occupied
        for (let i = 0; i < ship.size!; i++) {
            let x = ship.direction === "HORIZONTAL" ? ship.x!.charCodeAt(0) - 65 + i : ship.x!.charCodeAt(0) - 65;
            let y = ship.direction === "VERTICAL" ? ship.y! + i : ship.y!;

            // Check if the cell is out of bounds or already occupied
            if (y < 1 || y > 10 || x < 0 || x > 9 || grid[y - 1][x] !== 0) {
                return false; // Overlaps with existing ship or out of bounds
            }
        }

        return true; // Ship can be placed
    };

    const canPlaceShipOfSize = (size: number): boolean => {
        // Check if there are enough available slots for a ship of the given size
        const remainingSlots = {
            2: 4 - (ships.filter(ship => ship.size === 2).length),
            3: 3 - (ships.filter(ship => ship.size === 3).length),
            4: 2 - (ships.filter(ship => ship.size === 4).length),
            6: 1 - (ships.filter(ship => ship.size === 6).length)
        };
        // @ts-ignore
        return remainingSlots[size] > 0;
    };

    const handleCreateShip = () => {
        if (validateShip(currentShip)) {
            setShips(prevShips => [...prevShips, currentShip as Ship]);

            // Update grid with new ship
            const updatedGrid = [...grid];
            for (let i = 0; i < currentShip.size!; i++) {
                if (currentShip.direction === "VERTICAL") {
                    updatedGrid[currentShip.y! + i - 1][currentShip.x!.charCodeAt(0) - 65] = ships.length + 1;
                } else {
                    updatedGrid[currentShip.y! - 1][currentShip.x!.charCodeAt(0) - 65 + i] = ships.length + 1;
                }
            }
            setGrid(updatedGrid);

            setCurrentShip({});
        } else {
            alert('The ship cannot be placed');
        }
    };

    const navigation = useNavigation<any>();

    const handleDone = async () => {
        console.log(ships)
        await mapConfig(auth.token, route.params.gameId, ships)
        navigation.navigate(GameRouteNames.TABLE, {
            gameId: route.params.gameId,
        });
    };

    useEffect(() => {
        gameContext.loadGame(route.params.gameId);
    }, []);

    return (
        <>
            <Text>
                Game Id: {gameContext.game?.id}{'\n'}
                Player1: {gameContext.game?.player1.email}{'\n'}
                Player2: {gameContext.game?.player2?.email}{'\n\n'}
                Place your ships on the map:{'\n'}
                - 4 ships with size 2{'\n'}
                - 3 ships with size 3{'\n'}
                - 2 ships with size 4 {'\n'}
                - 1 ships with size 6{'\n'}
            </Text>

            {grid.map((row, rowIndex) => (
                <View key={rowIndex} style={{flexDirection: 'row'}}>
                    {row.map((cell, colIndex) => (
                        <Text key={colIndex}>{cell}</Text>
                    ))}
                </View>
            ))}
            {ships.length === 10 ? (
                <Button title="Done" onPress={handleDone}/>
            ) : (
                <>
                    <Text>{'\n'}Enter details for Ship {ships.length + 1}:</Text>
                    <Picker
                        selectedValue={currentShip.x}
                        onValueChange={(itemValue: any) => setCurrentShip(prev => ({...prev, x: itemValue}))}
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
                        selectedValue={currentShip.y}
                        onValueChange={(itemValue: any) => setCurrentShip(prev => ({...prev, y: itemValue}))}
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
                    <Picker
                        selectedValue={currentShip.size}
                        onValueChange={(itemValue: any) => setCurrentShip(prev => ({...prev, size: itemValue}))}
                    >
                        <Picker.Item label="Select size" value={0}/>
                        {canPlaceShipOfSize(2) && <Picker.Item label="2" value={2}/>}
                        {canPlaceShipOfSize(3) && <Picker.Item label="3" value={3}/>}
                        {canPlaceShipOfSize(4) && <Picker.Item label="4" value={4}/>}
                        {canPlaceShipOfSize(6) && <Picker.Item label="6" value={6}/>}
                    </Picker>
                    <Picker
                        selectedValue={currentShip.direction}
                        onValueChange={(itemValue: any) => setCurrentShip(prev => ({...prev, direction: itemValue}))}
                    >
                        <Picker.Item label="Select direction" value=''/>
                        <Picker.Item label="HORIZONTAL" value="HORIZONTAL"/>
                        <Picker.Item label="VERTICAL" value="VERTICAL"/>
                    </Picker>
                    <Button title="Create Ship" onPress={handleCreateShip}/>
                </>
            )}
        </>
    );
};

export default () => (
    <GameContext>
        <ConfigScreen/>
    </GameContext>
);