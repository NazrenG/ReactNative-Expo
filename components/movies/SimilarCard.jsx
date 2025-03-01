import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const SimilarCard = ({ item }) => {
  return (
    <View>
      <TouchableOpacity>
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
