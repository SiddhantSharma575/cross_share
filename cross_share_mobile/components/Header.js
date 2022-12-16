import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
    return (
        <View style={styles.header_container}>
            <Text style={styles.header_text} >Cross-Share</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header_container: {
        backgroundColor: "#ba81f7",
        width: "100%",
        height: 54,
        alignItems: "center",
        justifyContent: "center",
    },
    header_text: {
        color: "white",
        fontSize: 22
    }
})