import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { signInWithGitHub, singOut, user } = useAuth();

    const displayName = user?.user_metadata.user_name || user?.email;
    return (
        <nav className="fixed top-0 w-full z-40 bg-[rgba(50,20,90,0.9)] backdrop-blur-lg border-b border-purple-300/10 shadow-lg">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    <Link to="/" className="font-mono text-2xl font-bold text-white flex items-center">
                        <span className="mr-1">Chat</span>
                        <span className="text-purple-400">(Now)</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center">
                        <div className="bg-purple-900/60 rounded-full px-6 py-2 flex space-x-6">
                            <Link
                                to="/"
                                className="text-purple-100 hover:text-white transition-colors font-medium"
                            >
                                Inicio
                            </Link>
                            <Link
                                to="/create"
                                className="text-purple-100 hover:text-white transition-colors font-medium"
                            >
                                Crear Publicacion
                            </Link>
                            <Link
                                to="/communities"
                                className="text-purple-100 hover:text-white transition-colors font-medium"
                            >
                                Comunidades
                            </Link>
                            <Link
                                to="/community/create"
                                className="text-purple-100 hover:text-white transition-colors font-medium"
                            >
                                Crear Comunidad
                            </Link>
                        </div>
                    </div>
                    {/* Desktop auth */}
                    <div className="hidden md:flex items-center">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                {user.user_metadata?.avatar_url && (
                                    <img
                                        src={user.user_metadata.avatar_url}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                )}
                                <span className="text-gray-300">{displayName}</span>
                                <button
                                    onClick={singOut}
                                    className="bg-red-500 px-3 py-1 rounded"
                                >
                                    Cerrar sesion
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={signInWithGitHub}
                                className="bg-blue-500 px-3 py-1 rounded"
                            >
                                Iniciar sesion con GitHub
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="text-purple-100 hover:text-white focus:outline-none bg-purple-900/60 p-2 rounded-full"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {menuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>



            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-[rgba(10,10,10,0.9)] rounded-b-lg mx-4 mb-2 overflow-hidden shadow-lg">
                    <div className="px-4 py-3 space-y-2">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-full text-base font-medium text-gray-300 hover:text-white hover:bg-black/40"
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/create"
                            className="block px-3 py-2 rounded-full text-base font-medium text-gray-300 hover:text-white hover:bg-black/40"
                        >
                            Crear Publicacion
                        </Link>
                        <Link
                            to="/communities"
                            className="block px-3 py-2 rounded-full text-base font-medium text-gray-300 hover:text-white hover:bg-black/40"
                        >
                            Comunidades
                        </Link>
                        <Link
                            to="/community/create"
                            className="block px-3 py-2 rounded-full text-base font-medium text-gray-300 hover:text-white hover:bg-black/40"
                        >
                            Crear Comunidad
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};