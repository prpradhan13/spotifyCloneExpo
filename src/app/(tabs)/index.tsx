import TopButtons from "@/src/components/buttons/TopButtons";
import TitleAndCard from "@/src/components/TitleAndCard";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  usePopularAlbums,
  usePopularPlaylists,
  useSeveralArtist,
} from "@/src/utils/useSpotifyQueries";
import ArtistShowcase from "@/src/components/ArtistShowcase";
import BottomPlayer from "@/src/components/BottomPlayer";

export default function Index() {
  const albums = usePopularAlbums();
  const playLists = usePopularPlaylists();
  const artists = useSeveralArtist();

  return (
    <View className="flex-1">
      <ScrollView className="bg-[#191414] pt-14 pl-5">
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
          <ArtistShowcase artistsData={artists} />
          <TitleAndCard title="Popular albums" dataList={albums} />
          <TitleAndCard title="Popular playlists" dataList={playLists} />
        </View>

        <View className="h-[21vh]">

        </View>
      </ScrollView>
    </View>
  );
}
