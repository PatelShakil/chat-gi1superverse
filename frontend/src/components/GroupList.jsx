import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups, selectChat } from '../features/chat/chatSlice';

const GroupList = () => {
  const dispatch = useDispatch();
  const { groups, selectedChat } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {groups.map((group) => (
          <div
            key={group._id}
            className={`flex items-center border-b-2 border-gray-200 p-3 md:p-4 cursor-pointer transition-colors duration-200 ${selectedChat?._id === group._id && selectedChat?.isGroup ? 'text-[#F3BF31] bg-[#084595] shadow' : 'hover:bg-gray-100'}`}
            onClick={() => dispatch(selectChat({ ...group, isGroup: true }))}
          >
            <img
              src={group.groupIcon || `https://ui-avatars.com/api/?name=${group.name}&background=random`}
              alt={group.name}
              className="w-8 h-8 md:w-10 md:h-10 mr-3 md:mr-4 rounded-full"
            />
            <div className="flex-1 truncate">
              <h3 className="font-semibold text-sm md:text-base">{group.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
