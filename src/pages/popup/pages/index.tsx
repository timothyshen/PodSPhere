import React, { useState } from 'react';
import UserHome from '../view/home';
import Login from '../view/login';
import Profile from '../view/Profile';
import { RequireProfileSession } from '../provider/ProfileSession';

export default function Home() {
  const [activePage, setActivePage] = useState('Login');

  const navigateToPage = (page: React.SetStateAction<string>) => {
    setActivePage(page);
  };

  const handleLoggedIn = () => {
    setActivePage('UserHome');
  };

  const handleLoggedOut = () => {
    setActivePage('Login');
  };

  return (
    <div className=" w-[400px] h-[600px] rounded-t-lg">
      {activePage === 'UserHome' && <UserHome navigateToPage={navigateToPage} />}
      {activePage === 'Login' && <Login navigateToPage={navigateToPage} />}
      {activePage === 'Profile' && <Profile navigateToPage={navigateToPage} />}
    </div>
  );
}
