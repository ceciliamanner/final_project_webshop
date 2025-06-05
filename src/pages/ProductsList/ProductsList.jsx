import { useState } from "react";
import styles from "./ProductsList.module.css";
import { useFetchListings } from "../../hooks/useFetchListings";
import ProductItem from "../../components/ProductItem/ProductItem";
import Filter from "../../components/Filter/Filter";
import PlaceBidModal from "../../components/PlaceBidModal/PlaceBidModal";

const ProductsList = () => {
  const allListings = useFetchListings();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ✅ 1. State för modal & vald produkt
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ 2. Funktion som triggar modal + produkt
  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const filteredListings =
    selectedCategory === "all"
      ? allListings
      : allListings.filter((product) => product.category === selectedCategory);

  return (
    <div className={styles.listingsWrapper}>
      <h2>Browse All Listings</h2>
      
      <Filter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className={styles.listingsContainer}>
        {filteredListings.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onBuyClick={() => handleBuyClick(product)} // ✅ 3. Skickar in hanterare till knappen
          />
        ))}
      </div>

      {/* ✅ 4. Visar modal om produkt valts */}
      {showModal && (
        <PlaceBidModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ProductsList;