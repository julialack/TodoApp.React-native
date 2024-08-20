// todosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TodoState {
  todos: string[]
}

const initialState: TodoState = {
  todos: [],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push(action.payload)
    },
  },
})

export const { addTodo } = todosSlice.actions

export default todosSlice.reducer
