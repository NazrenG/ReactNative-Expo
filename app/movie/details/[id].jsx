import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import SimilarCard from "../../../components/movies/SimilarCard";
import YoutubePlayer from "react-native-youtube-iframe";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";


const MovieDetail = () => {
  const [token, setToken] = useState("");
  const width = Dimensions.get("window").width;
  const { id, media_type } = useLocalSearchParams();
  const [playing, setPlaying] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const [data, setData] = useState(null);
  const [similars, setSimilars] = useState([]);
  const [loading, setLoading] = useState(true);
  const IP_URL = Constants.expoConfig.extra.IP_URL;

  const getToken = async () => {
    const accessToken = await SecureStore.getItemAsync("userToken");
    if (accessToken) {
      setToken(accessToken);
    } else {
      Alert.alert("Please log in to the program");
    }
  };

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const PlayMovie = async () => {
    if (!token) return;

    const response = await fetch(`${IP_URL}/${media_type}/${id}/trailers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      setTrailerKey(responseData.trailers[0].key);
    } else {
      console.log("Something went wrong");
    }
  };

  const GetSimilars = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${IP_URL}/${media_type}/${id}/similar`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        setSimilars(responseData.similar);
      } else {
        setSimilars([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setSimilars([]);
    }
  };

  const GetDetail = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${IP_URL}/${media_type}/${id}/details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        setData(responseData.content);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Fetch error:" + error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id && media_type) {
      getToken().then(() => {
        if (token) {
          GetDetail();
          GetSimilars();
          PlayMovie();
        }
      });
    }
  }, [id, media_type, token]);
  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FF5733" />
      ) : data ? (
        <>
          <View style={{ width: width, height: 250, resizeMode: "cover" }}>
            <YoutubePlayer
              height={300}
              play={playing}
              videoId={trailerKey}
              onChangeState={onStateChange}
            />
            <TouchableOpacity onPress={togglePlaying}>
              <Text>{playing ? "Pause" : "Play"}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{data.title || data.name}</Text>
          <FlatList
            data={data.genres}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="bg-[#27272A] px-4 py-2 rounded-lg border border-[#27272A] mr-3">
                <Text className="text-slate-300">{item.name}</Text>
              </View>
            )}
            contentContainerStyle={{ marginTop: 20 }}
            scrollEnabled={false}
            horizontal
          />
          <Text style={styles.overview}>{data.overview}</Text>
          <Text style={styles.similarTitle}>Similar Movies</Text>
          <FlatList
            data={similars}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <SimilarCard item={item} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.similarList}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        </>
      ) : (
        <Text style={styles.errorText}>Movie details could not be loaded.</Text>
      )}
    </ScrollView>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  playButton: {
    position: "absolute",
    bottom: 10,
    left: "40%",
    padding: 10,
    backgroundColor: "#FF5733",
    borderRadius: 5,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 40,
    fontWeight: "165",
    color: "#fff",
    marginTop: 15,
  },
  overview: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 25,
  },
  similarTitle: {
    fontSize: 20,
    color: "#fff",
    marginTop: 20,
  },
  similarList: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
//nezrin.qu@gmail.com
