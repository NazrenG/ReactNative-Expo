import "../../global.css"
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native"; 
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol"; 
export default function TabLayout() { 
  return (
    <Tabs
      screenOptions={{ 
        headerShown: false,
        tabBarButton: HapticTab, 
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />

        <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={"#edeff3"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={"#edeff3"} />
          ),
        }}
      />
    </Tabs>
  );
}
