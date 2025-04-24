"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCoffee, FaGlassWhiskey, FaLeaf, FaBlender, FaBirthdayCake, FaPhone, FaMapMarkerAlt, FaClock, FaChevronDown, FaArrowUp } from 'react-icons/fa';
import { cafeInformation } from '@/components/CafeComponents/types';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const DarkBlueTemplate = ({ cafe, categories }: cafeInformation) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize animations
    initAnimations();
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const initAnimations = () => {
    // Hero section animations
    gsap.from('.logo', {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: 'back.out(1.7)'
    });

    gsap.from('.hero-content h1', {
      duration: 1,
      y: -30,
      opacity: 0,
      delay: 0.3,
      ease: 'power2.out'
    });

    gsap.from('.hero-content p', {
      duration: 1,
      y: -20,
      opacity: 0,
      delay: 0.6,
      ease: 'power2.out'
    });

    gsap.from('.contact-item', {
      duration: 0.8,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      delay: 0.9,
      ease: 'power2.out'
    });

    gsap.from('.scroll-down', {
      duration: 1,
      opacity: 0,
      delay: 1.5,
      ease: 'power2.out'
    });

    // Scroll animation - move hero to right and show menu
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "+=100%",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        
        if (heroRef.current) {
          gsap.to(heroRef.current, {
            x: progress * 100 + "%",
            ease: "none"
          });
        }
        
        if (menuRef.current) {
          gsap.to(menuRef.current, {
            x: (1 - progress) * 100 + "%",
            ease: "none"
          });
        }
        
        if (heroRef.current) {
          gsap.to(heroRef.current, {
            opacity: 1 - progress,
            ease: "none"
          });
        }
      }
    });

    // Menu categories and items animation
    ScrollTrigger.create({
      trigger: ".menu-section",
      start: "top 60%",
      onEnter: () => {
        gsap.to(".menu-categories", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });
        
        gsap.to(".menu-items", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out"
        });
      }
    });

    // Menu items animation
    if (menuItemsRef.current) {
      const items = menuItemsRef.current.querySelectorAll('.menu-item');
      items.forEach((item: Element, i: number) => {
        gsap.fromTo(item, { opacity: 0},
           {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 50,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power2.out'
        });
      });
    }

    // Back to top button
    const handleScroll = () => {
      if (backToTopRef.current) {
        if (window.pageYOffset > 300) {
          backToTopRef.current.classList.add('active');
        } else {
          backToTopRef.current.classList.remove('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const filterMenuItems = (category: string) => {
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`.category-btn[data-category="${category}"]`)?.classList.add('active');
    
    menuItems.forEach((item) => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        gsap.to(item, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      } else {
        gsap.to(item, {
          opacity: 0.3,
          scale: 0.9,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'hot-drinks':
      case 'قهوه':
        return <FaCoffee className="text-xl" />;
      case 'cold-drinks':
      case 'نوشیدنی سرد':
        return <FaGlassWhiskey className="text-xl" />;
      case 'herbal-teas':
      case 'دمنوش':
        return <FaLeaf className="text-xl" />;
      case 'shakes':
      case 'شیک':
        return <FaBlender className="text-xl" />;
      case 'cakes':
      case 'کیک':
        return <FaBirthdayCake className="text-xl" />;
      default:
        return <FaCoffee className="text-xl" />;
    }
  };

  return (
    <div className="dark-theme">
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section">
        <div className="logo">
          <FaCoffee className="text-5xl" />
        </div>
        <div className="hero-content">
          <h1>{cafe.name}</h1>
          <p>{cafe.about}</p>
          <div className="contact-info">
            <div className="contact-item">
              <FaPhone />
              <span>{'۰۲۱-۱۲۳۴۵۶۷۸'}</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>{cafe.address}</span>
            </div>
            <div className="contact-item">
              <FaClock />
              <span>{'هر روز از ۸ صبح تا ۱۲ شب'}</span>
            </div>
          </div>
        </div>
        <div className="scroll-down">
          <span>اسکرول کنید</span>
          <FaChevronDown />
        </div>
      </section>
      
      {/* Menu Section */}
      <section ref={menuRef} className="menu-section">
        <h2 className="section-title">منوی کافه</h2>
        
        <div className="menu-categories">
          <button 
            className="category-btn active" 
            onClick={() => filterMenuItems('all')}
            data-category="all"
          >
            همه
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              className="category-btn"
              onClick={() => filterMenuItems(category.name)}
              data-category={category.name}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div ref={menuItemsRef} className="menu-items">
          {categories.map((category) => (
            category.items.map((item) => (
              <div 
                key={item.id}
                className="menu-item"
                data-category={category.name}
              >
                <div className="item-image">
                  {getCategoryIcon(category.name)}
                </div>
                <div className="item-details">
                  <div className="item-header">
                    <h3 className="item-name">{item.item}</h3>
                    {item.price && (
                      <span className="item-price">
                        {item.price.toLocaleString()} تومان
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="item-desc">{item.description}</p>
                  )}
                </div>
              </div>
            ))
          ))}
        </div>
      </section>
      
      {/* Back to top button */}
      <div 
        ref={backToTopRef}
        className="back-to-top"
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background-color: #121212;
          color: #e0e0e0;
          overflow-x: hidden;
          font-family: 'Vazirmatn', sans-serif;
        }
        
        /* بخش معرفی کافه */
        .hero-section {
          height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }
        
        .logo {
          width: 150px;
          height: 150px;
          background-color: #333;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 30px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        .hero-content h1 {
          font-size: 2.5rem;
          margin-bottom: 15px;
          color: #bb86fc;
        }
        
        .hero-content p {
          font-size: 1.1rem;
          margin-bottom: 30px;
          max-width: 600px;
          line-height: 1.6;
          color: #b0b0b0;
        }
        
        .contact-info {
          display: flex;
          gap: 20px;
          margin-top: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: #b0b0b0;
        }
        
        .scroll-down {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #bb86fc;
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-20px) translateX(-50%);
          }
          60% {
            transform: translateY(-10px) translateX(-50%);
          }
        }
        
        /* بخش منو */
        .menu-section {
          padding: 60px 20px;
          background-color: #1e1e1e;
          min-height: 100vh;
          transform: translateX(100%);
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 40px;
          color: #bb86fc;
          font-size: 2rem;
          position: relative;
        }
        
        .section-title:after {
          content: '';
          display: block;
          width: 80px;
          height: 4px;
          background-color: #bb86fc;
          margin: 10px auto;
          border-radius: 2px;
        }
        
        .menu-categories {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .category-btn {
          padding: 8px 20px;
          background-color: #333;
          border: none;
          border-radius: 20px;
          color: #e0e0e0;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .category-btn.active, .category-btn:hover {
          background-color: #bb86fc;
          color: #121212;
        }
        
        .menu-items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
          max-width: 1200px;
          margin: 0 auto;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .menu-item {
          background-color: #2d2d2d;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
          border: 1px solid #333;
        }
        
        .menu-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
        
        .item-image {
          height: 200px;
          background-color: #333;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #bb86fc;
          font-size: 3rem;
        }
        
        .item-details {
          padding: 20px;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .item-name {
          font-weight: 700;
          color: #bb86fc;
          font-size: 1.2rem;
        }
        
        .item-price {
          font-weight: 700;
          color: #bb86fc;
          background-color: #333;
          padding: 3px 10px;
          border-radius: 15px;
          font-size: 0.9rem;
        }
        
        .item-desc {
          color: #b0b0b0;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 15px;
        }
        
        /* دکمه برگشت به بالا */
        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background-color: #bb86fc;
          color: #121212;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 100;
        }
        
        .back-to-top.active {
          opacity: 1;
          visibility: visible;
        }
        
        .back-to-top:hover {
          background-color: #9a67cc;
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
};

export default DarkBlueTemplate;