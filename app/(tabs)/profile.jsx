
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>profile page</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  title: {
    marginTop: "100%",
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#9060c8",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    justifyContent:"center",
    alignItems:"center",
    textAlignVertical:"center",

  },
});
