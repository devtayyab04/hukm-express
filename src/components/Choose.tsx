"use client";

import { useEffect, useRef, useState } from "react";
import { HiShieldCheck } from "react-icons/hi";
import { FiClock } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { GoLocation } from "react-icons/go";

interface Feature {
  icon: React.ElementType;
  title: string;
  urdu: string;
  desc: string;
}

export default function WhyChoose() {
  const features: Feature[] = [
    { icon: HiShieldCheck, title: "100% Reliable", urdu: "قابل اعتماد 100%", desc: "Professional service with guaranteed delivery" },
    { icon: FiClock, title: "Express Delivery", urdu: "تیز ڈیلیوری", desc: "Fast delivery options for urgent needs" },
    { icon: BiDollar, title: "Cash on Delivery", urdu: "ڈیلیوری پر رقم", desc: "Pay when you receive your order" },
    { icon: GoLocation, title: "Real-time Tracking", urdu: "ریل ٹائم ٹریکنگ", desc: "Track your order every step of the way" },
  ];

  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleFeatures((prev) => (!prev.includes(index) ? [...prev, index] : prev));
            }, index * 150);
          } else {
            setVisibleFeatures((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      const children = sectionRef.current.querySelectorAll(".feature");
      children.forEach((child) => observer.observe(child));
    }

    return () => {
      if (sectionRef.current) {
        const children = sectionRef.current.querySelectorAll(".feature");
        children.forEach((child) => observer.unobserve(child));
      }
    };
  }, []);

  return (
    <section className="py-10 sm:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900">Why Choose HukamExpress?</h2>
        {/* <p className="text-gray-600 mt-2 text-lg">کیوں حکم ایکسپریس کا انتخاب کریں؟</p> */}

        <div
          ref={sectionRef}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 mt-8 sm:mt-12"
        >
          {features.map((item, index) => {
            const IconComponent = item.icon;
            const isVisible = visibleFeatures.includes(index);
            return (
              <div
                key={index}
                data-index={index}
                className={`feature flex flex-col items-center text-center transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
              >
                <div className="text-4xl sm:text-5xl bg-blue-500 text-white p-5 sm:p-6 rounded-full shadow-md">
                  <IconComponent />
                </div>

                <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold">{item.title}</h3>
                {/* <p className="text-blue-600 font-medium mt-1">{item.urdu}</p> */}
                <p className="text-gray-600 mt-1 sm:mt-2 text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
