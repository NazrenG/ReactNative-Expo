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
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");

const SignUp = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const IP_URL = Constants.expoConfig.extra.IP_URL;
  const handleInputChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Register = async () => {
    try {
      const response = await fetch(`${IP_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        router.push("/login");
        console.log(responseData);
      } else {
        Alert.alert(
          "Error",
          responseData.message || "Something signup went wrong."
        );
        console.log(responseData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
          Sign Up
        </Text>
        <TextInput
          value={data.username}
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="gray"
          onChangeText={(text) => handleInputChange("username", text)}
        />

        <TextInput
          value={data.email}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          onChangeText={(text) =>
            handleInputChange("email", text.toLowerCase())
          }
        />

        <TextInput
          value={data.password}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          onChangeText={(text) => handleInputChange("password", text)}
        />

        <TouchableOpacity
          className="w-36 h-12 bg-red-700 justify-center items-center rounded-md mt-5"
          style={{ width: width - 40 }}
          onPress={Register}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View className="flex-row items-center mt-5">
          <Text className="text-neutral-600 text-base">
            Already have an account?
          </Text>
          <Link href="/login">
            <Text className="text-white text-base ml-2"> Sign In</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: height,
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "black",

    paddingTop: 50,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width - 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  input: {
    height: 48,
    width: width - 40,
    borderWidth: 2,
    borderColor: "#808080B2",
    borderRadius: 4,
    padding: 10,
    color: "white",
    marginTop: 20,
  },
  button: {
    height: 48,
    width: width - 40,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
  },
};

export default SignUp;
