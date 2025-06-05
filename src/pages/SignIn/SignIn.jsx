import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import useSignInValidation from "../../hooks/useSignInValidation";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig.js";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

    // Destructuring sign in validation and errors
    const { validateSignIn, signInErrors } = useSignInValidation();
    // For redirection
    const navigate = useNavigate();
    // retrieve sign in form values
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSignInFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    // Sign users in
    const handleSignIn = async (e) => {
      e.preventDefault();
      if (!validateSignIn(signInFormData)) {
        console.log("Form is not valid");
        return;
      }
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          signInFormData.email,
          signInFormData.password
        );
        const user = userCredential.user;
        navigate("/products");
        console.log("Successfully signed in", user);
        setSignInFormData({
          email: "",
          password: "",
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    // Reset password
    const handlePasswordReset = async (e) => {
      e.preventDefault();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!resetEmail.trim()) {
        setResetMessage("Email address is required to reset your password");
        return;
      } else if (!emailRegex.test(resetEmail.trim())) {
        setResetMessage("Please enter a valid email address");
        return;
      }
      try {
        await sendPasswordResetEmail(auth, resetEmail);
        console.log("password reset sent");
  
        setResetMessage("Password reset email sent. Please check your inbox");
        setResetEmail("");
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.signInForm} noValidate onSubmit={handleSignIn}>
        <h2>Sign in</h2>
        <fieldset className={styles.formGroup}>
        <legend className={styles.formGroupTitle}>Account Details</legend>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter you email address"
            className={styles.formInput}
            onChange={handleInputChange}
            value={signInFormData.email}
          />
          {signInErrors && (
            <p className={styles.errorMessage}>{signInErrors.email}</p>
          )}
          {/* --------------------------- */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter you password address"
            className={styles.formInput}
            onChange={handleInputChange}
            value={signInFormData.password}
          />
          {signInErrors && (
            <p className={styles.errorMessage}>{signInErrors.password}</p>
          )}
          </fieldset>
          {/* --------------------------- */}
          <p>
          Don't have an account? Create one <Link to="/sign-up">here</Link>
        </p>
        <p>
          Forgot your password? Reset it{" "}
          <Button
            className={styles.forgotPasswordButton}
            type="button"
            onClick={() => setShowForgotPasswordModal(true)}
          >
            here
          </Button>
        </p>
        <Button className={styles.signInButton}>Sign In</Button>
      </form>
      {/* ---------------------------------MODAL----------- */}
      {showForgotPasswordModal && (
        <Modal>
          <form className={styles.resetFormContainer}>
            <p>
            Enter your email to receive a password reset link.
            </p>
            <label htmlFor="email"></label>
            <input
              type="email"
              id="resetEmail"
              name="resetEmail"
              placeholder="Enter you email address"
              className={styles.formInput}
              onChange={(e) => setResetEmail(e.target.value)}
              value={resetEmail}
            />
            <div className={styles.resetButtonsContainer}>
              <Button
                className={styles.resetPasswordButton}
                onClick={handlePasswordReset}
              >
                Reset password
              </Button>
              <Button
                className={styles.closeButton}
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setResetMessage("");
                  setResetEmail("");
                }}
                type="button"
              >
                Close
              </Button>
            </div>
            {resetMessage && (
              <p className={styles.errorMessage}>{resetMessage}</p>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SignIn