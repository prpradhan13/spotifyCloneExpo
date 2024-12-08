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
import { usePopularAlbums, usePopularPlaylists, useSeveralArtist } from "@/src/utils/useSpotifyQueries";
import ArtistShowcase from "@/src/components/ArtistShowcase";

export default function Index() {
  const albums = usePopularAlbums();
  const playLists = usePopularPlaylists();
  const artists = useSeveralArtist();

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
          <View className="w-full">
            <TitleAndCard title="Popular Albums" dataList={albums} />
            <TitleAndCard title="Popular Playlists" dataList={playLists} />

            
              <ArtistShowcase artistsData={artists} />
            
          </View>

          <View className="h-[50px]">

          </View>
      </ScrollView>
    </SafeAreaView>
  );
}
