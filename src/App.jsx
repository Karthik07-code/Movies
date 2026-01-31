import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Favourites from "./pages/Favourites";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { MovieProvider } from "./contexts/MovieContext";
import Series from "./pages/Series";

function App() {
  return (
    <>
      <MovieProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/series" element={<Series />} />
          </Routes>
        </main>
      </MovieProvider>
    </>
  );
}

export default App;
