'use client';

import React, { useState, useEffect, useCallback, ReactNode, SVGProps, MouseEvent } from 'react';
import { FaLinkedin, FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface NavListItem {
  name: string;
  href: string;
  dropdown?: NavListItem[];
}

type SVGIconProps = SVGProps<SVGSVGElement>;

interface NavLinkProps {
  item: NavListItem;
  isMobile?: boolean;
  isScrolled: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

interface HeaderProps {
  isScrolled: boolean;
  servicePages: Array<{ title: string; slug: string }>;
  industryPages: Array<{ title: string; slug: string }>;
}

interface LayoutWrapperProps {
  children: ReactNode;
  servicePages?: Array<{ title: string; slug: string }>;
  industryPages?: Array<{ title: string; slug: string }>;
}

const Menu = (props: SVGIconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const X = (props: SVGIconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const useScrollEffect = (threshold: number = 400): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};

// Dropdown menu component
const DropdownMenu = ({
  items,
  isScrolled,
  isMobile = false,
}: {
  items: NavListItem[];
  isScrolled: boolean;
  isMobile?: boolean;
}) => {
  if (isMobile) {
    return (
      <div className="ml-4 space-y-2 border-l-2 border-gray-200 pl-4">
        {items.map((subItem) => (
          <Link
            key={subItem.href}
            href={subItem.href}
            className="block py-2 text-sm text-gray-600 hover:text-blue-600"
          >
            {subItem.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="absolute left-0 top-full pt-2">
      <div className="w-56 rounded-lg bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5">
        {items.map((subItem) => (
          <Link
            key={subItem.href}
            href={subItem.href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          >
            {subItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

// Component to render individual links with dropdown support
const NavLink = ({ item, isMobile = false, isScrolled, onClick }: NavLinkProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const desktopClasses = isScrolled
    ? 'text-gray-700 hover:text-blue-600'
    : 'text-gray-700 hover:text-blue-600';

  const hasDropdown = item.dropdown && item.dropdown.length > 0;

  if (isMobile) {
    return (
      <div>
        <div
          className="flex cursor-pointer items-center justify-between border-b border-gray-100 py-3 text-gray-800"
          onClick={() => hasDropdown && setIsDropdownOpen(!isDropdownOpen)}
        >
          {hasDropdown ? (
            <>
              <span className="text-base font-medium">{item.name}</span>
              <FaChevronDown
                className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </>
          ) : (
            <Link
              href={item.href}
              onClick={onClick}
              className="text-base font-medium hover:text-blue-600"
            >
              {item.name}
            </Link>
          )}
        </div>
        {hasDropdown && isDropdownOpen && item.dropdown && (
          <DropdownMenu items={item.dropdown} isScrolled={isScrolled} isMobile={true} />
        )}
      </div>
    );
  }

  if (hasDropdown) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button
          className={`flex items-center gap-1 text-base font-medium transition-colors ${desktopClasses}`}
        >
          {item.name}
          <FaChevronDown
            className={`h-3 w-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isDropdownOpen && item.dropdown && (
          <DropdownMenu items={item.dropdown} isScrolled={isScrolled} />
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`text-base font-medium transition-colors ${desktopClasses}`}
    >
      {item.name}
    </Link>
  );
};

// Main Navigation Component
const Header = ({ isScrolled, servicePages, industryPages }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Build navigation items with dropdowns
  const navigationItems: NavListItem[] = [
    { name: 'Home', href: '/' },
    {
      name: 'Services',
      href: '/services',
      dropdown: servicePages.map((page) => ({
        name: page.title,
        href: `/services/${page.slug}`,
      })),
    },
    {
      name: 'Industries',
      href: '/industries',
      dropdown: industryPages.map((page) => ({
        name: page.title,
        href: `/${page.slug}`,
      })),
    },
    { name: 'About', href: '/about' },
    // { name: 'Blog', href: '/blog' },
  ];

  const headerClasses = isScrolled
    ? 'fixed top-0 left-0 w-full z-50 shadow-lg backdrop-blur-md bg-white/90'
    : 'absolute top-0 left-0 w-full z-50 bg-transparent';

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const logoColorClass = 'text-blue-600';

  return (
    <header className={headerClasses + ' h-20 transition-all duration-300'}>
      <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="shrink-0">
          <span className={`text-2xl font-black transition-colors duration-300 ${logoColorClass}`}>
            <Link href="/">
              <Image src="/logo.svg" alt="DataBridge Sites" width={140} height={40} />
            </Link>
          </span>
        </div>

        <nav className="hidden items-center space-x-8 md:flex">
          {navigationItems.map((item) => (
            <NavLink key={item.name} item={item} isScrolled={isScrolled} />
          ))}
          <Link href="/contact">
            <button className="btn-primary-green">Contact</button>
          </Link>
        </nav>

        <button
          className={`rounded-xl p-2 text-gray-700 transition hover:bg-gray-100 md:hidden`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 top-20 w-full border-t border-gray-200 bg-white shadow-xl md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                item={item}
                isMobile={true}
                isScrolled={isScrolled}
                onClick={handleLinkClick}
              />
            ))}
            <Link href="/contact" className="block">
              <button className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition duration-150 hover:bg-blue-700">
                Contact
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

// Main Layout Wrapper Component
const LayoutWrapper = ({ children, servicePages = [], industryPages = [] }: LayoutWrapperProps) => {
  const scrollThreshold = 400;
  const isScrolled = useScrollEffect(scrollThreshold);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isScrolled={isScrolled} servicePages={servicePages} industryPages={industryPages} />

      <div className="pt-20">{children}</div>

      <footer className="bg-biscay-500 mt-10 p-12 text-white">
        <div className="container mx-auto">
          <div className="md:pb-50 justify-between border-b-2 border-dashed border-white/20 pb-20 md:flex">
            <div className="mb-20 grid grid-cols-1 gap-10 md:m-0 md:grid-cols-3 md:gap-20">

              {servicePages.length > 0 && (
                <div className="grid-col">
                  <h5 className="border-b-5 mb-4 border-white/10 pb-1 text-xl font-semibold text-white/40">
                    Services
                  </h5>
                  <ul className="flex flex-col gap-4">
                    {servicePages.map((page) => (
                      <li key={page.slug}>
                        <Link href={`/${page.slug}`}>{page.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {industryPages.length > 0 && (
                <div className="grid-col">
                  <h5 className="border-b-5 mb-4 border-white/10 pb-1 text-xl font-semibold text-white/40">
                    Industries
                  </h5>
                  <ul className="flex flex-col gap-4">
                    {industryPages.map((page) => (
                      <li key={page.slug}>
                        <Link href={`/${page.slug}`}>{page.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}


              <div className="grid-col">
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link href={'/about'}>About</Link>
                  </li>
                  {/*<li>*/}
                  {/*  <Link href={'/blog'}>Blog</Link>*/}
                  {/*</li>*/}
                  <li>
                    <Link href={'/contact'}>Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="socials md:text-right">
              <h3 className="text-3xl font-normal">Let&#39;s connect</h3>

              <div className="mt-2 flex justify-start gap-4 md:justify-end">
                <a
                  href="https://www.linkedin.com/company/nuview-it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nugreen-500 hover:text-nugreen-600 transition duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={30} />
                </a>
              </div>
            </div>
          </div>

          <div className="justify-between py-10 md:flex">
            <div className="branding mb-4 md:m-0">
              <div className="pb-5">
                <Image src="/logo-white.png" alt="nuview" width={140} height={40} />
              </div>

              <p className="text-sm opacity-80">
                &copy; {new Date().getFullYear()} nuview. All rights reserved.
              </p>
            </div>
            <ul className="mt-auto flex gap-6 md:gap-12">
              <li>
                <Link href={'/terms'} className="underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href={'/privacy-policy'} className="underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutWrapper;
