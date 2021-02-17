import React,{useEffect,useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image } from "react-native-elements";
import { View } from 'react-native';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
            <StatusBar style="light" />
            
                <Image source={{uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"}}
                    style={{height:200, width: 200}} />
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Email"
                        autofocus
                        type="email"
                        value={email}
                        onChangeText={(text)=>setEmail(text)}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                    />
                </View >
                <Button containerStyle={styles.button}  title="Login" />
                <Button 
                  containerStyle={styles.button}
                  title="Register" 
                  type="outline"
                  onPress={() => navigation.navigate("Register")}
                />
                <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    inputContainer: {
        width: 300,
    },
    button:{
        width: 200,
        marginTop: 10,
        
    },
    
})
