import React, { useState, useEffect } from 'react';

import { Button } from '../components/ui/button'
import { LogInPage } from '../components/Login/NormalLogin'
// import WorldCoinButton from '../components/Login/WorldCoinButton'

export default function Login({ navigateToPage }: { navigateToPage: (page: React.SetStateAction<string>) => void }) {
    const [currentSite, setCurrentSite] = useState('');
    const [activePage, setActivePage] = useState('index');


    const [url, setUrl] = useState<string>('');
    const [logo, setLogo] = useState<string>('');
    const [title, setTitle] = useState<number>(0);


    function injectedFunction() {
        const spans = document.querySelectorAll('span');
        console.log(spans); // This will log to the web page's console, not the extension's
        // If you need to send this data back to your extension, use chrome.runtime.sendMessage here

    }


    useEffect(() => {
        // @ts-ignore
        const messageListener = (message, sender, sendResponse) => {
            if (message.title) {
                setTitle(message.title);
                console.log("Title from active tab:", message.title);
            }
        };

        chrome.runtime.onMessage.addListener(messageListener);

        // Cleanup listener on component unmount
        return () => chrome.runtime.onMessage.removeListener(messageListener);
    }, []);


    const navigateToUserHome = () => {
        navigateToPage('UserHome');
    };
    const logDomElements = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            console.log(tabs)
            chrome.runtime.sendMessage({ action: "logDomElements", tabId: tabs[0].id });
        })
    };

    return (
        <div className="w-[400px] h-[600px] flex flex-col items-center justify-center gap-4 bg-gray-200">
            <LogInPage />
            {/* <WorldCoinButton /> */}

            {/* <Button onClick={navigateToUserHome}>
                test {title}
            </Button>
            <Button onClick={logDomElements}>
                Log DOM Elements
            </Button> */}
        </div>
    );
}
