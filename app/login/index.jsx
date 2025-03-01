import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LogoNetflix from "../../assets/icons/Logonetflix.svg";
import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const SignIn = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const IP_URL = Constants.expoConfig.extra.IP_URL;

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const Login = async () => {
    console.log("inside login");
    try {
      const response = await fetch(`${IP_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData.token);

      if (response.ok) {
        await SecureStore.setItemAsync("userToken", responseData.token);
        Alert.alert("Success", "Login successfully!");
        router.push("/movie");

        console.log(responseData);
      } else {
        Alert.alert(
          "Error",
          responseData.message || "Something login went wrong."
        );
        console.log(responseData);
      }
    } catch (error) {
      Alert.alert("Error during registration:");
    }
  };
  return (
    <View
      className="flex-1 justify-center  bg-black p-5 w-[]"
      style={{ width, height }}
    >
      <View className="absolute top-5 left-5">
        <LogoNetflix />
      </View>
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold text-white mt-2 text-start self-start ml-5">
          Sign In
        </Text>
        <TextInput
          style={{
            height: 48,
            width: width - 40,
            borderWidth: 2,
            borderColor: "#808080B2",
            borderRadius: 4,
            padding: 10,
            color: "white",
            marginTop: 20,
          }}
          placeholder="Email"
          placeholderTextColor="gray"
          value={data.email}
          onChangeText={(text) =>
            handleInputChange("email", text.toLowerCase())
          }
        />

        <TextInput
          style={{
            height: 48,
            width: width - 40,
            borderWidth: 2,
            borderColor: "#808080B2",
            borderRadius: 4,
            padding: 10,
            color: "white",
            marginTop: 20,
          }}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          value={data.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        <TouchableOpacity
          className="w-36 h-12 bg-red-700 justify-center items-center rounded-md mt-5"
          style={{ width: width - 40 }}
          onPress={Login}
        >
          <Text className="text-white text-lg font-bold">Sign In</Text>
        </TouchableOpacity>
        <View className="flex-row items-center mt-5">
          <Text className="text-neutral-600 text-base">New to Netflix?</Text>
          <Link href="/login/signup">
            <Text className="text-white text-base ml-2"> Sign Up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
