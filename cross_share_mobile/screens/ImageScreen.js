import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ImagePdfCard from '../components/ImagePdfCard'
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

const ImageScreen = () => {
    const [files, setFiles] = useState()
    const [user, setUser] = useState(auth().currentUser)

    useEffect(() => {
        const subscriber = firestore()
            .collection('images').where("uid", '==', user.uid)
            .onSnapshot(querySnapshot => {
                const texts = [];

                querySnapshot.forEach(documentSnapshot => {
                    texts.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setFiles(texts)
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const renderItem = ({ item }) => {
        return <ImagePdfCard fileName={item.title} downloadUrl={item.link} />
    }



    return (
        <View>
            <Header />
            <ScrollView>
                <FlatList data={files} renderItem={renderItem} keyExtractor={item => item.id} />
            </ScrollView>
        </View>
    )
}

export default ImageScreen

const styles = StyleSheet.create({})