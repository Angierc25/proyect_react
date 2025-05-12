import { useState } from "react";
import { Link } from "react-router";

export const Navbar = () => {
    const [menuOpen,setMenuOpen] = useState(false);
    return  (
        <nav>
            <div>
                <div>
                    <Link to={"/"}>
                    social<span>.media</span>
                    </Link>
                    {/*Desktop Links */}
                    <div>
                        <Link to ={"/"}> Inicio </Link>
                        <Link to ={"/create"}> Crear Publicaciones </Link>
                        <Link to ={"/communities"}> Comunidades </Link>
                        <Link to ={"/community/create"}> Crear Comunidades</Link>
                    </div>

                    {/*Mobile Menu  Button*/}
                    <div>
                        {""}
                        <button></button>
                    </div>
                    {menuOpen && (
                    <div>
                        <div>
                            <Link to ={"/"}> Inicio </Link>
                            <Link to ={"/create"}> Crear Publicaciones </Link>
                            <Link to ={"/communities"}> Comunidades </Link>
                            <Link to ={"/community/create"}> Crear Comunidades</Link>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </nav>
    );
}