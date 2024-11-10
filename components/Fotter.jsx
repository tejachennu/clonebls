"use client"
import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'; // Make sure you import the icons

const footerData = {
  about: {
    title: 'About BLS India',
    description: 'BLS India provides efficient visa and consular services for Indian missions worldwide.',
  },
  quickLinks: {
    title: 'Quick Links',
    links: ['FAQs', 'Privacy Policy', 'Terms of Service', 'Careers'],
  },
  contact: {
    title: 'Contact Us',
    address: '123 Visa Street, Toronto, ON M5V 2T6, Canada',
    phone: '+1 (123) 456-7890',
    email: 'info@blsindia.ca',
  },
  socialLinks: {
    title: 'Follow Us',
    icons: [
      { component: Facebook, href: '#' },
      { component: Twitter, href: '#' },
      { component: Linkedin, href: '#' },
      { component: Instagram, href: '#' },
    ],
  },
  copyright: '© 2024 BLS India. All rights reserved.',
};

function Fotter() {
  return (
    <footer className="max-w-screen-xl py-8 mt-12 text-white">
      <div className="container px-4 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{footerData.about.title}</h3>
            <p className="text-sm">{footerData.about.description}</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{footerData.quickLinks.title}</h3>
            <ul className="space-y-2">
              {footerData.quickLinks.links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-sm transition-colors hover:text-red-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{footerData.contact.title}</h3>
            <address className="text-sm not-italic">
              <p>{footerData.contact.address}</p>
              <p className="mt-2">Phone: {footerData.contact.phone}</p>
              <p>Email: {footerData.contact.email}</p>
            </address>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{footerData.socialLinks.title}</h3>
            <div className="flex space-x-4">
              {footerData.socialLinks.icons.map((icon, index) => (
                <a key={index} href={icon.href} className="transition-colors hover:text-red-200">
                  <icon.component size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 mt-8 text-center border-t border-red-800">
          <p>{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

export default Fotter;
