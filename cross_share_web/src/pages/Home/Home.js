import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db, storage } from '../../firebase'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import './home.css'

const Home = () => {
    const [textco, setTextCo] = useState("text")
    const [title, setTitle] = useState("")
    const [mainText, setMainText] = useState("")
    const [laoding, setLoading] = useState("")
    const [link, setLink] = useState("")
    const [imgUpload, setImgUpload] = useState("")
    const [uploadPercent, setUploadPercent] = useState(0)
    const [error, setError] = useState("")

    const handleText = () => {
        setTextCo("text")
    }
    const handleLink = () => {
        setTextCo("link")
    }
    const handleFiles = () => {
        setTextCo("files")
    }
    const addText = async (e) => {
        e.preventDefault();
        setLoading("Loading...")
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please Login to Access It")
            setLoading(false)
            return;
        }
        try {
            const docref = await addDoc(collection(db, "text"), {
                uid: user.uid,
                title: title,
                text: mainText
            })
            alert("Data Added Successfully")
            setLoading("")
            setTitle("");
            setMainText("")
        } catch (error) {
            console.log(error)
            setLoading("")
        }
    }


    const addLink = async (e) => {
        e.preventDefault();
        setLoading("Loading...")
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please Login to Access It")
            setLoading(false)
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "link"), {
                uid: user.uid,
                title: title,
                link: link
            })
            alert("Data Added Successfully")
            setLoading("")
            setTitle("")
            setLink("")
            setImgUpload("")
        } catch (error) {
            console.log(error)
            setLoading("")
        }
    }

    const addFile = () => {
        console.log(imgUpload)
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please Login to Access It")
            setLoading(false)
            return;
        }
        if (!imgUpload) return
        const storageRef = ref(storage, `files/${imgUpload.name}/${user.uid}`)
        const uploadTask = uploadBytesResumable(storageRef, imgUpload)

        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            uploadPercent(progress)
        }, (error) => {
            setError(error)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                const imgUrl = downloadUrl
                try {
                    const docRef = await addDoc(collection(db, "images"), {
                        uid: user.uid,
                        title: imgUpload.name,
                        link: imgUrl
                    })
                    console.log(docRef)
                    alert("Data Added Successfully")
                    setLoading("")
                    setError("")

                } catch (error) {
                    setError(error)
                    setLoading("")
                }
            })
        })

    }
    return (
        <div className='home_container'>
            <div className='nav_cont'>
                <ul>
                    <li onClick={handleText}>Text <div className={textco === "text" && "bottom-bar"}></div></li>
                    <li onClick={handleLink}>Link <div className={textco === "link" && "bottom-bar"}></div></li>
                    <li onClick={handleFiles}>Files <div className={textco === "files" && "bottom-bar"}></div></li>
                </ul>
            </div>
            {
                textco === "text" && <div className='text_container'>
                    <input type="text" placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea placeholder='Enter Text' cols="30" rows="10" value={mainText} onChange={(e) => setMainText(e.target.value
                    )}></textarea>
                    <button className='btn_send' onClick={addText}>Send</button>
                    {laoding && <h1>{laoding}</h1>}
                </div>
            }
            {
                textco === "link" && <div className='text_container'>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title' />
                    <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder='Enter Link Here' />
                    <button className='btn_send' onClick={addLink}>Send</button>
                    {laoding && <h1>{laoding}</h1>}
                </div>
            }
            {
                textco === "files" && <div className='text_container'>
                    <input type="file" id='file-choose' onChange={(e) => setImgUpload(e.target.files[0])} style={{ textAlign: "center", marginLeft: "10rem" }} />
                    <button className='btn_send' onClick={addFile} >Send</button>
                </div>
            }
        </div>
    )
}

export default Home