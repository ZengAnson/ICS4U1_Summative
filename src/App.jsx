import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeView from "../src/views/HomeView";
import RegisterView from "../src/views/RegisterView";
import LoginView from "../src/views/LoginView";
import MoviesView from "../src/views/MoviesView";
import GenreView from "./views/GenreView";
import DetailView from "./views/DetailView";
import CartView from "./views/CartView.jsx";
import SettingsView from "./views/SettingsView.jsx";
import { StoreProvider } from "./context";
import './App.css';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/movies" element={<MoviesView />}>
            <Route path="genre/:id" element={<GenreView />} />
            <Route path="details/:id" element={<DetailView />} />
          </Route>
          <Route path="/cart" element={<CartView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App