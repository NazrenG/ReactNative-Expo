import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";

const MovieCard = ({ item }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.navigate({
            pathname: `movie/details/${item.id}`,
            params: { media_type: item.media_type },
          });
        }}
      >
        <View >
          <Image
            style={{ width: 118, height: 173 }}
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
