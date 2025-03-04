import icons from "@/constants/icons";
import images from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { View, ScrollView, Image } from "react-native";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const imagesData = [
  { id: 1, image: images.newYork },
  { id: 2, image: images.japan },
  { id: 3, image: images.newYork },
];

const { width } = Dimensions.get("window");

const Property = () => {
  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance>(null);
  const { id } = useLocalSearchParams();
  const agentName = "Mohammad Khosrotabar";

  const renderItem = ({
    item,
  }: {
    item: { id: number; image: ImageProps };
  }) => <Image source={item.image} className="size-full" />;

  // Smooth pagination without lag
  const handleProgressChange = useCallback(
    (_: number, absoluteProgress: number) => {
      progress.value = withTiming(absoluteProgress, { duration: 0 });
    },
    []
  );

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <ScrollView className="h-full bg-white">
      {/* Images Carousel */}
      <View className="w-full items-center relative h-[460px]">
        <Carousel
          ref={ref}
          onProgressChange={runOnJS(handleProgressChange)}
          data={imagesData}
          width={width}
          height={460}
          renderItem={renderItem}
        />
        <Pagination.Custom<{ id: number; image: any }>
          progress={progress}
          data={imagesData}
          onPress={onPressPagination}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          containerStyle={styles.paginationContainer}
          horizontal
        />
        <Image
          source={images.whiteGradient}
          className="size-full absolute top-0"
        />

        {/* Carousel absolute Settings */}
        <View className="flex flex-row items-center justify-between px-6 absolute top-[80px] w-full">
          <TouchableOpacity
            className="w-7 h-7 items-center justify-center"
            onPress={() => router.back()}
          >
            <Image source={icons.backArrow} className="size-8" />
          </TouchableOpacity>
          <View className="w-fit flex-row items-center gap-5">
            <TouchableOpacity onPress={() => {}}>
              <Image source={icons.heart} className="size-8" tintColor="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Image source={icons.send} className="size-8" tintColor="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Properties */}
      <View className="px-5 mt-5 gap-4">
        <Text className="text-[24px] font-rubik-bold text-black-300">
          Modernica Apartment
        </Text>
        <View className="flex-row items-center gap-[10px]">
          <View className="px-[10px] py-[6px] rounded-full bg-[#0061FF0A]">
            <Text className="text-[10px] font-rubik-semibold text-primary-300">
              Apartment
            </Text>
          </View>
          <View className="flex-row items-center gap-[6px]">
            <Image source={icons.star} className="size-7" />
            <Text className="text-sm text-black-100 font-rubik-medium mt-2">
              4.8 (1,275 reviews)
            </Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-6 items-center">
            <View className="flex-row items-center gap-2">
              <View className="w-10 h-10 bg-[#0061FF0A] items-center justify-center rounded-full">
                <Image source={icons.bed} className="size-5" />
              </View>
              <Text className="text-black-300 text-sm font-rubik-medium">
                8 Beds
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className="w-10 h-10 bg-[#0061FF0A] items-center justify-center rounded-full">
                <Image source={icons.bath} className="size-4" />
              </View>
              <Text className="text-black-300 text-sm font-rubik-medium">
                3 bath
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className="w-10 h-10 bg-[#0061FF0A] items-center justify-center rounded-full">
                <Image source={icons.area} className="size-5" />
              </View>
              <Text className="text-black-300 text-sm font-rubik-medium">
                2000 sqft
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Spacer */}
      <View className="w-full items-center px-5">
        <View className="h-[1px] w-full bg-primary-100 my-[30px]" />
      </View>

      {/* Agent */}
      <View className="w-full px-5 gap-4">
        <Text className="text-[20px] text-black-300 font-rubik-semibold">
          Agent
        </Text>
        <View className="flex-row items-center">
          <View className="flex-1 h-full flex-row gap-5">
            <View className="w-[60px] h-[60px] rounded-full overflow-hidden items-center justify-center">
              <Image source={images.avatar} className="size-full" />
            </View>
            <View className="gap-1 justify-center">
              <Text className="text-[18px] font-rubik-semibold text-black-300">
                {agentName.substring(0, 15)}...
              </Text>
              <Text className="text-sm font-rubik-medium text-black-100">
                Owner
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-center gap-5">
            <TouchableOpacity onPress={() => {}}>
              <Image source={icons.chat} className="w-7 h-7" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Image source={icons.phone} className="w-7 h-7" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Description */}
      <View className="w-full px-5 mt-[30px] gap-3">
        <Text className="text-black-300 font-rubik-semibold text-[20px]">
          Overview
        </Text>
        <Text className="text-base font-rubik text-black-200">
          Sleek, modern 2-bedroom apartment with open living space, high-end
          finishes, and city views. Minutes from downtown, dining, and transit.
        </Text>
      </View>

      {/* Facilities */}
      <View className="w-full px-5 mt-[30px] mb-40 gap-5">
        <Text className="text-black-300 text-[20px] font-rubik-semibold">
          Facilities
        </Text>
        <View>
          <View className="gap-2 items-center justify-center">
            <View className="w-[60px] h-[60px] rounded-full bg-primary-100 items-center justify-center">
              <Image source={icons.carPark} className="size-8" />
            </View>
            <Text className="text-sm font-rubik text-black-300">
              Car Parking
            </Text>
          </View>
        </View>
      </View>
      {/* Gallery */}
      {/* Location */}
      {/* Reviews */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    position: "absolute",
    bottom: 16,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  activeDot: {
    width: 32,
    borderRadius: 5,
    backgroundColor: "#0061FF",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "#FFFFFF",
  },
});

export default Property;
