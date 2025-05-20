import { Link } from "react-router"
import type { Post } from "./PostList"

interface Props {
    post: Post
}

export const PostItem = ({ post }: Props) => {
    return (
        <div className="relative group">
            {/* Improved gradient glow effect */}
            <div className="absolute -inset-1 rounded-[20px] bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-500 blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none"></div>
            
            <Link to={`/post/${post.id}`} className="block relative z-10">
                <div className="w-80 h-76 bg-[rgb(24,27,32)] border border-[rgb(84,90,106)] rounded-[20px] text-white flex flex-col p-5 overflow-hidden transition-all duration-300 group-hover:bg-gray-800 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:border-opacity-0">
                    {/* Header: Avatar and Title */}
                    <div className="flex items-center space-x-3">
                        {post.avatar_url ? (
                            <img
                                src={post.avatar_url}
                                alt="User Avatar"
                                className="w-[35px] h-[35px] rounded-full object-cover ring-2 ring-purple-500 ring-offset-2 ring-offset-[rgb(24,27,32)]"
                            />
                        ) : (
                            <div className="w-[35px] h-[35px] rounded-full bg-gradient-to-tl from-[#8A2BE2] to-[#491F70] ring-2 ring-purple-500 ring-offset-2 ring-offset-[rgb(24,27,32)]" />
                        )}
                        <div className="flex flex-col flex-1">
                            <div className="text-[20px] leading-[22px] font-bold mt-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400">
                                {post.title}
                            </div>
                        </div>
                    </div>
                    
                    {/* Image Banner with overlay */}
                    <div className="mt-3 flex-1 relative overflow-hidden rounded-xl">
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="h-40 w-full rounded-xl object-cover transform transition duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Interaction buttons with improved styling */}
                    <div className="flex justify-around items-center mt-3 pt-2 border-t border-gray-700/50">
                        <span className="cursor-pointer h-10 w-[60px] px-2 flex items-center justify-center font-extrabold rounded-lg hover:bg-pink-500/20 transition-colors duration-300">
                            <span className="text-lg transform group-hover:scale-110 transition-transform duration-300">❤️</span> 
                            <span className="ml-2 text-pink-100">{post.like_count ?? 0}</span>
                        </span>
                        <span className="cursor-pointer h-10 w-[60px] px-2 flex items-center justify-center font-extrabold rounded-lg hover:bg-purple-500/20 transition-colors duration-300">
                            <span className="text-lg transform group-hover:scale-110 transition-transform duration-300">💬</span> 
                            <span className="ml-2 text-purple-100">{post.comment_count ?? 0}</span>
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}