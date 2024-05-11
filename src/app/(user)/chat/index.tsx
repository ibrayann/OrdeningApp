import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Chat = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Chat" }} />
      <Text>Chat</Text>
    </View>
  );
};

export default Chat;
