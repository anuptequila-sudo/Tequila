"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const lines = sectionRef.current.querySelectorAll(".about-line");

      gsap.fromTo(
        lines,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section className="about-section" ref={sectionRef}>
      {/* Left 30% */}
      <div className="about-left">
        <h2 className="about-line">The Agency</h2>
        <span className="hero-text about-line">
         We built brands. We engineer experiences that think smart, feel right, and lead with purpose.
        </span>
        <div className="about-description">
            <p className="about-line">
         A "Creative Intelligence Studio" - an agency
          that not only designs and builds, but crafts brands with intellect, heart, and future-readiness. Not just aesthetic 
          designs or websites, but strategic experiences.
        </p>
         <Button variant="primary">Explore Services</Button>
        </div>
      </div>

      {/* Gap 20% */}
      <div className="about-gap"></div>

      {/* Right 40% */}
      <div className="about-right">
        <h4 className="about-line subtitle">We Choose Us</h4>
        <div className="about-grid">
          <div className="grid-item about-line">
            <h5 className="title">YEARS OF EXPERIENCE</h5>
            <p className="number">25+</p>
          </div>
          <div className="grid-item about-line">
            <h5 className="title">PROJECTS DELIVERED</h5>
            <p className="number">800+</p>
          </div>
          <div className="grid-item about-line">
            <h5 className="title">CLIENT RETENTTION RATE</h5>
            <p className="number">100%</p>
          </div>
          <div className="grid-item about-line">
            <h5 className="title">PROJECTS PER YEAR</h5>
            <p className="number">30+</p>
          </div>
        </div>
      </div>
    </section>
  );
}
