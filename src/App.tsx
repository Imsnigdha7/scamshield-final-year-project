/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Menu, X, Sun, Moon, Mail, Globe, Lock, Users, AlertTriangle, BookOpen, CheckCircle, TrendingUp, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Routes, Route, useNavigate, useLocation, useParams, Link } from 'react-router-dom';
const API_BASE = 'http://localhost:5000';

// Theme Context
const ThemeContext = React.createContext();

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('scamshield-theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('scamshield-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Navigation Component
// Navigation Component
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, setIsDark } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Education', path: '/education' },
    { name: 'Tools', path: '/tools' },
    { name: 'Community', path: '/community' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) =>
    location.pathname === path ||
    (path === '/' && location.pathname === '');

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ScamShield
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Get Protected
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Get Protected
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};


// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">ScamShield</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Protecting and educating every internet user against online scams. Simple, powerful, and built for everyone.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Blog</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Report a Scam</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">FAQs</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 ScamShield. All rights reserved. Stay safe online.</p>
        </div>
      </div>
    </footer>
  );
};

// Home Page
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              ScamShield: Simple Cybersecurity for All
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              A powerful tool to protect and educate every internet user against scams. Real-time detection, simple explanations, and safe browsing for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/education')
}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
              >
                Start Learning
              </button>
              <button
                onClick={() => navigate('/tools')}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors font-medium text-lg"
              >
                Check a Website
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What ScamShield Does */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What ScamShield Does
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 dark:bg-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-block p-4 bg-blue-600 rounded-full mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Real-time Scam Detection</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Instantly analyze emails, websites, and links to identify potential scams before they harm you.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-block p-4 bg-green-600 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Simple Explanations & Tips</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Learn how scams work with clear, jargon-free language that anyone can understand.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-block p-4 bg-purple-600 rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Safe Browsing for Everyone</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Designed for non-tech users, making cybersecurity accessible to all ages and skill levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Simplicity Matters */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Simplicity Matters
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Cybersecurity shouldn't require a computer science degree. ScamShield is built specifically for non-tech-savvy users, using plain language and intuitive design to make online safety accessible to everyone. Whether you're a senior citizen, a busy parent, or simply someone who wants straightforward protection, ScamShield meets you where you are.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Technical Jargon</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We explain threats in everyday language that makes sense to everyone.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Clear Visual Guides</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Step-by-step instructions with helpful visuals guide you through protection.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Instant Feedback</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Get immediate, easy-to-understand results when checking for scams.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Built for Trust</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Transparent processes help you understand exactly how we protect you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future-Proofing */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Future-Proofing Digital Safety
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-6 h-full">
                <div className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-2">2024</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Launch Protection</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Core scam detection and educational resources for immediate safety.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-6 h-full">
                <div className="text-green-600 dark:text-green-400 font-bold text-lg mb-2">2025</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">AI Enhancement</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Advanced machine learning to detect emerging scam patterns in real-time.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-6 h-full">
                <div className="text-purple-600 dark:text-purple-400 font-bold text-lg mb-2">2026</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Global Network</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Community-powered threat sharing to protect users worldwide instantly.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-orange-100 dark:bg-orange-900/30 rounded-xl p-6 h-full">
                <div className="text-orange-600 dark:text-orange-400 font-bold text-lg mb-2">Beyond</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Proactive Defense</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Predictive protection that stops scams before they reach you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Education Page
const EducationPage = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const scamAlerts = [
    {
      title: "Phishing Email Alert",
      description: "New phishing campaign targeting online banking users. Learn to spot fake bank emails.",
      severity: "high"
    },
    {
      title: "Tech Support Scam",
      description: "Scammers claiming to be from Microsoft are calling users. Never share remote access.",
      severity: "medium"
    },
    {
      title: "Romance Scam Warning",
      description: "Increase in dating app scams. Be cautious of people asking for money or gift cards.",
      severity: "high"
    },
    {
      title: "Package Delivery Scam",
      description: "Fake delivery notifications with malicious links. Always check tracking on official sites.",
      severity: "medium"
    }
  ];

  const tips = [
    {
      title: "Check the Sender",
      description: "Always verify the email address. Scammers often use similar-looking domains.",
      icon: <Mail className="w-6 h-6" />
    },
    {
      title: "Look for HTTPS",
      description: "Secure websites start with 'https://' and show a padlock icon in the browser.",
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: "Trust Your Instincts",
      description: "If something feels too good to be true, it probably is. Take time to verify.",
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      title: "Never Share Passwords",
      description: "Legitimate companies will never ask for your password via email or phone.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Verify Links First",
      description: "Hover over links to see the real URL before clicking. Use our website checker tool.",
      icon: <Search className="w-6 h-6" />
    }
  ];

  const nextTip = () => {
    setCarouselIndex((prev) => (prev + 1) % tips.length);
  };

  const prevTip = () => {
    setCarouselIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Education Center
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Latest Scam Alerts */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
                Latest Scam Alerts
              </h2>
              <div className="space-y-4">
                {scamAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'high'
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-600'
                        : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-600'
                    }`}
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{alert.title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{alert.description}</p>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      Read more →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learn the Basics */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
                Learn the Basics
              </h2>

              <div className="space-y-6">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Empowering Users Through Simplicity
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Cybersecurity doesn't have to be complicated. We believe that everyone deserves to feel safe online, regardless of their technical background. Our approach strips away the complexity and focuses on what matters most: keeping you protected with tools and information that are easy to understand and use.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Through clear explanations, visual guides, and practical examples, we empower you to make informed decisions about your online safety. No confusing terminology, no overwhelming technical details—just straightforward protection you can trust.
                  </p>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Building Trust with Clear Guidance
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Trust is the foundation of online safety. We build that trust by being transparent about how our tools work and providing guidance that's honest and actionable. When we detect a potential scam, we don't just warn you—we explain why it's suspicious and what you can do about it.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our educational content is designed to help you develop your own instincts for spotting scams. Over time, you'll become more confident in your ability to navigate the digital world safely, with ScamShield as your trusted companion.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Future-Proofing Digital Safety
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Scammers constantly evolve their tactics, but so do we. ScamShield is designed to grow and adapt alongside emerging threats, ensuring you're always protected against the latest scams. Our system learns from new patterns, community reports, and global threat intelligence to stay one step ahead.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    By combining cutting-edge technology with timeless principles of digital safety, we're building a platform that protects you today and tomorrow. Your safety is our priority, now and into the future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Quick Safety Tips
          </h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                {tips.map((tip, index) => (
                  <div key={index} className="w-full shrink-0 px-4">
                    <div className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 text-center max-w-2xl mx-auto">
                      <div className="inline-block p-4 bg-blue-600 rounded-full mb-4">
                        {React.cloneElement(tip.icon, { className: "w-6 h-6 text-white" })}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{tip.title}</h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={prevTip}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous tip"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              onClick={nextTip}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Next tip"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
          <div className="flex justify-center mt-6 space-x-2">
            {tips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCarouselIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === carouselIndex ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to tip ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tools Page
const ToolsPage = () => {
  const [emailText, setEmailText] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [password, setPassword] = useState('');
  const [emailResult, setEmailResult] = useState(null);
  const [websiteResult, setWebsiteResult] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const analyzeEmail = async () => {
    if (!emailText.trim()) {
      setEmailResult({
        safe: false,
        message: 'Please enter some email text first.',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/analyze-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: emailText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setEmailResult({
          safe: false,
          message: errorData.message || 'Error analyzing email. Please try again.',
        });
        return;
      }

      const data = await response.json();
      setEmailResult({
        safe: data.safe,
        message: data.message,
      });
    } catch (err) {
      console.error(err);
      setEmailResult({
        safe: false,
        message: 'Could not reach ScamShield server. Is it running?',
      });
    }
  };


  const checkWebsite = async () => {
    if (!websiteUrl.trim()) {
      setWebsiteResult({
        safe: false,
        message: 'Please enter a website URL first.',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/check-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: websiteUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setWebsiteResult({
          safe: false,
          message: errorData.message || 'Error checking website. Please try again.',
        });
        return;
      }

      const data = await response.json();
      setWebsiteResult({
        safe: data.safe,
        message: data.message,
      });
    } catch (err) {
      console.error(err);
      setWebsiteResult({
        safe: false,
        message: 'Could not reach ScamShield server. Is it running?',
      });
    }
  };


  const checkPassword = (pwd) => {
    setPassword(pwd);
    
    if (pwd.length === 0) {
      setPasswordStrength(null);
      return;
    }

    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const isLongEnough = pwd.length >= 12;

    const strength = [hasUpper, hasLower, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;

    setPasswordStrength({
      level: strength <= 2 ? 'weak' : strength <= 4 ? 'medium' : 'strong',
      percentage: (strength / 5) * 100,
      suggestions: [
        !hasUpper && 'Add uppercase letters',
        !hasLower && 'Add lowercase letters',
        !hasNumber && 'Add numbers',
        !hasSpecial && 'Add special characters (!@#$%)',
        !isLongEnough && 'Make it at least 12 characters long'
      ].filter(Boolean)
    });
  };

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Scam Detection Tools
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Use our free tools to check emails, websites, and passwords for potential security risks.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Email Analyzer */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Email Analyzer</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Paste a suspicious email to check for common phishing patterns and scam indicators.
            </p>
            <textarea
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder="Paste the email content here..."
              className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
            />
            <button
              onClick={analyzeEmail}
              className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Analyze Email
            </button>
            {emailResult && (
              <div className={`mt-4 p-4 rounded-lg ${
                emailResult.safe 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center mb-2">
                  {emailResult.safe ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                  )}
                  <span className={`font-bold ${
                    emailResult.safe ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'
                  }`}>
                    {emailResult.safe ? 'Looks Safe' : 'Suspicious'}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{emailResult.message}</p>
              </div>
            )}
          </div>

          {/* Website Checker */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Website Checker</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Enter a website URL to check for security issues and potential scam indicators.
            </p>
            <input
              type="text"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={checkWebsite}
              className="mt-4 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Check Website
            </button>
            {websiteResult && (
              <div className={`mt-4 p-4 rounded-lg ${
                websiteResult.safe 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
              }`}>
                <div className="flex items-center mb-2">
                  {websiteResult.safe ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                  )}
                  <span className={`font-bold ${
                    websiteResult.safe 
                      ? 'text-green-900 dark:text-green-100' 
                      : 'text-yellow-900 dark:text-yellow-100'
                  }`}>
                    {websiteResult.safe ? 'Looks Safe' : 'Caution Advised'}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{websiteResult.message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Password Strength Checker */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-3xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
              <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Password Strength Checker</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Test your password strength and get suggestions for improvement. Your password is not stored or transmitted.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => checkPassword(e.target.value)}
            placeholder="Enter a password to test..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          
          {passwordStrength && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Strength:</span>
                <span className={`text-sm font-bold ${
                  passwordStrength.level === 'weak' 
                    ? 'text-red-600 dark:text-red-400'
                    : passwordStrength.level === 'medium'
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-green-600 dark:text-green-400'
                }`}>
                  {passwordStrength.level.toUpperCase()}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    passwordStrength.level === 'weak'
                      ? 'bg-red-600'
                      : passwordStrength.level === 'medium'
                      ? 'bg-yellow-600'
                      : 'bg-green-600'
                  }`}
                  style={{ width: `${passwordStrength.percentage}%` }}
                />
              </div>
              {passwordStrength.suggestions.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="font-medium text-gray-900 dark:text-white mb-2">Suggestions:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    {passwordStrength.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const StoryDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [replyText, setReplyText] = useState('');
  const [replySubmitting, setReplySubmitting] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<{ id: number; name: string; email: string } | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/api/stories/${id}`);
        if (!res.ok) {
          throw new Error('Failed to load story');
        }
        const data = await res.json();
        // Make sure replies and likes always exist as arrays
        if (!Array.isArray(data.replies)) data.replies = [];
        if (!Array.isArray(data.likes)) data.likes = [];
        setStory(data);
      } catch (err) {
        console.error(err);
        setError('Could not load this story. It may have been removed.');
      } finally {
        setLoading(false);
      }
    };

    // Load current user from localStorage
    try {
      const rawUser = localStorage.getItem('scamshield_user');
      if (rawUser) {
        setCurrentUser(JSON.parse(rawUser));
      }
    } catch {
      // ignore
    }

    fetchStory();
  }, [id]);

  const handleSubmitReply = async () => {
    if (!currentUser) {
      alert('You must be logged in to reply. Please log in from the Community page.');
      navigate('/community');
      return;
    }

    if (!replyText.trim()) {
      setReplyError('Please enter a reply before submitting.');
      return;
    }

    const token = localStorage.getItem('scamshield_token');
    if (!token) {
      alert('Your session has expired. Please log in again.');
      setCurrentUser(null);
      navigate('/community');
      return;
    }

    setReplySubmitting(true);
    setReplyError(null);

    try {
      const res = await fetch(`${API_BASE}/api/stories/${id}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: replyText }),
      });

      const data = await res.json().catch(() => ({} as unknown));

      if (!res.ok) {
        setReplyError(data.message || 'Could not submit reply. Please try again.');
        return;
      }

      // Add the new reply to local state
      setStory((prev: unknown) =>
        prev
          ? {
              ...prev,
              replies: [...(Array.isArray(prev.replies) ? prev.replies : []), data],
            }
          : prev
      );

      setReplyText('');
    } catch (err) {
      console.error(err);
      setReplyError('Network error while submitting your reply.');
    } finally {
      setReplySubmitting(false);
    }
  };
    const handleDeleteReply = async (replyId: number) => {
    if (!currentUser) {
      alert('You must be logged in to delete a reply.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this reply?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('scamshield_token');
    if (!token) {
      alert('Your session has expired. Please log in again.');
      setCurrentUser(null);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/stories/${id}/replies/${replyId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => ({} as unknown));

      if (!res.ok) {
        alert(data.message || 'Could not delete reply. Please try again.');
        return;
      }

      // Remove reply from local state
      setStory((prev: unknown) =>
        prev
          ? {
              ...prev,
              replies: (prev.replies || []).filter((r: unknown) => r.id !== replyId),
            }
          : prev
      );
    } catch (err) {
      console.error('Error deleting reply:', err);
      alert('Network error while deleting reply.');
    }
  };

  if (loading) {
    return (
      <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gray-700 dark:text-gray-300">Loading story...</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-red-600 dark:text-red-400 mb-4">
            {error || 'Story not found.'}
          </p>
          <Link
            to="/community"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Community
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <Link
          to="/community"
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm inline-block"
        >
          ← Back to Community
        </Link>

        {/* Story section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {story.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            by {story.author} • {new Date(story.date).toLocaleString()}
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg whitespace-pre-line text-gray-800 dark:text-gray-200">
            {story.body}
          </div>
        </div>

        {/* Replies section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Replies
          </h2>

          {/* Existing replies */}
          {Array.isArray(story.replies) && story.replies.length > 0 ? (
            <div className="space-y-4 mb-6">
              {story.replies.map((reply: unknown) => (
                <div
                  key={reply.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {reply.author}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {reply.createdAt
                          ? new Date(reply.createdAt).toLocaleString()
                          : ''}
                      </span>
                    </div>

                    {currentUser && (currentUser.id === reply.authorId || currentUser.id === story.authorId) && (
                      <button
                        onClick={() => handleDeleteReply(reply.id)}
                        className="text-xs text-red-600 dark:text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
                    {reply.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              No replies yet. Be the first to share how you would avoid this scam.
            </p>
          )}

          {/* Reply form */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Share how you would respond
            </h3>

            {!currentUser && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                You must{' '}
                <button
                  onClick={() => navigate('/community')}
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  log in
                </button>{' '}
                to post a reply.
              </p>
            )}

            {replyError && (
              <p className="text-sm text-red-600 dark:text-red-400 mb-2">
                {replyError}
              </p>
            )}

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={
                currentUser
                  ? 'Write your reply here...'
                  : 'Log in from the Community page to reply.'
              }
              disabled={!currentUser || replySubmitting}
              className="w-full h-28 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none mb-3 disabled:opacity-60"
            />

            <button
              onClick={handleSubmitReply}
              disabled={!currentUser || replySubmitting}
              className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium ${
                (!currentUser || replySubmitting) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {replySubmitting ? 'Posting Reply...' : 'Post Reply'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Community Page
// Community Page (replace your existing component)
// Community Page
const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stories' | 'share' | 'login'>('stories');

  // Story form state
  const [storyTitle, setStoryTitle] = useState('');
  const [storyWhat, setStoryWhat] = useState('');
  const [storyRealization, setStoryRealization] = useState('');

  // Stories list state
  const [stories, setStories] = useState<unknown[]>([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [storiesError, setStoriesError] = useState<string | null>(null);

  // Auth state (login/register)
  const [currentUser, setCurrentUser] = useState<{ id: number; name: string; email: string } | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [submittingStory, setSubmittingStory] = useState(false);

  // Load stories and user on mount
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoadingStories(true);
        setStoriesError(null);
        const res = await fetch(`${API_BASE}/api/stories`);
        if (!res.ok) throw new Error('Failed to load stories');
        const data = await res.json();
        setStories(data);
      } catch (err) {
        console.error(err);
        setStoriesError('Could not load community stories. Please try again later.');
      } finally {
        setLoadingStories(false);
      }
    };

    // Load user from localStorage
    try {
      const rawUser = localStorage.getItem('scamshield_user');
      if (rawUser) {
        setCurrentUser(JSON.parse(rawUser));
      }
    } catch {
      // ignore
    }

    fetchStories();
  }, []);

  // ----- Auth handlers -----
  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setAuthError('Please enter your email and password.');
      return;
    }
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.message || 'Login failed. Please try again.');
        return;
      }

      localStorage.setItem('scamshield_token', data.token);
      localStorage.setItem('scamshield_user', JSON.stringify(data.user));
      setCurrentUser(data.user);

      setLoginPassword('');
      setActiveTab('share');
    } catch (err) {
      console.error(err);
      setAuthError('Could not reach server. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!registerName.trim() || !registerEmail.trim() || !registerPassword.trim()) {
      setAuthError('Please fill in all registration fields.');
      return;
    }
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: registerName, email: registerEmail, password: registerPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.message || 'Registration failed. Please try again.');
        return;
      }

      localStorage.setItem('scamshield_token', data.token);
      localStorage.setItem('scamshield_user', JSON.stringify(data.user));
      setCurrentUser(data.user);

      setRegisterPassword('');
      setActiveTab('share');
    } catch (err) {
      console.error(err);
      setAuthError('Could not reach server. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('scamshield_token');
    localStorage.removeItem('scamshield_user');
    setCurrentUser(null);
    setActiveTab('login');
  };

  // ----- Story submit -----
  const handleSubmitStory = async () => {
    if (!currentUser) {
      alert('You must be logged in to share a story.');
      setActiveTab('login');
      return;
    }

    if (!storyTitle.trim() || !storyWhat.trim() || !storyRealization.trim()) {
      alert('Please fill in all fields before submitting your story.');
      return;
    }

    const token = localStorage.getItem('scamshield_token');
    if (!token) {
      alert('Your session has expired. Please log in again.');
      setCurrentUser(null);
      setActiveTab('login');
      return;
    }

    setSubmittingStory(true);

    try {
      const res = await fetch(`${API_BASE}/api/stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: storyTitle, what: storyWhat, realization: storyRealization }),
      });

      const data = await res.json().catch(() => ({} as unknown));

      if (!res.ok) {
        alert(data.message || 'Could not submit story. Please try again.');
        return;
      }

      setStories((prev) => [data, ...prev]);
      setStoryTitle('');
      setStoryWhat('');
      setStoryRealization('');
      setActiveTab('stories');
    } catch (err) {
      console.error(err);
      alert('Could not reach server. Is the backend running?');
    } finally {
      setSubmittingStory(false);
    }
  };

  // ----- Like / Unlike story -----
  const handleLikeStory = async (storyId: number) => {
    console.log('[FRONT] handleLikeStory clicked for id:', storyId);

    if (!currentUser) {
      alert('You must be logged in to like a story.');
      setActiveTab('login');
      return;
    }

    const token = localStorage.getItem('scamshield_token');
    console.log('[FRONT] token present?', !!token);

    if (!token) {
      alert('Your session has expired. Please log in again.');
      setCurrentUser(null);
      setActiveTab('login');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/stories/${storyId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({} as unknown));
      console.log('[FRONT] /like response status:', res.status, 'body:', data);

      if (!res.ok) {
        alert(data.message || `Like failed (status ${res.status})`);
        return;
      }

      // Update local state
      setStories((prev) =>
        prev.map((story) => {
          if (story.id !== storyId) return story;
          const likes: number[] = Array.isArray(story.likes) ? story.likes : [];
          const hasLiked = likes.includes(currentUser.id);
          const newLikes = hasLiked
            ? likes.filter((id) => id !== currentUser.id)
            : [...likes, currentUser.id];
          return { ...story, likes: newLikes };
        })
      );
    } catch (err) {
      console.error('[FRONT] Error liking story:', err);
      alert('Network error while liking this story.');
    }
  };

  // ----- Render -----
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
          Community
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12">
          Share your experiences and learn from others. Together, we can protect more people from scams.
        </p>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'stories'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Community Stories
          </button>
          <button
            onClick={() => setActiveTab('share')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'share'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Share Your Story
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'login'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Login / Register
          </button>
        </div>

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            {loadingStories && <p className="text-gray-600 dark:text-gray-400">Loading stories...</p>}
            {storiesError && <p className="text-red-600 dark:text-red-400">{storiesError}</p>}
            {!loadingStories && !storiesError && stories.length === 0 && (
              <p className="text-gray-600 dark:text-gray-400">
                No stories yet. Be the first to share your experience!
              </p>
            )}

            {!loadingStories &&
              !storiesError &&
              stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {story.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {story.date}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{story.preview}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      by {story.author}
                    </span>

                    <div className="flex items-center gap-4">
                      {/* Reply count */}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        💬 {Array.isArray(story.replies) ? story.replies.length : 0}
                      </span>

                      {/* Like button */}
                      <button
                        onClick={() => handleLikeStory(story.id)}
                        className={`text-sm font-medium ${
                          currentUser &&
                          Array.isArray(story.likes) &&
                          story.likes.includes(currentUser.id)
                            ? 'text-red-600'
                            : 'text-gray-600 dark:text-gray-400'
                        } hover:text-red-500`}
                      >
                        ❤️ {Array.isArray(story.likes) ? story.likes.length : 0}
                      </button>

                      {/* View details */}
                      <Link
                        to={`/community/stories/${story.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        Read full story →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Share Your Story Tab */}
        {activeTab === 'share' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Share Your Scam Experience
            </h2>
            {!currentUser && (
              <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                You must{' '}
                <button
                  onClick={() => setActiveTab('login')}
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  log in
                </button>{' '}
                to share a story.
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Story Title
                </label>
                <input
                  type="text"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  placeholder="Give your story a descriptive title..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What happened?
                </label>
                <textarea
                  value={storyWhat}
                  onChange={(e) => setStoryWhat(e.target.value)}
                  placeholder="Describe the scam attempt in detail..."
                  className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  How did you realize it was a scam?
                </label>
                <textarea
                  value={storyRealization}
                  onChange={(e) => setStoryRealization(e.target.value)}
                  placeholder="What red flags or clues helped you identify the scam?"
                  className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>

              <button
                onClick={handleSubmitStory}
                disabled={submittingStory}
                className={`w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium ${
                  submittingStory ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {submittingStory ? 'Sharing...' : 'Share Your Story'}
              </button>
            </div>
          </div>
        )}

        {/* Login/Register Tab */}
        {activeTab === 'login' && (
          <div className="space-y-4">
            {currentUser && (
              <div className="mb-4 flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3">
                <span className="text-sm text-green-800 dark:text-green-200">
                  Logged in as <strong>{currentUser.name}</strong> ({currentUser.email})
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
                >
                  Logout
                </button>
              </div>
            )}

            {authError && (
              <p className="text-sm text-red-600 dark:text-red-400 mb-2">{authError}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Login */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Login</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={handleLogin}
                    disabled={authLoading}
                    className={`w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium ${
                      authLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {authLoading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </div>

              {/* Register */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Register</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={handleRegister}
                    disabled={authLoading}
                    className={`w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium ${
                      authLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {authLoading ? 'Creating account...' : 'Create Account'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// About Page
const AboutPage = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          About ScamShield
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            ScamShield was created with a simple but powerful mission: to make cybersecurity accessible and understandable for everyone, regardless of their technical background. We believe that staying safe online shouldn't require a computer science degree or hours of research.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            In an age where online scams are becoming increasingly sophisticated, we're committed to leveling the playing field by providing real-time protection and education in language that everyone can understand.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What We Do</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Real-Time Protection</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our tools analyze emails, websites, and other online content to detect scams before they can harm you.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Simple Education</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We teach you how scams work using clear explanations and practical examples, empowering you to spot threats on your own.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3 mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Community Support</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our community shares experiences and warnings, creating a network of protection that benefits everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Commitment</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            ScamShield is designed to be light, fast, and incredibly easy to use. We never overwhelm you with technical jargon or complicated processes. Instead, we focus on giving you the information you need, when you need it, in a way that makes sense.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            As scammers evolve their tactics, so do we. We're constantly updating our detection methods and educational content to ensure you're always protected against the latest threats. Your safety is our priority, and we're here to support you every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/stories/:id" element={<StoryDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;