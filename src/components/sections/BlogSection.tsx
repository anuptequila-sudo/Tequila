"use client";
import "@/styles/BlogsSection.css";
import Button from "../ui/Button";


export default function BlogSection() { 

  return (
    <section className="blogs-section">
      <div className="blogs-header">
        <h2 className="blogs-header-title">What we've Built</h2>
        <p className="blogs-header-description">
            <span className="description-highlight-space"></span>
         We've teamed up with founders, innovators,
and ambitious brands to create work that leads. From
first spark to final screen - this is where strategy meets
creative craft, with impact built in.
        </p>
      </div>

        <div className="blogs-container">
            <div className="blogs-list">
                <div className="blogs-item">
                    <p className="blogs-year">2024</p>
                    <span className="blogs-title">The Seven Pillars of Building a premium Brand in UAE</span>
                    <div className="blogs-image-container">
                        <div className="blogs-details">                    
                            <p className="blogs-tag">BRANDING, BUSINESS</p>                    
                        </div>
                        <img src="/images/blog1.png" alt="Blog 1" className="blogs-image" />
                    </div>                    
                </div>

                <div className="blogs-item">
                    <p className="blogs-year">2024</p>
                    <span className="blogs-title">The Seven Pillars of Building a premium Brand in UAE</span>
                    <div className="blogs-image-container">
                        <div className="blogs-details">                    
                            <p className="blogs-tag">BRANDING</p>                    
                        </div>
                        <img src="/images/blog2.png" alt="Blog 1" className="blogs-image" />
                    </div>                    
                </div>
            </div>
        </div>
        <div className="blogs-button-container">
           <div className="blogs-button">
            <Button variant="primary">Explore Services</Button>
           </div>
           
        </div>

    
    </section>
  );
}
