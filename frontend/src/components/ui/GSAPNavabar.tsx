import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { BsTerminal } from "react-icons/bs";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { TfiGithub } from "react-icons/tfi";

import { navLinks } from "../../constants";

const GSAPNavbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  // Clean reference initialization
  useEffect(() => {
    menuItemsRef.current = menuItemsRef.current.slice(0, navLinks.length);
  }, []);

  // Set up initial styles once on component mount
  useEffect(() => {
    if (mobileMenuRef.current && overlayRef.current) {
      gsap.set(mobileMenuRef.current, { x: "100%" });
      gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "none" });
    }
  }, []);

  // Memoize the click handler to prevent recreating it on each render
  const handleClick = useCallback(() => {
    if (isAnimating) return; // Prevent clicking during animations

    // console.log("Click handler triggered", { wasMobileOpen: isMobile });
    setIsMobile((prev) => !prev);
  }, [isAnimating]);

  // GSAP animations with animation lock
  useEffect(() => {
    if (!mobileMenuRef.current || !overlayRef.current) return;

    setIsAnimating(true); // Lock animations

    if (isMobile) {
      // console.log("Opening mobile menu");
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      gsap.set(overlayRef.current, { pointerEvents: "auto" });

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      tl.to(
        mobileMenuRef.current,
        {
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2",
      );

      const validMenuItems = menuItemsRef.current.filter(
        (item) => item !== null,
      );
      if (validMenuItems.length > 0) {
        tl.fromTo(
          validMenuItems,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3",
        );
      }
    } else {
      // console.log("Closing mobile menu");
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { pointerEvents: "none" });
          setIsAnimating(false);
        },
      });

      const validMenuItems = menuItemsRef.current.filter(
        (item) => item !== null,
      );
      if (validMenuItems.length > 0) {
        tl.to(validMenuItems, {
          x: 50,
          opacity: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.in",
        });
      }

      tl.to(
        mobileMenuRef.current,
        {
          x: "100%",
          duration: 0.4,
          ease: "power2.in",
        },
        "-=0.1",
      );

      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2",
      );
    }
  }, [isMobile]);

  // Direct close handler just for the close button
  // Define interface for event handlers
  interface CloseEventHandler {
    (e: React.MouseEvent<HTMLElement>): void;
  }

  const handleDirectClose: CloseEventHandler = useCallback((e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsMobile(false);
  }, []);

  return (
    <nav className="border-secondary/10 bg-background/80 after:via-secondary/30 fixed z-10 flex w-full items-center justify-between border-b px-4 py-4 backdrop-blur-sm after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-gradient-to-r after:from-transparent after:to-transparent sm:mx-auto sm:min-w-full sm:px-14">
      <h1 className="text-text font-poppins inline-flex items-center gap-3 text-3xl font-bold tracking-[.25em]">
        <BsTerminal /> DVLPR
      </h1>

      <div>
        <ul className="font-poppins hidden gap-10 sm:flex">
          {navLinks?.map((navItem, id) => (
            <li
              key={id}
              className="group hover:text-accent font-jetBrains relative cursor-pointer py-2 font-bold tracking-wider uppercase transition-colors"
            >
              <span className="group-hover:bg-accent absolute top-0 right-0 left-0 h-0.5 w-0 bg-transparent transition-all duration-300 group-hover:w-full"></span>
              {navItem.path}
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle button */}
        <button
          onClick={handleClick}
          className="text-text hover:text-accent z-50 text-3xl transition-colors sm:hidden"
          aria-label="Toggle mobile menu"
          disabled={isAnimating}
        >
          {!isMobile ? <RiMenuFoldFill /> : <RiMenuUnfoldFill />}
        </button>

        {/* Overlay */}
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 bg-black/40 opacity-0 backdrop-blur-sm sm:hidden"
          onClick={handleClick}
          style={{ pointerEvents: "none" }}
        />

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className="bg-background/95 fixed top-0 right-0 z-50 h-full w-4/5 shadow-xl backdrop-blur-md sm:hidden"
          style={{ transform: "translateX(100%)" }}
        >
          <div className="flex justify-end p-6">
            <button
              onClick={handleDirectClose}
              className="text-text hover:text-accent z-[60] text-3xl transition-colors"
              aria-label="Close menu"
              disabled={isAnimating}
            >
              <RiMenuUnfoldFill />
            </button>
          </div>

          <div className="px-6 py-8">
            <ul className="flex flex-col items-start gap-6">
              {navLinks?.map((navItem, id) => (
                <li
                  key={id}
                  ref={(el) => {
                    menuItemsRef.current[id] = el;
                  }}
                  className="hover:text-accent border-secondary/10 font-jetBrains w-full cursor-pointer border-b py-3 text-left font-bold tracking-wider uppercase transition-colors"
                  onClick={handleDirectClose}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-accent">0{id}</span>
                    {navItem.path}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="border-secondary/10 border-t pt-6">
              <div className="text-text/70 font-poppins text-sm">
                Connect with me
              </div>
              <div className="mt-3 flex gap-4">
                <span className="bg-secondary/20 hover:bg-accent hover:text-background flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors">
                  <a
                    href="https://github.com/yeasinat"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TfiGithub size={20} />
                  </a>
                </span>
                <span className="bg-secondary/20 hover:bg-accent hover:text-background flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors">
                  LI
                </span>
                <span className="bg-secondary/20 hover:bg-accent hover:text-background flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors">
                  TW
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GSAPNavbar;
