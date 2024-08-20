import React, { createContext, useState, useContext, ReactNode } from 'react'

interface TodoContextType {
  todos: string[]
  setTodos: React.Dispatch<React.SetStateAction<string[]>>
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<string[]>([])

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  return context
}
