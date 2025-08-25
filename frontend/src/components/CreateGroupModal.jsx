import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../features/chat/chatSlice';

const CreateGroupModal = ({ setIsModalOpen }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.chat);

  const handleUserSelect = (user) => {
    if (selectedUsers.find((u) => u._id === user._id)) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName && selectedUsers.length > 0) {
      dispatch(createGroup({ name: groupName, members: selectedUsers.map((u) => u._id) }));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Group</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="groupName" className="sr-only">Group Name</label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Group Name"
              className="w-full px-4 py-3 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Select Members</h3>
            <div className="flex flex-col mt-4 space-y-2 h-48 overflow-y-auto">
              {users.map((user) => (
                <div key={user._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={user._id}
                    checked={selectedUsers.some((u) => u._id === user._id)}
                    onChange={() => handleUserSelect(user)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={user._id} className="ml-2 text-sm font-medium text-gray-900">
                    {user.username}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
