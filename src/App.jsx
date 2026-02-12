import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Favourites from "./pages/Favourites";
import NavBar from "./components/NavBar";
import Home from "./pages/Movies";
import { MovieProvider } from "./contexts/MovieContext";
import Series from "./pages/Series";
import SeriesDetail from "./pages/SeriesDetail";
import MoviesDetail from "./pages/MoviesDetails";

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
            <Route path="/series/:id" element={<SeriesDetail />} />
            <Route path="/movies/:id" element={<MoviesDetail />} />
          </Routes>
        </main>
      </MovieProvider>
    </>
  );
}

export default App;
