import "./Account.css";
import Collage from "../images/collage.jpeg";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useStoreContext } from "../context";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
    // const { email, password, setLoggedIn, genreList } = useStoreContext();
    // const [ema, setEma] = useState("")
    // const [pass, setPass] = useState("");
    // const navigate = useNavigate();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setLoggedIn, genreList } = useStoreContext();
    // const { setUser } = useStoreContext();
  

    async function loginByEmail(event) {
        event.preventDefault();
        console.log('hello');
        try {
            console.log('hi');
            const user = (await signInWithEmailAndPassword(auth, email, password)).user;
            setUser(user);
            setLoggedIn(true);
            return navigate(`/movies/genre/${genreList[0].id}`);
        } catch (error) {
            alert("Error signing in!");
        }
    }

    async function loginByGoogle(event){
        event.preventDefault();
        try {
            const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
            // setUser(user);
            setLoggedIn(true);
            return navigate(`/movies/genre/${genreList[0].id}`);
        } catch (error) {
            console.log(error);
            alert("Error signing in!");
        }
    }

    return (
        <div className="hero">
            <img src={Collage} alt="collage" id="hero-image"></img>
            <div className="shadow"></div>
            <div className="hero-frame">
                <div className="account-box">
                    <form onSubmit={(event) => loginByEmail(event)}>
                        <div className="account-title">Log In</div>
                        <label className="account-text">Email:</label>
                        <input className="account-input" type="email" value={email} onChange={(event) => { setEmail(event.target.value) }} required></input>
                        <label className="account-text">Password:</label>
                        <input className="account-input" type="password" value={password} onChange={(event) => { setPassword(event.target.value)}} required></input>
                        <label>Don't have an account? </label>
                        <label className="account-no" onClick={() => navigate("/register")}>Click here</label>
                        <button className="account-button" type="submit">LOGIN</button>
                    </form>
                    <button className="account-button" onClick={(event) => loginByGoogle(event)}>SIGN IN WITH GOOGLE</button>
                </div>
            </div>
        </div>
    )
}

export default Login;