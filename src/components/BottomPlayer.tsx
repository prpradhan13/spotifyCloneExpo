import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { usePlayer } from '../context/PlayerProvider'
import { useTrackDetails } from '../utils/useSpotifyQueries'

const BottomPlayer = () => {
    const { track } = usePlayer()

    const { trackData, isLoading, isError } = useTrackDetails(track || "")

    if (!track) return null;

  return (
    <View className={`w-full p-3 absolute bottom-14 ${track ? "block" : "hidden"}`}>
        <View className='bg-[#1ED760] w-full h-20 rounded-md'>
        {isLoading && <ActivityIndicator />}
        {isError && <Text className="text-red-500">Error loading track details</Text>}
        {trackData && (
          <>
            <Text className="text-black font-semibold">{trackData?.trackName}</Text>
            <Text className="text-black text-sm">{trackData?.artists?.map((artist) => artist.name).join(", ")}</Text>
          </>
        )}
        </View>
    </View>
  )
}

export default BottomPlayer;