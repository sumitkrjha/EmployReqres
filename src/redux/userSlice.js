import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = import.meta.env.VITE_APP_BASE_URL;
const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

// Async action to fetch users (only once when the page loads)
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}/api/users?page=1`);
      const data = await response.json();
      return data.data; // Store all users from page 1 in state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const hasFetchedBefore = storedUsers.length > 0;
const userSlice = createSlice({
  name: "users",
  initialState: {
    data: storedUsers,
    page: 1,
    perPage: 3,
    loading: false,
    error: null,
    hasFetched: hasFetchedBefore,
  },
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    updateUser: (state, action) => {
      const { id, first_name, last_name, email } = action.payload;

      state.data = state.data.map((user) =>
        user.id === parseInt(id)
          ? { ...user, first_name, last_name, email }
          : user
      );
      localStorage.setItem("users", JSON.stringify(state.data));
    },
    deleteUser: (state, action) => {
      const toDeleteId = action.payload;

      state.data = state.data.filter((user) => user.id !== toDeleteId);
      localStorage.setItem("users", JSON.stringify(state.data));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.hasFetched = true;
        localStorage.setItem("users", JSON.stringify(action.payload));
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setUsers, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
