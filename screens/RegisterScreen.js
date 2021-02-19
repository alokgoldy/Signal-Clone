import React, { useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { auth } from "../firebase";



const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        (async () => {
          if (Platform.OS !== "web") {
            const {
              status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
              alert("Sorry, we need camera roll permissions to make this work!");
            }
          }
        })();
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
            setImageUrl(result.uri);
          }
        };

    useLayoutEffect(() => {
        navigation.setOptions({
          headerBackTitle: "Back to Login",
        });
      }, [navigation]);
    

    const register = () => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((authUser) => {
            
            let user = authUser.user;
            user.updateProfile({
              displayName: name,
              photoURL: imageUrl || "https://example.com/jane-q-user/profile.jpg",
            });
          })
          .catch((error) => alert(error.message));
      };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>Create Signal Account</Text>
            <View style={styles.inputContainer}>
                <Input
                placeholder="Full Name"
                autofocus
                type="text"
                value={name}
                onChangeText={(text) => setName(text)}
                />
                <Input
                placeholder="Email"
                type="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                />
                <Input
                placeholder="Password"
                type="password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
                />
            </View>
            <Button
                containerStyle={styles.button}
                title="Pick a Profile Picture"
                onPress={pickImage}
            />
            <Button
                containerStyle={styles.button}
                raised
                onPress={register}
                title="Register"
            />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
      },
      inputContainer: {
        width: 300,
      },
      button: {
        width: 200,
        marginTop: 10,
      },
})
