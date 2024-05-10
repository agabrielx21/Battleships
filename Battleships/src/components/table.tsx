import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Ship, useGameContext} from "../hooks/gameContext";
import {mapConfig} from "../api";
import {useAuth} from "../hooks/authContext";

const Table: React.FC = () => {
    const auth = useAuth();
    const gameContext = useGameContext();

    const [ships, setShips] = useState<Ship[]>([]);
    const [currentShip, setCurrentShip] = useState<Partial<Ship>>({});
    const [grid, setGrid] = useState<Array<Array<number>>>(Array.from({length: 10}, () => Array(10).fill(0)));

    // const validateShip = (ship: Partial<Ship>): boolean => {
    //     if (!ship.x || !ship.y || !ship.size || !ship.direction)
    //         return false;
    //
    //     if (ship.direction === "VERTICAL" && ship.y + ship.size > 10)
    //         return false;
    //
    //     if (ship.direction === "HORIZONTAL" && ship.x.charCodeAt(0) + ship.size > 74)
    //         return false;
    //
    //     return true
    // };

    const validateShip = (ship: Partial<Ship>): boolean => {
        if (!ship.x || !ship.y || !ship.size || !ship.direction)
            return false;

        // Check if any of the cells the ship will occupy are already occupied
        for (let i = 0; i < ship.size!; i++) {
            let row = ship.direction === "VERTICAL" ? ship.y! + i : ship.y!;
            let col = ship.direction === "HORIZONTAL" ? ship.x!.charCodeAt(0) - 65 + i : ship.x!.charCodeAt(0) - 65;

            // Check if the cell is out of bounds or already occupied
            if (row < 1 || row > 10 || col < 0 || col > 9 || grid[row - 1][col] !== 0) {
                return false; // Overlaps with existing ship or out of bounds
            }
        }

        return true; // Ship can be placed
    };


    const handleCreateShip = () => {
        if (validateShip(currentShip) && ships.length < 10) {
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
        } else if (ships.length >= 10) {
            alert("Maximum number of ships reached.");
        } else {
            alert('The ship cannot be placed');
        }
    };

    const handleDone = () => {
        console.log(ships)
        // mapConfig(auth.token, gameContext, ships)
    };

    return (
        <View>
            <Text>Grid:</Text>
            {grid.map((row, rowIndex) => (
                <View key={rowIndex} style={{flexDirection: 'row'}}>
                    {row.map((cell, colIndex) => (
                        <Text key={colIndex}>{cell}</Text>
                    ))}
                </View>
            ))}
            {ships.length === 10 && <Button title="Done" onPress={handleDone}/>}

            <Text>{'\n'}Enter details for Ship:</Text>
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
                <Picker.Item label="2" value={2}/>
                <Picker.Item label="3" value={3}/>
                <Picker.Item label="4" value={4}/>
                <Picker.Item label="6" value={6}/>

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

            <Text>Created Ships:</Text>
            {ships.map((ship, index) => (
                <Text
                    key={index}>{`Ship ${index + 1}: X-${ship.x}, Y-${ship.y}, Size-${ship.size}, Direction-${ship.direction}`}</Text>
            ))}
        </View>
    );
};

export default Table;
