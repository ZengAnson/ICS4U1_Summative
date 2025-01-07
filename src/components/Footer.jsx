import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="footer-grid">
                <a href="i">Account</a>
                <a href="h">Media Notice</a>
            </div>
            <div className="footer-grid">
                <a href="g">Terms of Service</a>
                <a href="f">Privacy Notice</a>
            </div>
            <div className="footer-grid">
                <a href="e">Shop</a>
                <a href="d">Redeem</a>
                <a href="c">New Deals</a>
            </div>
            <div className="footer-grid">
                <a href="b">FAQ</a>
                <a href="a">Contact</a>
            </div>
        </div>
    )
}

export default Footer;