import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import LandingPage from "./components/LandingPage";
import CurrencyPage from "./pages/currency/CurrencyPage";
import Currencies from "./pages/currency/Currencies";
import "./styles/custom.css";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/signin" element={<SignInForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route
            exact
            path="/cryptocurrencies"
            element={<h1>Cryptocurrencies</h1>}
          />
          <Route exact path="/forum" element={<h1>Forum</h1>} />
          <Route exact path="/about" element={<h1>About</h1>} />
          <Route exact path="/currencies/:id" element={<CurrencyPage />} />
          <Route exact path="/currencies/" element={<Currencies />} />
          <Route exact path="*" element={<h1>Uh oh, Page Not Found!</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
