import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSingleAlbum } from "@/src/utils/useSpotifyQueries";
import AntDesign from "@expo/vector-icons/AntDesign";

const album = () => {
  const { id } = useLocalSearchParams();

  const { albumData, isLoading, isError, error } = useSingleAlbum(id);

  const albumImage = albumData?.images[0]?.url;
  const albumArtistNames = albumData?.artists.map((artist: any) => artist.name);
  const trackArtistNames = albumData?.tracks.items[0].artists.map(
    (artist: any) => artist.name
  );

  return (
    <SafeAreaView className={`bg-[#191414] flex-1 px-5 pt-5`}>
      <View className="flex-1">
        <View className="w-full flex justify-center items-center overflow-hidden">
          {/* Image */}
          <View style={{ width: 260, height: 260, marginTop: 8 }}>
            <Image
              source={{ uri: albumImage }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 5,
                shadowColor: "white",
              }}
              resizeMode="cover"
            />
          </View>

          <View className="w-full mt-8">
            <Text className="text-white font-bold text-2xl uppercase">
              {albumData?.name}
            </Text>
            <Text className="text-white font-bold text-sm capitalize">
              {albumArtistNames}
            </Text>
            <Text className="text-[#949494] font-medium text-sm capitalize">
              {albumData?.type} • {albumData?.release_date.split("-")[0]}
            </Text>
          </View>
        </View>

        <FlatList
          data={albumData?.tracks?.items}
          keyExtractor={(flatlistId) => flatlistId.id}
          renderItem={({ item }) => (
            <View className="w-full mt-8 gap-5">
              <TouchableOpacity
                key={item?.id}
                className="w-full flex-row justify-between"
              >
                <View>
                  <Text className="text-white text-lg font-semibold">
                    {" "}
                    {item?.name}{" "}
                  </Text>
                  <Text className="text-[#949494]"> {trackArtistNames} </Text>
                </View>
                <View className="rotate-90">
                  <AntDesign name="ellipsis1" size={24} color="#d1d1d1" />
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default album;
