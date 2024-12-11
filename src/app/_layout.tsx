import "@/src/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlayerProvider from "../context/PlayerProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Create a client
const queryClient = new QueryClient();

export const Layout = () => {
  // useEffect(() => {
  //   NavigationBar.setPositionAsync('absolute')
  //   NavigationBar.setButtonStyleAsync("light");
  //   NavigationBar.setBackgroundColorAsync('rgba(0, 0, 0, 0.5)');
  // }, []);

  return (
    <>
      <StatusBar
        style="light"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        translucent
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="album/[id]"
          options={{ headerShown: false, animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="artistTracks/[artistId]"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="fullPlayer"
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
};

export default function MainLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
        <GestureHandlerRootView>
          <Layout />
        </GestureHandlerRootView>
      </PlayerProvider>
    </QueryClientProvider>
  );
}
