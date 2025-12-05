"use client";

import React, { useEffect, useRef, useState } from "react";
import { LuPizza, LuShirt } from "react-icons/lu";
import { BiCapsule } from "react-icons/bi";
import { BsCake2 } from "react-icons/bs";
import { IoRestaurant, IoDocumentOutline, IoGiftOutline } from "react-icons/io5";
import { FaHouse, FaMobileScreenButton } from "react-icons/fa6";
import { FiTool } from "react-icons/fi";
import { MdPets, MdOutlineLocalGroceryStore } from "react-icons/md";
import { GiHairStrands } from "react-icons/gi";
import { AiOutlineGift } from "react-icons/ai";

const services = [
  // 12 original + 6 new cards
  {
    title: "Food & Beverages",
    urdu: "کھانا اور کھانے",
    desc: "Fresh meals delivered fast",
    iconBg: "bg-gradient-to-br from-orange-500 to-orange-400",
    icon: LuPizza,
  },

  {
    title: "Medicine & Healthcare",
    urdu: "دوائیاں اور صحت",
    desc: "Urgent medical supplies",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-400",
    icon: BiCapsule,
  },
  {
    title: "Groceries & Daily Needs",
    urdu: "گروسری اور روزمرہ",
    desc: "Daily essentials delivered",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-400",
    icon: BiCapsule,
  },
  {
    title: "Documents & Parcels",
    urdu: "دستاویزات اور پارسل",
    desc: "Safe document delivery",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-400",
    icon: IoDocumentOutline,
  },
  {
    title: "Gifts & Special Items",
    urdu: "تحائف اور خاص اشیاء",
    desc: "Special occasion deliveries",
    iconBg: "bg-gradient-to-br from-pink-500 to-pink-400",
    icon: IoGiftOutline,
  },
  {
    title: "Emergency Items",
    urdu: "ایمرجنسی اشیاء",
    desc: "Urgent item delivery",
    iconBg: "bg-gradient-to-br from-orange-600 to-orange-400",
    icon: FiTool,
  },
  {
    title: "Electronics & Gadgets",
    urdu: "الیکٹرونکس اور گیجٹس",
    desc: "Small tech items delivered fast",
    iconBg: "bg-gradient-to-br from-red-500 to-pink-400",
    icon: FaMobileScreenButton,
  },
  {
    title: "Bakery & Sweets",
    urdu: "بیکری اور مٹھائیاں",
    desc: "Cakes, pastries and desserts",
    iconBg: "bg-gradient-to-br from-yellow-400 to-yellow-300",
    icon: BsCake2,
  },
  {
    title: "Restaurant Pickup",
    urdu: "ریسٹورنٹ پک اپ",
    desc: "Restaurant orders delivered",
    iconBg: "bg-gradient-to-br from-blue-600 to-blue-400",
    icon: IoRestaurant,
  },
  {
    title: "Clothing & Personal Items",
    urdu: "کپڑے اور ذاتی اشیاء",
    desc: "Clothes, shoes, and accessories",
    iconBg: "bg-gradient-to-br from-green-600 to-green-400",
    icon: LuShirt,
  },
  {
    title: "Household & Cleaning",
    urdu: "گھریلو اور صفائی کی اشیاء",
    desc: "Cleaning and home essentials",
    iconBg: "bg-gradient-to-br from-purple-600 to-purple-400",
    icon: FaHouse,
  },
  {
    title: "Hardware & Tools",
    urdu: "ہارڈ ویئر اور ٹولز",
    desc: "Small tools and hardware items",
    iconBg: "bg-gradient-to-br from-gray-500 to-gray-400",
    icon: FiTool,
  },
  {
    title: "Pet Care",
    urdu: "پالتو جانور کی دیکھ بھال",
    desc: "Pet care products delivered",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-300",
    icon: MdPets,
  },
  {
    title: "Baby Products",
    urdu: "بچوں کی مصنوعات",
    desc: "Baby essentials at your doorstep",
    iconBg: "bg-gradient-to-br from-pink-400 to-pink-200",
    icon: BsCake2,
  },
  {
    title: "Salon & Care",
    urdu: "سیلون اور دیکھ بھال",
    desc: "Beauty and grooming products",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-300",
    icon: GiHairStrands,
  },
  {
    title: "Stationery & Office Supplies",
    urdu: "اسٹیشنری اور دفتر کے سامان",
    desc: "Office essentials delivered",
    iconBg: "bg-gradient-to-br from-yellow-400 to-yellow-300",
    icon: MdOutlineLocalGroceryStore,
  },
  {
    title: "Repair & Spare Items",
    urdu: "مرمت اور پرزہ جات",
    desc: "Repair and spare items delivered",
    iconBg: "bg-gradient-to-br from-red-500 to-red-400",
    icon: FiTool,
  },
  {
    title: "Custom Errands",
    urdu: "حسب ضرورت کام",
    desc: "Personal errands done for you",
    iconBg: "bg-gradient-to-br from-green-500 to-green-300",
    icon: AiOutlineGift,
  },
];

export default function Services() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
        else setVisible(false);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="px-2 sm:px-4 md:px-16 py-8">
      {/* Heading */}
      <div
        className={`text-center mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          What We Can Deliver?
        </h2>
        <p className="text-gray-500 mt-1 text-base sm:text-lg md:text-xl">
          ہم کیا پہنچا سکتے ہیں؟
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {services.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className={`bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-md transition-all duration-700 
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                transitionDelay: `${index * 60}ms`,
              }}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg mb-2 flex items-center justify-center ${item.iconBg}`}
              >
                <IconComponent className="text-white w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </div>

              {/* Text */}
              <h3 className="text-base sm:text-lg md:text-xl font-semibold leading-tight">
                {item.title}
              </h3>

              {/* Urdu on right side in blue */}
              <p className="text-blue-500 text-right mt-1 text-sm sm:text-base leading-tight">
                {item.urdu}
              </p>

              <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-tight">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
