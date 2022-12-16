import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TextCard from '../components/TextCard'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

const TextScreen = () => {
    const [text, setText] = useState()
    const [user, setUser] = useState(auth().currentUser)

    useEffect(() => {
        const subscriber = firestore()
            .collection('text').where("uid", '==', user.uid)
            .onSnapshot(querySnapshot => {
                const texts = [];

                querySnapshot.forEach(documentSnapshot => {
                    texts.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                console.log(texts)
                setText(texts)
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);


    const renderItem = ({ item }) => {
        return <TextCard title={item.title} text={item.text} />
    }


    return (
        <View>
            <Header />
            <ScrollView>
                <FlatList data={text} renderItem={renderItem} keyExtractor={item => item.id} />
            </ScrollView>
        </View>
    )
}

export default TextScreen

const styles = StyleSheet.create({
    text_sec: {

    }
})