import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const library = () => {
  return (
    <SafeAreaView className='bg-[#191414] flex-1'>
      <Text className='text-white'>library</Text>
    </SafeAreaView>
  )
}

export default library;