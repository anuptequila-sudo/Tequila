"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const videoWraRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  

    if (!containerRef.current) return;

    // THREE setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      1,
      1000
    );
    camera.position.z = 2.5;

   const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // enable alpha
renderer.setClearColor(0x000000, 0); // fully transparent

    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    // video texture
    const video = document.createElement("video");
    video.src = "/images/bannerv2.mp4";
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.play();

    const videoTexture = new THREE.VideoTexture(video);

    // geometry covers full hero-video
    const aspect =
      containerRef.current.clientWidth / containerRef.current.clientHeight;
    const geometry = new THREE.PlaneGeometry(aspect * 2, 2, 120, 120);

    const uniforms = {
      uTime: { value: 0 },
      uTexture: { value: videoTexture },
      uScroll: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        uniform float uTime;
        uniform float uScroll;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 newPosition = position;

          // smaller wave amplitude (was 0.08, now 0.04)
          float wave = sin((uv.y * 12.0 + uTime * 2.0)) * 0.03 * uScroll;
          newPosition.z += wave;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec2 vUv;

        void main() {
          vec4 color = texture2D(uTexture, vUv);
          gl_FragColor = color;
        }
      `,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

   // scroll animation
const scrollTL = gsap.timeline({
  scrollTrigger: {
    trigger: videoWraRef.current,
    start: "top 40%",
    end: "bottom 105%",
    scrub: 1.5,
  },
});

// wrapper width 70% → 100%
scrollTL.fromTo(
  videoWraRef.current,
  { width: "70%" },
  { width: "100%", ease: "power3.inOut" },
  0
);

// wave just once during that scroll
// scrollTL
//   .fromTo(uniforms.uScroll, { value: 0 }, { value: 1, duration: 1, ease: "power3.inOut" }, 0)
//   .to(uniforms.uScroll, { value: 0, duration: 1, ease: "power3.inOut" }, 1);


    // animate loop
    const clock = new THREE.Clock();
    function animate() {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // resize
    const onResize = () => {
      const width = containerRef.current!.clientWidth;
      const height = containerRef.current!.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <section className="hero" style={{ position: "relative", overflow: "hidden" }}>
      <div className="hero-wrapper">
        <div className="hero-left">
          <h1>
            An Award Winning <br />
            Branding and Web Design <br />
            Agency in Dubai. <span className="highlight hero-highlight"></span>
          </h1>
        </div>
        <div className="gap" />
        <div className="hero-middle">
          <span>
           We craft purposeful brand identities and engaging
digital experiences that connect, inspire, and perform
driven by insight, precision, and creativity.
          </span>
          <div className="hero-buttons">
            <Button variant="primary">Explore Services</Button>
            <Button variant="secondary">View Case Studies</Button>
          </div>
        </div>
      </div>

      {/* video wrapper */}
      <div
        className="hero-video relative overflow-hidden"
        ref={videoWraRef}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          zIndex: 1,
        }}
      >
        <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
      </div>
    </section>
  );
}
