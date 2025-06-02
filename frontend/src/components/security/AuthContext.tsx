import {useEffect, useState, createContext, ReactNode, useContext} from "react";
import axios from "axios";

// Type for the authentication context value
interface AuthContextType {
    fetchedUser: string | null; // null initially, then "anonymousUser" or actual username
    loading: boolean;
}

// Type for the AuthProvider component's props
interface AuthProviderProps {
    children: ReactNode; // ReactNode covers JSX elements, strings, fragments, etc.
}

// --- AuthContext Definition ---
// Create a context, initialized with null.
export const AuthContext = createContext<AuthContextType | null>(null);


// --- AuthProvider Component ---
export function AuthProvider({ children }: AuthProviderProps) {
    const [fetchedUser, setFetchedUser] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get<string>("/api/oauthgithub/me")
            .then(response => {
                setFetchedUser(response.data);
            })
            .catch(() => {
                setFetchedUser("anonymousUser");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // The value provided to consumers of this context, ensuring it matches AuthContextType.
    const authContextValue: AuthContextType = { fetchedUser, loading };

    return (
        // here AuthContext gets its assigned value
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// --- Custom Hook for Easy Consumption ---
// this function is used in Login and ProtectedRoute component
export function useAuth(): AuthContextType {
    // useContext will return AuthContextType | null. We throw an error if null.
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider'); // will appear in the user's browser console during runtime if the condition is met
    }
    return context;
}