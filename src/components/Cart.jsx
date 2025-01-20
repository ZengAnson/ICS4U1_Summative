import "./Cart.css";
import { useNavigate } from "react-router";
import { useStoreContext } from "../context";
import { firestore } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Map } from 'immutable';

function Cart() {
    const navigate = useNavigate();
    const { user, cart, setCart, genreList, purchased, setPurchased } = useStoreContext();

    const buy = async () => {
        if (cart.size <= 0) {
            return alert("Cart is empty.");
        }

        const newCart = purchased.merge(cart);
        console.log (typeof (newCart));
        setPurchased (newCart);
        // //adds cart to firestore
        // const docRef = doc(firestore, "users", user.email);
        // await setDoc(docRef, { genreSorted: genreList, previous: newCart.toJS() });
        // //removes from local storage and react context
        // localStorage.removeItem(user.email);
        // setCart(Map());
        // return alert("Thank you for your purchase!");

        // const docRef = doc(firestore, "users", user.email);
        // const userData = { purchases: cart.toJS(), };
        // await setDoc(docRef, userData, { merge: true });
        // localStorage.removeItem(user.uid);
        // setCart(Map());
        // const getPurchases = async () => {
        //     const docRef = doc(firestore, "users", user.email);
        //     const data = (await getDoc(docRef)).data();
        //     setPurchased(Map(data.purchases));
        // }
        // getPurchases();
        // const newCart = purchased.merge(cart);
        // console.log (newCart);
        // setPurchased (newCart);
        // //adds cart to firestore
        // const docRef = doc(firestore, "users", user.email);
        // await setDoc(docRef, { genreSorted: genreList, previous: newCart.toJS() });
        // //removes from local storage and react context
        // localStorage.removeItem(user.email);
        // setCart(Map());
        // return alert("Purchase successful!");
    }

    function removeItem (key) {
        setCart((prevCart) => {
            const newCart = prevCart.delete(key);
            localStorage.removeItem(user.uid);
            localStorage.setItem(user.uid, JSON.stringify(newCart.toJS()));
            return newCart;
        });
    }

    return (
        <div className="cart">
            <button className="cart-back" onClick={() => navigate(`/movies/genre/${genreList[0].id}`)}>Back</button>
            <label className="cart-title">Cart</label>
            <div className="cart-items">
                {
                    cart.entrySeq().map(([key, movie]) => {
                        return (
                            <div className="cart-item" key={key}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.url}`} width={"250px"} />
                                <label className="cart-movie">{movie.title}</label>
                                <button className="cart-button" onClick={() => removeItem(key)}>Remove</button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="pay">
                <button className="cart-button" onClick={() => buy()}>Purchase</button>
            </div>
        </div>
    )
}

export default Cart;