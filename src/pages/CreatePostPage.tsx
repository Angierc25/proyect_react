import { CreatePost } from "../components/CreatePost";

export const CreatePostPage = () => {
    return (
        <div className="pt-5 pb-16 px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent opacity-70 z-0"></div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-center">
                    <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
                        Crear nueva publicación
                    </span>
                </h2>

                <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full mx-auto mb-12 opacity-80"></div>

                <CreatePost />
            </div>
        </div>
    );
};