import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

const SignIn = () => {
  const handleLogin = () => {};

  return (
    <ScrollView contentContainerClassName="h-full bg-white">
      <Image
        source={images.onboarding}
        className="w-full h-4/6"
        resizeMode="contain"
      />

      <View className="px-10">
        <Text
          className="text-base text-center uppercase font-rubik 
        text-black-200"
        >
          Welcome to ReState
        </Text>

        <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
          Let's Get Your Closer to {"\n"}
          <Text className="text-primary-300">Your Ideal Home</Text>
        </Text>

        <Text className="text-lg font-rubik text-black-200 text-center mt-12">
          Login to ReState with Google
        </Text>

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-white shadow-md flex-row items-center justify-center gap-2 shadow-zinc-300 rounded-full w-full 
          py-4 mt-5"
        >
          <Image
            source={icons.google}
            className="w-5 h-5"
            resizeMode="contain"
          />
          <Text>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;
