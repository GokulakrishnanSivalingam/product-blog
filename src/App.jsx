import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Products from './pages/Products';
import CollectionDetail from './pages/CollectionDetail';
import { BlogProvider } from './context/BlogContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';


function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <ScrollToTop />
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/products" element={<Products />} />
              <Route path="/collection/:id" element={<CollectionDetail />} />
              
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
