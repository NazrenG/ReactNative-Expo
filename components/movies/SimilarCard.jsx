import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const SimilarCard = ({ item }) => {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "movie/movieDetail",
            params: { item: JSON.stringify(item) },
          })
        }
      >
        <View>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
            }}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 118,
    height: 173,
  },
});

export default SimilarCard;
