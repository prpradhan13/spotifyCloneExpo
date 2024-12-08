import TopButtons from "@/src/components/buttons/TopButtons";
import TitleAndCard from "@/src/components/TitleAndCard";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePopularAlbums } from "@/src/utils/useSpotifyQueries";

export default function Index() {
  const { albums, isLoading, isError, error, refetch } = usePopularAlbums();

  return (
    <SafeAreaView className="bg-[#191414] flex-1 py-8 pl-5">
      <ScrollView>
        {/* Top most part */}
        <View className="w-full flex-row gap-4">
          <TouchableOpacity className="bg-activeButton rounded-full w-10 h-10 items-center justify-center">
            <Text className="text-sm font-bold"> S </Text>
          </TouchableOpacity>

          <TopButtons btnName="All" />
          <TopButtons btnName="Wraped" />
          <TopButtons btnName="Music" />
        </View>

        {/* First Title and Cards */}
        {isError ? (
          <View className="flex-1 items-center justify-center mt-10">
            <Text className="text-red-500 mb-4">Error: {error.message}</Text>
            <TouchableOpacity
              onPress={() => refetch()}
              className="bg-red-500 px-4 py-2 rounded"
            >
              <Text className="text-white font-bold">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="w-full">
            <TitleAndCard title="Popular Albums" dataList={albums} isLoading={isLoading} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
