import { Button, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../components/Header'
import SelectDropdown from 'react-native-select-dropdown'
import DocumentPicker, { types } from 'react-native-document-picker';
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

const UploadScreen = () => {
    const [fileResponse, setFileResponse] = useState({})
    const [user, setUser] = useState()
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
            });
            console.log(response)
            setFileResponse(response);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    useEffect(() => {
        console.log(fileResponse)
        setUser(auth().currentUser)
    }, [])

    const items = ["Text", "Link", "Images/Pdf"];
    const [selItem, setSelItem] = useState("Images/Pdf")

    const handleText = async () => {
        try {
            const res = await firestore().collection("text").add({
                title: title,
                text: text,
                uid: user.uid
            })
            if (res) {
                alert("Data Added Successfully")
            }
            setTitle("")
            setText("")
        } catch (error) {
            console.log(error)
        }
    }

    const handleLink = async () => {
        try {
            const res = await firestore().collection("link").add({
                title: title,
                text: text,
                uid: user.uid
            })
            if (res) {
                alert("Data Added Successfully")
            }
            setTitle("")
            setText("")
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpload = () => {
        alert("Sorry ! Can't able to send file now ! Please try Again")
        console.log(fileResponse)
    }

    return (
        <>
            <Header />
            <View style={styles.uploadContainer}>
                <View style={{ margin: 10, borderColor: "#000", borderWidth: 1, padding: 5, borderRadius: 10 }}>
                    <SelectDropdown
                        data={items}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            setSelItem(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                </View>
                {
                    selItem === items[0] &&
                    <View style={styles.txt_container}>
                        <Text style={styles.title_text}>Text</Text>
                        <TextInput style={styles.title_input} placeholder='Enter title' onChangeText={(text) => setTitle(text)} />
                        <TextInput style={styles.text_input} placeholder='Enter Text' onChangeText={(text) => setText(text)} />
                        <TouchableHighlight style={styles.btn_style} >
                            <Button title='Send' color="#ba81f7" onPress={handleText} />
                        </TouchableHighlight>
                    </View>
                }
                {
                    selItem === items[1] &&
                    <View style={styles.txt_container}>
                        <Text style={styles.title_text}>LINK</Text>
                        <TextInput style={styles.title_input} placeholder='Enter title' onChangeText={(text) => setTitle(text)} />
                        <TextInput style={styles.title_input} placeholder='Enter Link' onChangeText={(text) => setText(text)} />
                        <TouchableHighlight style={styles.btn_style} >
                            <Button title='Send' color="#ba81f7" onPress={handleLink} />
                        </TouchableHighlight>
                    </View>
                }
                {
                    selItem === items[2] &&
                    <View style={styles.txt_container}>
                        <Text style={{ color: "black", margin: 10 }}>{fileResponse.name}</Text>
                        <Button title='select image/pdf' onPress={handleDocumentSelection} />
                        <Button title='Upload' onPress={handleUpload} />
                    </View>
                }
            </View>
        </>
    )
}

export default UploadScreen

const styles = StyleSheet.create({
    uploadContainer: {

    },
    txt_container: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
    title_text: {
        color: "#000",
        fontSize: 20,
    },
    title_input: {
        width: "80%",
        margin: 10,
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        borderRadius: 10
    },
    text_input: {
        width: "80%",
        height: "40%",
        margin: 10,
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
        borderRadius: 10
    },
    btn_style: {
        width: "80%",
        padding: 5,
        margin: 10,
        borderRadius: 15
    }
})