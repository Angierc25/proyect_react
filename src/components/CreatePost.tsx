import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "../supabase-client";


interface PostInput{
    title: string;
    content:string;
}

const createPost= async (post: PostInput) => {
    const{data,error} = await supabase.from("posts").insert(post);

    if(error) throw new Error(error.message);

    return data;

};

export const CreatePost = () =>{
    const[title,setTitle] = useState<string>("");
    const[content,setContent] = useState<string>("");
    
    const{mutate} = useMutation({mutationFn: createPost })

    const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault();
        mutate({title, content})

    };

    return (
        <form onSubmit={handleSubmit}>
            {" "}
            <div>
                {" "}
                <label>Titulo</label>
                <input type="text" id="title" required  onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div>
                {" "}
                <label>Contenido</label>
                <textarea  id="content" required rows={5} onChange={(event) => setContent(event.target.value)}/>
            </div>
            <button type="submit"> Crear Publicacion </button>
        </form>
    )
}