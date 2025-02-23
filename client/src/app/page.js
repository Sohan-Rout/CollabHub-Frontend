'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaUsers, FaBriefcase, FaInstagram, FaLinkedin, FaHandshake, FaFacebook, FaCogs, FaChartLine, FaTachometerAlt, FaLink, FaLightbulb, FaShieldAlt, FaChartPie, FaRobot } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import CustomTypewriter from "@/app/components/CustomTypewriter";
import TestimonialCarousel from "@/app/components/TestimonialCarousel";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import ChatBot from "@/app/components/ChatBot"; // Import the ChatBot component

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isBrandView, setIsBrandView] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => (prev < 100 ? prev + 1 : prev));
    }, 10);

    const timer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(interval);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const texts = [
    "Connect with top influencers.",
    "Find the perfect brand collaborations.",
    "Grow your audience and revenue.",
    "Join CollabHub today!",
  ];

  // Loading screen component
  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <p className="mt-4 text-5xl font-light text-amber-500 animate-fadeInOut font-poppins">
            <span className="text-gray-800">Welcome</span>!
          </p>
          <p className="mt-4 pt-20 text-lg text-gray-500">{loadingProgress}%</p>
        </div>
      </div>
    );
  }

  // Testimonials data
  const testimonialsData = [
    {
      image: "/testimonial-1.jpg",
      quote: "CollabHub has completely transformed how I connect with brands. The platform is intuitive, and the AI matching is spot on!",
      name: "Sarah Johnson",
      role: "Content Creator",
    },
    {
      image: "/testimonial-2.jpg",
      quote: "As a brand, finding the right influencers was always a challenge. CollabHub made it effortless and effective!",
      name: "Michael Brown",
      role: "Marketing Manager",
    },
    {
      image: "/testimonial-3.jpg",
      quote: "The escrow feature gives me peace of mind. I know my payments are secure until the work is done. Highly recommend!",
      name: "Emily Davis",
      role: "Influencer",
    },
  ];

  // Animation variants for framer-motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Cards for Brands
  const brandCards = [
    {
      icon: <FaCogs className="text-5xl text-purple-500" />,
      title: "Ad Campaign Builder",
      description:
        "Easily create and launch ad campaigns with our intuitive tools. Define your goals, target audience, and budget in just a few clicks.",
    },
    {
      icon: <FaUsers className="text-5xl text-purple-500" />,
      title: "Choose Creators",
      description:
        "Select from a curated list of top-tier influencers. Filter by niche, audience size, engagement rate, and more to find the perfect match.",
    },
    {
      icon: <FaRobot className="text-5xl text-purple-500" />,
      title: "Automated Campaign Matching",
      description:
        "Our AI analyzes your campaign requirements and suggests the best influencers for your brand, saving you time and effort.",
    },
    {
      icon: <FaShieldAlt className="text-5xl text-purple-500" />,
      title: "Escrow Payment System",
      description:
        "Secure your payments with our escrow system. Funds are released only when the campaign deliverables are approved.",
    },
    {
      icon: <FaChartPie className="text-5xl text-purple-500" />,
      title: "Collaboration Dashboard",
      description:
        "Manage all your campaigns and partnerships in one place. Track progress, communicate with creators, and monitor performance.",
    },
    {
      icon: <FaChartLine className="text-5xl text-purple-500" />,
      title: "Analytics & Performance Tracking",
      description:
        "Get detailed insights into your campaign performance. Track ROI, engagement, and audience growth in real-time.",
    },
  ];

  // Cards for Influencers
  const influencerCards = [
    {
      icon: <FaShieldAlt className="text-5xl text-purple-500" />,
      title: "Secure Payments",
      description:
        "Get paid securely through escrow accounts. Funds are released only when the work is completed and approved.",
    },
    {
      icon: <FaLightbulb className="text-5xl text-purple-500" />,
      title: "AI-Powered Suggestions",
      description:
        "Receive personalized content ideas and strategies powered by AI to boost your creativity and engagement.",
    },
    {
      icon: <FaTachometerAlt className="text-5xl text-purple-500" />,
      title: "Custom Dashboard",
      description:
        "Manage all your collaborations, track performance, and access insights in one centralized dashboard.",
    },
    {
      icon: <FaHandshake className="text-5xl text-purple-500" />,
      title: "AI-Based Matching",
      description:
        "Our AI matches you with brands that align with your niche, audience, and content style for seamless collaborations.",
    },
    {
      icon: <FaChartLine className="text-5xl text-purple-500" />,
      title: "Social Analytics",
      description:
        "Track your campaign performance, audience growth, and engagement metrics in real-time to optimize your content.",
    },
    {
      icon: <FaLink className="text-5xl text-purple-500" />,
      title: "Multi-Platform Integration",
      description:
        "Run campaigns across multiple platforms like Instagram, YouTube, TikTok, and more—all from one place.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-0 py-12 pb-0">
      {/* Animated Heading */}
      <motion.h1
        id="Home"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl font-semibold text-gray-900 text-center font-poppins"
      >
        Connect Brands & Content Creators
      </motion.h1>

      {/* Animated Paragraph */}
      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-lg text-gray-600 mt-4 text-center max-w-2xl"
      >
        A seamless platform where brands find the perfect content creators for
        their campaigns, and influencers discover the best brand deals.
      </motion.p>

      {/* Animated Custom Typing Effect */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 font-indie-flower"
      >
        <CustomTypewriter texts={texts} speed={100} delay={1000} />
      </motion.div>

      {/* Animated Arrow */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-2 flex justify-center"
      >
        <img src="/arrow.svg" alt="Curvy Arrow" className="rotate-arrow z-10" />
      </motion.div>

      {/* Animated Button */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-6 flex space-x-4"
      >
        <Button className="px-6 py-2 text-lg bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          Get <span className="text-amber-500">Started</span>
        </Button>
      </motion.div>

      {/* Animated Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl"
      >
        {/* For Content Creators Card */}
        <motion.div
          whileHover={{
            y: -10,
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-6 shadow-lg rounded-lg bg-white cursor-pointer"
        >
          <CardContent className="flex flex-col items-center text-center">
            <FaUsers className="text-5xl text-purple-500" />
            <h3 className="text-2xl font-semibold mt-4">
              For Content Creators
            </h3>
            <p className="text-gray-600 mt-2">
              Find exciting brand collaborations and grow your influence.
            </p>
          </CardContent>
        </motion.div>

        {/* For Brands Card */}
        <motion.div
          whileHover={{
            y: -10,
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-6 shadow-lg rounded-lg bg-white cursor-pointer"
        >
          <CardContent className="flex flex-col items-center text-center">
            <FaBriefcase className="text-5xl text-purple-500" />
            <h3 className="text-2xl font-semibold mt-4">For Brands</h3>
            <p className="text-gray-600 mt-2">
              Connect with the right creators to elevate your marketing
              campaigns.
            </p>
          </CardContent>
        </motion.div>

        {/* Seamless Collaboration Card */}
        <motion.div
          whileHover={{
            y: -10,
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-6 shadow-lg rounded-lg bg-white cursor-pointer"
        >
          <CardContent className="flex flex-col items-center text-center">
            <FaHandshake className="text-5xl text-purple-500" />
            <h3 className="text-2xl font-semibold mt-4">
              Seamless Collaboration
            </h3>
            <p className="text-gray-600 mt-2">
              Manage deals, track progress, and get results in one place.
            </p>
          </CardContent>
        </motion.div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        id="HowItWorks"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="mt-20 w-full max-w-6xl px-6"
      >
        <h2 className="text-4xl font-semibold text-gray-900 text-center font-poppins ">
          - How It <span className="text-amber-500">Works</span>
        </h2>

        {/* For Brands and For Influencers Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-12 flex justify-center space-x-8"
        >
          <Button
            onClick={() => setIsBrandView(true)}
            className={`px-8 py-4 text-lg min-w-20 ${
              isBrandView
                ? "bg-amber-500 text-gray-900"
                : "bg-gray-800 text-amber-500"
            } hover:bg-amber-600 hover:text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <span className="text-white">For</span> Brands
          </Button>
          <Button
            onClick={() => setIsBrandView(false)}
            className={`px-8 py-4 text-lg ${
              !isBrandView
                ? "bg-amber-500 text-gray-900"
                : "bg-gray-800 text-amber-500"
            } hover:bg-amber-600 hover:text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <span className="text-white">For</span> Influencers
          </Button>
        </motion.div>

        {/* Arrow Image */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-4 flex justify-center"
        >
          <motion.img
            src="/arrowTwoBranch.png"
            alt="Curvy Arrow"
            className="w-auto h-32 pt-4"
            style={{ rotate: 90 }}
            animate={{
              x: [0, -5, 5, -5, 5, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </motion.div>

        {/* Cards Section with Flip Animation */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {isBrandView
              ? brandCards.map((card, index) => (
                  <motion.div
                    key={`brand-${index}`}
                    initial={{ opacity: 0, rotateY: 180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -180 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{
                      y: -10,
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                    className="p-6 shadow-lg rounded-lg bg-white cursor-pointer"
                  >
                    <CardContent className="flex flex-col items-center text-center">
                      {card.icon}
                      <h3 className="text-2xl font-semibold mt-4">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{card.description}</p>
                    </CardContent>
                  </motion.div>
                ))
              : influencerCards.map((card, index) => (
                  <motion.div
                    key={`influencer-${index}`}
                    initial={{ opacity: 0, rotateY: -180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{
                      y: -10,
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                    className="p-6 shadow-lg rounded-lg bg-white cursor-pointer"
                  >
                    <CardContent className="flex flex-col items-center text-center">
                      {card.icon}
                      <h3 className="text-2xl font-semibold mt-4">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{card.description}</p>
                    </CardContent>
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* About Us Section */}
      <motion.div
        id="AboutUs"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 2.0 }}
        className="mt-20 w-full max-w-6xl px-6"
      >
        <h2 className="text-4xl font-semibold text-gray-900 text-center font-poppins">
          - About <span className="text-amber-500">Us</span>
        </h2>

        {/* About Us Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-600 px-10">
            CollabHub is an innovative platform designed to bridge the gap
            between brands and content creators, streamlining the process of
            collaboration. In today's fast-paced digital world, brands often
            struggle to find the right creators to effectively promote their
            products, while creators face challenges in discovering brand deals
            that align with their content and audience. CollabHub solves these
            problems by providing a seamless space where both parties can easily
            connect and form mutually beneficial partnerships.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Founded in 2025, we are a team of innovators, designers, and
            marketers dedicated to revolutionizing the way brands and
            influencers connect. We believe in transparency, creativity, and the
            power of collaboration.
          </p>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          id="Testonomials"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 2.6 }}
          className="mt-20 w-full max-w-6xl px-6"
        >
          <h2 className="text-4xl font-semibold text-gray-900 text-center font-poppins">
            - What <span className="text-amber-500">They Say</span>
          </h2>

          {/* Testimonials Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Testimonial 1 */}
            <motion.div
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-6 shadow-lg rounded-lg bg-white cursor-pointer"
            >
              <CardContent className="flex flex-col items-center text-center">
                <img
                  src="/Sarah.jpeg"
                  alt="Testimonial 1"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <p className="text-gray-600 mt-4 italic">
                  "CollabHub has completely transformed how I connect with
                  brands. The platform is intuitive, and the AI matching is spot
                  on!"
                </p>
                <h3 className="text-xl font-semibold mt-4">Sarah Johnson</h3>
                <p className="text-amber-500">Content Creator</p>
              </CardContent>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-6 shadow-lg rounded-lg bg-white cursor-pointer"
            >
              <CardContent className="flex flex-col items-center text-center">
                <img
                  src="/Michael.jpeg"
                  alt="Testimonial 2"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <p className="text-gray-600 mt-4 italic">
                  "As a brand, finding the right influencers was always a
                  challenge. CollabHub made it effortless and effective!"
                </p>
                <h3 className="text-xl font-semibold mt-4">Michael Brown</h3>
                <p className="text-amber-500">Marketing Manager</p>
              </CardContent>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-6 shadow-lg rounded-lg bg-white cursor-pointer"
            >
              <CardContent className="flex flex-col items-center text-center">
                <img
                  src="/Emily.jpeg"
                  alt="Testimonial 3"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <p className="text-gray-600 mt-4 italic">
                  "The escrow feature gives me peace of mind. I know my payments
                  are secure until the work is done. Highly recommend!"
                </p>
                <h3 className="text-xl font-semibold mt-4">Emily Davis</h3>
                <p className="text-amber-500">Influencer</p>
              </CardContent>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          id="Faqs"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 3.0 }}
          className="mt-20 w-full max-w-6xl px-6"
        >
          <h2 className="text-4xl font-semibold text-gray-900 text-center font-poppins">
            - FAQ<span className="text-amber-500">s</span>
          </h2>

          {/* FAQ Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 3.2 }}
            className="mt-12 space-y-6"
          >
            {/* FAQ Item 1 */}
            <details className="group p-6 shadow-lg rounded-lg bg-white cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-gray-800 text-lg">
                What is CollabHub?
                <span className="text-amber-500 transform transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="text-gray-600 mt-4">
                CollabHub is a platform that connects brands with content
                creators for seamless collaborations. It uses AI-based matching
                to ensure the best partnerships for both parties.
              </p>
            </details>

            {/* FAQ Item 2 */}
            <details className="group p-6 shadow-lg rounded-lg bg-white cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-gray-800 text-lg">
                How does the AI-based matching work?
                <span className="text-amber-500 transform transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="text-gray-600 mt-4">
                Our AI analyzes factors like niche, audience demographics, and
                campaign goals to match brands with the most suitable content
                creators.
              </p>
            </details>

            {/* FAQ Item 3 */}
            <details className="group p-6 shadow-lg rounded-lg bg-white cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-gray-800 text-lg">
                Is CollabHub free to use?
                <span className="text-amber-500 transform transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="text-gray-600 mt-4">
                Yes, CollabHub is free for content creators. Brands may have
                subscription plans depending on their needs.
              </p>
            </details>

            {/* FAQ Item 4 */}
            <details className="group p-6 shadow-lg rounded-lg bg-white cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-gray-800 text-lg">
                How secure are payments on CollabHub?
                <span className="text-amber-500 transform transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="text-gray-600 mt-4">
                Payments are secured through an escrow system. Funds are
                released only when the work is completed and approved by both
                parties.
              </p>
            </details>

            {/* FAQ Item 5 */}
            <details className="group p-6 shadow-lg rounded-lg bg-white cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-gray-800 text-lg">
                Can I collaborate with international brands?
                <span className="text-amber-500 transform transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <p className="text-gray-600 mt-4">
                Absolutely! CollabHub supports global collaborations, allowing
                you to connect with brands and creators from around the world.
              </p>
            </details>
          </motion.div>
        </motion.div>

        {/* Let’s Get in Touch Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 3.0 }}
          className="mt-20 w-full max-w-6xl px-6"
        >
          <h2 className="text-4xl font-semibold text-gray-900 text-center font-poppins">
            - Let’s <span className="text-amber-500">Get in Touch</span>
          </h2>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 3.2 }}
            className="text-lg text-gray-600 mt-4 text-center max-w-2xl mx-auto"
          >
            Ready to take your brand or content to the next level? Reach out to us
            today and let’s create something amazing together!
          </motion.p>

          {/* Contact Button */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 3.4 }}
            className="mt-8 flex justify-center"
          >
            <Button className="px-8 py-4 text-lg font-poppins text-gray-900 bg-amber-500 hover:bg-amber-600 shadow-lg hover:shadow-xl transition-all duration-300">
              Contact Us
            </Button>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 3.6 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows="4"
                className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-25 px-8 py-4 text-lg font-poppins bg-amber-500 text-gray-900 hover:bg-amber-600 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* Footer Section */}
        <footer className="bg-black text-white mt-20 font-poppins py-12">
          <div className="max-w-auto mx-auto px-6">
            {/* Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* About Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">About CollabHub</h3>
                <p className="text-gray-400">
                  CollabHub is the ultimate platform for brands and content
                  creators to connect, collaborate, and grow together.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Newsletter Signup */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                  Subscribe to our newsletter to get the latest updates and
                  offers.
                </p>
                <form className="flex flex-col space-y-4">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="p-3 w-full border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <Button
                    type="submit"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    <FaFacebook className="text-2xl" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    <FaXTwitter className="text-2xl" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    <FaInstagram className="text-2xl" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mt-8 pt-8">
              {/* Copyright Notice */}
              <p className="text-center text-gray-400">
                © {new Date().getFullYear()} CollabHub. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </motion.div>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
}