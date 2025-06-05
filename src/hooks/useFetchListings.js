import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../firebaseConfig.js";

export const useFetchListings = () => {
    const [listings, setListings] = useState([]); 

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const querySnapshot = await getDocs(collection(database, "products"))
                const productList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setListings(productList);
            } catch (error) {
                console.log(error.message);
                
            }
        };
        fetchListings()
    }, []); 
    return listings
  
};


