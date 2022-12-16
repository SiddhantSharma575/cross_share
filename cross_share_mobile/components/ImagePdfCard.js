import { Image, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RNFetchBlob from "rn-fetch-blob"

const ImagePdfCard = ({ downloadUrl, fileName }) => {
    const checkedFileName = fileName.slice(-3)
    const type = checkedFileName === "pdf" ? "pdf" : "img"
    const REMOTE_IMAGE_PATH = downloadUrl
    const checkPermission = async () => {

        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission

        if (Platform.OS === 'ios') {
            downloadImage();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'App needs access to your storage to download Photos',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Once user grant the permission start downloading
                    console.log('Storage Permission Granted.');
                    downloadImage();
                } else {
                    // If permission denied then show alert
                    alert('Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.warn(err);
            }
        }
    };

    const downloadImage = () => {
        // Main function to download the image

        // To add the time suffix in filename
        let date = new Date();
        // Image URL which we want to download
        let image_URL = REMOTE_IMAGE_PATH;
        // Getting the extention of the file
        // let ext = getExtention(im age_URL);
        // ext = '.' + ext[0];
        // Get config and fs from RNFetchBlob
        // config: To pass the downloading related options
        // fs: Directory path where we want our image to download
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                // Related to the Android only
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir +
                    '/image_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2),
                description: 'Image',
            },
        };
        config(options)
            .fetch('GET', image_URL)
            .then(res => {
                // Showing alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                alert('Image Downloaded Successfully.');
            });
    };



    return (
        <TouchableOpacity style={styles.card_container} onPress={checkPermission}>
            <Image style={styles.img_st} source={type === "pdf" ? require("../images/pdf_icon.png") : require("../images/img_icon.jpg")} />
            <Text style={styles.main_name}>{fileName}</Text>
        </TouchableOpacity>
    )
}

export default ImagePdfCard

const styles = StyleSheet.create({
    card_container: {
        width: "90%",
        height: 230,
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
    img_st: {
        width: 100,
        height: 100
    },
    main_name: {
        fontWeight: "bold",
        color: "#000",
    }
})