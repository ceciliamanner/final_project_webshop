import styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const ProductItem = ({ product, onBuyClick }) => {

  return (
    <div className={styles.productCard}>
    <div className={styles.imageContainer}>
      <img
        src={product.imageUrl}
        alt={product.title}
        className={styles.productImage}
      />
    </div>

    <h2 className={styles.productTitle}>{product.title}</h2>

    <p className={styles.productDescription}>
        {product.description}
    </p>

    <p className={styles.productPrice}>
        {product.price} NOK
    </p>

    {/* <Link to={`/products/${product.id}`} className={styles.productLink}>
      Details
    </Link> */}

    <Button className={styles.addToCartBtn} onClick={onBuyClick}/* onClick={handleAddToCart} */>
      Add to cart
    </Button>
  </div>
  );

}

export default ProductItem