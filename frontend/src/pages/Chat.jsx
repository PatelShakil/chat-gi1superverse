import React from 'react';
import { useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import UserList from '../components/UserList';
import ChatWindow from '../components/ChatWindow';

const Chat = () => {
  const { selectedChat } = useSelector((state) => state.chat);

  return (
    <MainLayout>
      <div className="flex h-full w-full overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            h-full border-r border-gray-200 bg-white transition-all duration-300
            ${selectedChat ? 'hidden md:block md:w-1/3 lg:w-1/4' : 'w-full'}
          `}
        >
          <UserList />
        </aside>

        {/* Chat Window */}
        <section
          className={`
            flex-1 h-full bg-gray-50
            ${selectedChat ? 'w-full flex' : 'hidden md:flex'}
          `}
        >
          <ChatWindow />
        </section>
      </div>
    </MainLayout>
  );
};

export default Chat;
