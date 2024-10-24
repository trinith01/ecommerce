import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import HeroSecImg from '../Components/Assets/hero1.jpg';
import iphone from '../Components/Assets/p1.png';
import electronic from '../Components/Assets/electronic.avif';
import toy from '../Components/Assets/toys.jpg';
import { image } from "framer-motion/client";

function Home() {
  const controlsHero = useAnimation();
  const controlsOffers = useAnimation();
  const controlsCategories = useAnimation();
  
  const offersRef = useRef(null);
  const categoriesRef = useRef(null);
  const heroRef = useRef(null);

  let categories = [
    {
      id: 1,
      name: "Electronics",
      image: electronic,
      description: "Discover the latest electronics, featuring top-rated gadgets and must-have devices for every need. From smartphones to home appliances, find the perfect tech to elevate your lifestyle.",
    },
    {
      id: 2,
      name: "Toys",
      image: toy,
      description: "Find fun and excitement with our diverse range of toys for all ages. From educational games to playful accessories, we have something to spark joy and creativity in every child.",
    },
  ]

  // Effect to animate the hero section text on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const { top } = heroRef.current.getBoundingClientRect();
        if (top < window.innerHeight * 0.75) {
          controlsHero.start({ x: 0, opacity: 1 });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controlsHero]);

  // Effect to animate the offers section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (offersRef.current) {
        const { top } = offersRef.current.getBoundingClientRect();
        if (top < window.innerHeight * 0.75) {
          controlsOffers.start({ opacity: 1, x: 0, transition: { duration: 0.5 } });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controlsOffers]);

  // Effect to animate the categories section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (categoriesRef.current) {
        const { top } = categoriesRef.current.getBoundingClientRect();
        if (top < window.innerHeight * 0.75) {
          controlsCategories.start({ opacity: 1, x: 0, transition: { duration: 0.5 } });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controlsCategories]);

  return (
    <div className="text-white pt-10">

      {/* Hero Section */}
      <motion.section
        className="bg-gray-900 text-white py-20 h-[100vh] flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} // Keep this for the fade-in effect
        transition={{ duration: 1 }}
        ref={heroRef}
        style={{
          backgroundImage: `url(${HeroSecImg})`,
          backgroundSize: 'cover', // Makes sure the image covers the whole section
          backgroundPosition: 'center', // Ensures the image is centered
          backgroundRepeat: 'no-repeat' // Prevents the image from repeating
        }}
      >
        <div
          className="container mx-auto flex flex-col items-start text-left"
        >
          <h1
            className="text-left text-7xl font-bold mb-4"
          >
            Shop with us <br /> 
            where quality meets ease
          </h1>

          <motion.p
            className="text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Buy Whatever You Want
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        className="bg-gray-100 py-20"
        initial={{ opacity: 0 }}
        animate={controlsCategories} // Animated on scroll
        ref={categoriesRef}
      >
        <div className="container mx-auto text-center justify-center items-center">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial={{ opacity: 0 }} // Initially hidden
            animate={{ opacity: 1 }} // Fade in on scroll
            transition={{ duration: 1 }}
          >
            {categories.map((category, index) => (
              <motion.div 
              key={index} 
              className="relative p-6 rounded-3xl shadow-lg py-20"
              initial={{ x: -100, opacity: 0 }} // Initially off-screen
              animate={controlsCategories} // Animated on scroll
              transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger effect
              whileHover={{ scale: 1.05 }} // Scale on hover
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: 'cover', // Makes sure the image covers the whole section
                backgroundPosition: 'center', // Ensures the image is centered
                backgroundRepeat: 'no-repeat' // Prevents the image from repeating
              }}
            >
              {/* Black background overlay */}
              <div className="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>
            
              {/* Content on top of the over4lay */}
              <h3 className="relative text-5xl font-bold text-white mb-9 ">{category.name}</h3>
              <p className="relative text-lg bg-transparent text-white z-10">{category.description}</p>
            </motion.div>
            
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Special Monthly Offers Section */}
      <motion.section
        className="bg-black text-white py-20"
        initial={{ opacity: 0 }}
        animate={controlsOffers} // Animated on scroll
        ref={offersRef}
      >
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-5xl font-bold mb-6"
            initial={{ x: -100, opacity: 0 }} // Initially off-screen
            animate={controlsOffers} // Animated on scroll
            transition={{ duration: 0.5 }}
          >
            Special Monthly Offers
          </motion.h2>
          <div className="flex justify-between px-[250px] items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }} // Initially off-screen
              animate={controlsOffers} // Animated on scroll
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }} // Scale on hover
            >
              <img src={iphone} alt="iphone" />
            </motion.div>
            <div className="text-center justify-center p-10 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white items-center rounded-3xl">
                <h3 className="text-3xl font-bold mb-4">Rs.24500.00</h3>
                <p className="text-xl mb-2 hover:bg-transparent text-white">25% OFF</p>
                <p className="text-lg mb-4 hover:bg-transparent text-white">Feel the beat, Live the Moment</p>
                <motion.button
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 px-4 rounded-3xl border border-white"
                  whileHover={{ scale: 1.1 }}
                >
                  Buy Now
                </motion.button>
                <motion.button
                  className="ml-4 bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded-3xl"
                  whileHover={{ scale: 1.1 }}
                >
                  Add to Cart
                </motion.button>
              </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;