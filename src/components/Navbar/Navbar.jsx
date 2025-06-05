import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getAuthContext } from "../../context/authContext";
import Button from "../Button/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const Navbar = () => {
  const { user } = getAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      console.log("User signed out");
    } catch (error) {
      console.error("Sign out failed:", error.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Top row with logo and user options */}
      <div className={styles.firstRow}>
        <div className={styles.logo}>
          <img src="/icons/secondo-logo.png" alt="Secondo logo" />
        </div>

        <div className={styles.userSection}>
          {user ? (
            <>
              <Button className={styles.signOutButton} onClick={handleSignOut}>
                Sign out
              </Button>
              <Link to="/profile" className={styles.profileButton}>
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt="User profile" />
                ) : (
                  <FontAwesomeIcon icon={faUser} className={styles.profileIcon} />
                )}
              </Link>
            </>
          ) : (
            <Link to="/sign-in" className={styles.signInLink}>
              Register / Log in
            </Link>
          )}
        </div>
      </div>

      {/* Bottom row with navigation */}
      <div className={styles.secondRow}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Browse
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Profile
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;