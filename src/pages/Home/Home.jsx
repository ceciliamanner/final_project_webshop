import styles from "./Home.module.css";
import { Link } from "react-router-dom";



const Home = () => {
  return (
    <section className={styles.hero}>
        <header className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Secondo webshop</h1>
            <p className={styles.heroSubtitle}>Discover timeless finds with a modern soul</p>
            <Link 
            to="/products" 
            className={styles.ctaButton} 
            aria-label="browse second-hand prodcuts"
            >
                Browse 
            </Link>
        </header>
        

    </section>
  )
}

export default Home