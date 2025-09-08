"use client";

import { useState } from "react";
import styles from "@/styles/FaqsSection.module.css";
import Button from "../ui/Button";

interface Faq {
  question: string;
  answer: string;
}

export default function FaqsSection() {
  const faqs: Faq[] = [
    { question: "What is a responsive web design, and why is it crucial for my Dubai website?",
      answer: "Responsive design ensures your website looks and functions well on all devices including mobiles and tablets, which is critical for user experience and SEO." },
    { question: "What is SEO, and how can it benefit my Dubai business?",
      answer: "SEO helps your website rank higher in search engines, increasing visibility, traffic, and potential sales." },
    { question: "What kind of website maintenance services do you offer in Dubai?",
      answer: "We provide updates, backups, security monitoring, and ongoing improvements to keep your site running smoothly." },
    { question: "Do you provide creative design contract services in Dubai?",
      answer: "Yes, we offer tailored design services including brand identity, creative campaigns, and design retainers." },
    { question: "Do you offer e-commerce website development services in Dubai?",
      answer: "Absolutely, we develop scalable and user-friendly e-commerce platforms to drive sales." },
    { question: "Why should I choose Tequila as my branding and web design partner in Dubai?",
      answer: "Because we combine creativity, strategy, and technology to build impactful brands." },
    { question: "Do you do logo design in Dubai, and how is it different from branding?",
      answer: "Logo design is a part of branding. Branding defines your company’s overall identity while a logo is a visual mark." },
    { question: "What is brand identity, and why is it important for my business?",
      answer: "Brand identity makes your business recognizable and builds trust with your audience." },
    { question: "How much does it cost to create a new brand identity or rebrand my current business?",
      answer: "The cost varies depending on scope. A simple refresh is more affordable than a full rebrand. At Tequila, we offer customized packages to fit budgets and goals." },
    { question: "What are the key elements of a successful website design in Dubai?",
      answer: "Good UX, SEO-friendly code, responsive design, and strong branding elements are key." },
    { question: "How long does it take to design and develop a website in Dubai?",
      answer: "It depends on complexity. Standard corporate websites take 4–6 weeks, e-commerce takes longer." }
  ];

  const [activeIndex, setActiveIndex] = useState(8); // open 9th (0-based index)

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className={styles.wrapper}>
      {/* Left Side */}
      <div className={styles.groupOne}>
        <h2>FAQ</h2>
        <h4>
         <span className="description-highlight-space"></span> Got questions about branding & web design? We’ve answered the most
          common ones right here for you.
        </h4>
        <Button variant="primary">CONTACT US →</Button>
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Right Side */}
      <div className={styles.faqsDiv}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${
              activeIndex === index ? styles.active : ""
            }`}
            onClick={() => toggleFaq(index)}
          >
            <div className={styles.faqQuestion}>
              <span>{faq.question}</span>
              <span className={styles.arrow}>
                {activeIndex === index ? "∧" : "∨"}
              </span>
            </div>
            {activeIndex === index && (
              <div className={styles.faqAnswer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

