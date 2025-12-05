"use client";
import React, { useEffect, useState } from "react";

function Hero() {
  const [show, setShow] = useState({
    title: false,
    description: false,
    image: false,
  });

  const [descIndex, setDescIndex] = useState(0);

  const descriptionLines = [
    "نہ بازار کی دھکم پیل",
    "نہ کورئیر کا 3 دن تک انتظار",
  ];

  // Main animations (Top → Bottom)
  useEffect(() => {
    const timers = [
      setTimeout(() => setShow((p) => ({ ...p, title: true })), 300),
      setTimeout(() => setShow((p) => ({ ...p, description: true })), 900),
      setTimeout(() => setShow((p) => ({ ...p, image: true })), 2000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Reveal description lines one by one
  useEffect(() => {
    if (!show.description) return;

    let interval = setInterval(() => {
      setDescIndex((prev) => {
        if (prev < descriptionLines.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [show.description]);

  return (
    <section
      id="home"
      className="
        relative w-full 
        min-h-[60vh] 
        sm:min-h-[80vh] 
        md:min-h-[100vh]
        flex flex-col justify-center items-center
        px-4 sm:px-6 md:px-10
      "
      style={{
        backgroundImage: "url('/images/bg3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1e88e5]/80"></div>

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-3xl mx-auto space-y-6 sm:space-y-8 px-2">

        {/* Title */}
        <h1
          className={`
            text-3xl sm:text-5xl md:text-6xl 
            font-bold text-orange-500 
            transition-all duration-1000
            ${show.title ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-11"}
          `}
        >
          !آپ کا حکم….. ہم حاضر
        </h1>

        {/* Description */}
        <div
          className={`
            text-white text-lg sm:text-2xl md:text-3xl 
            font-medium leading-relaxed space-y-2 
            transition-all duration-1000
            ${show.description ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-11"}
          `}
        >
          {descriptionLines.slice(0, descIndex + 1).map((line, i) => (
            <p key={i} className="transition-opacity duration-500 opacity-100">
              {line}
            </p>
          ))}
        </div>

        {/* Image */}
        <div
          className={`
            flex justify-center 
            transition-all duration-1000
            ${show.image ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-11"}
          `}
        >
          <img
            src="/images/text1.png"
            alt="text graphic"
            className="w-52 sm:w-72 md:w-96"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;
