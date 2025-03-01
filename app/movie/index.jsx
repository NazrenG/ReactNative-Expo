import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import LogoNetflix from "../../assets/icons/Logonetflix.svg";
import Logout from "../../assets/icons/logout.svg";
import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movies/MovieCard";

import * as SecureStore from "expo-secure-store";
import YoutubePlayer from "react-native-youtube-iframe";
import { router } from "expo-router";
import Constants from "expo-constants";


const MovieList = () => {
  const IP_URL = Constants.expoConfig.extra.IP_URL;
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [movie, setMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const [token, setToken] = useState("");
  const getToken = async () => {
    const accessToken = await SecureStore.getItemAsync("userToken");
    console.log("gelen token" + accessToken);
    if (accessToken) {
      setToken(accessToken);
    } else {
      Alert.alert("Please log in to the program ");
    }
  };
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const LogoutBtn = async () => {
    try {
      const response = await fetch(`${IP_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setToken("");
        await SecureStore.deleteItemAsync("userToken");
        Alert.alert("Success", "Logout successfully!");
        router.push("/login");
      } else {
        Alert.alert("Error", data.message || "Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "An error occurred while logging out.");
    }
  };

  const getStartMovie = (type) => {
    if (type === "movie" && movies.length > 0) {
      setMovie(movies[0]);
    } else if (type === "tv" && tvShows.length > 0) {
      setMovie(tvShows[0]);
    }
  };
  const GetMovies = async () => {
    try {
      const response = await fetch(
        `${IP_URL}/movie/trending`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setMovies(responseData.content || []);
        console.log("Filmler:", responseData.content);
      } else {
        Alert.alert(
          "Error",
          responseData.message || "Something movies went wrong."
        );
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  console.log("gelen token" + token);
  const GetTvShows = async () => {
    try {
      const response = await fetch(
        `${IP_URL}/tv/trending`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setTvShows(responseData.content || []);
        console.log("Tv shows:", responseData.content);
      } else {
        Alert.alert(
          "Error",
          responseData.message || "Something tv shows went wrong."
        );
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  const PlayMovie = async () => {
    try {
      console.log(`Token: ${token}`);
      if (!token) return;
      const response = await fetch(
        `${IP_URL}/${movie.media_type}/${movie.id}/trailers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (response.ok) {
        if (responseData.trailers && responseData.trailers.length > 0) {
          setTrailerKey(responseData.trailers[0].key);
        } else {
          console.log("Not found trailer.");
        }
      } else {
        console.log("Failed API request:", responseData);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    getToken();
    GetMovies();
    GetTvShows();
  }, []);
  useEffect(() => {
    if (movies.length > 0) {
      setMovie(movies[0]);
    }
  }, [movies]);
  useEffect(() => {
    if (modalVisible && token) {
      PlayMovie();
    }
  }, [modalVisible, token]);

  return (
    <ScrollView>
      <View
        className="flex-1 justify-center bg-black p-5"
        style={{ width, paddingTop: 80 }}
      >
        <View className="absolute top-5 left-5">
          <View
            width={width - 40}
            className="flex-row items-center  justify-between "
          >
            <LogoNetflix />
            <TouchableOpacity className="ml-4" onPress={LogoutBtn}>
              <Logout width="40" height="40" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="relative items-center">
          {movie ? (
            <TouchableOpacity
              onPress={() => {
                router.navigate({
                  pathname: `movie/details/${movie.id}`,
                  params: { media_type: movie.media_type },
                });
              }}
            >
              <Image
                style={{ width: width - 60 }}
                className="h-[470px] rounded-2xl"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.text}>not found selected film</Text>
          )}

          <View className="absolute bottom-10 left-0 right-0 flex-row justify-center items-center gap-x-3">
            <TouchableOpacity
              className="bg-white px-4 py-2 rounded-lg w-[150] p-6"
              onPress={() => setModalVisible(true)}
            >
              <Text className="text-zinc-600 font-bold text-center ">PLAY</Text>
            </TouchableOpacity>
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.8)",
                }}
              >
                <View
                  style={{
                    width: "90%",
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <YoutubePlayer
                    height={200}
                    play={true}
                    videoId={trailerKey}
                  />
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      padding: 10,
                      backgroundColor: "red",
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              className="bg-zinc-600 px-4 py-2 rounded-lg  w-[150] p-3"
              onPress={() => {
                router.navigate({
                  pathname: `movie/details/${movie.id}`,
                  params: { media_type: movie.media_type },
                });
              }}
            >
              <Text className="text-white font-bold text-center">MORE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => getStartMovie("movie")}>
          <Text className="text-2xl color-white" style={styles.buttonText}>
            Trending Movies
          </Text>
        </TouchableOpacity>

        <FlatList
          horizontal
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard item={item} />}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />

        <TouchableOpacity onPress={() => getStartMovie("tv")}>
          <Text className="text-2xl color-white" style={styles.buttonText}>
            Trending TV Shows
          </Text>
        </TouchableOpacity>

        <FlatList
          horizontal
          data={tvShows}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard item={item} />}
          contentContainerStyle={{ paddingHorizontal: 10, marginBottom: 24 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      </View>
    </ScrollView>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
  buttonText: {
    marginVertical: 10,
  },
});
