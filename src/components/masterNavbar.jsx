import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

export default function MasterNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  // Menentukan halaman aktif berdasarkan path saat ini
  const currentPath = window.location.pathname;

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 960);
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-10">
      <Typography
        id="navbar-wpi"
        as="li"
        variant="medium"
        color="blue-gray"
        className={`p-1 font-${currentPath === '/' ? 'bold' : 'normal'}`}
      >
        <a href="/" id="navbar-beranda" className={`flex items-center text-white ${currentPath === '/' ? 'font-bold' : ''}`}>
          Beranda
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className={`p-1 font-${currentPath === '/produk' ? 'bold' : 'normal'}`}
      >
        <a href="/produk" id="navbar-produk" className={`flex items-center text-white ${currentPath === '/produk' ? 'font-bold' : ''}`}>
          Produk
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className={`p-1 font-${currentPath === '/mitra' ? 'bold' : 'normal'}`}
      >
        <a href="/mitra" id="navbar-mitra" className={`flex items-center ${currentPath === '/mitra' ? 'font-bold text-white' : 'text-white'}`}>
          Mitra Bisnis
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className={`p-1 font-${currentPath === '/news' ? 'bold' : 'normal'}`}
      >
        <a href="/blog" id="navbar-blog" className={`flex items-center ${currentPath === '/blog' ? 'font-bold text-white' : 'text-white'}`}>
          Blog
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className={`p-1 font-${currentPath === '/about' ? 'bold' : 'normal'}`}
      >
        <a href="/tentang" id="navbar-tentang" className={`flex items-center ${currentPath === '/tentang' ? 'font-bold text-white' : 'text-white'}`}>
          Tentang
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="sticky top-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 w-full bg-wpiblue-50">
        <div className="flex items-center justify-between text-white">
          <div className="flex justify-center items-center gap-2">
            <img src="/assets/logo-wpi.png" alt="" width={45} className="bg-white p-1 rounded-sm" />
            {!isSmallScreen && (
              <Typography
                as="a"
                href="/"
                className="mr-4 cursor-pointer py-1.5 font-bold"
                variant="h5"
                data-testid="cypress-title"
              >
                Warung Pangan Indonesia
              </Typography>
            )}
          </div>
          <div className="flex items-center gap-4 ">
            <div className="mr-4 hidden lg:block ">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>{navList}</MobileNav>
      </div>
    </div>
  );
}
