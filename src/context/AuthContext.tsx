import { useState, createContext, SetStateAction, useContext } from "react";
import axios from "axios";

export interface User {
    name: string;
    password: string;
}

export interface RegisterUser {
    name: string;
    password: string;
    confirm: string;
}

interface AuthContextProps {
    token: string | null;
    error: string | null;
    message: string | null;
    login: (user: User) => void;
    logout: () => void;
    register: (user: RegisterUser) => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | null>(null);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [message, setMsg] = useState<string | null>(null);

    const login = async (user: User) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            username: user.name,
            password: user.password
        });

        if(response.data.error) {
            setError(response.data.error);
        } else {
            setToken(response.data.token);
        }
    };

    const register = async (user: RegisterUser) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
            username: user.name,
            password: user.password,
            confirmPassword: user.confirm
        });
        if(response.data.error) {
            setError(response.data.error);
        } else {
            setMsg(response.data.message);
        }
    }

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, error, message, login, logout, register }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};