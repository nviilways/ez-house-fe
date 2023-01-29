export interface LoginAuth{
    email: string
    password: string
}

export interface RegisterAuth {
    email: string
    password: string
    city_id: number
}

export interface TokenAuth {
    token: string
}