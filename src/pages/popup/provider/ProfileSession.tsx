import { ProfileSession, SessionType } from '@lens-protocol/react-web';
import { useState, useEffect } from 'react';
import { LogInPage } from '../components/Login/NormalLogin'

import { WhenLoggedIn, LoggedInChildren } from './WhenLoggedIn';

export type RequireProfileSessionProps = {
    children: LoggedInChildren<ProfileSession>;
    onLoggedIn: () => void;
    onLoggedOut: () => void;
    message?: string;
};

export function RequireProfileSession({ children, onLoggedIn, onLoggedOut, message }: RequireProfileSessionProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Here, you should check the login state of the user
        // For example, if you are using a global state or context to store the user's login status,
        // you should check that here and update `isLoggedIn` accordingly
        // For this example, let's assume there's a function `checkLoginStatus` that returns a boolean
        const checkLoginStatus = () => {
            // return true if logged in, else false
            return true;
        };

        const loggedIn = checkLoginStatus();
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
            onLoggedIn();
        } else {
            onLoggedOut();
        }
    }, [onLoggedIn, onLoggedOut]);

    return (
        <>
            <WhenLoggedIn
                with={SessionType.WithProfile}
                fallback={
                    <>
                        {message && <p>{message}</p>}
                    </>
                }
            >
                {children}
            </WhenLoggedIn>
        </>
    );
}
