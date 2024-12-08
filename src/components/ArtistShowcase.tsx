import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ArtistsProps } from "./types";

const ArtistShowcase = ({ artistsData }: any) => {
  return (
    <View className="mt-10">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=""
      >
        {artistsData?.data.map((artist: ArtistsProps) => (
          <Pressable key={artist?.id} className="flex items-center mr-4">
            {artistsData.isLoading ? (
              <View className="w-full h-[180px] bg-transparent flex justify-center items-center">
                <ActivityIndicator size="large" color="#1DB954" />
              </View>
            ) : (
              <>
                <Image
                  source={{ uri: artist.imageUrl }}
                  style={{
                    width: 170,
                    height: 170,
                    borderRadius: 100,
                  }}
                  resizeMode="cover"
                />
                <Text className="text-white font-bold text-[20px] mt-4">
                  {artist.artistName}
                </Text>
              </>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default ArtistShowcase;
