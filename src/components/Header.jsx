import "./Header.css";
import WebFlix from "../images/weblogo.png";
import Search from "../images/search.png";
import { useNavigate } from "react-router";
import { useStoreContext } from "../context";

function Header() {
    const navigate = useNavigate();
    const { firstName, loggedIn, setLoggedIn } = useStoreContext();

    function logout() {
        setLoggedIn(false);
        return navigate(`/`);
    }

    return (
        <div className="header">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet" />
            <div>
                <img src={WebFlix} alt="webflix logo" width="50" id="logo" />
                <div className="header-text" onClick={() => logout()}>
                    <div className="webtitle">WEBFLIX</div>
                </div>
            </div>
            <div className="header-frame">
                <div>
                    {(loggedIn) ? (
                        <div>
                            <label className="welcome-message">Welcome {firstName}!</label>
                            <div className="sign-in">
                                <button className="signed-buttons" onClick={() => navigate(`/cart`)}>Cart</button>
                                <button className="signed-buttons" onClick={() => logout()}>Sign Out</button>
                                <button className="signed-buttons" onClick={() => navigate(`/settings`)}>Settings</button>
                            </div>
                        </div>
                    ) : (<></>)}
                </div>
                <input type="text" id="search-bar" height="30" placeholder="Search" />
                <button id="search-button">
                    <img src={Search} alt="search button" height="30" />
                </button>
            </div>
        </div>
    )
}

export default Header;