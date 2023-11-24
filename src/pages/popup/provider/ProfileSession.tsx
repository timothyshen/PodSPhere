import { ProfileSession, SessionType } from '@lens-protocol/react-web';
import { useState } from 'react';

import { WhenLoggedIn, LoggedInChildren } from './WhenLoggedIn';
import { LogInPage } from '../components/Login/NormalLogin';

export type RequireProfileSessionProps = {
    children: LoggedInChildren<ProfileSession>;
    message?: string;
    navigateToPage: (page: React.SetStateAction<string>) => void;
};

export function RequireProfileSession({ children, message, navigateToPage }: RequireProfileSessionProps) {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <WhenLoggedIn
                with={SessionType.WithProfile}
                fallback={
                    <>
                        {message && <p>{message}</p>}
                        {!showForm && <LogInPage navigateToPage={navigateToPage} />}
                    </>
                }
            >
                {children}
            </WhenLoggedIn>

        </>
    );
}
