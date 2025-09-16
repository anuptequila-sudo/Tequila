"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "@/styles/AwardsSection.css";

const awards = [
  { year: "2025", company: "Clutch", title: "Top Branding Agency", image: "/images/awards1.png" },
  { year: "2024", company: "Sortlist", title: "Best Logo Design", image: "/images/awards1.png" },
  { year: "2024", company: "Awwwards", title: "UI/UX Excellence", image: "/images/awards1.png" },
  { year: "2023", company: "DesignRush", title: "Creative Agency Award", image: "/images/awards1.png" },
  { year: "2022", company: "Behance", title: "Featured Project", image: "/images/awards1.png" },
  { year: "2021", company: "GoodFirms", title: "Top Web Development", image: "/images/awards1.png" },
  { year: "2021", company: "Dribbble", title: "Inspiration Pick", image: "/images/awards1.png" },
];

export default function AwardsSection() {
  const highlightRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredIndex !== null && highlightRef.current) {
      const hoveredRow = document.querySelectorAll(".award-row")[hoveredIndex] as HTMLElement;

      if (hoveredRow) {
        const rowBounds = hoveredRow.getBoundingClientRect();
        const containerBounds = hoveredRow.parentElement!.getBoundingClientRect();

        gsap.to(highlightRef.current, {
          y: rowBounds.top - containerBounds.top,
          height: rowBounds.height,
          opacity: 1,
          backgroundColor: "#fff",
          borderBottom: "1px solid #000",
          duration: 0.3,
          ease: "power3.out",
        });
      }
    } else {
      gsap.to(highlightRef.current, {
        opacity: 0,
        duration: 0.3,
        backgroundColor: "transparent",
        borderBottom: "1px solid #fff",
      });
    }
  }, [hoveredIndex]);

  return (
    <section className="awards-section">
      <div className="awards-header">
        <h2 className="awards-header-title">Honours & Mentions</h2>
        <p className="awards-header-description">
            <span className="awards-header-description-highlight"></span>
         Built to stand out, always. Our work is driven
by bold ideas, shaped with purpose, and designed to
leave a mark - not blend in. With years of experience
behind us and bold thinking at our core, we've earned
recognition for work that consistently challenges the
norm and delivers with impact.
        </p>
      </div>

      <div className="awards-list">
        <div className="highlight" ref={highlightRef}></div>
        {awards.map((award, index) => (
          <div
            key={index}
            className={`award-row ${hoveredIndex === index ? "active" : ""}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="year">{award.year}</div>
            <div className="company">{award.company}</div>
            <div className="title">{award.title}</div>
            <div className="image-container">
              <img src={award.image} alt={award.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
