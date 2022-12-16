import React from 'react'
import "./login.css"
import GoogleLogo from "../../images/google.png"
import { auth } from "../../firebase"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const provider = new GoogleAuthProvider()
    const navigate = useNavigate()
    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const user = result.user
                console.log(user);
                const userDetail = {
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    profile: user.photoURL
                }
                localStorage.setItem("user", JSON.stringify(userDetail))
                navigate("/")
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            })
    }
    return (
        <div className="login_container">
            <h2>Login</h2>
            <div className='input_container'>
                <button onClick={handleSignIn}><span><img src={GoogleLogo} alt='' width={30} height={30} /></span> Sign in With Google</button>
            </div>
        </div>
    )
}

export default Login