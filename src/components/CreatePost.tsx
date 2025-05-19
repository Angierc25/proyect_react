import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, type ChangeEvent } from "react";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";
import { fetchCommunities, type Community } from "./CommunityList";


interface PostInput {
    title: string;
    content: string;
    avatar_url: string | null;
    community_id?:number | null;
}

const createPost = async (post: PostInput, imageFile: File) => {

    const filePath = `${post.title} - ${Date.now()} - ${imageFile.name}`

    const { error: uploadError } = await supabase.storage.from("post-images").upload(filePath, imageFile)

    if (uploadError) throw new Error(uploadError.message);

    const { data: publicURLData } = supabase.storage.from("post-images").getPublicUrl(filePath)

    const { data, error } = await supabase.from("posts").insert({ ...post, image_url: publicURLData.publicUrl });

    if (error) throw new Error(error.message);

    return data;

};


export const CreatePost = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [communityId, setCommunityId] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { user } = useAuth()

    const { data: communities } = useQuery<Community[], Error>({
        queryKey: ["communities"],
        queryFn: fetchCommunities,
    });


    const { mutate, isPending, isError } = useMutation({
        mutationFn: (data: { post: PostInput, imageFile: File }) => {
            return createPost(data.post, data.imageFile);
        }
    })

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedFile) return;
        mutate({
            post: {
                title,
                content,
                avatar_url: user?.user_metadata.avatar_url || null,
                community_id:communityId,
            },
            imageFile: selectedFile
        });

    };

    const handleCommunityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCommunityId(value ? Number(value) : null);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    }

   return (
        <div className="py-10 px-3 sm:px-6 lg:px-8 min-h-screen  flex items-center justify-center">
            <div className="max-w-xl w-full mx-auto">
                <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-purple-500/20">
                    <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Crear nueva publicación
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-lg font-medium text-gray-200">
                                Título
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-gray-700/60 border-0 rounded-lg py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-purple-500/30 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                                required
                                placeholder="Título de tu publicación"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="block text-lg font-medium text-gray-200">
                                Contenido
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full bg-gray-700/60 border-0 rounded-lg py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-purple-500/30 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                                rows={5}
                                required
                                placeholder="Describe tu publicación..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="community" className="block text-lg font-medium text-gray-200">
                                Selecciona la Comunidad
                            </label>
                            <select 
                                id="community" 
                                onChange={handleCommunityChange}
                                className="w-full bg-gray-700/60 border-0 rounded-lg py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-purple-500/30 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-200"
                            >
                                <option value={""}> -- Escoge una comunidad -- </option>
                                {communities?.map((community, key) => (
                                    <option key={key} value={community.id}>
                                        {community.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="image" className="block text-lg font-medium text-gray-200">
                                Subir Imagen
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-700/30 border-purple-500/30 hover:bg-gray-700/50 hover:border-purple-500/50 transition duration-200">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 text-purple-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <p className="mb-1 text-sm text-gray-300">Haz clic para subir</p>
                                        <p className="text-xs text-gray-400">PNG, JPG, GIF hasta 10MB</p>
                                        {selectedFile && (
                                            <p className="mt-2 text-xs text-green-400 font-medium">
                                                Archivo seleccionado: {selectedFile.name}
                                            </p>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        required
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isPending || !selectedFile}
                                className="w-full relative overflow-hidden group bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-70"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                                <span className="relative flex items-center justify-center">
                                    {isPending ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creando...
                                        </>
                                    ) : (
                                        "Crear Publicación"
                                    )}
                                </span>
                            </button>
                        </div>
                        
                        {isError && (
                            <div className="mt-4 bg-red-900/40 text-red-200 p-4 rounded-lg border border-red-500/50">
                                <p className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    Error al crear el post
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};