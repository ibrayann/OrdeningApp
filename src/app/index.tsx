import { View, Text } from "react-native";
import React, { useContext } from "react";
import Button from "../components/Button";
import { Link, Redirect, Stack } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { ActivityIndicator } from "react-native";
import { supabase } from "../lib/supabase";

const index = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (!session) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (!isAdmin) {
    return <Redirect href="/(user)" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sing Out" />
    </View>
  );
};

export default index;
