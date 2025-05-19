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
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-slate-800/40 rounded-lg shadow-lg border border-white/10 space-y-6">
            <div>
                <label htmlFor="title" className="block mb-2 font-medium text-gray-200 text-sm tracking-wide">
                    Titulo
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-white/20 bg-slate-900/50 p-3 rounded-md focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition duration-200"
                    required
                />
            </div>

            <div>
                <label htmlFor="content" className="block mb-2 font-medium text-gray-200 text-sm tracking-wide">
                    Contenido
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full border border-white/20 bg-slate-900/50 p-3 rounded-md focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition duration-200"
                    rows={5}
                    required
                />
            </div>


            <div>
                <label> Selecciona la  Comunidad</label>
                <select id="community" onChange={handleCommunityChange}>
                    <option value={""}> -- Escoge una comunidad  -- </option>
                    {communities?.map((community, key) => (
                        <option key={key} value={community.id}>
                            {community.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="image" className="block mb-2 font-medium text-gray-200 text-sm tracking-wide">
                    Subir Imagen
                </label>
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-slate-800/30 transition duration-200">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="mb-1 text-sm text-gray-400">Haz clic para subir</p>
                            <p className="text-xs text-gray-400">PNG, JPG, GIF hasta 10MB</p>
                        </div>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-3 px-6 rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-300 transform hover:-translate-y-1 shadow-lg"
            >
                {isPending ? "Creando..." : "Crear Publicación"}
            </button>
            {isError && <p>Error al crear el post</p>}
        </form>
    )
}