import { useLocalSearchParams, usePathname } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};

export default Search;
