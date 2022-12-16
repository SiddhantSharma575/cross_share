import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import auth from "@react-native-firebase/auth"

const ProfileScreen = () => {
    const [user, setUser] = useState()
    useEffect(() => {
        console.log(user)
        setUser(auth().currentUser)
    }, [])
    return (
        <View>
            <Header />
            <View style={styles.profile_container}>
                {user && <Image style={styles.pro_img} source={{ uri: user.photoURL }} resizeMode={"cover"} />}
                {user && <Text style={styles.name_text}>{user.displayName}</Text>}
                <Button title='Sign Out' onPress={() => {
                    auth().signOut().then(() => {
                        console.log("User Sign Out")
                    })
                }} color="#ba81f7" />
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profile_container: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40%"
    },
    pro_img: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        margin: 20,
    },
    name_text: {
        padding: 10,
        margin: 10,
        fontSize: 22,
        color: "#000"
    }
})