import React,{useEffect,useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,KeyboardAvoidingView,Platform } from 'react-native';
import { Button, Input, Image } from "react-native-elements";
import { View } from 'react-native';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          
          if (authUser) {
            navigation.replace("Home");
          }
        });
        return unsubscribe;
    }, []);

    const signin = ()=>{
        auth.signInWithEmailAndPassword(email,password)
        .catch((error) => alert(error));
    };

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
                        secureTextEntry
                        type="password"
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                    />
                </View >
                <Button containerStyle={styles.button} onPress={signin} title="Login" />
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
