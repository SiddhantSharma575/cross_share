import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'


const LinkCard = ({ title, link }) => {

    return (
        <View style={styles.link_card}>
            <Text style={styles.link_title}>{title}</Text>
            <Text style={styles.link_text} onPress={() => Linking.openURL(link)}>{link}</Text>
        </View>
    )
}

export default LinkCard

const styles = StyleSheet.create({
    link_card: {
        width: "90%",
        height: 200,
        marginHorizontal: 10,
        marginLeft: 15,
        marginVertical: 10,
        borderWidth: 0.7,
        borderColor: "black",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    link_title: {
        fontSize: 24,
        color: "black",
        fontWeight: "bold",
    },
    link_text: {
        fontWeight: "400",
        color: "#795CB2",
        fontSize: 16,
    }
})