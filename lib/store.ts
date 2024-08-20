// store.js
import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '@/lib/todosSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type ReduxStore = {
  getState: () => RootState
  dispatch: AppDispatch
}
