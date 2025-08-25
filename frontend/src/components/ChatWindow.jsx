import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { FiSend } from 'react-icons/fi';
import { fetchMessages, addMessage } from '../features/chat/chatSlice';
import { format } from 'date-fns';

const socket = io('http://localhost:5000');

const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { selectedChat, messages, users } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (user) {
      socket.emit('addUser', user._id);
    }
  }, [user]);

  useEffect(() => {
    if (selectedChat) {
      if (selectedChat.isGroup) {
        socket.emit('join group', selectedChat._id);
      }
      dispatch(fetchMessages({ id: selectedChat._id, isGroup: selectedChat.isGroup }));
    }
  }, [selectedChat, dispatch]);

  useEffect(() => {
    socket.on('private message', (data) => {
      dispatch(addMessage(data));
    });

    socket.on('group message', (data) => {
      dispatch(addMessage(data));
    });

    return () => {
      socket.off('private message');
      socket.off('group message');
    };
  }, [dispatch]);

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message && selectedChat) {
      const msgData = { to: selectedChat._id, from: user._id, message: message, createdAt: new Date().toISOString() };
      if (selectedChat.isGroup) {
        socket.emit('group message', msgData);
      } else {
        socket.emit('private message', msgData);
      }
      dispatch(addMessage(msgData));
      setMessage('');
    }
  };

  const handleBackButtonClick = () => {
    // Implement your back button logic here
    dispatch({ type: 'chat/clearSelectedChat' });
    window.location.reload();
  };

  if (!selectedChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-6 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Welcome to Gi1 Super Chat</h2>
        <p className="mt-2 text-gray-500 text-sm md:text-base">Select a user or group to start a conversation.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col h-full bg-gray-50">
  {/* Chat Header */}
  <header className="flex items-center justify-between p-4 lg:pl-4 pl-0 text-[#F3BF31] bg-[#084595] shadow-md sticky top-0 z-10">
    <div className="flex items-center  space-x-3">
                        <button className='mr-2 text-xl lg:hidden' onClick={handleBackButtonClick}>⬅️</button>

      <img
        src={selectedChat.isGroup 
          ? selectedChat.groupIcon || `https://ui-avatars.com/api/?name=${selectedChat.name}&background=random`
          : `https://ui-avatars.com/api/?name=${selectedChat.username}&background=random`}
        alt={selectedChat.isGroup ? selectedChat.name : selectedChat.username}
        className="w-10 h-10 rounded-full"
      />
      <h2 className="text-lg font-semibold">
        {selectedChat.isGroup ? selectedChat.name : selectedChat.username}
      </h2>
    </div>
    {/* <div className="flex items-center space-x-4 text-gray-500">
      <button className="hover:text-secondary">🔍</button>
      <button className="hover:text-secondary">📞</button>
      <button className="hover:text-secondary">⋮</button>
    </div> */}
  </header>

  {/* Messages */}
  <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
    <div className="flex flex-col space-y-3">
      {messages.map((msg, i) => {
        const isMine = msg.from === user._id;
        const sender = users.find(u => u._id === msg.from);

        return (
          <div key={i} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-sm
                ${isMine ? 'bg-[#084595] text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm'}`}
            >
              {selectedChat.isGroup && !isMine && sender && (
                <div className="flex items-center mb-1 pr-2  text-[#F3BF31] bg-[#084595] rounded-full"> {/* Added chip styling */}
                  <img
                    src={`https://ui-avatars.com/api/?name=${sender.username}&background=random&size=20`} // Smaller size for avatar
                    alt={sender.username}
                    className="w-7 h-7 rounded-full mr-1" // Smaller size, margin-right
                  />
                  <p className="text-xs font-semibold ">{sender.username}</p>
                </div>
              )}
              <p className="text-sm leading-relaxed">{msg.message}</p>
              <p className={`text-[11px] mt-1 ${isMine ? 'text-right' : 'text-left'}`}>
                {format(new Date(msg.createdAt), 'p')}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  </div>

  {/* Input */}
  <div className="p-4 bg-white border-t shadow-md">
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 text-gray-800 bg-gray-100 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      <button
        type="submit"
        className="p-3 text-[#F3BF31] bg-[#084595] rounded-full shadow hover:bg-primary transition"
      >
        <FiSend className="w-5  h-5" />
      </button>
    </form>
  </div>
</div>

  );
};

export default ChatWindow;
