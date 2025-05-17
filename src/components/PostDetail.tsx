import { useQuery } from "@tanstack/react-query";
import type { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { LikeButton } from "./LikeButton";


interface Props {
    postId: number;
}
 
const fetchPostById = async (id:number): Promise<Post> =>{
    const{data,error} =  await supabase
    .from("posts")
    .select("*")
    .eq("id",id)
    .single();
    if(error) throw new Error(error.message)
    
        return data as Post;
};
 
 export const PostDetail = ({postId} : Props) => {
     const {data, error,isLoading} = useQuery<Post, Error>({
        queryKey: ["post",postId],
        queryFn:() => fetchPostById(postId),
    });

    if(isLoading){
     return <div>Cargando Contenido</div>;
    }

    if(error){
        return <div>Error:{error.message}</div>
    }
      
     return( 
     <div className="pt-10 max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-purple-600 mb-4">{data?.title}</h2>
      <img 
        src={data?.image_url} 
        alt={data?.title} 
        className="w-full h-auto rounded-lg shadow-md mb-6"
      />
      <p className="text-white-700 leading-relaxed mb-4">{data?.content}</p>
      <p className="text-sm text-gray-500 italic">
        Posted on: {new Date(data!.created_at).toLocaleDateString()}
      </p>

       <LikeButton postId={postId} />
      
    </div>
     );
 };