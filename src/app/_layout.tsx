import "@/src/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

export default function RootLayout() {
  
  useEffect(() => {
    // Set the navigation bar background color
    NavigationBar.setBackgroundColorAsync("#191414"); // Change the color here
    // Optionally set the button style (light or dark)
    NavigationBar.setButtonStyleAsync("light"); // Icons will be light-colored
  }, []);

  return (
    <>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
    <StatusBar style="light" backgroundColor="black" />
    </>
  );
}
