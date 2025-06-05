import styles from "./Filter.module.css";

const Filter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    "all",
    "jackets",
    "sweaters",
    "shirts",
    "pants-jeans",
    "dresses",
    "bags",
    "shoes",
    "accessories",
    "fitness"
  ];

  return (
    <div className={styles.filterWrapper}>
      <label htmlFor="category"></label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={styles.select}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "all" ? "All categories" : cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;