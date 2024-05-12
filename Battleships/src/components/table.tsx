import {View, Text} from "react-native";

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
    <>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{width: 20}}></Text>
            {Array.from({length: 10}, (_, index) => (
                <Text key={index} style={{width: 20, textAlign: 'center'}}>{String.fromCharCode(65 + index)}</Text>
            ))}
        </View>
        {grid.map((row: string[] | number[], rowIndex: number) => (
            <View key={rowIndex} style={{ flexDirection: 'row' }}>
                <Text style={{ width: 20, textAlign: 'center' }}>{rowIndex + 1}</Text>
                {row.map((cell, colIndex) => (
                    <View key={colIndex} style={{ width: 20, height: 20, backgroundColor: getCellColor(cell), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#FFFFFF' }}>
                            {typeof cell === 'number' ? (cell === 1 ? 1 : 0) : cell}
                        </Text>
                    </View>
                ))}
            </View>
        ))}
    </>
);

export default Grid;