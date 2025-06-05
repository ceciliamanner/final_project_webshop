import styles from "./Profile.module.css"; 
import { useEffect, useState } from "react"; 
import { getAuthContext } from "../../context/authContext";
import { useFetchListings } from '../../hooks/useFetchListings'
import ProductItem from "../../components/ProductItem/ProductItem";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig.js";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { user } = getAuthContext();
  const listings = useFetchListings();
  const myListings = listings.filter((listing) => listing.userId === user?.uid);

  console.log("Current user ID:", user?.uid);
  console.log("Listings from Firestore:", listings);
  console.log("My listings (filtered):", myListings);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(database, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("user not found");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <div className={styles.profileWrapper}>
      {userData && (
        <div className={styles.userInfo}>
          <img
            src={userData.profilePicture}
            alt="Profile"
            className={styles.profileImage}
          />
          <h2>
            {userData.firstname} {userData.lastname}
          </h2>
        </div>
      )}

      <h3>My Listings</h3>
      <Link to="/create-listing" className={styles.createListingBtn}>
          <button className={styles.button}>Create New Listing</button>
      </Link>
      <div className={styles.listingsContainer}>
        {myListings.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Profile