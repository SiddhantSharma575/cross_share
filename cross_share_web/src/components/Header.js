import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'

const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage
        .getItem("user")))
    const navigate = useNavigate();
    // console.log(user.profile)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setUser(user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem("user")])
    return (
        <div className='header_container'>
            <div className='title'>
                <h3 onClick={() => navigate("/")} >Cross-Share</h3>
            </div>
            <div className='link'>
                <ul>
                    <li onClick={() => navigate("/")}>Home</li>
                    <li onClick={() => navigate("/about")}>About</li>
                    {user !== null && <li onClick={() => navigate("/savedData")}>Saved Data</li>}
                    {user !== null && <li onClick={() => {
                        localStorage.clear()
                        setUser(null)
                        navigate("/login")
                    }}>LogOut</li>}
                </ul>
            </div>
            <div className='profile_container'>
                <button style={{ marginRight: "2rem" }}> <a href={require("../images/cross_share.apk")} download style={{ color: "white", textDecoration: "none" }}>Download App</a> </button>
                {user !== null ? <img onClick={() => navigate("/profile")} src={user.profile ? user.profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} alt="" /> : <button onClick={() => navigate("/login")}>Login</button>}
            </div>
        </div>
    )
}

export default Header