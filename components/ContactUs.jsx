'use client'
import axios from 'axios'
import { useState } from 'react'
import MetaData from '@/components/MetaData'
export default function ContactPage() {
  const contactPageMetadata = {
    metaTitle: "Contact Us - BLS International Services Canada | Indian Consulate Assistance",
    metaDescription: "Get in touch with BLS International Services Canada for assistance with Indian consulate applications. Our team in Toronto is ready to help make your application process smooth and easy.",
    metaKeywords: "contact BLS International Services Canada, Indian consulate support, Indian embassy assistance, embassy application contact, Canada Indian consulate services",
    ogUrl: `${process.env.NEXT_PUBLIC_PROD_URL}/contact`,
    // ogImage: `${process.env.NEXT_PUBLIC_PROD_URL}/path/to/contact-page-image.jpg`,
    schemaData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BLS International Services Canada",
      "url": process.env.NEXT_PUBLIC_PROD_URL,
      // "logo": `${process.env.NEXT_PUBLIC_PROD_URL}/path/to/your-logo.jpg`,
      "contactPoint": {
        "@type": "ContactPoint",
        // "telephone": "+1-123-456-7890",
        "contactType": "Customer Service",
        "contactOption": "TollFree",
        "areaServed": "CA",
        "availableLanguage": ["English"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Visa Street",
        "addressLocality": "Toronto",
        "addressRegion": "ON",
        "postalCode": "M5V 2T6",
        "addressCountry": "CA"
      },
      "email": "info@blsindia.ca"
    }
  };
  

  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const errors = {}
    if (!formData.name.trim()) {
      errors.name = 'Full Name is required'
    }
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid'
    }
    if (!formData.phone) {
      errors.phone = 'Phone Number is required'
    } 
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    }
    return errors
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/contact-us`, formData);
        if (response) {
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          })
          setErrors({})
        } else {
        
            setLoading(false)
          setErrors({ form: 'Failed to send message. Please try again later.' })
        }
      } catch (error) {
        console.log(error)
        setErrors({ form: 'Failed to send message. Please try again later.' })
        setLoading(false)
      }
      finally{
        setLoading(false)
      }
    } else {
      setErrors(validationErrors)
      setLoading(false)
    }
  }

  return (
    <>
    <MetaData mData={contactPageMetadata}/>
    <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-100 to-indigo-100 sm:px-6 lg:px-8">
            <h1 className='text-red-800 text-center font-semibold text-4xl mb-4'>Contact Us for Embassy Services</h1>
            <p className='text-black text-center font-normal text-xl mb-6'>Reach us for all Indian embassy service inquiries and assistance.</p>
      <div className="max-w-3xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="md:flex">
          
          <div className="flex items-center justify-center bg-red-900 md:flex-shrink-0 md:w-48">
            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="w-full p-8">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">Contact Us</h1>
            {errors.form && <p className="text-red-600">{errors.form}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-600">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && <p className="text-red-600">{errors.message}</p>}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-red-800 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                 {loading ? 'Sending' : 'Send Message'} 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
    
  )
}
