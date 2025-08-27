import { View, Text, Button } from "react-native";
import React from "react";
import { useClerk } from "@clerk/clerk-expo";

const Home = () => {
  const { signOut } = useClerk();
  return (
    <View>
      <Text>Home</Text>
      <Button
        onPress={() => {
          signOut();
        }}
        title="Logout"
      />
    </View>
  );
};

export default Home;
