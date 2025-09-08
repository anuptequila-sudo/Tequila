"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "@/styles/PortfolioSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
  if (!sectionRef.current) return;

  const wrapper = sectionRef.current.querySelector(".portfolioDetail") as HTMLElement;
  if (!wrapper) return;

  const cards = Array.from(wrapper.querySelectorAll(".portfolioCard")) as HTMLElement[];
  if (!cards.length) return;

  sectionRef.current.style.perspective = "2000px";
  wrapper.style.transformStyle = "preserve-3d";

  cards.forEach((card) => {
    card.style.transformOrigin = "center center";
  });

  const setters = cards.map((card) => ({
    y: gsap.quickTo(card, "y", { duration: 0.4, ease: "sine.out" }),
    rotateX: gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "sine.out" }),
    z: gsap.quickTo(card, "z", { duration: 0.4, ease: "sine.out" }),
  }));

  const updateCards = () => {
    const viewportHeight = window.innerHeight;
    const now = performance.now();

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const relY = rect.top / viewportHeight; // 0 = top, 1 = bottom

      // Stronger curls
      const topCurl = relY < 0.1 ? -60 * (0.1 - relY) : 0;   // bigger top curl
      const bottomCurl = relY > 0.9 ? 60 * (relY - 0.9) : 0; // bigger bottom curl

      // Middle bulge (bottle effect)
      const middleBend = Math.sin(relY * Math.PI) * 40; // bigger bulge

      // Z displacement for cylinder depth
      const zDepth = Math.sin(relY * Math.PI) * 100; // exaggerate depth

      // Subtle wave oscillation (cloth effect)
      const waveY = Math.sin(now / 600 + relY * Math.PI) * 6;

      // Apply transforms
      setters[i].y(waveY);
      setters[i].rotateX(topCurl + bottomCurl + middleBend);
      setters[i].z(zDepth);
    });
  };

  window.addEventListener("scroll", updateCards);
  window.addEventListener("resize", updateCards);

  updateCards();

  return () => {
    window.removeEventListener("scroll", updateCards);
    window.removeEventListener("resize", updateCards);
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}, []);



  return (
    <section className={styles.portfolioSection} ref={sectionRef}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerTitle}>What We've Built</div>
        <div className={styles.headerGap}></div>
        <div className={styles.headerText}>
          We've teamed up with founders, innovators, and ambitious brands to create work that leads.
        </div>
      </div>

      <div className={`${styles.portfolioDetail} portfolioDetail`}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`${styles.portfolioCard} portfolioCard`}>
            <span className={styles.cardTag}>
              {i % 3 === 0
                ? "Mobile"
                : i % 2 === 0
                ? "Branding, Logo Design"
                : "Web App, Branding"}
            </span>
            <div
              className={styles.videoWrapper}
              style={{ height: i % 2 === 0 ? "50rem" : "34rem" }}
            >
              <video
                src="/images/bannerv2.mp4"
                autoPlay
                muted
                loop
                playsInline
                className={styles.video}
              />
            </div>
            <h3 className={styles.cardTitle}>
              {i % 2 === 0 ? "Next Gen App" : "Creative Platform"}
            </h3>
            <p className={styles.cardSubtitle}>
              {i % 2 === 0 ? "Scalable & Dynamic" : "Built for performance"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
