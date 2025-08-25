import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchGroups } from '../features/chat/chatSlice';
import UserListItem from './UserListItem';
import GroupList from './GroupList';
import CreateGroupModal from './CreateGroupModal';
import { FiSearch, FiPlus } from 'react-icons/fi';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, groups } = useSelector((state) => state.chat);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchGroups());
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Chats</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 text-[#F3BF31] bg-[#084595] rounded-full hover:bg-secondary shadow-md transition"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <FiSearch className="absolute w-5 h-5 text-gray-400 top-3 left-3" />
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-2">
          <button
            className={`flex-1 py-2 text-sm rounded-lg transition 
              ${activeTab === 'users' 
                ? 'text-[#F3BF31] bg-[#084595] shadow' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`flex-1 py-2 text-sm rounded-lg transition 
              ${activeTab === 'groups' 
                ? 'text-[#F3BF31] bg-[#084595] shadow' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setActiveTab('groups')}
          >
            Groups
          </button>
        </div>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'users' &&
          filteredUsers.map((user) => (
            <UserListItem key={user._id} user={user} />
          ))}
        {activeTab === 'groups' && <GroupList />}
      </div>

      {/* Modal */}
      {isModalOpen && <CreateGroupModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default UserList;
