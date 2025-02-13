import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

const UserCard = ({ item }) => {
  return (
    <TouchableOpacity className="p-4 border-[1px] border-zinc-300 rounded-md bg-white shadow shadow-zinc-300"
    onPress={()=>{
        router.navigate({pathname:`/users/details/${item.id}`,params:item.id})
    }}>
<Text className="text-[24px] font-montserratMedium">{item.name}</Text>
        <Text className="text-[20px] font-montserrat">{item.email}</Text>
        <Text className="text-[16px] font-montserratLightItalic">
          {item.phone}
        </Text> 
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({});
