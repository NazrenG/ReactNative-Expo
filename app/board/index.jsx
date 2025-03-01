import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import LogoNetflix from "../../assets/icons/Logonetflix.svg";
import Laptop from "../../assets/icons/laptop.svg";
import Population from "../../assets/icons/population.svg";
import Download from "../../assets/icons/download.svg";

const Home = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const [index, setIndex] = useState(1);
  const files = [
    {
      id: "1",
      title: "Watch on any device",
      describe:
        "Stream on your phone, tablet, laptop and TV without playing more",
      icon: <Laptop />,
    },
    {
      id: "2",
      title: "3, 2, 1,... download!",
      describe: "Always have something to Watch offline.",
      icon: <Download />,
    },
    {
      id: "3",
      title: "No pesky contracts.",
      describe: "cancel anytime",
      icon: <Population />,
    },
    {
      id: "4",
      title: "How do I watch?",
      describe: "Members that subscribe to Netflix can watch here in the app",
      icon: null,
    },
  ];

  const selectItem = files.find((item) => item.id == index);

  function increaseIndex() {
    setIndex((prev) => {
      if (prev === 4) {
        router.push("/login");
        return prev;
      }
      return prev + 1;
    });
  }

  return (
    <ImageBackground
      source={index === 4 ? require("../../assets/images/board.png") : null}
      className="flex-1 items-center justify-between  bg-black p-5 w-[]"
      style={{ width, height, paddingTop: 80 }}
      resizeMode="cover"
    >
      <View>
        <LogoNetflix className="mt-100" />
      </View>
      <View
        style={{ width: width }}
        className="p-4  rounded-lg w-52 items-center"
      >
        {selectItem.icon}

        <Text className="text-3xl font-bold text-white mt-2">
          {selectItem.title}
        </Text>
        <Text className="text-xl text-center text-gray-400">
          {selectItem.describe}
        </Text>
      </View>
      <View className=" items-center">
        <View className="flex-row justify-bottom my-5">
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              className={`h-2 w-2 rounded-full mx-2 ${
                index === i ? "bg-red-700" : "bg-gray-300"
              }`}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={increaseIndex}
          className="w-36 h-12 bg-red-700 justify-center items-center rounded-md mt-5"
          style={{ width: width }}
        >
          <Text className="text-white text-lg font-bold">Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Home;
