import React from "react";
import { Tabs } from "expo-router";
import { HapticTab } from "@/src/components/HapticTab";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BottomTabBar, useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import BottomPlayer from "@/src/components/BottomPlayer";

const TabLayout = () => {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          shadowColor: "transparent",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderTopWidth: 0,
        }
      }}
      tabBar={(props) => (
        <View>
          <BottomPlayer />
          <BottomTabBar {...props} />
        </View>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="home-filled"
              size={28}
              color={focused ? "white" : "#ababab"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="search1"
              size={26}
              color={focused ? "white" : "#ababab"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="library"
              size={26}
              color={focused ? "white" : "#ababab"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
