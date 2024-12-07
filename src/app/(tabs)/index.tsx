import TopButtons from "@/src/components/buttons/TopButtons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-[#191414] flex-1 py-8 px-5">
      <ScrollView>

        {/* Top most part */}
        <View className="w-full flex-row gap-4">
          <TouchableOpacity
            className="bg-activeButton rounded-full w-10 h-10 items-center justify-center"
          >
            <Text className="text-sm font-bold"> S </Text>
          </TouchableOpacity>

          <TopButtons btnName="All" />
          <TopButtons btnName="Wraped" />
          <TopButtons btnName="Music" />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
