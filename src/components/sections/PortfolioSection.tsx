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

    cards.forEach((card, i) => {
      const isEven = i % 2 === 0;

      // pivot like a wiper
      card.style.transformOrigin = "center bottom";

      gsap.fromTo(
        card,
        {
          x: isEven ? "-120%" : "120%",  // start OUTSIDE the section
          rotateZ: isEven ? -10 : 10,    // tilted like a wiper
          opacity: 0.4,
        },
        {
          x: "0%",
          rotateZ: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 50%",
            end: "bottom 40%",
            scrub: 1,
            // markers: true,
            toggleActions: "play reverse play reverse", // forward + reverse
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className={styles.portfolioSection} ref={sectionRef}>
      <div className={styles.headerWrapper}>
        <h2 className={styles.headerTitle}>What We've Built</h2>
        <div className={styles.headerGap}></div>
        <div className={styles.headerText}><span className="description-highlight-space"></span>
          We've teamed up with founders, innovators,
          and ambitious brands to create work that leads. From
          first spark to final screen - this is where strategy meets
          creative craft, with impact built in.
        </div>
      </div>

      <div className={`${styles.portfolioDetail} portfolioDetail`}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`${styles.portfolioCard} portfolioCard`}>
            <p className={styles.cardTag}>
              {i % 3 === 0
                ? "Mobile"
                : i % 2 === 0
                ? "Branding, Logo Design"
                : "Web App, Branding"}
            </p>
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
            <span className={styles.cardSubtitle}>
              {i % 2 === 0 ? "Scalable & Dynamic" : "Built for performance"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
