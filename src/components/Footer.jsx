const Footer = () => {
  return (
    <footer className="footer">
      <div className="nav-content" style={{ flexDirection: 'column', gap: '15px' }}>
        <h3 className="nav-brand" style={{ fontSize: '1.2rem' }}>GenCart</h3>
        <p>© {new Date().getFullYear()} GenCart. All rights reserved.</p>
        <p style={{ fontSize: '0.85rem' }}>
          As an Amazon Associate we earn from qualifying purchases.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
