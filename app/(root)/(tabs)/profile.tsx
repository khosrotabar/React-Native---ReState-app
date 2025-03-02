import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { logout } from "@/lib/appwrite";
import { useAuth } from "@/lib/global-provider";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageProps,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingsItemProps {
  icon: ImageProps;
  title: string;
  onPress: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center justify-between"
    >
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-6" />
        <Text
          className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}
        >
          {title}
        </Text>
      </View>

      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
  );
};

const Profile = () => {
  const { user, refetch } = useAuth();

  const handleLogout = async () => {
    const results = await logout();

    if (results) {
      Alert.alert("Success", "You have been logged out successfully");
      refetch({});
    } else {
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerClassName="pb-32 px-7"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        <View className="flex-col flex items-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-[6px] right-[6px]">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
        </View>

        <View className="flex flex-col mt-10 gap-4">
          <SettingsItem
            icon={icons.calendar}
            title="My Bookings"
            onPress={() => {}}
          />
          <SettingsItem
            icon={icons.wallet}
            title="Payments"
            onPress={() => {}}
          />
        </View>

        <View className="flex flex-col mt-5 pt-5 gap-4 border-t-[1px] border-primary-200">
          {settings.slice(2).map((item, index) => {
            return <SettingsItem key={index} {...item} />;
          })}
        </View>

        <View className="flex flex-col mt-5 pt-5 gap-4 border-t-[1px] border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
