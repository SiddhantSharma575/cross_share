import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TextCard = ({ title, text }) => {
    return (
        <View style={styles.text_card}>
            <Text style={styles.title_text}>{title}</Text>
            <Text style={styles.main_text}>{text}</Text>
        </View>
    )
}

export default TextCard

const styles = StyleSheet.create({
    text_card: {
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
    title_text: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
    },
    main_text: {
        fontWeight: "400",
    }
})