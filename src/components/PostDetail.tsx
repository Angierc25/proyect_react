import { useQuery } from "@tanstack/react-query";
import type { Post } from "./PostList";
import { supabase } from "../supabase-client";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";
import { Clock, User, Tag } from "lucide-react";

interface Props {
  postId: number;
}

const fetchPostById = async (id: number): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);

  return data as Post;
};

export const PostDetail = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-purple-200 rounded mb-4"></div>
          <div className="h-48 w-full max-w-2xl bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full max-w-md bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-md">
        <div className="flex items-center">
          <div className="flex-shrink-0 text-red-500">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Error: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(data!.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="pt-10 max-w-4xl mx-auto px-4 pb-16">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="relative">
          <img
            src={data?.image_url}
            alt={data?.title}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6">
              <h2 className="text-4xl font-bold text-white mb-2">
                {data?.title}
              </h2>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              <span>Autor</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Tag size={16} className="mr-1" />
              <span>Categoría</span>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {data?.content}
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-6">
            <div className="flex items-center justify-center space-x-2">
              <LikeButton postId={postId} />
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <CommentSection postId={postId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};