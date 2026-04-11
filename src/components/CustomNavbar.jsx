import { Routes, Route, Link } from "react-router-dom";
import './styles/navbar.css';

import SearchCards from "./searchCards";
import DBCards from "./dbCards";
import Wishlist from "./wishlist";
import Carrito from "./carrito";

const CustomNavbar = ({ customwidth = "nrml" }) => {

    if(customwidth == "nrml"){
        return(
            <div className='main-container'>
                <div className="navbar-container">
                    <Link to={"/"} className='navbar-logo'>Agregar Carta</Link>

                    <div className='navbar-link-lst'>
                        <Link to={"/inventario"} className='navbar-link'>Stock</Link>
                    </div>
                    <div className='navbar-link-lst'>
                        <Link to={"/wishlist"} className='navbar-link'>Wishlist</Link>
                    </div>
                    <div className='navbar-link-lst'>
                        <Link to={"/carrito"} className='navbar-link'>Carrito</Link>
                    </div>
                </div>

                <Routes>
                    <Route path="/" element={<SearchCards></SearchCards>}/>
                    <Route path="/inventario" element={<DBCards></DBCards>}/>
                    <Route path="/wishlist" element={<Wishlist></Wishlist>}/>
                    <Route path="/carrito" element={<Carrito></Carrito>}/>
                </Routes>
            </div>
        )
    }else{
        return(
            <>
            </>
        )
    }
    
}

export default CustomNavbar;