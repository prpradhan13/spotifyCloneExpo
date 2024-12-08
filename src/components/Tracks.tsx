import { Pressable, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tracks = React.memo(({ track }: any) => {
  return (
    <View className={`mb-5 ${track?.name === "" ? "hidden" : ""}`}>
      <Pressable className={`w-full flex-row justify-between`}>
        <View className="w-[93%]">
          <Text className="text-white text-lg font-medium">{track?.name}</Text>
          <Text className="text-[#cdc7c7]">
            {track?.artists?.map((artist: any) => artist.name).join(", ")}
          </Text>
        </View>
        <View className="flex justify-center">
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="#cdc7c7"
          />
        </View>
      </Pressable>
    </View>
  );
});

export default Tracks;
