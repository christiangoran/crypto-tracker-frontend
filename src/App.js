import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import LandingPage from "./components/LandingPage";
import CurrencyPage from "./pages/currency/CurrencyPage";
import Currencies from "./pages/currency/Currencies";
import Dashboard from "./pages/dashboard/Dashboard";
import "./styles/custom.css";
import UserProfilePage from "./pages/profile/UserProfilePage";
import { useCurrentUser } from "./context/CurrentUserContext";
import { ForumPage } from "./pages/posts/ForumPage";
import Footer from "./components/Footer";
import fotStyles from "./styles/Footer.module.css";
import NotFound from "./components/NotFound";

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={`${styles.App} ${fotStyles.mainContainer}`}>
      <NavBar key={currentUser?.profile_image} />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/cryptocurrencies" element={<h1>Cryptocurrencies</h1>} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/currencies/:id" element={<CurrencyPage />} />
          <Route path="/currencies/" element={<Currencies />} />
          <Route path="/profiles/:id" element={<Dashboard />} />
          <Route path="/edit-profile/" element={<UserProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
