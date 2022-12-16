import React, { useEffect, useState } from 'react'
import "./profile.css"

const Profile = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, [])
    return (
        <div className='profile_cont'>
            {
                user !== null && <div className='inner_cont'>
                    <img src={user.profile} alt="" />
                    <h1>{user.name}</h1>
                </div>
            }
        </div>
    )
}

export default Profile