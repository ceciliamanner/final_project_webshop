import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet /> 
      </main>
    </>
  )
}

export default App