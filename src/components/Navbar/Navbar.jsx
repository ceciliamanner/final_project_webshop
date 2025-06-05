import { getAuthContext } from "../../context/authContext";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../../firebaseConfig.js";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const {user} = getAuthContext()
  const navigate = useNavigate();
  
  const handleSignout = async () => {
    try {
      await signOut(auth); 
      navigate("/")
    } catch (error) {
      console.log("error");
      
    }
  }


  return (
   <nav className={styles.navbar}>
    <div className={styles.firstRow}>
      <div className={styles.logo}>
          <img 
          src="/icons/secondo-logo.png"
          alt="secondo-logo" />
      </div>
      {/*--------------------------*/}
      <div className={styles.cartHamburgerMenu}>
      {user ? (
            <Button className={styles.signOutButton} onClick={handleSignout}>
              Sign out
            </Button>
          ) : (
            <Link to="/sign-in" className={styles.signInLink}>
              Register/Log in
            </Link>
          )}
          {user && (
            <Link to="/profile" className={styles.profileButton}>
              {user.imageUrl ? (
                <img src={user.imageUrl} alt="User's profile picture" />
              ) : (
                <FontAwesomeIcon icon={faUser} className={styles.profileIcon} />
              )}
            </Link>
          )}

      </div>
    </div>
    <div className={styles.secondRow}>
        <NavLink
          to="/"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Browse
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          Profile
        </NavLink>
      </div>
   </nav>
  )
}

export default Navbar