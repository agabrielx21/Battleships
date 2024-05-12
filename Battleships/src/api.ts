import {Ship} from "./hooks/gameContext";

const baseURL = "http://163.172.177.98:8081"

const baseHeaders = {
    "Content-Type": "application/json",
    "Accept": "*/*",
}

export const register = async (email: string, password: string) => {
    const response = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    const data = await response.json()
    return data.accessToken
}

export const login = async (email: string, password: string) => {
    const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();
    return data.accessToken;
}

export const getUser = async (token: string) => {
    const response = await fetch(`${baseURL}/user/details/me`, {
        method: "GET",
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    console.log(data);

    return data;
}


export const listGames = async (token: string) => {
    const response = await fetch(`${baseURL}/game`, {
        method: "GET",
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()
    return data.games
}

export const createGame = async (token: string) => {
    const response = await fetch(`${baseURL}/game`, {
        method: "POST",
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    console.log(data)

    return data
}

export const loadGame = async (token: string, gameId: string) => {
    const response = await fetch(`${baseURL}/game/${gameId}`, {
        method: "GET",
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    console.log(data)

    return data
}

export const joinGame = async (token: string, gameId: string) => {
    const response = await fetch(`${baseURL}/game/join/${gameId}`, {
        method: "POST",
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    console.log(data)

    return data
}

export const mapConfig = async (token: string, gameId: string, ships: Ship[]) => {
    const response = await fetch(`${baseURL}/game/${gameId}`, {
        method: "PATCH",
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ships
        })
    })

    const data = await response.json()

    console.log(data)

    return data
}

export const sendStrike = async (token: string, gameId: string, x: string, y: number) => {
    const response = await fetch(`${baseURL}/game/strike/${gameId}`, {
        method: "POST",
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            x,
            y,
        })
    })

    const data = await response.json();

    console.log(data)

    return data;
};