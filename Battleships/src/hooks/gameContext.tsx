import {createContext, useContext, useState} from 'react'
import {loadGame} from "../api";
import {useAuth} from "./authContext";

export interface Game {
    id: string;
    status: GameStatus;
    player1Id: string;
    player2Id: string | null;
    playerToMoveId: string;
    moves: Move[];
    player1: User;
    player2: User | null;
    shipsCoord: ShipCoord[] | null
}

enum GameStatus {
    CREATED = "CREATED",
    MAP_CONFIG = "MAP_CONFIG",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

export interface Move {
    x: string;
    y: number;
    result: boolean;
    playerId: string;
}

export interface User {
    id: string;
    email: string;
}

export interface Ship {
    x: string;
    y: number;
    size: 2 | 3 | 4 | 6;
    direction: "HORIZONTAL" | "VERTICAL";
}

export interface ShipCoord {
    id: string;
    x: string;
    y: number;
    gameId: string;
    playerId: string;
    hit: boolean;
}

export interface Strike {
    x: string;
    y: number;
}

interface GameContext {
    game: Game | null;
    loadGame: (id: string) => Promise<void>
}

const Context = createContext<GameContext>({
    loadGame: () => Promise.resolve(),
    game: null
})

export const GameContext: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [game, setGame] = useState<Game | null>(null);

    const auth = useAuth();

    const handleLoadGame = async (id: string) => {
        const response = await loadGame(auth.token, id)
        setGame(response)
    }

    return (
        <Context.Provider value={{loadGame: handleLoadGame, game}}>
            {children}
        </Context.Provider>
    )
}

export const useGameContext = () => useContext(Context);