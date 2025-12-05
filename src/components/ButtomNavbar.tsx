import { useState } from "react";
import { FaHome, FaShoppingCart, FaWhatsapp } from "react-icons/fa";

function BottomNavbar() {
  const [activeLink, setActiveLink] = useState("Home");

  const navLinks = [
    { name: "Home", href: "#home", icon: FaHome },
    { name: "Order Now", href: "#order", icon: FaShoppingCart },
    { name: "WhatsApp", href: "https://wa.me/923117016894?", icon: FaWhatsapp },
  ];

  const handleLinkClick = (linkName: string) => {
    // Don't set active link for WhatsApp
    if (linkName !== "WhatsApp") {
      setActiveLink(linkName);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur-md shadow-lg border border-gray-200 rounded-2xl pointer-events-auto">
          <div className="px-6 py-3">
            <div className="flex justify-between items-center">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isWhatsApp = link.name === "WhatsApp";
                
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={isWhatsApp ? "_blank" : undefined}
                    rel={isWhatsApp ? "noopener noreferrer" : undefined}
                    onClick={() => handleLinkClick(link.name)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
                      !isWhatsApp && activeLink === link.name 
                        ? "text-blue-600 bg-blue-50 font-semibold" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-xs font-medium">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BottomNavbar;