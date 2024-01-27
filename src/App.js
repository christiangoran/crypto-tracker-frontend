import styles from "./App.module.css";
import "./styles/custom.css";
import fotStyles from "./styles/Footer.module.css";
import Container from "react-bootstrap/Container";

import { Route, Routes } from "react-router-dom";
import { useCurrentUser } from "./context/CurrentUserContext";

import NavBar from "./components/NavBar";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import LandingPage from "./components/LandingPage";
import CurrencyPage from "./pages/currency/CurrencyPage";
import Currencies from "./pages/currency/Currencies";
import Dashboard from "./pages/dashboard/Dashboard";
import Footer from "./components/Footer";
import UserProfilePage from "./pages/profile/UserProfilePage";
import { ForumPage } from "./pages/posts/ForumPage";

import NotFound from "./components/NotFound";

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={`${styles.App} ${fotStyles.mainContainer}`}>
      <NavBar key={currentUser?.profile_image} />
      <Container className={styles.Main}>
        {/* Routes holds all the Routes and renders the first one that matches
      the current  URL. */}
        <Routes>
          {/* The route below renders the <LandingPage /> component when the
        about path is accessed. */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/forum" element={<ForumPage />} />
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
