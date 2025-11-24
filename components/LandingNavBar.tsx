import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/logo.png";
import LanguageSelector from "./LanguageSelector";
import { getLandingTranslations } from "../lib/translationHelper";

const LandingNavBar: React.FC<{ locale: string }> = ({ locale }) => {
  const [displayStyle, setDisplayStyle] = useState<"block" | "none">("block");
  const [activePage, setActivePage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const { navigation } = getLandingTranslations(locale);

  const updateWindowWidth = () => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActivePage(currentPath);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 130) {
        setDisplayStyle("none");
      } else {
        setDisplayStyle("block");
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 130);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseNavLinks = [
    { href: `/${locale}`, label: navigation.links.home },
    { href: `/${locale}/about`, label: navigation.links.aboutUs },
    { href: `/${locale}/testimonials`, label: navigation.links.testimonials },
    { href: `/${locale}/packages`, label: navigation.links.packages },
    { href: `/${locale}/gallery`, label: navigation.links.gallery },
    { href: `/${locale}/blog`, label: navigation.links.blog },
  ];

  const navLinks =
    windowWidth <= 1030
      ? [...baseNavLinks, { href: `/${locale}/contact`, label: navigation.links.contactUs }]
      : baseNavLinks;

  const handleLinkClick = (href: string) => {
    setActivePage(href);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Pre-header */}
      <div className={`${isScrolled ? "lg:block" : "hidden"}`}>
        <div
          className={`text-white h-[57px] py-[14px] px-[65px] font-urbanist md:flex justify-center transition-all duration-300 ${isScrolled ? "bg-black shadow-lg" : "bg-transparent"}`}
          style={{ display: displayStyle }}
        >
          <div className="flex justify-center lg:justify-between items-center text-xs md:text-sm w-full max-w-[1270px] mx-auto">
            <div className="hidden lg:block">
              <div className="flex gap-4">
                <span className="flex items-center gap-2">
                  <i className="fas fa-phone fa-flip-horizontal text-[15px]" />
                  <a href="tel:+919873186168" className="text-white text-[16px]">
                    +91 987 318 6168
                  </a>
                </span>
                <span className="flex items-center gap-2">
                  <i className="fas fa-envelope text-[18px]" />
                  <span className="flex flex-wrap">
                    <a href="mailto:info@eazetours.com" className="text-white text-[16px]">
                      info@eazetours.com
                    </a>
                    ,
                    <a href="mailto:harshit@eazetours.com" className="text-white text-[16px] ml-1">
                      harshit@eazetours.com
                    </a>
                  </span>
                </span>
              </div>
            </div>
            <div className="flex gap-2">
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

              {/* Language Selector */}
              <div className="ml-4">
                <LanguageSelector currentLocale={locale} variant="pre-header" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`flex items-center w-full font-urbanist h-[78px] text-neutral transition-all duration-300 ${isScrolled ? "bg-white border-b border-gray-300" : "bg-transparent"}`}
        style={{ display: displayStyle }}
      >
        <div
          className="navbar flex py-[15px] items-center justify-between"
          style={{ maxWidth: "1270px", margin: "0 auto" }}
        >
          <div className="navbar-start px-4 flex items-center" style={{ marginTop: "-10px" }}>
            <Link href={`/${locale}`} legacyBehavior>
              <a onClick={() => handleLinkClick(`/${locale}`)}>
                <Image src={logo} width={128} height={48} alt="Logo" />
              </a>
            </Link>
          </div>

          {/* Hamburger */}
          <div className="lg:hidden flex items-center pr-3 relative z-50">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i
                className={`fas ${isMenuOpen ? "fa-times text-[#025C7A]" : "fa-bars text-[#6E9753]"} text-xl`}
              />
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="navbar-center lg:flex flex-grow hidden">
            <div className="flex items-center justify-center gap-2">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href} passHref>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className={`btn btn-ghost btn-sm rounded-btn 
                      ${isScrolled ? "text-[#025C7A]" : "text-[#fff]"}
                      ${activePage === link.href ? "text-[#6E9753]" : "text-[#025C7A]"}
                      text-[16px]`}
                  >
                    {link.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Contact Button (only for >1030px) */}
          {windowWidth > 1030 && (
            <div className="navbar-end md:flex px-4 hidden">
              <Link href={`/${locale}/contact`} passHref>
                <button
                  className={`btn flex items-center justify-center min-w-[173px] h-[46px] rounded-[41px] pr-[6px] pl-[10px] hover:bg-[#6E9753] ${isScrolled ? "bg-[#025C7A]" : "bg-transparent"}`}
                >
                  <span
                    className="mr-2 text-white"
                    style={{
                      textTransform: "uppercase",
                      fontSize: "16px",
                      fontWeight: "700",
                      lineHeight: "19.2px",
                      textAlign: "left",
                    }}
                  >
                    {navigation.links.contactUs}
                  </span>
                  <span
                    className={`relative w-8 h-8 flex items-center justify-center rounded-full border border-white ${isScrolled ? "bg-[#fff]" : "bg-transparent"}`}
                  >
                    <i
                      className={`fas fa-arrow-right text-lg ${isScrolled ? "text-[#025C7A]" : "text-[#fff]"}`}
                    />
                  </span>
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Nav */}
          <div
            className={`lg:hidden fixed top-0 right-0 w-3/4 bg-white h-screen z-40 shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex flex-col absolute top-0 text-left items-start px-4 gap-4 py-16">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href} passHref>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className={`btn btn-ghost btn-sm rounded-btn ${activePage === link.href ? "text-[#6E9753]" : "text-[#025C7A]"} text-[16px]`}
                  >
                    {link.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingNavBar;
