import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaPaperPlane, FaCheck, FaWhatsapp } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

const Contact = () => {
  const form = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  // ✅ EmailJS IDs
  const SERVICE_ID = "service_oaf18e6"           
  const TEMPLATE_ID = "template_wkd794c"    
  const PUBLIC_KEY = "qFJSc5OzquI84lY6L"    

  // Animation refs
  const [headingRef, isHeadingInView] = useInView({ once: true, delay: 0 });
  const [contactInfoRef, isContactInfoInView] = useInView({ once: true, delay: 100 });
  const [formRef, isFormInView] = useInView({ once: true, delay: 200 });

  // ✅ WhatsApp link banane ka safe function
  const getWhatsAppLink = () => {
    const whatsappNumber = personalInfo?.whatsapp || personalInfo?.social?.whatsapp || '923062933633';
    return `https://wa.me/${whatsappNumber}`;
  };

  // Form validation
  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.get('from_name').trim()) newErrors.from_name = 'Name is required';
    if (!formData.get('from_email').trim()) {
      newErrors.from_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get('from_email'))) {
      newErrors.from_email = 'Please enter a valid email';
    }
    if (!formData.get('message').trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(form.current)
    if (!validateForm(formData)) {
      setIsSubmitting(false)
      return
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        console.log('Message sent:', result.text)
        setIsSubmitted(true)
        form.current.reset()
        setTimeout(() => setIsSubmitted(false), 3000)
      })
      .catch((error) => {
        console.log('Error:', error.text)
        setErrors({ submit: 'Failed to send message. Please try again.' })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={headingRef}
          className="text-center mb-16 transition-all duration-600"
          style={{
            opacity: isHeadingInView ? 1 : 0,
            transform: isHeadingInView ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-dark-200 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-purple-600 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info - Left Side */}
          <div
            ref={contactInfoRef}
            className="lg:col-span-2 space-y-8 transition-all duration-700"
            style={{
              opacity: isContactInfoInView ? 1 : 0,
              transform: isContactInfoInView ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 hover-lift">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <a href={`mailto:${personalInfo?.email || 'your-email@gmail.com'}`} className="text-dark-200 hover:text-accent transition-colors">
                      {personalInfo?.email || 'your-email@gmail.com'}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 hover-lift">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <a href={`tel:${personalInfo?.phone || '+92 123 4567890'}`} className="text-dark-200 hover:text-accent transition-colors">
                      {personalInfo?.phone || '+92 123 4567890'}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 hover-lift">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Location</h4>
                    <p className="text-dark-200">{personalInfo?.location || 'Pakistan'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links - ✅ WhatsApp Fixed */}
            <div className="pt-8 border-t border-dark-700">
              <h4 className="text-lg font-semibold mb-4">Connect with me</h4>
              <div className="flex gap-4 flex-wrap">
                <a href={personalInfo?.social?.github || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center text-dark-300 hover:text-white hover:bg-accent/20 transition-all hover-lift">
                  <FaGithub size={20} />
                </a>
                <a href={personalInfo?.social?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center text-dark-300 hover:text-white hover:bg-accent/20 transition-all hover-lift">
                  <FaLinkedin size={20} />
                </a>
                <a href={personalInfo?.social?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center text-dark-300 hover:text-white hover:bg-accent/20 transition-all hover-lift">
                  <FaFacebook size={20} />
                </a>
                <a href={personalInfo?.social?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center text-dark-300 hover:text-white hover:bg-accent/20 transition-all hover-lift">
                  <FaInstagram size={20} />
                </a>
                {/* ✅ WhatsApp - Ab sahi kaam karega */}
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center text-dark-300 hover:text-white hover:bg-accent/20 transition-all hover-lift">
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div
            ref={formRef}
            className="lg:col-span-3 transition-all duration-700"
            style={{
              opacity: isFormInView ? 1 : 0,
              transform: isFormInView ? 'translateY(0)' : 'translateY(30px)'
            }}
          >
            <div className="glass rounded-2xl p-8">
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="from_name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input type="text" id="from_name" name="from_name" required
                      className={`w-full px-4 py-3 bg-dark-800 border rounded-lg focus:ring-2 focus:ring-accent outline-none text-white ${errors.from_name ? 'border-red-500' : 'border-dark-700'}`}
                      placeholder="John Doe" />
                    {errors.from_name && <p className="text-red-400 text-sm mt-1">{errors.from_name}</p>}
                  </div>
                  <div>
                    <label htmlFor="from_email" className="block text-sm font-medium mb-2">Email Address</label>
                    <input type="email" id="from_email" name="from_email" required
                      className={`w-full px-4 py-3 bg-dark-800 border rounded-lg focus:ring-2 focus:ring-accent outline-none text-white ${errors.from_email ? 'border-red-500' : 'border-dark-700'}`}
                      placeholder="john@example.com" />
                    {errors.from_email && <p className="text-red-400 text-sm mt-1">{errors.from_email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea id="message" name="message" rows={6} required
                    className={`w-full px-4 py-3 bg-dark-800 border rounded-lg focus:ring-2 focus:ring-accent outline-none text-white resize-none ${errors.message ? 'border-red-500' : 'border-dark-700'}`}
                    placeholder="Tell me about your project..." />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>
                {errors.submit && <p className="text-red-400 text-sm text-center">{errors.submit}</p>}
                <button type="submit" disabled={isSubmitting || isSubmitted}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${isSubmitting || isSubmitted ? 'bg-green-500 text-white cursor-default' : 'btn-primary hover-scale tap-scale'}`}>
                  {isSubmitting ? <>Sending...</> : isSubmitted ? <><FaCheck /> Message Sent!</> : <><FaPaperPlane /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact;