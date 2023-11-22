import { ProfileSession, SessionType } from '@lens-protocol/react-web';
import { useState } from 'react';
import { LogInPage } from '../components/Login/NormalLogin';

import { WhenLoggedIn, LoggedInChildren } from './WhenLoggedIn';

export type RequireProfileSessionProps = {
    children: LoggedInChildren<ProfileSession>;
    message?: string;
};

export function RequireProfileSession({ children, message }: RequireProfileSessionProps) {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            {(address) => (
                <WhenLoggedIn
                    with={SessionType.WithProfile}
                    fallback={
                        <>
                            {message && <p>{message}</p>}
                            {!showForm && <button onClick={() => setShowForm(true)}>Login as Profile</button>}
                            {showForm && <LogInPage />}
                        </>
                    }
                >
                    {children}
                </WhenLoggedIn>
            )}
        </>
    );
}
