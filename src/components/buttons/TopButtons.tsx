import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

interface TopButtonsProps {
  btnName: string;
  onPress?: () => void;
}

const TopButtons = ({ btnName, onPress }: TopButtonsProps) => {
  return (
    <TouchableOpacity className="bg-[#3f3f3f] rounded-[16] px-4 py-1 items-center justify-center">
      <Text className="text-sm text-white"> {btnName} </Text>
    </TouchableOpacity>
  );
};

export default TopButtons;
