import { createContext, useContext, useState } from 'react'
import { loadGame } from "../api";
import { useAuth } from "./authContext";

interface User {
    id: string;
    email: string;
}

interface Move {
    x: string;
    y: number;
    result: boolean;
    playerId: string;
}

enum GameStatus {
    CREATED = "created",
    MAP_CONFIG = "map_config",
    ACTIVE = "active",
    FINISHED = "finished"
}

interface Game {
    id: string;
    status: GameStatus;
    player1Id: string;
    player2Id: string | null;
    playerToMoveId: string;
    "moves": Move[];
    "player1": User;
    "player2": User | null;
}

interface GameContext {
    game: Game | null;
    loadGame: (id: string) => Promise<void>
}

const Context = createContext<GameContext>({
    loadGame: () => Promise.resolve(),
    game: null
})

export const GameContext: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [game, setGame] = useState<Game | null>(null);

    const auth = useAuth();

    const handleLoadGame = async (id: string) => {
        const response = await loadGame(auth.token, id)
        setGame(response)
    }

    return(
        <Context.Provider value={{loadGame: handleLoadGame, game}}>
            {children}
        </Context.Provider>
    )
}

export const useGameContext = () => useContext(Context);