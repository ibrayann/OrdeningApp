import { Link } from "expo-router";
import { View, Text } from "react-native";
import Button from "@/src/components/Button";
import React from "react";

const index = () => {
  return (
    <Link href={"/sign-in"} asChild>
      <Button text="Sign in" />
    </Link>
  );
};

export default index;
