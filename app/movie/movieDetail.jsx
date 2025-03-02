import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const MovieDetail = () => {
  const { item } = useLocalSearchParams();
  const movie = JSON.parse(item);

  return (
    <ScrollView style={styles.container}> 
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          }}
          style={styles.poster}
        />
      </View>
 
      <View style={styles.content}>
        <Text style={styles.title}>{movie.name}</Text>
 
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <AntDesign name="calendar" size={18} color="gray" />
            <Text style={styles.infoText}>
              {movie.first_air_date}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <AntDesign name="star" size={18} color="gold" />
            <Text style={styles.infoText}>{movie.vote_average.toFixed(1)}</Text>
          </View>

          <View style={styles.infoItem}>
            <FontAwesome5 name="globe" size={16} color="gray" />
            <Text style={styles.infoText}>
              {movie.original_language.toUpperCase()}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={18} color="gray" />
            <Text style={styles.infoText}>
              {movie.origin_country?.join(", ") || "Unknown"}
            </Text>
          </View>
        </View>
 
        {/* Overview */}
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  posterContainer: {
    width: "100%",
    height: height * 0.5,
    position: "relative",
  },
  poster: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  content: {
    padding: 15,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#222",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  infoText: {
    color: "white",
    fontSize: 14,
  },
  overview: {
    color: "white",
    fontSize: 16,
    textAlign: "justify",
    marginTop: 10,
  },
});

export default MovieDetail;
