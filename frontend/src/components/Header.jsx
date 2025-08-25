import React from 'react';

const Header = () => {
  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className='flex items-center gap-2'>
        <img src='public/logo.jpg' alt='logo' className='w-10 h-10 rounded-md' /> 
        <h1 className="text-2xl font-bold">Gi1 Super Chat</h1>
      </div>
      <button className='text-[#F3BF31] hover:shadow-md bg-[#084595] rounded-md px-4 py-2' onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
