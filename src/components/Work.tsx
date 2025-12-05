"use client";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdLocalMall } from "react-icons/md";
import { FaPersonBiking, FaTruckFast } from "react-icons/fa6";
import { PiBicycleBold } from "react-icons/pi";
import { GiPublicSpeaker } from "react-icons/gi";
import { RiMotorbikeFill } from "react-icons/ri";

interface Step {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  bg: string;
}

export default function Work() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Order via WhatsApp",
      desc: "Send us your order details through WhatsApp",
      icon: <FaWhatsapp className="text-white z-10 text-[32px] md:text-[40px]" />,
      bg: "bg-blue-500",
    },
    {
      number: "02",
      title: "We Shop for You",
      desc: "Our team purchases your items with care",
      icon: <MdLocalMall className="text-white z-10 text-[32px] md:text-[40px]" />,
      bg: "bg-blue-500",
    },
    {
      number: "03",
      title: "Express Delivery",
      desc: "Fast delivery right to your doorstep",
      icon: <FaPersonBiking className="text-white z-10 text-[32px] md:text-[40px]" />,
      bg: "bg-blue-500",
    },
  ];

  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));

          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleSteps((prev) => {
                if (!prev.includes(index)) return [...prev, index];
                return prev;
              });
            }, index * 200);
          } else {
            setVisibleSteps((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      const children = sectionRef.current.querySelectorAll(".step");
      children.forEach((child) => observer.observe(child));
    }

    return () => {
      if (sectionRef.current) {
        const children = sectionRef.current.querySelectorAll(".step");
        children.forEach((child) => observer.unobserve(child));
      }
    };
  }, []);

  return (
    <section id="work" className="py-6 md:py-16 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-center">How It Works</h2>

      <div
        ref={sectionRef}
        className="relative grid md:grid-cols-3 gap-10 mt-10 px-6 md:px-20"
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step text-center relative flex flex-col items-center transition-all duration-700 transform ${visibleSteps.includes(index)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
            data-index={index}
          >
            {/* Number */}
            <p className="text-3xl md:text-4xl font-bold text-blue-400">{step.number}</p>

            {/* ICON + CONNECTING LINES */}
            <div className="relative mt-4 flex flex-col items-center">

              {/* Vertical Line (Mobile View) */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-full h-10 w-1 bg-blue-400 md:hidden -translate-x-1/2"></div>
              )}

              {/* Horizontal Line (Desktop View) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-20 h-1 bg-blue-400"></div>
              )}

              <div
                className={`${step.bg} w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-md`}
              >
                {step.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-semibold mt-4">{step.title}</h3>

            {/* Description */}
            <p className="text-gray-600 mt-1">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
