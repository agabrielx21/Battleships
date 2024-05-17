import {View, Text} from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
`

const getCellColor = (cell: string | number) => {
    switch (cell) {
        case 0:
            return 'lightblue';
        case 1:
            return 'black'
        case 'X':
            return 'red';
        case '-':
            return 'green';
        default:
            return 'transparent';
    }
};

// @ts-ignore
const Grid = ({grid}) => (
    <Container>
        <View style={{flexDirection: 'row'}}>
            <Text style={{width: 20, textAlign: 'center'}}></Text>
            {Array.from({length: 10}, (_, index) => (
                <Text key={index} style={{width: 20, margin: 2}}>{String.fromCharCode(65 + index)}</Text>
            ))}
        </View>
        {grid.map((row: string[] | number[], rowIndex: number) => (
            <View key={rowIndex} style={{flexDirection: 'row'}}>
                <Text style={{width: 20, textAlign: 'center'}}>{rowIndex + 1}</Text>
                {row.map((cell, colIndex) => (
                    <View key={colIndex} style={{
                        width: 20,
                        height: 20,
                        backgroundColor: getCellColor(cell),
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 2
                    }}/>
                ))}
            </View>
        ))}
    </Container>
);

export default Grid;