import { useState, createContext, SetStateAction, useContext } from "react";
export interface User {
    name: string;
    password: string;
}
interface AuthContextProps {
    token: string | null;
    error: string | null;
    login: ( user: User) => void;
    logout: () => void;
}
interface AuthProviderProps {
    children: React.ReactNode;
}
const testUser: User = {
    name: 'bj',
    password: 'pass424'
}
const AuthContext = createContext<AuthContextProps | null>(null);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const login = (user: User) => {
        if (testUser.name === user.name && testUser.password === user.password) {
            setToken("1234"); // Set your JWT or any other token value here
        } else {
            setError("Username or password is invalid!");
        }
    };

    const logout = () => {
        // setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, error, login, logout }}>
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