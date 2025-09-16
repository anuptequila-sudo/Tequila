"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import "../../styles/header.css";

const menuItems = [
  { key: "home", label: "Home", href: "#" },
  { key: "case-studies", label: "Case Studies", href: "#" },
  { key: "what-we-do", label: "What we do" }, // has dropdown
  { key: "the-agency", label: "The agency", href: "#" },
  { key: "insights", label: "Insights", href: "#" },
  { key: "faq", label: "FAQ", href: "#" },
  { key: "contact", label: "Contact", href: "#" },
];


const Button = ({ label, onClick }: { label: string; onClick?: () => void }) => {
  return (
    <button className="cta-btn" onClick={onClick}>
      {label}
    </button>
  );
};

export default function Header() {
  const [dark, setDark] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.setAttribute("data-theme", !dark ? "dark" : "light");
  };

  // Show sticky header when scrolled past main header
  useEffect(() => {
    const handleScroll = () => {
      setStickyVisible(window.scrollY > 150); // adjust threshold as needed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main Header */}
      <header className="header">
        <div className="container">
          <div className="logo-wrapper">
            <div className="logo">
              <img src="/images/Logo.svg" alt="Logo" />
            </div>
          </div>
          <div className="right-wrapper">
            <nav className="menu">
              <ul>
                <li><Link href="/">Case Studies</Link></li>
                <li><Link href="/about">What We Do</Link></li>
                <li><Link href="/services">The Agency</Link></li>
                <li><Link href="/contact">Insights</Link></li>
                <li><Link href="/contact">FAQ</Link></li>
              </ul>
            </nav>
            <div className="cta-wrapper">
              <Button label="Get In Touch" />
              <button className="toggle-btn" onClick={toggleTheme}>
                {dark ? "🌙" : "☀️"}
              </button>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer">
                <FaPhone className="phone-icon" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Mirror Header */}
      {stickyVisible && (
        <header className={`sticky-header ${dark ? "dark" : "light"}`}>
          <div className="sticky-container">
            {/* Logo */}
            {/* <div className="sticky-logo" style={{ width: "5%" }}>
              <img src="/images/Logo.svg" alt="Logo" />
            </div> */}

            {/* Menu */}
            <nav className="sticky-menu">
              <ul>
                {menuItems.map((item) => (
                  <li key={item.key} className={item.label === "What we do" ? "has-dropdown" : ""}>
                    {item.href ? <Link href={item.href}>{item.label}</Link> : <a>{item.label}</a>}

                    {/* Dropdown for What we do */}
                    {item.label === "What we do" && (
                      <div className="dropdown">
                        <div className="dropdown-columns">
                         <div className="sticky-sub-group sticky-sub-middle">
    <div className="sticky-sub-menu">
      <h4>WEB DESIGN & DEVELOPMENT</h4>
      <ul>
        <li>Custom Website Design & Development</li>
        <li>E-Commerce Website Design & Development</li>
        <li>Web Applications Design & Development</li>
        <li>Domain & Hosting Management</li>
        <li>Website Maintenance & Support</li>
      </ul>
    </div>

    <div className="sticky-sub-menu">
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

    <div className="sticky-sub-menu">
      <h4>COMMUNICATION</h4>
      <ul>
        <li>Social Media Strategy & Design</li>
        <li>SEO</li>
        <li>Photography & Visual Storytelling</li>
        <li>Video Storyboarding & Production</li>
      </ul>
    </div>
  </div>
                         
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
      )}
    </>
  );
}
