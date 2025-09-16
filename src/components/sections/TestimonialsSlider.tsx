"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import styles from "@/styles/TestimonialsSlider.module.css";

export default function TestimonialsSlider() {
  const [popupVideo, setPopupVideo] = useState<string | null>(null);

  const testimonials = [
    {
      type: "video",
      src: "/images/bannerv2.mp4",
    },
    {
      type: "video",
      src: "/images/bannerv2.mp4",
    },
    {
      type: "text",
      title: "Exceptional Creativity and Professionalism!",
      desc: `Working with Team Tequila has been an absolutely incredible experience!
      From the very first interaction, it was evident that this team is not just
      about delivering web design services—they are brand creators who truly elevate
      your imagination.`,
      author: "RAVI KOTWANI",
      role: "CEO,",
      company: "XTASY",
      tag: "Premium Lingerie Brand",

    },
    {
      type: "video",
      src: "/images/bannerv2.mp4",
    },
    {
      type: "video",
      src: "/images/bannerv2.mp4",
    },
    {
      type: "text",
      title: "Exceptional Creativity and Professionalism!",
      desc: `Working with Team Tequila has been an absolutely incredible experience!
      From the very first interaction, it was evident that this team is not just
      about delivering web design services—they are brand creators who truly elevate
      your imagination.`,
      author: "RAVI KOTWANI",
      role: "XTASY",
      company: "XTASY",
      tag: "Premium Lingerie Brand",
    },
    {
      type: "video",
      src: "/images/bannerv2.mp4",
    },
     {
      type: "video",
      src: "/images/bannerv2.mp4",
    },
    {
      type: "video",
      src: "/images/bannerv2.mp4",
    },   
     {
      type: "text",
      title: "Exceptional Creativity and Professionalism!",
      desc: `Working with Team Tequila has been an absolutely incredible experience!
      From the very first interaction, it was evident that this team is not just
      about delivering web design services—they are brand creators who truly elevate
      your imagination.`,
      author: "RAVI KOTWANI",
      role: "XTASY",
      company: "XTASY",
      tag: "Premium Lingerie Brand",
    },
     {
      type: "video",
      src: "/images/bannerv2.mp4",
    },
     {
      type: "video",
      src: "/images/bannerv2.mp4",
    },
     {
      type: "video",
      src: "/images/bannerv2.mp4",
    },
     {
      type: "video",
      src: "/images/bannerv2.mp4",
    }
  ];

  return (
    <section className={styles.wrapper}>
          {/* Left Side */}
          <div className={styles.groupOne}>
            <h2>CLIENT LOVE</h2>
            <span  className={styles.spandescription}>
              <span className="description-highlight-space"></span> Partnerships that last, stories
  that resonate-from clients and partners
  turned brand ambassadors.
              </span>
          </div>
           <div className={styles.gap}></div>
      <div className={styles.wrapper}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={4}
          navigation={{
            nextEl: `.${styles.nextBtn}`,
            prevEl: `.${styles.prevBtn}`,
          }}
          loop={true}
          className={styles.swiper}
        >
          {testimonials.map((item, idx) => (
            <SwiperSlide
              key={idx}
              className={`${styles.slide} ${item.type === "text" ? styles.doubleSlide : ""}`}
            >
              {item.type === "video" ? (
                <video
                  className={styles.video}
                  src={item.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  onClick={() => setPopupVideo(item.src ?? null)}
                />
              ) : (
                <div className={styles.textBox}>
                  <span className={styles.testiDescriptionHighlight}>"{item.title}"</span>
                  <p  className={styles.testiDescriptiontext}>{item.desc}</p>
                  <p>
                    {item.author}
                  </p>
                  <p className={styles.roletesti}>
                    {item.role},  {item.company}
                  </p> 
                  <p className={styles.tag}>{item.tag}</p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <div className={styles.navBtns}>
          <button className={styles.prevBtn}>{"⟵"}</button>
          <button className={styles.nextBtn}>{"⟶"}</button>
        </div>

        {popupVideo && (
          <div className={styles.popup}>
            <div className={styles.popupInner}>
              <button className={styles.closeBtn} onClick={() => setPopupVideo(null)}>
                ✕
              </button>
              <video src={popupVideo} controls autoPlay className={styles.popupVideo} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
