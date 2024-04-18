const baseURL = "http://163.172.177.98:8081/docs/"

const baseHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
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
    console.log(data)
    return data.accessToken
}

export const login = async (email: string, password: string) => {
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
    console.log(data)
    return data.accessToken
}