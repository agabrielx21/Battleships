import {Ship} from "./hooks/gameContext";

const baseURL = "http://163.172.177.98:8081"

const baseHeaders = {
    "Content-Type": "application/json",
    "Accept": "*/*",
}

export const register = async (email: string, password: string) => {
    try {
        const response = await fetch(`${baseURL}/auth/register`, {
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
        alert("Registration successful!");
        return data.accessToken;
    } catch (error) {
        alert("Registration failed. Please try again.");
        throw error;
    }
};

export const login = async (email: string, password: string) => {
    try {
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
        alert("Login successful!");
        return data.accessToken;
    } catch (error) {
        alert("Login failed. Please check your credentials and try again.");
        throw error;
    }
};

export const getUser = async (token: string) => {
    try {
        const response = await fetch(`${baseURL}/user/details/me`, {
            method: "GET",
            headers: {
                ...baseHeaders,
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        alert("Failed to fetch user details. Please try again later.");
        throw error;
    }
};

export const listGames = async (token: string) => {
    try {
        const response = await fetch(`${baseURL}/game`, {
            method: "GET",
            headers: {
                ...baseHeaders,
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data.games;
    } catch (error) {
        alert("Failed to fetch game list. Please try again later.");
        throw error;
    }
};

export const createGame = async (token: string) => {
    try {
        const response = await fetch(`${baseURL}/game`, {
            method: "POST",
            headers: {
                ...baseHeaders,
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        alert("Game created successfully!");
        return data;
    } catch (error) {
        alert("Failed to create game. Please try again later.");
        throw error;
    }
};

export const loadGame = async (token: string, gameId: string) => {
    try {
        const response = await fetch(`${baseURL}/game/${gameId}`, {
            method: "GET",
            headers: {
                ...baseHeaders,
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        alert("Failed to load game. Please try again later.");
        throw error;
    }
};

export const joinGame = async (token: string, gameId: string) => {
    try {
        const response = await fetch(`${baseURL}/game/join/${gameId}`, {
            method: "POST",
            headers: {
                ...baseHeaders,
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        alert("Joined game successfully!");
        return data;
    } catch (error) {
        alert("Failed to join game. Please try again later.");
        throw error;
    }
};

export const mapConfig = async (token: string, gameId: string, ships: Ship[]) => {
    try {
        const response = await fetch(`${baseURL}/game/${gameId}`, {
            method: "PATCH",
            headers: {
                ...baseHeaders,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ships
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        alert("Failed to configure map. Please try again later.");
        throw error;
    }
};

export const sendStrike = async (token: string, gameId: string, x: string, y: number) => {
    try {
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
        });

        const data = await response.json();
        alert("Strike sent successfully!");
        return data;
    } catch (error) {
        alert("Failed to send strike. Please try again later.");
        throw error;
    }
};