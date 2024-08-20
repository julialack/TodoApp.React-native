# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

##

###

```sh
expo init todo-app
cd todo-app

npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler
npm install expo-router
```

app.json support devices

create folder structure

app/screens/Home.tsx

[flatlist] https://reactnative.dev/docs/flatlist

- keyExtractor () == uuid or nanoid => generate non data dependent id
- Link > btn > p (router template literal i created through object)

- should not push callback --> this is not prop drilling

```tsx
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native'
import { useRouter } from 'expo-router'

export default function Home() {
  const [todos, setTodos] = useState<string[]>([])
  const router = useRouter()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push({ pathname: 'Detail' rr})}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title='Add Todo'
        onPress={() => router.push({ pathname: 'Add', params: { setTodos } })}
      />
    </View>
  )
}
```

- - annonymous f() instead of callback push

Detail.tsx

```tsx
import React from 'react'
import { View, Text } from 'react-native'
import { useRouter, useSearchParams } from 'expo-router'

export default function Detail() {
  const { todo } = useSearchParams()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Todo: {todo}</Text>
    </View>
  )
}
```

Add.tsx

```tsx
import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { useRouter, useSearchParams } from 'expo-router'

export default function Add() {
  const [text, setText] = useState('')
  const router = useRouter()
  const { setTodos } = useSearchParams()

  const addTodo = () => {
    setTodos((prevTodos) => [...prevTodos, text])
    router.back()
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
      <Button title='Add' onPress={addTodo} />
    </View>
  )
}
```

app/\_layout.tsx

```tsx
import React from 'react'
import { Slot } from 'expo-router'

export default function Layout() {
  return <Slot />
}
```

index.tsx

```tsx
import React from 'react'
import Home from './screens/Home'

export default function Index() {
  return <Home />
}
```

#### fix redux toolkit

```ts
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
```

```ts
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

```tsx

```

```tsx
import { useAppDispatch } from '@/lib/hooks'
import { addTodo } from '@/lib/todosSlice'
export default function Add() {
   const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo(text)) // Ensure `text` is a string
      router.back()
    }
}
```
