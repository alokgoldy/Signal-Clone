import React, { useLayoutEffect, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomListItem from "../components/CustomListItem";
import { Button, Input, Image, Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);

    const sighOutUser = () => {
        auth.signOut().then(() => {
          navigation.replace("Login");
        });
      };
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#696969" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={sighOutUser} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                  }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={26} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate("AddChat")}
                    >
                        <SimpleLineIcons name="pencil" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        });
    },[navigation]);
      
    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
          setChats(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
        return unsubscribe;
      }, []);

      const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
          id,
          chatName,
        });
      };

      
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <StatusBar style="light" />
                {chats.map(({ id, data: { chatName } }) => (
                <CustomListItem
                    key={id}
                    id={id}
                    chatName={chatName}
                    enterChat={enterChat}
                />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
      },
})
