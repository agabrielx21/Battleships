import React, { useEffect } from 'react';
import { GameContext, useGameContext } from '../../hooks/gameContext';
import { useAuth } from '../../hooks/authContext';
import { useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import Table from "../../components/table";

const TableScreen = () => {
    return (
        <>
        </>
    )
};

export default () => (
    <GameContext>
        <TableScreen/>
    </GameContext>
);
