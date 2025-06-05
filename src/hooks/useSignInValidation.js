import { useState } from "react";

const useSignInValidation = () => {
  const [signInErrors, setSignInErros] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateSignIn = (values) => {
    let newErros = {};
    if (!values.email.trim()) {
      newErros.email = "Email is required";
    } else if (!emailRegex.test(values.email.trim())) {
      newErros.email = "Please enter a valid email address";
    }

    if (!values.password.trim()) {
      newErros.password = "Password is required";
    } else if (values.password.trim().length < 8) {
      newErros.password = "Password must be at least 8 characters";
    }

    setSignInErros(newErros);

    return Object.keys(newErros).length === 0;
  };

  return { validateSignIn, signInErrors };
};

export default useSignInValidation;
