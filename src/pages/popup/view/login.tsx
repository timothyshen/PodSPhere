import React from 'react';
import { LogInPage } from '../components/Login/NormalLogin'
// import WorldCoinButton from '../components/Login/WorldCoinButton'

export default function Login({ navigateToPage }: { navigateToPage: (page: React.SetStateAction<string>) => void }) {

    return (
        <div className="w-[400px] h-[600px] flex flex-col items-center justify-center gap-4 bg-gray-200">
            <img
                src='logo-40.png' // Adjust the path according to your directory structure
                alt="Logo"
            />
            <LogInPage navigateToPage={navigateToPage} />
        </div>
    );
}
