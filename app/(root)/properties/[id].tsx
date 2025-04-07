import { facilities } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import {
  Dimensions,
  FlatList,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { View, ScrollView, Image, Modal } from "react-native";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import ImageViewer from "react-native-image-zoom-viewer";
import { galleryImages } from "@/lib/data";
import LargLocation from "@/assets/images/larg-location.png";

const imagesData = [
  { id: 1, image: images.newYork },
  { id: 2, image: images.japan },
  { id: 3, image: images.newYork },
];

const { width } = Dimensions.get("window");

const Property = () => {
  const { id } = useLocalSearchParams();
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance>(null);
  const agentName = "Mohammad Khosrotabar";

  const renderItem = ({
    item,
  }: {
    item: { id: number; image: ImageProps };
  }) => <Image source={item.image} className='size-full' />;

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

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setVisible(true);
  };

  const closeImage = () => {
    setVisible(false);
  };

  return (
    <ScrollView className='h-full bg-white'>
      {/* Images Carousel */}
      <View className='w-full items-center relative h-[460px]'>
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
          className='size-full absolute top-0'
        />

        {/* Carousel absolute Settings */}
        <View className='flex flex-row items-center justify-between px-6 absolute top-[80px] w-full'>
          <TouchableOpacity
            className='w-7 h-7 items-center justify-center'
            onPress={() => router.back()}
          >
            <Image source={icons.backArrow} className='size-8' />
          </TouchableOpacity>
          <View className='w-fit flex-row items-center gap-5'>
            <TouchableOpacity onPress={() => {}}>
              <Image source={icons.heart} className='size-8' tintColor='#000' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Image source={icons.send} className='size-8' tintColor='#000' />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Properties */}
      <View className='px-5 mt-5 gap-4'>
        <Text className='text-[24px] font-rubik-bold text-black-300'>
          Modernica Apartment
        </Text>
        <View className='flex-row items-center gap-[10px]'>
          <View className='px-[10px] py-[6px] rounded-full bg-[#0061FF0A]'>
            <Text className='text-[10px] font-rubik-semibold text-primary-300'>
              Apartment
            </Text>
          </View>
          <View className='flex-row items-center gap-[6px]'>
            <Image source={icons.star} className='size-7' />
            <Text className='text-sm text-black-100 font-rubik-medium mt-2'>
              4.8 (1,275 reviews)
            </Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className='flex-row gap-6 items-center'>
            <View className='flex-row items-center gap-2'>
              <View className='w-10 h-10 bg-[#0061FF0A] items-center justify-center rounded-full'>
                <Image source={icons.bed} className='size-5' />
              </View>
              <Text className='text-black-300 text-sm font-rubik-medium'>
                8 Beds
              </Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <View className='w-10 h-10 bg-[#0061FF0A] items-center justify-center rounded-full'>
                <Image source={icons.bath} className='size-4' />
              </View>
              <Text className='text-black-300 text-sm font-rubik-medium'>
                3 bath
              </Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <View className='w-10 h-10 bg-[#0061FF0A] items-center justify-center rounded-full'>
                <Image source={icons.area} className='size-5' />
              </View>
              <Text className='text-black-300 text-sm font-rubik-medium'>
                2000 sqft
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Spacer */}
      <View className='w-full items-center px-5'>
        <View className='h-[1px] w-full bg-primary-100 my-[30px]' />
      </View>

      {/* Agent */}
      <View className='w-full px-5 gap-4'>
        <Text className='text-[20px] text-black-300 font-rubik-semibold'>
          Agent
        </Text>
        <View className='flex-row items-center'>
          <View className='flex-1 h-full flex-row gap-5'>
            <View className='w-[60px] h-[60px] rounded-full overflow-hidden items-center justify-center'>
              <Image source={images.avatar} className='size-full' />
            </View>
            <View className='gap-1 justify-center'>
              <Text className='text-[18px] font-rubik-semibold text-black-300'>
                {agentName.substring(0, 15)}...
              </Text>
              <Text className='text-sm font-rubik-medium text-black-100'>
                Owner
              </Text>
            </View>
          </View>
          <View className='flex-row items-center justify-center gap-5'>
            <TouchableOpacity onPress={() => {}}>
              <Image source={icons.chat} className='w-7 h-7' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Image source={icons.phone} className='w-7 h-7' />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Description */}
      <View className='w-full px-5 mt-[30px] gap-3'>
        <Text className='text-black-300 font-rubik-semibold text-[20px]'>
          Overview
        </Text>
        <Text className='text-base font-rubik text-black-200'>
          Sleek, modern 2-bedroom apartment with open living space, high-end
          finishes, and city views. Minutes from downtown, dining, and transit.
        </Text>
      </View>

      {/* Facilities */}
      <View className='w-full px-5 mt-[30px] gap-5'>
        <Text className='text-black-300 text-[20px] font-rubik-semibold'>
          Facilities
        </Text>
        <FlatList
          data={facilities}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          renderItem={({ item }) => (
            <View className='gap-2 items-center justify-center flex-1'>
              <View className='w-[60px] h-[60px] rounded-full bg-primary-100 items-center justify-center'>
                <Image source={item.icon} className='size-8' />
              </View>
              <Text className='text-sm font-rubik text-black-300 spa'>
                {item.title.substring(0, 8)}
                {item.title.length > 8 ? "..." : ""}
              </Text>
            </View>
          )}
          contentContainerClassName='gap-5'
          keyExtractor={(item) => item.title}
          numColumns={4}
        />
      </View>

      {/* Gallery */}
      <View className='mt-[30px] px-5 gap-5'>
        <Text className='text-[20px] text-black-300 font-rubik-semibold'>
          Gallery
        </Text>
        <View className='flex-row w-full items-center justify-between'>
          {galleryImages.slice(0, 3).map((img, index) => (
            <TouchableOpacity
              className='w-[118px] h-[118px] rounded-[10px] overflow-hidden'
              key={index}
              onPress={() => openGallery(index)}
            >
              <Image source={{ uri: img }} className='size-full' />
              {index === 2 && galleryImages.length > 3 && (
                <View className='absolute top-0 left-0 w-full items-center justify-center h-full bg-black/50'>
                  <Text className='text-white font-rubik-bold text-[20px]'>
                    {galleryImages.length - 3}+
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          <Modal visible={visible} transparent={true}>
            <ImageViewer
              imageUrls={galleryImages.map((url) =>
                typeof url === "string" ? { url: url } : url
              )}
              show={visible}
              index={currentIndex}
              enableSwipeDown={true}
              onCancel={closeImage}
              enablePreload={true}
              saveToLocalByLongPress={false}
              pageAnimateTime={500}
            />
            <TouchableOpacity
              className='absolute top-6 p-5 right-6 z-50'
              onPress={closeImage}
            >
              <Text className='text-white text-lg font-rubik-bold'>✕</Text>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>

      {/* Location */}
      <View className='mt-[30px] px-5 gap-5'>
        <Text className='text-[20px] text-black-300 font-rubik-semibold'>
          Location
        </Text>
        <View className='flex-row items-center mb-5 gap-[10px]'>
          <Image
            source={icons.location}
            resizeMode='contain'
            className='size-8'
          />
          <Text className='text-sm font-rubik text-[#666876]'>
            Grand City St. 100, New York, United States
          </Text>
        </View>
        <View className='w-full h-[200px] rounded-[10px] overflow-hidden'>
          <MapView
            provider={PROVIDER_DEFAULT}
            style={{ width: "100%", height: "100%", borderRadius: 16 }}
            tintColor='black'
            mapType='standard'
            showsPointsOfInterest={false}
            showsUserLocation={true}
            userInterfaceStyle='light'
            initialRegion={{
              latitude: 40.7128, // New York coordinates
              longitude: -74.006,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{ latitude: 40.7128, longitude: -74.006 }}
              title='Grand City St. 100'
              description='New York, United States'
            >
              <Image
                source={LargLocation}
                className='size-11'
                resizeMode='contain'
              />
            </Marker>
          </MapView>
        </View>
      </View>

      {/* Reviews */}
      <View className='mt-[30px] px-5 gap-5'>
        <View className='flex-row justify-between items-center'>
          <View className='flex-row items-center gap-[14px]'>
            <Image
              source={icons.star}
              resizeMode='contain'
              className='size-5'
            />
            <Text className='text-[20px] text-[#191D31] font-[600]'>
              4.8 (1275 reviews)
            </Text>
          </View>
        </View>
      </View>

      <View className='h-40 w-full' />
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
