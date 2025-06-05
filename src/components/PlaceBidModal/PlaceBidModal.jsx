import { useState } from "react";
import styles from "./PlaceBidModal.module.css";

const PlaceBidModal = ({ product, onClose }) => {
  const [paymentValues, setPaymentValues] = useState({
    billingAddress: "",
    paymentMethod: "",
  });

  const [paymentErrors, setPaymentErrors] = useState({});

  const handleChange = (e) => {
    setPaymentValues({ ...paymentValues, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!paymentValues.billingAddress) {
      errors.billingAddress = "Billing address is required";
    }
    if (!paymentValues.paymentMethod) {
      errors.paymentMethod = "Please select a payment method";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setPaymentErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("📤 Submitting bid:", {
        ...product,
        ...paymentValues,
      });
      // 🔥 Lägg till Firebase-kod här
      onClose(); // stänger modalen efter submit
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        <div className={styles.productInfo}>
          <img src={product.imageUrl} alt={product.title} className={styles.image} />
          <div>
            <h2 className={styles.title}>{product.title}</h2>
            <p className={styles.price}>{product.price} NOK</p>
            <p className={styles.description}>{product.description}</p>
          </div>
        </div>

        {/* Billing address */}
        <label htmlFor="billingAddress" className={styles.label}>
          Billing Address
        </label>
        <input
          type="text"
          id="billingAddress"
          name="billingAddress"
          placeholder="Oslo"
          className={styles.input}
          onChange={handleChange}
          value={paymentValues.billingAddress}
        />
        {paymentErrors.billingAddress && (
          <p className={styles.errorMessage}>{paymentErrors.billingAddress}</p>
        )}

        {/* Payment method */}
        <label htmlFor="paymentMethod" className={styles.label}>
          Payment Method
        </label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          className={styles.select}
          onChange={handleChange}
          value={paymentValues.paymentMethod}
        >
          <option value="">-- Select --</option>
          <option value="visa">Visa</option>
          <option value="paypal">PayPal</option>
          <option value="vipps">Vipps</option>
        </select>
        {paymentErrors.paymentMethod && (
          <p className={styles.errorMessage}>{paymentErrors.paymentMethod}</p>
        )}

        <button className={styles.submitButton} onClick={handleSubmit}>
          Place bid
        </button>
      </div>
    </div>
  );
};

export default PlaceBidModal;