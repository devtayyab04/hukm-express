import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { FaTiktok } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative text-white py-16 px-6 md:px-16">
      <div className="absolute inset-0">
        <img
          src="images/bg3.png"
          alt="Footer Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="shrink-0 w-20 h-8 overflow-hidden rounded-4xl">
              <Image
                src="/images/logo.jpeg"
                alt="Company Logo"
                width={100}
                height={50}
                className="w-full h-full object-cover scale-135"
                priority
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold">حکم ایکسپریس</h1>
              <p className="text-gray-300 text-sm">HukamExpress.com</p>
            </div>
          </div>

          <p className="text-[22px] mb-2 font-bold text-orange-500"
          >
            ... !آپ کا حکم….... ہم حاضر

          </p>
          {/* <p className="text-gray-300">Your Command...,  Our Service!</p> */}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-1 flex flex-col text-gray-300">
            <Link href="#services" className="hover:text-white cursor-pointer">
              Services
            </Link>
            <Link href="#work" className="hover:text-white cursor-pointer">
              How It Works
            </Link>
            <Link href="#order" className="hover:text-white cursor-pointer">
              Order Now
            </Link>
            <Link
              href="https://wa.me/923117016894?"
              target="_blank"
              className="hover:text-white cursor-pointer"
            >
              Contact Us
            </Link>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <div className="space-y-10 text-gray-300">
            <Link
              href="https://wa.me/+923117016894"
              target="_blank"
              className="hover:text-white"
            >
              <p className="mb-2">WhatsApp: +923117016894</p>
            </Link>

            <Link href="tel:+923117016894" className="hover:text-white">
              <p className="mb-2">Phone: +923117016894</p>
            </Link>

            <Link
              href="mailto:hukamexpress0@gmail.com"
              className="hover:text-white"
            >
              hukamexpress0@gmail.com
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Registor Your Store</h2>
          <ul className="space-y-1 text-gray-300 flex flex-col">
            <Link
              href="https://hukamexpress.com/"
              className="hover:text-white hover:underline"
            >
              hukamexpress.com
            </Link>

            <Link
              href="https://wa.me/+923117016894"
              target="_blank"
              className="hover:text-white"
            >
              <p>Become Rider</p>
            </Link>

            {/* <Link
              href="https://www.express.com/"
              className="hover:text-white hover:underline"
            >
              express.com
            </Link> */}
          </ul>
        </div>

        {/* Social Icons Section with Hover Animation */}
        <div className="md:col-span-4 flex justify-center">
          <ul className="flex gap-8 justify-center">
            <Link
              href="https://www.facebook.com/share/1CnXpbGQB4/?mibextid=wwXIfr"
              target="_blank"
              className="cursor-pointer transition transform hover:scale-125 hover:text-blue-400"
            >
              <Facebook size={25} />
            </Link>

            <Link
              href="https://www.instagram.com/hukamexpress?igsh=cXFrMjE1ZDlmbG51&utm_source=qr"
              target="_blank"
              className="cursor-pointer transition transform hover:scale-125 hover:text-pink-400"
            >
              <Instagram size={25} />
            </Link>

            <Link
              href="https://x.com/hukamexpress?s=11"
              target="_blank"
              className="cursor-pointer transition transform hover:scale-125 hover:text-blue-400"
            >
              <Twitter size={25} />
            </Link>

            <Link
              href="https://www.tiktok.com/@hukamexpress.com?_r=1&_t=ZS-91TIlcaBVRQ"
              target="_blank"
              className="cursor-pointer transition transform hover:scale-125 hover:text-white"
            >
              <FaTiktok size={25} />
            </Link>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-gray-600 mt-10 pt-6 text-center text-gray-300">
        <p>©2025 HukamExpress.com. All rights reserved.</p>
        <p className="mt-1">Shop Anything. Delivered Instantly</p>
      </div>
    </footer>
  );
};

export default Footer;
