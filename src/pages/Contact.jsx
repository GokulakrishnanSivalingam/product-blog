const Contact = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Contact Us</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        Have a question or a product suggestion? We'd love to hear from you.
      </p>

      <div style={{ 
        backgroundColor: 'var(--card-bg)', 
        padding: '40px', 
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="form-control" placeholder="Your Name" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" placeholder="your@email.com" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" className="form-control" placeholder="How can we help?" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" className="form-control" placeholder="Write your message here..." required></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
