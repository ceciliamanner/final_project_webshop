import styles from "./SignUp.module.css";
import Button from "../../components/Button/Button";
import { useRef, useState } from "react";
import { useSignUpValidation } from "../../hooks/useSignUpValidation.js";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { database } from "../../../firebaseConfig.js";
import { useImageUpload } from "../../hooks/useImageUpload";


const SignUp = () => {
    const [signUpFormData, setSignUpFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        profilePicture: null,
        previewUrl: "",
      });
      const fileInputRef = useRef(null);
      const { validate, errors } = useSignUpValidation();
      const { signUp, signUpErrors, user } = useAuth();
      const navigate = useNavigate();
      const { uploadImage } = useImageUpload();
    
      // Retrieve the input values
      const handleInputChange = (e) => {
        if (e.target.type === "file") return;
        const { name, value } = e.target;
        setSignUpFormData((prevData) => ({ ...prevData, [name]: value }));
      };
      // Retrieving the selected image and displaying preview
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
          const previewUrl = URL.createObjectURL(file);
          setSignUpFormData((prevData) => ({
            ...prevData,
            profilePicture: file,
            previewUrl: previewUrl,
          }));
          console.log("File Selected:", file);
        } else {
          setSignUpFormData((prevData) => ({
            ...prevData,
            profilePicture: null,
            previewUrl: "",
          }));
        }
      };
      // removing the selected image
      const handleRemoveImage = () => {
        setSignUpFormData((prevData) => ({
          ...prevData,
          profilePicture: null,
          previewUrl: "",
        }));
        fileInputRef.current.value = "";
      };
      
      // function to handle form submit
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate(signUpFormData)) {
          console.log("Form is not valid");
          return;
        }
    
        try {
          const userCredential = await signUp(
            signUpFormData.email,
            signUpFormData.password
          );
          const user = userCredential.user;
          console.log("User created successfully", userCredential.user);
    
          const uploadedImage = signUpFormData.profilePicture
            ? await uploadImage(signUpFormData.profilePicture, "profile")
            : "";
    
          await setDoc(doc(database, "users", user.uid), {
            uid: user.uid,
            firstname: signUpFormData.firstname,
            lastname: signUpFormData.lastname,
            email: user.email,
            dateOfBirth: signUpFormData.dateOfBirth || "",
            profilePicture: uploadedImage,
            createdAt: serverTimestamp(),
          });
    
          setSignUpFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            dateOfBirth: "",
            profilePicture: null,
            previewUrl: "",

          });
          fileInputRef.current.value = "";
          navigate("/verify-email");
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className={styles.formWrapper}>
        <form className={styles.signUpForm} onSubmit={handleSubmit} noValidate>
        <h2>Sign-up Form</h2>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>
            Personal Information
          </legend>
          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter your first name"
            maxLength={50}
            className={styles.formInput}
            onChange={handleInputChange}
            value={signUpFormData.firstname}
          />
          {errors && <p className={styles.errorMessage}>{errors.firstname}</p>}
          {/* ---------------------------------- */}
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Enter your last name"
            maxLength={50}
            className={styles.formInput}
            onChange={handleInputChange}
            value={signUpFormData.lastname}
          />
          {errors && <p className={styles.errorMessage}>{errors.lastname}</p>}

          {/* ---------------------------------- */}
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className={styles.formInput}
            onChange={handleInputChange}
            value={signUpFormData.dateOfBirth}
          />
          {/* ---------------------------------- */}
          <label htmlFor="profilePicture">Profile picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            className={styles.formInput}
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            ref={fileInputRef}  
          />
           {signUpFormData.previewUrl && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={signUpFormData.previewUrl}
                alt="User's profile picture"
                className={styles.imagePreview}
              />
              <button
                className={styles.removeImageButton}
                onClick={handleRemoveImage}
                type="button"
              >
                Remove photo
              </button>
            </div>
          )}
        </fieldset>

        {/* -----------------------------------------------*/}
        <fieldset className={styles.formGroup}>
        <legend className={styles.formGroupTitle}>Account Information</legend>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            maxLength={50}
            className={styles.formInput}
            onChange={handleInputChange}
            value={signUpFormData.email}
          />
          {errors && <p className={styles.errorMessage}>{errors.email}</p>}

          {/* ---------------------------------- */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            maxLength={50}
            className={styles.formInput}
            onChange={handleInputChange}
            value={signUpFormData.password}
          />
            {errors && <p className={styles.errorMessage}>{errors.password}</p>}

           {/* ---------------------------------- */}
           <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            maxLength={50}
            className={styles.formInput}
            onChange={handleInputChange}
            value={signUpFormData.confirmPassword}
          />
          {errors && (
            <p className={styles.errorMessage}>{errors.confirmPassword}</p>
          )}
        </fieldset>
        <Button 
        type="submit"
        className={styles.createAccountButton}
        >
            Create account
        </Button>
        </form>
    </div>
  )
}

export default SignUp