import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/cryptocurrencies" element={<h1>Cryptocurrencies</h1>} />
          <Route path="/forum" element={<h1>Forum</h1>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="*" element={<h1>Uh oh, Page Not Found!</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
