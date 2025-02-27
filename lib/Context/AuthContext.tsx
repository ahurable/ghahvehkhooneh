"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {jwtDecode} from "jwt-decode";
import { LOCALHOST } from "../variebles";

// API endpoint for refreshing token
const REFRESH_URL = LOCALHOST+"api/auth/refresh/";

// Define user structure
interface User {
    username: string;
    avatar: string;
    is_admin: boolean;
}

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    login: (access: string, refresh: string) => void;
    logout: () => void;
    refreshAccessToken: () => Promise<void>;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        const storedAccess = localStorage.getItem("access");
        const storedRefresh = localStorage.getItem("refresh");

        if (storedAccess && storedRefresh) {
            try {
                const decodedUser: User = jwtDecode(storedAccess);
                setUser(decodedUser);
                setAccessToken(storedAccess);
                setRefreshToken(storedRefresh);
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        }
    }, []);

    // Function to refresh the access token
    const refreshAccessToken = async () => {
        if (!refreshToken) {
            console.error("No refresh token available.");
            logout();
            return;
        }

        try {
            const response = await fetch(REFRESH_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                login(data.access, data.refresh)
            } else {
                console.error("Failed to refresh access token.");
                logout();
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            logout();
        }
    };

    // Function to log in the user
    const login = (access: string, refresh: string) => {
        try {
            const decodedUser: User = jwtDecode(access);
            setUser(decodedUser);
            setAccessToken(access);
            setRefreshToken(refresh);
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    };

    // Function to log out the user
    const logout = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook to use Auth Context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
