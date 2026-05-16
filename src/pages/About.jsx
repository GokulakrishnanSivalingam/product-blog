const About = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>About Us</h1>
      <div style={{ 
        backgroundColor: 'var(--card-bg)', 
        padding: '40px', 
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        marginTop: '20px'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
          alt="Team working" 
          style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '30px' }} 
        />
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Our Mission</h2>
        <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>
          Welcome to FindsHub! We are passionate about discovering and sharing the most innovative, useful, and aesthetic products available online. Our team spends hours researching and testing to bring you curated lists of the absolute best finds.
        </p>
        <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>
          Whether you are looking to upgrade your kitchen, enhance your tech setup, or make your living space cozier, we have got you covered with honest recommendations.
        </p>
        
        <h2 style={{ fontSize: '1.5rem', marginTop: '30px', marginBottom: '15px' }}>Affiliate Disclosure</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          FindsHub is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in and Amazon.com. This means we may earn a small commission at no extra cost to you if you purchase through our links.
        </p>
      </div>
    </div>
  );
};

export default About;
