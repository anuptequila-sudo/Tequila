
const Button = ({ label, onClick }: { label: string; onClick?: () => void }) => {
  return (
    <button className="cta-btn footer-btn" onClick={onClick}>
      {label}
    </button>
  );
};

export default function Footer() {
  return (
    <footer className="footer">
  <div className="footer-group footer-left">
    <img src="/images/Logo.svg" alt="Logo" className="footer-logo" />

    <p className="footer-address">
      A904, Tamani Arts, Business <br /> Bay, Downtown Dubai, UAE
    </p>

<Button label="Get Direction →" />

    <p className="footer-text">Lots to talk? Then call us!</p>
    <p className="footer-phone">+971 50 937 2493</p>
  </div>

  <div className="footer-group footer-middle">
    <div className="footer-menu">
      <h4>WEB DESIGN & DEVELOPMENT</h4>
      <ul>
        <li>Custom Website Design & Development</li>
        <li>E-Commerce Website Design & Development</li>
        <li>Web Applications Design & Development</li>
        <li>Domain & Hosting Management</li>
        <li>Website Maintenance & Support</li>
      </ul>
    </div>

    <div className="footer-menu">
      <h4>BRANDING</h4>
      <ul>
        <li>Logo Design & Visual Identity</li>
        <li>Rebranding</li>
        <li>Brand Elevation</li>
        <li>Graphic Design</li>
        <li>Corporate Profile & Company Brochure</li>
        <li>UI/UX Design</li>
      </ul>
    </div>

    <div className="footer-menu">
      <h4>COMMUNICATION</h4>
      <ul>
        <li>Social Media Strategy & Design</li>
        <li>SEO</li>
        <li>Photography & Visual Storytelling</li>
        <li>Video Storyboarding & Production</li>
      </ul>
    </div>
  </div>

  <div className="footer-group footer-right">
    <div className="footer-col">
      <h4>QUICK LINKS</h4>
      <ul>
        <li>Home</li>
        <li>Cases</li>
        <li>Services</li>
        <li>Culture</li>
        <li>Blog</li>
        <li>Contact</li>
      </ul>
    </div>

    <div className="footer-col">
      <h4>SOCIALS</h4>
      <ul>
        <li>Instagram</li>
        <li>LinkedIn</li>
        <li>Facebook</li>
      </ul>
    </div>
  </div>
</footer>
  );
}



