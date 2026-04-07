import { Routes, Route, Link } from "react-router-dom";
import './styles/navbar.css';

import SearchCards from "./searchCards";
import DBCards from "./dbCards";

const CustomNavbar = ({ customwidth = "nrml" }) => {

    if(customwidth == "nrml"){
        return(
            <div className='main-container'>
                <div className="navbar-container">
                    <Link to={"/"} className='navbar-logo'>LOGO</Link>

                    <div className='navbar-link-lst'>
                        <Link to={"/inventario"} className='navbar-link'>Inventory</Link>
                    </div>
                </div>

                <Routes>
                    <Route path="/" element={<SearchCards></SearchCards>}/>
                    <Route path="/inventario" element={<DBCards></DBCards>}/>
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