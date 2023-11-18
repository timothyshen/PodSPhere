import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [profileId, setProfileId] = useState(null);

    const loginSuccess = (id) => {
        setProfileId(id);
    };

    return (
        <AuthContext.Provider value={{ profileId, loginSuccess }}>
            {children}
        </AuthContext.Provider>
    );
}
