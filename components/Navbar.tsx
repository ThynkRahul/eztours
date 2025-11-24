"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/logo.png";
import LanguageSelector from "./LanguageSelector";
import { getLandingTranslations } from "../lib/translationHelper";

const NavBar: React.FC<{ locale: string }> = ({ locale }) => {
  const [displayStyle, setDisplayStyle] = useState<"block" | "none">("block");
  const [activePage, setActivePage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  const { navigation } = getLandingTranslations(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActivePage(currentPath);
    setIsHomePage(
      currentPath === "/" || currentPath === `/${locale}` || currentPath === ""
    );
  }, [locale]);

  // Scroll detection for homepage (fade from transparent → white)
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 80) setIsScrolled(true);
    else setIsScrolled(false);
    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { href: `${prefix}/`, label: navigation.links.home },
    { href: `${prefix}/about`, label: navigation.links.aboutUs },
    { href: `${prefix}/testimonials`, label: navigation.links.testimonials },
    { href: `${prefix}/packages`, label: navigation.links.packages },
    { href: `${prefix}/gallery`, label: navigation.links.gallery },
    { href: `${prefix}/blog`, label: navigation.links.blog },
  ];

  const handleLinkClick = (href: string) => {
    setActivePage(href);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleContactClick = () => setActivePage("");

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isHomePage && !isScrolled ? "bg-transparent" : "bg-white shadow-md"
      }`}
    >
      {/* PREHEADER */}
      <div
        className={`transition-all duration-300 ${
          isHomePage ? (isScrolled ? "block" : "hidden") : "opacity-100"
        }`}
      >
        <div
          className={`bg-black text-white h-[57px] py-[14px] px-[65px] font-urbanist md:flex justify-center`}
          style={{ display: displayStyle }}
        >
          <div className="flex justify-center sm:justify-between items-center text-xs md:text-sm w-full max-w-[1270px] mx-auto">
            <div className="hidden sm:block">
              <div className="flex gap-4">
                <span className="flex items-center gap-2">
                  <span className="relative flex items-center justify-center rounded-full bg-transparent text-white">
                    <i className="fas fa-phone fa-flip-horizontal text-[15px]" />
                  </span>
                  <a href="tel:+919873186168" className="text-white text-[16px]">
                    +91 987 318 6168
                  </a>
                </span>

                <span className="flex items-center gap-2">
                  <i className="fas fa-envelope text-[18px]" />
                  <span className="flex flex-wrap">
                    <a
                      href="mailto:info@eazetours.com"
                      className="text-white text-[16px]"
                    >
                      info@eazetours.com
                    </a>
                    ,
                    <a
                      href="mailto:harshit@eazetours.com"
                      className="text-white text-[16px] ml-1"
                    >
                      harshit@eazetours.com
                    </a>
                  </span>
                </span>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <a
                href="https://www.tripadvisor.in/Attraction_Review-g304551-d17734269-Reviews-EAZE_TOURS-New_Delhi_National_Capital_Territory_of_Delhi.html"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-7 h-7 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-300"
              >
                <i className="fab fa-tripadvisor text-sm leading-lg" />
              </a>
              <a
                href="https://www.instagram.com/eazetourpackages/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-7 h-7 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-300"
              >
                <i className="fab fa-instagram text-sm leading-lg" />
              </a>
              <a
                href="https://www.facebook.com/eazetour/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-7 h-7 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-300"
              >
                <i className="fab fa-facebook text-sm leading-lg" />
              </a>
              <a
                href="https://www.pinterest.com/eazetourpackages/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-7 h-7 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-300"
              >
                <i className="fab fa-pinterest text-sm leading-lg" />
              </a>

              <div className="ml-4">
                <LanguageSelector currentLocale={locale} variant="pre-header" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div
        className={`flex items-center w-full font-urbanist h-[78px] transition-all duration-500 ${
          isHomePage
            ? isScrolled
              ? "bg-white border-b border-gray-300 text-[#025C7A]"
              : "bg-transparent text-white"
            : "bg-white border-b border-gray-300 text-[#025C7A]"
        }`}
        style={{ display: displayStyle }}
      >
        <div
          className="navbar flex py-[15px] items-center justify-between"
          style={{ maxWidth: "1270px", margin: "0 auto" }}
        >
          {/* Logo */}
          <div
            className="navbar-start px-4 flex items-center"
            style={{ marginTop: "-10px" }}
          >
            <Link href={prefix || "/"} legacyBehavior>
              <a onClick={() => handleLinkClick(prefix || "/")}>
                <Image src={logo} width={128} height={48} alt="Logo" />
              </a>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center pr-3 relative z-50">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-inherit"
            >
              <i
                className={`fas ${
                  isMenuOpen ? "fa-times" : "fa-bars"
                } text-xl`}
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-center md:flex flex-grow hidden">
            <div className="flex items-center justify-center gap-2">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href} passHref>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className={`btn btn-ghost btn-sm rounded-btn ${
                      activePage === link.href
                        ? "text-[#6E9753]"
                        : isHomePage && !isScrolled
                        ? "text-white"
                        : "text-[#025C7A]"
                    } text-[16px]`}
                  >
                    {link.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`md:hidden fixed top-0 right-0 w-3/4 bg-white h-screen z-40 shadow-lg transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col absolute top-0 text-left items-start px-4 gap-4 py-16">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href} passHref>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className={`btn btn-ghost btn-sm rounded-btn ${
                      activePage === link.href
                        ? "text-[#6E9753]"
                        : "text-[#025C7A]"
                    } text-[16px]`}
                  >
                    {link.label}
                  </button>
                </Link>
              ))}

              <Link href={`${prefix}/contact`} passHref>
                <button
                  className={`btn btn-ghost btn-sm text-[16px] rounded-btn ${
                    activePage === `${prefix}/contact`
                      ? "text-[#6E9753]"
                      : "text-[#025C7A]"
                  }`}
                  onClick={() => handleLinkClick(`${prefix}/contact`)}
                >
                  {navigation.links.contactUs}
                </button>
              </Link>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <LanguageSelector currentLocale={locale} className="w-full" />
              </div>
            </div>
          </div>

          {/* Contact Button (Desktop) */}
          <div className="navbar-end md:flex px-4 hidden">
            <Link href={`${prefix}/contact`} passHref>
              <button
                onClick={handleContactClick}
                className={`btn flex items-center justify-center min-w-[173px] h-[46px] rounded-[41px] pr-[6px] pl-[10px] transition-all duration-300 ${
                  isHomePage && !isScrolled
                    ? "bg-white text-[#025C7A] hover:bg-[#6E9753] hover:text-white"
                    : "bg-[#025C7A] text-white hover:bg-[#6E9753]"
                }`}
              >
                <span className="mr-2 uppercase font-bold text-[16px]">
                  {navigation.links.contactUs}
                </span>
                <span
                  className={`relative w-8 h-8 flex items-center justify-center rounded-full ${
                    isHomePage && !isScrolled
                      ? "bg-[#025C7A]"
                      : "bg-white text-[#025C7A]"
                  }`}
                >
                  <i
                    className={`fas fa-arrow-right ${
                      isHomePage && !isScrolled ? "text-white" : "text-[#025C7A]"
                    } text-lg`}
                  />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
