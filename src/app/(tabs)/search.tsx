import { View, Text, Image, TouchableOpacity, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import localJsonData from "@/src/data.json";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSearchResults } from "@/src/utils/useSpotifyQueries";

const search = () => {
  const [searchText, setSearchText] = useState<string | "">("");
  const [debouncedValue, setDebouncedValue] = useState<string | "">("");
  const [isSearchResultBox, setIsSearchResultBox] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchText);
    }, 300);

    setIsSearchResultBox(searchText !== ""); // Activate overlay if there’s input

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const handleSearchClose = () => {
    setSearchText("");
    setIsSearchResultBox(false);
  };

  const { data: tracks, isLoading } = useSearchResults(debouncedValue);

  return (
    <SafeAreaView className="bg-[#191414] flex-1 px-8">
      {/* Search Box */}
      <View className="bg-white h-14 px-2 rounded-md mt-7 flex-row items-center justify-between overflow-hidden">
        <View className="flex-row gap-3 items-center">
          <Feather name="search" size={24} color="black" />
          <TextInput
            value={searchText}
            onChangeText={(value) => setSearchText(value)}
            placeholder="Search here"
            className="text-black w-[250px] text-lg"
          />
        </View>

        {isSearchResultBox && (
          <TouchableOpacity onPress={handleSearchClose}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {isSearchResultBox ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 25, paddingTop: 15 }} showsVerticalScrollIndicator={false} className="bg-[#191414] flex-1">
          {isLoading && (
            <View className="justify-center items-center">
              <ActivityIndicator size={"large"} color={"1ED760"} />
            </View>
          )}
          {tracks?.map((track) => (
            <Pressable className="w-full flex-row items-center mb-8 overflow-hidden">
              <Image
                source={{ uri: track?.imageUrl }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  marginRight: 12,
                }}
              />
              <View className="max-w-[60%]">
                <Text className="text-white text-lg font-medium" numberOfLines={1}>
                  {track.trackName}
                </Text>
                <Text className="text-[#cdc7c7]" numberOfLines={1}>
                  {track?.artists
                    ?.map((artist) => artist.name)
                    .join(", ")}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <>
          {/* Browsing box */}
          <View className="mt-8">
            <Text className="text-white font-bold text-lg">Start Browsing</Text>
            <View className="flex-row flex-wrap gap-4 mt-4">
              {localJsonData.searchScreenImg.map((item) => (
                <View
                  key={item.id}
                  style={{ backgroundColor: item.color }}
                  className={`w-[170px] h-20 rounded-lg overflow-hidden`}
                >
                  <Text className="text-white font-bold text-xl capitalize pl-2">
                    {item.name}
                  </Text>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                      width: 70,
                      height: 70,
                      position: "absolute",
                      bottom: -18,
                      right: -2,
                      borderRadius: 6,
                      transform: [{ rotate: "30deg" }],
                    }}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Explore genre */}
          <View className="mt-9">
            <Text className="text-white font-bold text-lg">
              {" "}
              Explore Genre{" "}
            </Text>

            <View className="mt-4 flex-row gap-3 justify-center">
              <View className="h-56 w-32 bg-[#ffffff99] rounded-md flex justify-end">
                <Text className="text-center text-white font-medium pb-5">
                  {" "}
                  #bollywood{" "}
                </Text>
              </View>
              <View className="h-56 w-32 bg-[#ffffff99] rounded-md flex justify-end">
                <Text className="text-center text-white font-medium pb-5">
                  {" "}
                  #hollywood{" "}
                </Text>
              </View>
              <View className="h-56 w-32 bg-[#ffffff99] rounded-md flex justify-end">
                <Text className="text-center text-white font-medium pb-5">
                  {" "}
                  #indian jazz{" "}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default search;
