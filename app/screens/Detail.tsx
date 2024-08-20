import React from 'react'
import { View, Text } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'

export default function Detail() {
  const { todo } = useLocalSearchParams()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Todo: {todo}</Text>
    </View>
  )
}
