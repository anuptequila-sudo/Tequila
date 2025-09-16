"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/styles/ServicesSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // ---- GSAP reveal (unchanged) ----
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.card}`,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    // ---- Build SVG masks for each card ----
    const svgNS = "http://www.w3.org/2000/svg";

    const rebuildMaskForCard = (card: HTMLElement, idx: number) => {
      // ensure an SVG overlay exists
      let svg = card.querySelector<SVGSVGElement>("svg[data-card-overlay]");
      if (!svg) {
        svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("data-card-overlay", "true");
        svg.setAttribute("class", styles.cardMaskSvg);
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("preserveAspectRatio", "none");
        card.insertBefore(svg, card.firstChild);
      }

      // clear SVG
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const maskId = `card-mask-${idx}`;

      // defs + mask root (white = keep; black = hole)
      const defs = document.createElementNS(svgNS, "defs");
      const mask = document.createElementNS(svgNS, "mask");
      mask.setAttribute("id", maskId);

      // base keep-all (white)
      const base = document.createElementNS(svgNS, "rect");
      base.setAttribute("x", "0");
      base.setAttribute("y", "0");
      base.setAttribute("width", "100%");
      base.setAttribute("height", "100%");
      base.setAttribute("fill", "white");
      mask.appendChild(base);
      defs.appendChild(mask);
      svg.appendChild(defs);

      // white rectangle that will use the mask (this is the card background)
      const bg = document.createElementNS(svgNS, "rect");
      bg.setAttribute("x", "0");
      bg.setAttribute("y", "0");
      bg.setAttribute("width", "100%");
      bg.setAttribute("height", "100%");
      bg.setAttribute("fill", "rgba(255,255,255,1)"); // white card
      bg.setAttribute("mask", `url(#${maskId})`);
      svg.appendChild(bg);

      // helpers to convert px to the SVG's 0..100 viewBox space
      const cardRect = card.getBoundingClientRect();
      const toX = (px: number) => (px / cardRect.width) * 100;
      const toY = (px: number) => (px / cardRect.height) * 100;

      // ---- add capsule holes for tag + pills ----
      const capsuleTargets = card.querySelectorAll<HTMLElement>(
        `.${styles.tag}.${styles.cutout}, .${styles.pills} .${styles.cutout}`
      );

      capsuleTargets.forEach((el) => {
        const r = el.getBoundingClientRect();
        const x = toX(r.left - cardRect.left);
        const y = toY(r.top - cardRect.top);
        const w = toX(r.width);
        const h = toY(r.height);

        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", `${x}`);
        rect.setAttribute("y", `${y}`);
        rect.setAttribute("width", `${w}`);
        rect.setAttribute("height", `${h}`);
        if (!el.classList.contains(styles.tag)) {
          rect.setAttribute("rx", `${Math.min(w, h) / 2}`);
        }
        rect.setAttribute("fill", "black"); // black = hole
        mask.appendChild(rect);
      });

      // ---- big text: punch the LETTER shapes as holes ----
  const big = card.querySelector<HTMLElement>(`.${styles.bigText}.${styles.cutout}`);
if (big) {
  const font = window.getComputedStyle(big);
  const text = (big.textContent || "").trim();

  const bigRect = big.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  const bx = toX(bigRect.right - cardRect.left);
  const by = toY(bigRect.top - cardRect.top + bigRect.height);

  // --- Create SVG cutout text ---
  const textEl = document.createElementNS(svgNS, "text");
  textEl.setAttribute("text-anchor", "end");
  textEl.setAttribute("x", `${bx}`);
  textEl.setAttribute("y", `${by}`);
  textEl.setAttribute("fill", "black");
  textEl.setAttribute("font-family", font.fontFamily);
  textEl.setAttribute("font-size", font.fontSize);
  textEl.setAttribute("font-weight", font.fontWeight);
  textEl.setAttribute("dominant-baseline", "alphabetic");
  textEl.textContent = text;
  mask.appendChild(textEl);

   // ---- now measure the actual hole (mask text element) ----
  const bbox = textEl.getBBox(); // SVG bbox of the cutout text

  // ---- position caption relative to that hole ----
  const caption = card.querySelector<HTMLElement>(`.${styles.caption}`);

  if (caption) {

    caption.style.position = "absolute";
    // caption.style.textAnchor = "end";
    caption.style.right = `${ ( bx + bbox.x ) / 100  + 5.5 * bbox.width}px`; // just to the right of hole
    caption.style.bottom = `${ by + bbox.y - bbox.height - 20}px`; // aligned with hole's top
    caption.style.fontSize = "14px";
    caption.style.color = "#cecece";
    caption.style.whiteSpace = "nowrap";
  }
}




      
    };

    const cards = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>(`.${styles.card}`)
    );

    const rebuildAll = () => {
      cards.forEach((card, i) => rebuildMaskForCard(card, i));
    };

    // Rebuild once layout/ fonts are ready
    const raf = requestAnimationFrame(rebuildAll);
    (document as any).fonts?.ready?.then(rebuildAll).catch(() => {});

    // Resize observer to keep holes aligned responsively
    const ro = new ResizeObserver(rebuildAll);
    cards.forEach((c) => ro.observe(c));

    window.addEventListener("resize", rebuildAll);

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", rebuildAll);
    };
  }, []);

  return (
    <section className={styles.servicesSection} ref={sectionRef}>
      {/* Level 1: Background Video */}
      <video
        id="bgVideo"
        className={styles.bgVideo}
        src="/images/what-we-do.mp4"
        autoPlay
        muted
        loop
        playsInline
      />


      <div className={styles.servicesSectionHeadingContainer}>
        <h3 className={styles.servicesSectionHeading}>Tailored for Bold Brands</h3>
        <span className={styles.servicesSectionHeroHeading}><span className={styles.spaceparagraph}></span>We help your brand show up smarter, sharper, and stronger at every touchpoint.</span>
      </div>

      <div className={styles.overlay}>
        {/* Card 1 */}
        <div className={styles.card}>
          {/* SVG (level 2 background) is injected by JS */}
          <div className={styles.insidecard}>
            <p className={`${styles.tag} ${styles.cutout}`}>
              TEQNOLOGY
            </p>

            <h2>Web Design & Development</h2>
            <p className={styles.paragraph}>
              Building your digital headquarters — websites that think smart, and
              feel right.
            </p>

            <div className={styles.pills}>
              <p className={styles.cutout}>Custom Website Design & Development</p>
              <p className={styles.cutout}>Domain & Hosting Management</p>
              <p className={styles.cutout}>Ecommerce Website Design</p>
              <p className={styles.cutout}>Website Maintenance</p>
              <p className={styles.cutout}>Web Applications</p>
            </div>

            
          </div>
          {/* bigText is measured and then used to punch letter holes */}
            <div className={styles.bigTextContainer}>
              <p className={styles.caption}>(technology)</p>
              <span className={`${styles.bigText} ${styles.cutout}`} aria-hidden="true">
                TEQ
              </span>
            </div>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <div className={styles.insidecard}>
            <p className={`${styles.tag} ${styles.cutout}`}>IDENTITY & DESIGN</p>
            <h2>Branding</h2>
            <p className= {styles.paragraph}>
              Crafting strategic brands with purpose, clarity, and emotion —
              built to lead everywhere.
            </p>
            <div className={styles.pills}>
              <p className={styles.cutout}>Logo & Visual Identity</p>
              <p className={styles.cutout}>Brand Strategy</p>
              <p className={styles.cutout}>Rebranding</p>
              <p className={styles.cutout}>UI/UX Design</p>
              <p className={styles.cutout}>Corporate Profile</p>
              <p className={styles.cutout}>Graphic Design</p>
            </div>
          </div>
            <div className={styles.bigTextContainer}>
              <p className={styles.caption}>(user interface)</p>
              <span className={`${styles.bigText} ${styles.cutout}`} aria-hidden="true">
                UI
              </span>              
            </div>
        </div>

        {/* Card 3 */}
        <div className={styles.card}>
          <div className={styles.insidecard}>
            <p className={`${styles.tag} ${styles.cutout}`}>VISUAL STORYTELLING</p>
            <h2>Communication</h2>
            <p className={styles.paragraph}>Elevating your brand&apos;s social presence with strategy &amp; design.</p>
            <div className={styles.pills}>
              <p className={styles.cutout}>Video Storyboarding</p>
              <p className={styles.cutout}>Photography</p>
              <p className={styles.cutout}>Social Media Strategy</p>
              <p className={styles.cutout}>SEO</p>
            </div>
          </div>
            <div className={styles.bigTextContainer}>
               <p className={styles.caption}>(la la land)</p>
              <span className={`${styles.bigText} ${styles.cutout}`} aria-hidden="true">
                LA
              </span>              
            </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
