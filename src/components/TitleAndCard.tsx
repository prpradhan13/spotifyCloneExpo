import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import React from "react";
import { TitleAndCardProps } from "./types";
import { router } from "expo-router";

const TitleAndCard = ({ title, dataList }: any) => {

  return (
    <View className="w-full mt-10">
      <Text style={{ fontFamily: "Montserrat" }} className="text-white text-[22px] font-bold">{title}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4"
      >
        {dataList?.data?.map((item: any) => (
          <View
            key={item.id}
            className="mr-4 overflow-hidden relative"
          >
            {dataList.isLoading ? (
              <View className="w-full h-full bg-transparent flex justify-center items-center">
                <ActivityIndicator size="large" color="#1DB954" />
              </View>
            ) : (
              <Pressable
                className="w-[170px]"
                onPress={() => router.push(`/album/${item.id}`)}
              >
                <Image
                  source={{
                    uri: item.imageUrl,
                  }}
                  style={{ width: "100%", height: 160 }}
                  resizeMode="cover"
                />
                <View className="mt-3">
                  <Text style={{ fontFamily: "Montserrat" }} className="font-bold text-white" numberOfLines={1}>{item.name}</Text>
                  <Text className="text-[#c7c7c7] text-sm capitalize" numberOfLines={2}>{item.type} • {item.artist || item.playListOwnerName}</Text>
                </View>
              </Pressable>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TitleAndCard;
