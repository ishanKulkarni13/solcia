import { Instagram, Linkedin, Youtube, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ];

  const footerLinks = [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Logo and Quote */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
              <Heart className="w-6 h-6 text-purple-500" fill="currentColor" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600" style={{ fontSize: '1.25rem' }}>
                SoulSync
              </span>
            </div>
            <p className="text-gray-600 italic max-w-md">
              "Your journey to peace begins with one mindful moment."
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white text-gray-700"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} SoulSync. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
