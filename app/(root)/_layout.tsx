import { useAuth } from "@/lib/global-provider";
import { Redirect, Slot, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppRouteLayout() {
  const { loading, isLoggedIn } = useAuth();

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full w-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="properties/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
