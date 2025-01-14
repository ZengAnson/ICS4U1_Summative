import "./Account.css";
import "./Register.css";
import Collage from "../images/collage.jpeg";
import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import { useStoreContext } from "../context";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { Map } from 'immutable';

function Register() {
    const navigate = useNavigate();
    // const { setFirstName, setLastName, setEmail, setPassword, setGenreList, setLoggedIn, setCart } = useStoreContext();
    const { setGenreList, setLoggedIn, setCart } = useStoreContext(); //add a setUser
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePass, setRePass] = useState('');
    const checkboxesRef = useRef({});
    const genres = [
        { id: 28, genre: "Action" },
        { id: 12, genre: "Adventure" },
        { id: 16, genre: "Animation" },
        { id: 35, genre: "Comedy" },
        { id: 80, genre: "Crime" },
        { id: 10751, genre: "Family" },
        { id: 14, genre: "Fantasy" },
        { id: 36, genre: "History" },
        { id: 27, genre: "Horror" },
        { id: 10402, genre: "Music" },
        { id: 9648, genre: "Mystery" },
        { id: 878, genre: "Sci-Fi" },
        { id: 53, genre: "Thriller" },
        { id: 10752, genre: "War" },
        { id: 37, genre: "Western" }
    ]

    const registerByEmail = async(event) => {
        event.preventDefault();
        console.log (auth);
        try {
            if (password != rePass) {
                return alert("Passwords do not match. Please ensure your passwords match.");
            }

            const genreSelected = Object.keys(checkboxesRef.current)
                .filter((genreId) => checkboxesRef.current[genreId].checked)
                .map(Number);

            if (genreSelected.length < 10) {
                return alert("Please select at least 10 genres.");
            }

            const genreSorted = genreSelected
                .map((genreId) => genres.find((genre) => genre.id === genreId))
                .sort((a, b) => a.genre.localeCompare(b.genre));

            const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
            await updateProfile(user, { displayName: `${firstName} ${lastName}` });
            setUser(user);
            setGenreList(genreSorted);
            setCart(Map());
            setLoggedIn(true);
            return navigate(`/movies/genre/${genreSorted[0]}`);
        } catch {
            alert("Error creating user with email and password!");
        }
    }

    return (
        <div className="hero">
            <img src={Collage} alt="collage" id="hero-image"></img>
            <div className="shadow"></div>
            <div className="register-box">
                <div className="register-item">
                    <div className="account-title">Create Account</div>
                    <form onSubmit={(event) => registerByEmail(event)}>
                        <label className="account-text">First Name:</label>
                        <input className="account-input" type="text" value={firstName} onChange={(event) => { setFirstName(event.target.value) }} required></input>
                        <label className="account-text">Last Name:</label>
                        <input className="account-input" type="text" value={lastName} onChange={(event) => { setLastName(event.target.value) }} required></input>
                        <label className="account-text">Email:</label>
                        <input className="account-input" type="email" value={email} onChange={(event) => { setEmail(event.target.value) }}required></input>
                        <label className="account-text">Password:</label>
                        <input className="account-input" type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} required></input>
                        <label className="account-text">Re-enter Password:</label>
                        <input className="account-input" type="password" value={rePass} onChange={(event) => { setRePass(event.target.value) }} required></input>
                        <label>Already have an account? </label>
                        <label className="account-no" onClick={() => navigate("/login")}>Click here</label>
                        <button className="account-button" type="submit">CREATE</button>
                    </form>
                    <button className="account-button" type="submit">hello</button>
                </div>
                <div className="register-item">
                    <div className="account-genre">
                        <div className="account-title">Genre Selection</div>
                        <label>Please Select At Least 10 Genres</label>
                    </div>
                    {genres.map((item) => (
                        <div className="account-genres" key={item.id}>
                            <input className="account-genres" type="checkbox" id="check" ref={(el) => (checkboxesRef.current[item.id] = el)} />
                            <label className="account-genres">{item.genre}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Register;