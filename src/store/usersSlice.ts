// Redux for user state management
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../pages/Home'

interface UsersState {
  users: User[]
  isLoading: boolean
}

const initialState: UsersState = {
  users: [],
  isLoading: true
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Store API data
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
      state.isLoading = false
    },
    // Add new user to beginning
    addUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload)
    },
    // Update existing user
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    },
    // Remove user from state
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export const { setUsers, addUser, updateUser, deleteUser, setLoading } = usersSlice.actions
export default usersSlice.reducer