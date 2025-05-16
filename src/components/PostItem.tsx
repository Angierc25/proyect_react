import { Link } from "react-router"
import type { Post } from "./PostList"


interface Props {
    post: Post
}
export const PostItem = ({ post }: Props) => {
    return (
        <div className="group relative">
            {/* Hover gradient effect */}
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 blur transition duration-300 group-hover:opacity-70"></div>
            <Link to="/publicaciones" className="relative block z-10">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 p-4 text-white shadow-lg transition duration-300 group-hover:bg-gray-800">
                    {/* Header: Avatar and Title */}
                    <div className="mb-3 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center">
                            <span className="text-xs font-bold text-white opacity-80">
                                {post.title.substring(0, 2).toUpperCase()}
                            </span>
                        </div>
                        <h3 className="flex-1 truncate text-lg font-bold">{post.title}</h3>
                    </div>
                    {/*Image Banner */}
                    <div className="mt-2 flex-1">
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="h-40 w-full rounded-xl object-cover"
                        />
                    </div>
                </div>
            </Link>
        </div>
    )

}