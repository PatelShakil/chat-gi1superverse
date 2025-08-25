import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from '../../services/chatService';
import groupService from '../../services/groupService';

const initialState = {
  users: [],
  groups: [],
  selectedChat: null,
  messages: [],
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('chat/fetchUsers', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await chatService.getUsers(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async ({ id, isGroup }, thunkAPI) => {
  try {
    console.log(id, isGroup)
    const token = thunkAPI.getState().auth.token;
    if (isGroup) {
      return await chatService.getGroupMessages(token, id);
    } else {
      return await chatService.getMessages(token, id);
    }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createGroup = createAsyncThunk('chat/createGroup', async (groupData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await groupService.createGroup(groupData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchGroups = createAsyncThunk('chat/fetchGroups', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await groupService.getGroups(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
      state.messages = [];
    },
    addMessage: (state, action) => {
      if (state.selectedChat && ((!state.selectedChat.isGroup && (action.payload.from === state.selectedChat._id || action.payload.to === state.selectedChat._id)) || (state.selectedChat.isGroup && action.payload.group === state.selectedChat._id))) {
        state.messages.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups.push(action.payload);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { selectChat, addMessage } = chatSlice.actions;

export default chatSlice.reducer;