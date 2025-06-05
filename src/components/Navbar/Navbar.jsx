import { getAuthContext } from "../../context/authContext";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../../firebaseConfig.js";


const Navbar = () => {
  const {user} = getAuthContext()
  
  const handleSignout = async () => {
    try {
      await signOut(auth); 
      navigate("/")
    } catch (error) {

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

          <Link to="/cart" className={styles.cartButton}>
            <FontAwesomeIcon icon={faCartPlus} className={styles.cartIcon} />
            {/* {CartItemsCount > 0 && (
              <span className={styles.cartBadge}>{CartItemsCount}</span>
            )} */}
          </Link>

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
          Create add
        </NavLink>
      </div>
   </nav>
  )
}

export default Navbar