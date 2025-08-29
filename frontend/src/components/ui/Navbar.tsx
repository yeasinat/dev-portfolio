import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsTerminal } from "react-icons/bs";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { TfiGithub } from "react-icons/tfi";

import { navLinks } from "../../constants";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const closeMobileMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsMobile(false);
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const menuItemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    }),
  };

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
          onClick={toggleMobileMenu}
          className="text-text hover:text-accent z-50 text-3xl transition-colors sm:hidden"
          aria-label="Toggle mobile menu"
        >
          {!isMobile ? <RiMenuFoldFill /> : <RiMenuUnfoldFill />}
        </button>

        <AnimatePresence>
          {isMobile && (
            <>
              {/* Overlay */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={overlayVariants}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
                onClick={toggleMobileMenu}
              />

              {/* Mobile menu */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileMenuVariants}
                className="bg-background/95 fixed top-0 right-0 z-50 h-full w-4/5 shadow-xl backdrop-blur-md sm:hidden"
              >
                <div className="flex justify-end p-6">
                  <button
                    onClick={closeMobileMenu}
                    className="text-text hover:text-accent z-[60] text-3xl transition-colors"
                    aria-label="Close menu"
                  >
                    <RiMenuUnfoldFill />
                  </button>
                </div>

                <div className="px-6 py-8">
                  <ul className="flex flex-col items-start gap-6">
                    {navLinks?.map((navItem, id) => (
                      <motion.li
                        key={id}
                        custom={id}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuItemVariants}
                        className="hover:text-accent border-secondary/10 font-jetBrains w-full cursor-pointer border-b py-3 text-left font-bold tracking-wider uppercase transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-accent">0{id}</span>
                          {navItem.path}
                        </span>
                      </motion.li>
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
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
