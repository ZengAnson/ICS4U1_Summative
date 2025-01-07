import "./Hero.css";
import Collage from "../images/collage.jpeg";
import { useNavigate } from "react-router";

function Hero() {
    const navigate = useNavigate();

    return (
        <div className="hero">
            <img src={Collage} alt="collage" id="hero-image"></img>
            <div className="shadow"></div>
            <div className="hero-frame">
                <div className="title-box">
                    <div className="title-text">
                        <h4>For a Late Friday Night</h4>
                        <h1>Any Show. Every Show.</h1>
                        <h2>Stream Now</h2>
                        <h4>Start Your 1 Month Free Trial Today</h4>
                    </div>
                    <button className="buttons account" onClick={() => navigate("/register")}>Create Account</button>
                    <button className="buttons signup" onClick={() => navigate("/login")}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default Hero;