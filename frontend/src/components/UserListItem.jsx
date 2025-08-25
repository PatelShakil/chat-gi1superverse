import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChat } from '../features/chat/chatSlice';

const UserListItem = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state) => state.chat);

  const handleUserSelect = () => {
    dispatch(selectChat({ ...user, isGroup: false }));
  };

  return (
    <div
      className={`flex items-center border-b-2 border-gray-200 p-3 md:p-4 cursor-pointer transition-colors duration-200 ${selectedChat?._id === user._id && !selectedChat?.isGroup ? 'text-[#F3BF31] bg-[#084595]' : 'hover:bg-gray-100'}`}
      onClick={handleUserSelect}
    >
      <img
        src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
        alt={user.username}
        className="w-8 h-8 md:w-10 md:h-10 mr-3 md:mr-4 rounded-full"
      />
      <div className="flex-1 truncate">
        <h3 className="font-semibold text-sm md:text-base">{user.username}</h3>
      </div>
    </div>
  );
};

export default UserListItem;
