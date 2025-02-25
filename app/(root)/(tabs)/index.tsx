import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-lg my-10 font-rubik">
        Welcome to ReState
      </Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/sign-in");
        }}
        activeOpacity={0.7}
        className="px-4 py-2 bg-primary-300 rounded-lg"
      >
        <Text className="text-white font-bold text-base">sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
