import React, { useEffect, useState } from 'react'
import "./savedData.css"
import { db } from "../../firebase"
import { collection, getDocs, query, where } from 'firebase/firestore'

const SavedData = () => {
    const [user, setUser] = useState(JSON.parse(localStorage
        .getItem("user")))
    const items = ["Text", "Link", "Image/Pdf"]
    const [item, setItem] = useState("Text")
    const [texts, setTexts] = useState([])
    const [links, setLinks] = useState([])
    const [imagesPdf, setImagesPdf] = useState([])
    const handleChange = (e) => {
        console.log(e.target.value)
        setItem(e.target.value)
    }
    // const textCollectionRef = collection(db, "text")
    const q = query(collection(db, "text"), where("uid", "==", user.uid))
    const q1 = query(collection(db, "link"), where("uid", "==", user.uid))
    const q2 = query(collection(db, "images"), where("uid", "==", user.uid))
    useEffect(() => {
        const getTexts = async () => {
            const querySnapshot = await getDocs(q)
            setTexts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        const getLinks = async () => {
            const querySnapshot = await getDocs(q1)
            setLinks(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        const getImages = async () => {
            const querySnapshot = await getDocs(q2)
            setImagesPdf(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getTexts()
        getLinks()
        getImages()
    }, [])

    useEffect(() => {
        console.log(texts);
        console.log(links);
        console.log(imagesPdf);
    }, [texts, links, imagesPdf])
    return (
        <div className='saved_data_container'>
            <select value={item} onChange={handleChange}>
                {items.map((option, index) => {
                    return <option key={index} >
                        {option}
                    </option>
                })}
            </select>
            {
                item === "Text" && <div className='txt_container'>
                    {
                        texts.map((text) => (
                            <div className='txt_card'>
                                <h4>{text.title}</h4>
                                <p>{text.text}</p>
                            </div>
                        ))
                    }
                </div>
            }
            {
                item === "Link" && <div className='txt_container'>
                    {
                        links.map((link) => (
                            <div className='link_card'>
                                <h4>{link.title}</h4>
                                <p><a href={`${link.link}`}>{link.link}</a></p>
                            </div>
                        ))
                    }

                </div>
            }

            {
                item === "Image/Pdf" && <div className='txt_container'>
                    {
                        imagesPdf.map((img) => (
                            <div className='link_card'>
                                <h4>{img.title}</h4>
                                <p><a href={`${img.link}`}>{img.link.substring(0, 40)}</a></p>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default SavedData