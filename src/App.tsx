import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { CreatePostPage } from './pages/CreatePostPage';
import { PostPage } from './pages/PostPage';
import { CreateCommunity } from './components/CreateCommunity';
import { CommunitiesPage } from './pages/CommunitiesPage';

function App() {
  return (
    <div className="min-h-screen bg-black text-gray-100 transition-opacity duration-700 pt-20">
      <Navbar/> 
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/crear" element={<CreatePostPage /> } />
          <Route path="/post/:id" element={<PostPage /> } />
          <Route path="/comunidad/crear" element={<CreateCommunity /> } />
          <Route path="/comunidades" element={<CommunitiesPage /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App
