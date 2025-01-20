import { createContext, useState, useContext, useEffect } from "react";
import { Map } from 'immutable';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [genreList, setGenreList] = useState([]);
    const [cart, setCart] = useState(Map());
    const [purchased, setPurchased] = useState (new Map());
    const [loading, setLoading] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                const sessionCart = localStorage.getItem(`cart_${user.email}`);
                if (sessionCart) {
                    setCart(Map(JSON.parse(sessionCart)));
                } else {
                    setCart(Map());
                }
                const getInfo = async () => {
                    try {
                      const docRef = doc(firestore, "users", user.email);
                      const data = await getDoc(docRef);
                      if (data.exists()) {
                        const genres = data.data().genreSorted;
                        setGenreList(genres);
                        const prevCart = Map(data.data().previous);
                        setPurchased(prevCart);
                      } else {
                        setPurchased(Map());
                      }
                    } catch (error) {
                      alert("Error has occured.");
                    }
                  };
                  getInfo();
            }
            setLoading(false);
        });
    }, [])
    
    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <StoreContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, genreList, setGenreList, cart, setCart, purchased, setPurchased, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword}}>
            {children}
        </StoreContext.Provider>
    );
}

export const useStoreContext = () => {
    return useContext(StoreContext);
}