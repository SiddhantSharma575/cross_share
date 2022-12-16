import React from 'react'
import './about.css'
import video1 from "../../images/main.mp4"

const About = () => {
    return (
        <div className='about_container'>
            <p>Cross-Share is an Multiplatform data sharing application in which user can
                send data from their laptop to mobile phones & mobile phones to laptop as well</p>
            <video src={video1} width="600" height="300" controls="controls" />
        </div>
    )
}

export default About