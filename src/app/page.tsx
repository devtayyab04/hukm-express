"use client";
import React from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Services from "@/components/Service";
import Work from "@/components/Work";
import WhyChoose from "@/components/Choose";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/ButtomNavbar";

const Form = dynamic(() => import("@/components/Form"), { ssr: false });

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <WhyChoose />
      <Form />
      <Footer />
      <BottomNavbar />
    </>
  );
}
