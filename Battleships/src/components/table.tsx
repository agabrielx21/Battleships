import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Table = () => {
    const [ships, setShips] = useState([
        { x: '', y: '', size: '', direction: '' },
        { x: '', y: '', size: '', direction: '' },
        { x: '', y: '', size: '', direction: '' },
    ]);
    const [editingEnabled, setEditingEnabled] = useState(true);

    const validateShips = () => {
        for (const ship of ships) {
            if (!ship.x || !ship.y || !ship.size || !ship.direction) {
                return false;
            }
            if (!/^[A-J]$/.test(ship.x) || !/^[1-9]$/.test(ship.y)) {
                return false;
            }
        }
        return true;
    };

    const handleInputChange = (index: number, key: string, value: string) => {
        if (!editingEnabled) {
            console.log('Editing Disabled', 'Editing ships is disabled. Press "Done" to finish.');
            return;
        }
        const updatedShips = [...ships];
        // @ts-ignore
        updatedShips[index][key] = value;
        setShips(updatedShips);
    };

    const handleDone = () => {
        if (validateShips()) {
            setEditingEnabled(false);
            console.log(ships);
        } else {
            console.log('Incomplete or Incorrect Ship Data', 'Please fill all fields correctly for each ship.');
        }
    };

    const renderGridCell = (x: string, y: string) => {
        const ship = ships.find(ship => ship.x === x && ship.y === y);
        if (ship) {
            const { x: shipX, y: shipY, size, direction } = ship;
            if (direction === 'HORIZONTAL' && x.charCodeAt(0) >= shipX.charCodeAt(0) && x.charCodeAt(0) < shipX.charCodeAt(0) + parseInt(size)) {
                return <View style={styles.shipCell}></View>;
            } else if (direction === 'VERTICAL' && parseInt(y) >= parseInt(shipY) && parseInt(y) < parseInt(shipY) + parseInt(size)) {
                return <View style={styles.shipCell}></View>;
            }
        }
        return <View style={styles.gridCell}></View>;
    };


    return (
        <View>
            <View style={styles.grid}>
                <View style={styles.gridRow}>
                    <View style={styles.gridHeaderCell}></View>
                    {[...Array(10)].map((_, i) => (
                        <View key={i} style={styles.gridHeaderCell}>
                            <Text style={styles.gridHeaderText}>{String.fromCharCode(65 + i)}</Text>
                        </View>
                    ))}
                </View>
                {[...Array(10)].map((_, i) => (
                    <View key={i} style={styles.gridRow}>
                        <View style={styles.gridHeaderCell}>
                            <Text style={styles.gridHeaderText}>{i + 1}</Text>
                        </View>
                        {[...Array(10)].map((_, j) => (
                            <View key={j} style={styles.gridCell}>
                                {renderGridCell(String.fromCharCode(65 + j), (i + 1).toString())}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
            {'\n'}
            {ships.map((ship, index) => (
                <View key={index} style={styles.shipContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="X"
                        value={ship.x}
                        onChangeText={(text) => handleInputChange(index, 'x', text)}
                        editable={editingEnabled}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Y"
                        value={ship.y}
                        onChangeText={(text) => handleInputChange(index, 'y', text)}
                        editable={editingEnabled}
                    />
                    <Picker
                        style={styles.input}
                        selectedValue={ship.size}
                        onValueChange={(itemValue) => handleInputChange(index, 'size', itemValue)}
                        enabled={editingEnabled}
                    >
                        <Picker.Item label="Select Size" value="" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                    <Picker
                        style={styles.input}
                        selectedValue={ship.direction}
                        onValueChange={(itemValue) => handleInputChange(index, 'direction', itemValue)}
                        enabled={editingEnabled}
                    >
                        <Picker.Item label="Select Direction" value="" />
                        <Picker.Item label="Horizontal" value="HORIZONTAL" />
                        <Picker.Item label="Vertical" value="VERTICAL" />
                    </Picker>
                </View>
            ))}
            {editingEnabled && <Button title="Done" onPress={handleDone} disabled={!validateShips()} />}
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'column',
    },
    gridRow: {
        flexDirection: 'row',
    },
    gridHeaderCell: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    gridHeaderText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    gridCell: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    shipCell: {
        width: 30,
        height: 30,
        backgroundColor: 'blue',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    shipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
});

export default Table;
