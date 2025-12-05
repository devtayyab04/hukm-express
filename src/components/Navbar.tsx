import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FaHome,
  FaCogs,
  FaBriefcase,
  FaShoppingCart,
  FaWhatsapp,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaMotorcycle, FaStore } from "react-icons/fa6";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const navbarRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "#home", icon: FaHome },
    { name: "Services", href: "#services", icon: FaCogs },
    {
      name: "Become Rider",
      href: "https://wa.me/923117016894?",
      icon: FaMotorcycle
    },

    {
      name: "Register Your Store",
      href: "https://wa.me/923117016894?",
      icon: FaStore
    },
    { name: "Order Now", href: "#order", icon: FaShoppingCart },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLinkClick = (linkName: string) => {
    // Don't set active link for Contact
    if (linkName !== "Contact") {
      setActiveLink(linkName);
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-7xl mx-auto">
        <div
          ref={navbarRef}
          className="bg-white backdrop-blur-md shadow-lg border border-gray-200 rounded-2xl pointer-events-auto"
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo - Left Side */}
              <div className="shrink-0 w-24 h-12 overflow-hidden rounded-4xl">
                <Image
                  src="/images/logo.jpeg"
                  alt="Company Logo"
                  width={100}
                  height={50}
                  className="w-full h-full object-cover scale-125"
                  priority
                />
              </div>

              {/* Desktop Navigation Links - Right Side */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-2">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    const isSupplier = link.name === "Become a Supplier";

                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target={isSupplier ? "_blank" : undefined}
                        rel={isSupplier ? "noopener noreferrer" : undefined}
                        onClick={() => handleLinkClick(link.name)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${!isSupplier && activeLink === link.name
                          ? "text-blue-600 bg-blue-50 font-semibold shadow-sm"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                          } ${link.name === "Order Now"
                            ? "bg-orange-500 text-white hover:bg-orange-600 hover:text-white ml-2 shadow-md"
                            : ""
                          }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        {link.name}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
                  aria-expanded="false"
                >
                  <span className="sr-only">
                    {isOpen ? "Close main menu" : "Open main menu"}
                  </span>
                  {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
              <div className="md:hidden border-t border-gray-200 rounded-b-2xl overflow-hidden absolute left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    const isSupplier = link.name === "Become a Supplier";

                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target={isSupplier ? "_blank" : undefined}
                        rel={isSupplier ? "noopener noreferrer" : undefined}
                        onClick={() => handleLinkClick(link.name)}
                        className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center gap-3 ${!isSupplier && activeLink === link.name
                          ? "text-blue-600 bg-blue-50 font-semibold"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                          } ${link.name === "Order Now"
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : ""
                          }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        {link.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;