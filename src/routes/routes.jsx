import { 
    createBrowserRouter,
    createRoutesFromElements, 
    Route    
} from "react-router-dom";

//import pages
import App from "../App";
import Home from "../pages/Home/Home";
import ProductsList from "../pages/ProductsList/ProductsList"; 
import SignIn from "../pages/SignIn/SignIn"; 
import SignUp from "../pages/SignUp/SignUp"; 
import Profile from "../pages/Profile/Profile"; 
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";
import CreateListing from "../pages/CreateListing/CreateListing";


export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} /> 
        <Route path="/verify-email" element={<VerifyEmail />}/>
        <Route path="/sign-in" element={<SignIn />} /> 
        <Route path="/create-listing" element={<CreateListing />}/>

        <Route path="/profile" element={<Profile />} />  
        <Route path="/products" element={<ProductsList />}/>
    {/*     <Route path="/products/:id" element={<ProductDetails />}/> */}
        {/* <Route path="/cart" element={<Cart />}/> */}

    </Route>      
    )
);