import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import UserCard from "../../components/users/UserCard";
export default function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <ScrollView>
      <View className="h-full gap-4 p-5" style={styles.container}>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{
            gap: 16,
          }}
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (<UserCard item={item}/>
          )}
          ListEmptyComponent={() => (
            <View className="w-full items-center justify-center pt-[100px]">
              <Text>No items found</Text>
            </View>
          )}
        />
        <Link href="/" style={styles.backButton}>
          <Text style={{ color: "white", fontSize: 18 }}>Go Back</Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaeaea",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#34af3a",
    borderRadius: 6,
  },
});
