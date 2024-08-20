import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'

import { useAppDispatch } from '@/lib/hooks'
import { addTodo } from '@/lib/todosSlice'
export default function Add() {
  const [text, setText] = useState('')
  const router = useRouter()
  {
    /**  const { setTodos } = useLocalSearchParams()
     */
  }
  const dispatch = useAppDispatch()

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text)) // Ensure `text` is a string
      router.back()
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder='Enter todo'
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
        }}
      />
      <Button title='Add' onPress={handleAddTodo} />
    </View>
  )
}
