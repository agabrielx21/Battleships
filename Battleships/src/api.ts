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

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.accessToken;
}