import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import LinkCard from "../components/LinkCard"

const LinkScreen = () => {
    const [link, setLink] = useState()
    const [user, setUser] = useState(auth().currentUser)
    useEffect(() => {
        const subscriber = firestore()
            .collection('link').where("uid", '==', user.uid)
            .onSnapshot(querySnapshot => {
                const texts = [];

                querySnapshot.forEach(documentSnapshot => {
                    texts.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setLink(texts)
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);


    const renderItem = ({ item }) => {
        return <LinkCard title={item.title} link={item.link} />
    }


    return (
        <View>
            <Header />
            <ScrollView>
                <FlatList data={link} renderItem={renderItem} keyExtractor={item => item.id} />
            </ScrollView>
        </View>
    )
}

export default LinkScreen

const styles = StyleSheet.create({})