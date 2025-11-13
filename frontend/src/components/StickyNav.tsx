'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'who-we-help', label: 'Who we help', href: '#who-we-help' },
  { id: 'what-we-do', label: 'What we do', href: '#what-we-do' },
  { id: 'reviews', label: 'Reviews', href: '#reviews' },
  { id: 'free-consultation', label: 'Free consultation', href: '#free-consultation' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
  { id: 'faqs', label: 'FAQs', href: '#faqs' },
  { id: 'resources', label: 'Resources', href: '#resources' },
];

export default function StickyNav() {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const navRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const heroObserverRef = useRef<IntersectionObserver | null>(null);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down'>('down');
  const rafId = useRef<number | null>(null);

  // Header heights: top-37 (148px) on mobile, top-32 (128px) on desktop
  const getHeaderHeight = () => {
    if (typeof window === 'undefined') return 148;
    return window.innerWidth >= 768 ? 128 : 148; // md breakpoint
  };

  // Update spacer height to match nav height
  const updateSpacerHeight = () => {
    if (navRef.current && spacerRef.current) {
      const navHeight = navRef.current.offsetHeight;
      if (spacerRef.current.style.height !== `${navHeight}px`) {
        spacerRef.current.style.height = `${navHeight}px`;
      }
    }
  };

  // Use requestAnimationFrame for smooth updates
  useEffect(() => {
    const update = () => {
      updateSpacerHeight();
      rafId.current = requestAnimationFrame(update);
    };
    
    rafId.current = requestAnimationFrame(update);
    
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Also update on resize
  useEffect(() => {
    const handleResize = () => {
      updateSpacerHeight();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Find Hero section to track when it's in/out of view
    heroRef.current = document.querySelector('section') as HTMLElement;

    const handleScroll = () => {
      if (!heroRef.current || !navRef.current) return;

      // Track scroll direction
      const currentScrollY = window.scrollY;
      scrollDirection.current = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;

      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      const headerHeight = getHeaderHeight();

      // If Hero section is scrolled past (bottom is above header), make nav sticky
      if (heroBottom <= headerHeight && !isSticky) {
        setIsSticky(true);
        // Update spacer immediately
        requestAnimationFrame(() => {
          updateSpacerHeight();
        });
      } else if (heroBottom > headerHeight && isSticky) {
        setIsSticky(false);
        // Update spacer immediately
        requestAnimationFrame(() => {
          updateSpacerHeight();
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  useEffect(() => {
    // Set up Intersection Observer for Hero section
    if (heroRef.current) {
      const headerHeight = getHeaderHeight();
      heroObserverRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // If Hero is visible, nav should not be sticky
            if (entry.isIntersecting) {
              setIsSticky(false);
              requestAnimationFrame(() => {
                updateSpacerHeight();
              });
            }
          });
        },
        {
          rootMargin: `-${headerHeight}px 0px 0px 0px`,
          threshold: 0,
        }
      );

      heroObserverRef.current.observe(heroRef.current);
    }

    return () => {
      if (heroObserverRef.current && heroRef.current) {
        heroObserverRef.current.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Function to find and observe sections
    const setupObserver = () => {
      const sections = navItems
        .map((item) => {
          const element = document.getElementById(item.id);
          return element ? { id: item.id, element } : null;
        })
        .filter((item): item is { id: string; element: HTMLElement } => item !== null);

      if (sections.length === 0) {
        // Retry after a short delay if sections aren't found yet
        setTimeout(setupObserver, 100);
        return;
      }

      // Clean up previous observer
      if (observerRef.current) {
        sections.forEach(({ element }) => {
          observerRef.current?.unobserve(element);
        });
      }

      const headerHeight = getHeaderHeight();
      const navHeight = 60; // Approximate sticky nav height
      const totalOffset = headerHeight + navHeight;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          // Track all visible sections with their intersection data
          const visibleSections: Array<{ 
            id: string; 
            ratio: number; 
            top: number;
            bottom: number;
            isAboveViewport: boolean;
            isBelowViewport: boolean;
          }> = [];

          entries.forEach((entry) => {
            const rect = entry.boundingClientRect;
            const viewportTop = totalOffset;
            const viewportBottom = window.innerHeight;

            // Check if section is intersecting
            if (entry.isIntersecting) {
              visibleSections.push({
                id: entry.target.id,
                ratio: entry.intersectionRatio,
                top: rect.top,
                bottom: rect.bottom,
                isAboveViewport: rect.top < viewportTop,
                isBelowViewport: rect.bottom > viewportBottom,
              });
            }
          });

          // If we have visible sections
          if (visibleSections.length > 0) {
            // When scrolling up, prioritize sections that are entering from bottom
            // When scrolling down, prioritize sections that are entering from top
            visibleSections.sort((a, b) => {
              // First, prioritize sections that are fully or mostly in viewport
              const viewportBottom = window.innerHeight;
              const aInViewport = a.top >= totalOffset && a.bottom <= viewportBottom;
              const bInViewport = b.top >= totalOffset && b.bottom <= viewportBottom;

              if (aInViewport && !bInViewport) return -1;
              if (!aInViewport && bInViewport) return 1;

              // If scrolling up, prefer sections closer to the top of viewport
              // If scrolling down, prefer sections with higher intersection ratio
              if (scrollDirection.current === 'up') {
                // When scrolling up, the section closest to the top (but below it) should be active
                const aDistance = Math.abs(a.top - totalOffset);
                const bDistance = Math.abs(b.top - totalOffset);
                if (Math.abs(aDistance - bDistance) > 50) {
                  return aDistance - bDistance;
                }
              }

              // Default: sort by intersection ratio (most visible first)
              if (Math.abs(a.ratio - b.ratio) > 0.1) {
                return b.ratio - a.ratio;
              }

              // If ratios are similar, prefer the one closer to the top
              return Math.abs(a.top - totalOffset) - Math.abs(b.top - totalOffset);
            });

            setActiveSection(visibleSections[0].id);
          } else {
            // No sections visible - use scroll position to determine active section
            const scrollY = window.scrollY;
            let bestSection = '';
            let bestScore = -Infinity;

            sections.forEach(({ id, element }) => {
              const rect = element.getBoundingClientRect();
              const elementTop = rect.top + scrollY;
              const elementBottom = elementTop + rect.height;
              const viewportTop = scrollY + totalOffset;
              const viewportBottom = scrollY + window.innerHeight;

              // Calculate score based on how much of the section is in viewport
              let score = 0;

              // If section is above viewport
              if (elementBottom <= viewportTop) {
                const distance = viewportTop - elementBottom;
                // Closer sections get higher score, but negative to indicate they're above
                score = -distance;
              }
              // If section is below viewport
              else if (elementTop >= viewportBottom) {
                const distance = elementTop - viewportBottom;
                // Closer sections get higher score, but more negative
                score = -distance - 1000; // Penalize sections below viewport more
              }
              // Section is in viewport (at least partially)
              else {
                const visibleTop = Math.max(elementTop, viewportTop);
                const visibleBottom = Math.min(elementBottom, viewportBottom);
                const visibleHeight = visibleBottom - visibleTop;
                const totalHeight = elementBottom - elementTop;
                const visibilityRatio = visibleHeight / totalHeight;

                // Higher score for more visible sections
                score = visibilityRatio * 1000;

                // Bonus for sections near the top of viewport
                const distanceFromTop = Math.abs(rect.top - totalOffset);
                score += (1000 - distanceFromTop) / 10;
              }

              if (score > bestScore) {
                bestScore = score;
                bestSection = id;
              }
            });

            // Only set active if we found a reasonable section
            // (score > 0 means section is at least partially visible)
            if (bestSection && bestScore > -200) {
              setActiveSection(bestSection);
            } else {
              setActiveSection(''); // No section in view, clear active state
            }
          }
        },
        {
          rootMargin: `-${totalOffset}px 0px -40% 0px`, // Trigger when section enters upper 60% of viewport
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        }
      );

      sections.forEach(({ element }) => {
        observerRef.current?.observe(element);
      });
    };

    // Initial setup
    setupObserver();

    // Handle window resize to recalculate
    const handleResize = () => {
      setTimeout(setupObserver, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (observerRef.current) {
        const sections = navItems
          .map((item) => document.getElementById(item.id))
          .filter((el): el is HTMLElement => el !== null);

        sections.forEach((section) => {
          observerRef.current?.unobserve(section);
        });
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerHeight = getHeaderHeight();
      const navHeight = 60;
      const headerOffset = isSticky ? headerHeight + navHeight : headerHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Update active section immediately when clicked
      setActiveSection(targetId);
    }
  };

  const getActiveStyles = (itemId: string, isActive: boolean) => {
    // By default, all items look the same (no active state)
    if (!isActive) {
      return 'text-gray-600 hover:text-gray-900 bg-transparent';
    }

    // Services gets green background, others get yellow when active
    if (itemId === 'services') {
      return 'text-white font-bold bg-green-500';
    } else {
      return 'text-gray-900 font-bold bg-yellow-400';
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`z-40 w-full bg-white border-b border-gray-200 ${
          isSticky ? 'fixed top-37 md:top-32 shadow-md' : 'relative'
        }`}
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl">
          <div 
            className="flex items-center justify-start overflow-x-auto py-2 sm:py-3 md:py-4 px-2 sm:px-4 lg:px-8"
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <style dangerouslySetInnerHTML={{
              __html: `
                .sticky-nav-scroll::-webkit-scrollbar {
                  display: none;
                }
              `
            }} />
            <ul
              className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 min-w-max sticky-nav-scroll"
              role="list"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="flex-shrink-0">
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`whitespace-nowrap text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-3 sm:px-4 py-1.5 sm:py-2 ${getActiveStyles(item.id, isActive)}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content jump - always present, height matches nav */}
      <div 
        ref={spacerRef}
        style={{ 
          height: '0px',
          display: 'block',
        }}
        aria-hidden="true"
      />
    </>
  );
}