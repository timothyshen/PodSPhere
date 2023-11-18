import React, { useState } from 'react';
import UserHome from '../view/home';
import Login from '../view/login';

export default function Home() {
  const [activePage, setActivePage] = useState('Login');

  const navigateToPage = (page: React.SetStateAction<string>) => {
    setActivePage(page);
  };

  return (
    <div className="h-[600px] w-[400px] rounded-t-lg">

      {activePage === 'UserHome' && <UserHome navigateToPage={navigateToPage} />}
      {activePage === 'Login' && <Login navigateToPage={navigateToPage} />}
    </div>
  );
}
