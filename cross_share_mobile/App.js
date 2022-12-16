import { View, Text, SafeAreaView, StatusBar, Button, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import React, { useEffect, useState } from 'react';
import TextScreen from "./screens/TextScreen.js"
import LinkScreen from "./screens/LinkScreen.js"
import ImageScreen from "./screens/ImageScreen.js"
import ProfileScreen from './screens/ProfileScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import auth from "@react-native-firebase/auth"
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import UploadScreen from './screens/UploadScreen.js';

const Tab = createMaterialBottomTabNavigator()

const App = () => {
  const [user, setUser] = useState(false);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "210572572839-p3ppmemb0gfpv8ug6c0oc2grh2smtr0g.apps.googleusercontent.com"
    })
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [])

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  if (initializing) return null;

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      setUser(auth().currentUser)
      // console.log(1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#ba81f7" />
      {
        user && (
          <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => {
                let iconName = "";
                if (route.name === "Text") {
                  iconName = 'card-text-outline'
                } else if (route.name === "Link") {
                  iconName = "link-box-outline"
                } else if (route.name === "Images") {
                  iconName = "file-image-outline"
                } else if (route.name === "Profile") {
                  iconName = "file-account-outline"
                } else {
                  iconName = "cloud-upload-outline"
                }
                return (
                  <MaterialCommunityIcons name={iconName} size={25} color={color} />
                )
              }
            })} initialRouteName="Upload">
              <Tab.Screen name="Text" component={TextScreen} />
              <Tab.Screen name="Link" component={LinkScreen} />
              <Tab.Screen name='Upload' component={UploadScreen} />
              <Tab.Screen name="Images" component={ImageScreen} />
              <Tab.Screen name='Profile' component={ProfileScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        )
      }
      {
        !user && <View style={styles.login_container}>
          <Text style={styles.login_text}>
            Welcome to Cross-Share App
          </Text>
          <TouchableHighlight style={{ width: "60%", height: "20%", padding: 10, }}>
            <Button title='Login with Google' color="#ba81f7" onPress={() => {
              onGoogleButtonPress()
            }} />
          </TouchableHighlight>
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  login_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  login_text: {
    fontSize: 22,
    marginBottom: 40,
    color: "black",
    fontWeight: "bold",
  },
})

export default App;
