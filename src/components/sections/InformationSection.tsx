"use client";
import "@/styles/InformationSection.css";
import { useEffect, useRef } from "react";

export default function InformationSection() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  let lastScrollY = 0;

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let scrollPos = 0;

    const onScroll = () => {
      const currentY = window.scrollY;
      const direction = currentY > lastScrollY ? -1 : 1; // down = left (-1), up = right (+1)
      lastScrollY = currentY;

      scrollPos += direction * 0.13; // speed
      marquee.style.transform = `translateX(${scrollPos}px)`;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="information-section">
      <div className="information-header">
        <div className="information-header-band" ref={marqueeRef}>
          <div className="marquee-track">
            {Array(20)
              .fill(null)
              .map((_, i) => (
                <h2 key={i}>
                  WE{" "}
                  <img
                    className="information-header-band-image"
                    src="/images/heart.png"
                    alt="Heart"
                  />{" "}
                  TO EMPOWER BRANDS
                </h2>
              ))}
          </div>
        </div>
      </div>

      <div className="information-container">
        <video
          id="bgVideo"
          className="information-item-video"
          src="/images/what-we-do.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="information-item-first">
          <p className="information-header-description">Big Ideas Start with</p>
          <span className="information-header-description-span">
            Small Conversations
          </span>
        </div>
        <div className="information-item-second">
          <p className="information-header-contact">
            <a href="mailto:info@tequila.ae">info@tequila.ae</a>
          </p>
          <p className="information-header-contact">
            <a href="tel:+971509372493">+97150 937 2493</a>
          </p>
        </div>
      </div>
    </section>
  );
}
