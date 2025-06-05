import styles from "./CreateListing.module.css";
import { useRef, useState } from "react";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import { getAuthContext } from "../../context/authContext";


const CreateListing = () => {
    const [listingDetails, setListingDetails] = useState({
        title:"",
        category: "",
        description: "", 
        image: null,
        previewUrl: null,
        price: "",
    });
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { uploadImage } = useImageUpload();
    const { user } = getAuthContext(); 

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(e.target.type === "file") return 
        setListingDetails((prevDetails)=> ({...prevDetails, [name]: value}))
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file && file.type.startsWith("image/")){
            const previewUrl = URL.createObjectURL(file); 
            setListingDetails((prevDetails) => ({
                ...prevDetails, 
                image: file, 
                previewUrl: previewUrl, 
            }));
        }else {
            setListingDetails((prevDetails) => ({
                ...prevDetails, 
                image: null, 
                previewUrl: null, 
            }));
        }
    };

    const handleRemoveImage = () => {
        setListingDetails((prevDetails) => ({
            ...prevDetails,
            image: null,
            previewUrl: "",
        }));
        if (fileInputRef.current) {
            fileInputRef.current = "";
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
         
          if (!listingDetails.title || !listingDetails.image || !listingDetails.price) {
            console.log("Missing required fields");
            return;
          }
      
      
          const uploadedImageUrl = await uploadImage(listingDetails.image, "listings");
      
   
          const newListing = {
            ...listingDetails,
            imageUrl: uploadedImageUrl,
            image: null, 
            previewUrl: null,
            price: Number(listingDetails.price),
            userId: user?.uid || null,
            createdAt: serverTimestamp(),
          };
          console.log("Creating listing for user:", user?.uid); 
      
          await addDoc(collection(database, "products"), newListing);
          console.log("Listing created!");
      
    
          setListingDetails({
            title: "",
            category: "",
            description: "",
            image: null,
            previewUrl: null,
            price: "",
          });
      
      
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
      

          navigate("/profile");
        } catch (error) {
          console.error("Error creating listing", error);
        }
      };
    

    return (
      <div className={styles.CreateListingContainer}>
        <form className={styles.CreateListingForm} onSubmit={handleSubmit}>
            <h2>What are you selling?</h2>
            <label htmlFor="title"></label>
            <input 
                type="text"
                name="title"
                id="title"
                className={styles.input}
                placeholder="Title"
                required
                onChange={handleChange}
            />

            <label htmlFor="category"></label>
            <select
                name="category"
                id="category"
                className={styles.select}
                onChange={handleChange}
                required
            >
                <option value="">Choose a category</option>
                <option value="jackets">Jackets</option>
                <option value="sweaters">Sweaters</option>
                <option value="shirts">Shirts</option>
                <option value="pants-jeans">Pants & Jeans</option>
                <option value="dresses">Dresses</option>
                <option value="bags">Bags</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
                <option value="fitness">Fitness</option>
            </select>

            <label htmlFor="description"></label>
            <textarea
                name="description"
                id="description"
                className={styles.textarea}
                placeholder="Describe your item: brand, size, fit..."
                rows={3}
                required
                onChange={handleChange}
            >
            </textarea> 

            <label htmlFor="price"></label>
            <input 
                type="number"
                name="price"
                id="price"
                className={styles.input}
                placeholder="Price in NOK"
                required
                onChange={handleChange}
                
            /> 
            <label htmlFor="image"></label>
            <span>Add image</span>
            <input 
                type="file"
                name="image"
                id="image"
                className={styles.fileInput}
                accept=".jpg, .png, .jpeg"
                required
                onChange={handleImageChange}
                ref={fileInputRef}
            />
            {listingDetails.previewUrl && (
                <div className={styles.imagePreviewContainer}>
                    <img 
                        src={listingDetails.previewUrl} 
                        alt="image-preview"
                        className={styles.imagePreview}
                    />
                    <button className={styles.removeImageButton} 
                    onClick={(e) => {
                        e.preventDefault();
                        handleRemoveImage();
                    }}
                    >
                        Remove photo
                    </button>
                </div>
            )}
            <button 
                type="submit" 
                className={styles.submitButton}
                >
                Create Listing
            </button>    
        </form>
      </div>
    );
  };
  
  export default CreateListing;