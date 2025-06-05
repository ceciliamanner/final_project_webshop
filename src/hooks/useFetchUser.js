import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../firebaseConfig.js";

export const useFetchUser = () => {
    const [users, setUsers] = useState([]); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const querySnapshot = await getDocs(collection(database, "users"))
                const userList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(userList);
            } catch (error) {
                console.log(error.message);
                
            }
        };
        fetchUser()
    }, []); 
    return users
  
};