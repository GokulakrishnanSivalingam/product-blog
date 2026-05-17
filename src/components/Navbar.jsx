import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-brand">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={24} color="var(--primary)" />
            GenCart
          </span>
        </Link>
        
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className={isActive('/')} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/blog" className={isActive('/blog')} onClick={() => setIsOpen(false)}>products</Link>
          <Link to="/products" className={isActive('/products')} onClick={() => setIsOpen(false)}>blogs</Link>
          <Link to="/about" className={isActive('/about')} onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className={isActive('/contact')} onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
