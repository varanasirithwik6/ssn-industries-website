'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectUploadSection from '@/components/contact/ProjectUploadSection';

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const subjectParam = params.get('subject');
      const messageParam = params.get('message');
      const highlight = params.get('highlight');

      if (subjectParam || messageParam) {
        setForm((prev) => ({
          ...prev,
          subject: subjectParam || prev.subject,
          message: messageParam || prev.message,
        }));
      }

      if (highlight === 'phone') {
        setTimeout(() => {
          const card = document.getElementById('contact-phone-card');
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add temporary highlighting class border/shadow effect
            card.classList.add('border-brand-amber', 'scale-[1.03]', 'shadow-[0_0_20px_rgba(212,160,23,0.4)]');
            setTimeout(() => {
              card.classList.remove('border-brand-amber', 'scale-[1.03]', 'shadow-[0_0_20px_rgba(212,160,23,0.4)]');
            }, 3000);
          }
        }, 300);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on input change
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FieldErrors = {};
    if (!form.name.trim()) {
      errors.name = 'Full name is required.';
    }
    if (!form.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Please supply a valid email address.';
    }
    if (form.phone.trim() && !/^\+?[0-9\s-]{10,15}$/.test(form.phone)) {
      errors.phone = 'Please supply a valid phone number.';
    }
    if (!form.message.trim()) {
      errors.message = 'Detailed message is required.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setStatus('idle');
    setErrorMessage('');
    setShowToast(false);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ? JSON.stringify(data.error) : 'Failed to submit enquiry');
      }

      setStatus('success');
      setShowToast(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setShowToast(true);
      const message = err instanceof Error ? err.message : 'An error occurred during submission.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-slate-50 dark:bg-brand-slate">
      {/* Toast Notification */}
      <div className="fixed top-24 right-4 z-50 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`p-4 rounded-sm shadow-xl pointer-events-auto border flex items-start space-x-3 bg-white dark:bg-slate-900 ${
                status === 'success'
                  ? 'border-emerald-200 dark:border-emerald-900/50'
                  : 'border-rose-200 dark:border-rose-900/50'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              )}
              <div className="flex-grow">
                <span className="font-outfit text-sm font-bold text-brand-slate dark:text-white">
                  {status === 'success' ? 'Inquiry Submitted' : 'Submission Failed'}
                </span>
                <p className="text-xs text-brand-charcoal dark:text-gray-300 mt-1">
                  {status === 'success'
                    ? 'Thank you! A sales manager will connect with you shortly.'
                    : errorMessage}
                </p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Header Banner */}
      <section className="bg-slate-900 py-16 text-white border-b border-white/5">
        <div className="container-custom text-center sm:text-left">
          <span className="text-xs font-bold tracking-widest text-brand-amber uppercase">Get In Touch</span>
          <h1 className="font-outfit text-3xl font-extrabold sm:text-5xl mt-2 !text-white">Contact Sales & Support</h1>
          <p className="text-sm text-gray-400 font-inter max-w-2xl mt-4">
            Connect with our industrial material desks to discuss project timelines, dynamic price grids, or custom steel specifications.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Details Column */}
            <div className="lg:col-span-1 space-y-8">
              <div className="space-y-3">
                <h3 className="font-outfit text-2xl font-bold text-brand-slate dark:text-white">Corporate HQ</h3>
                <p className="text-sm text-brand-charcoal dark:text-gray-300 leading-relaxed font-inter">
                  SSN Industries is a trusted supplier of premium roofing sheets, TMT rods, structural steel, steel pipes, and industrial construction materials based in Andhra Pradesh.
                </p>
              </div>

              {/* Detail list */}
              <div className="space-y-4 text-sm font-inter">
                <a
                  href="https://maps.app.goo.gl/hyw1pv2mWE5V2uRG9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 p-4 bg-white dark:bg-slate-950 border border-brand-charcoal/10 rounded-sm dark:border-white/5 shadow-ent-sm hover:border-brand-amber/30 transition-colors group"
                >
                  <MapPin className="h-5 w-5 text-brand-amber shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-slate dark:text-white block group-hover:text-brand-amber transition-colors">Office Address</span>
                    <span className="text-brand-charcoal text-xs dark:text-gray-300">
                      SSN Industries, Chittapullivalasa,<br />
                      Veeraghattam, Andhra Pradesh – 532460, India
                    </span>
                  </div>
                </a>

                <div id="contact-phone-card" className="flex items-start space-x-3 p-4 bg-white dark:bg-slate-950 border border-brand-charcoal/10 rounded-sm dark:border-white/5 shadow-ent-sm transition-all duration-1000">
                  <Phone className="h-5 w-5 text-brand-amber shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-slate dark:text-white block">Contact Numbers</span>
                    <div className="text-brand-charcoal text-xs dark:text-gray-300 space-y-1 mt-0.5">
                      <p className="font-semibold text-brand-slate dark:text-gray-200">MD: Maddi Bhaskar Rao</p>
                      <p>
                        Phone: <a href="tel:+917780224863" className="hover:text-brand-amber underline transition-colors font-bold">+91 77802 24863</a>
                      </p>
                      <p>
                        WhatsApp: <a href="https://wa.me/917780224863" target="_blank" rel="noopener noreferrer" className="hover:text-brand-amber underline transition-colors font-bold">Start Chat</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-white dark:bg-slate-950 border border-brand-charcoal/10 rounded-sm dark:border-white/5 shadow-ent-sm">
                  <Mail className="h-5 w-5 text-brand-amber shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-slate dark:text-white block">Email Address</span>
                    <a href="mailto:ssnindustries7@gmail.com" className="text-brand-charcoal text-xs dark:text-gray-300 hover:text-brand-amber underline transition-colors block mt-0.5">ssnindustries7@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-white dark:bg-slate-950 border border-brand-charcoal/10 rounded-sm dark:border-white/5 shadow-ent-sm">
                  <Clock className="h-5 w-5 text-brand-amber shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-slate dark:text-white block">Business Hours</span>
                    <span className="text-brand-charcoal text-xs dark:text-gray-300 block mt-0.5">
                      Monday – Saturday: 9:00 AM – 7:00 PM<br />
                      Sunday: Closed
                    </span>
                  </div>
                </div>
              </div>

              {/* Map Link */}
              <div className="space-y-3">
                <span className="font-bold text-brand-slate dark:text-white block text-sm">Find Us On Google Maps</span>
                <a
                  href="https://maps.app.goo.gl/hyw1pv2mWE5V2uRG9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-brand-amber hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 rounded-sm"
                >
                  <span>OPEN MAP LINK</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Submission Form Column */}
            <div className="lg:col-span-2 ent-card p-8">
              <h3 className="font-outfit text-2xl font-bold text-brand-slate dark:text-white mb-6">Send an Inquiry</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 text-sm font-inter">
                {status === 'success' && (
                  <div className="flex items-center space-x-3 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-sm dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-400">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span>Inquiry submitted successfully! A sales manager will connect with you shortly.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-start space-x-3 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-sm dark:bg-rose-950/20 dark:border-rose-800 dark:text-rose-400">
                    <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Submission Failed</span>
                      <span className="text-xs">{errorMessage}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-name" className="ent-label block mb-1">Your Name *</label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      disabled={loading}
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`ent-input ${fieldErrors.name ? 'ent-input-error' : ''}`}
                    />
                    {fieldErrors.name && (
                      <span className="ent-error-message mt-1 block">{fieldErrors.name}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="form-email" className="ent-label block mb-1">Email Address *</label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      placeholder="e.g. john@example.com"
                      disabled={loading}
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`ent-input ${fieldErrors.email ? 'ent-input-error' : ''}`}
                    />
                    {fieldErrors.email && (
                      <span className="ent-error-message mt-1 block">{fieldErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-phone" className="ent-label block mb-1">Phone Number</label>
                    <input
                      id="form-phone"
                      type="tel"
                      name="phone"
                      placeholder="e.g. +91 98765 43210"
                      disabled={loading}
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className={`ent-input ${fieldErrors.phone ? 'ent-input-error' : ''}`}
                    />
                    {fieldErrors.phone && (
                      <span className="ent-error-message mt-1 block">{fieldErrors.phone}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="form-subject" className="ent-label block mb-1">Subject</label>
                    <select
                      id="form-subject"
                      name="subject"
                      disabled={loading}
                      value={form.subject}
                      onChange={handleChange}
                      className="ent-input"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Quotation">Product Quotation</option>
                      <option value="Distributor Application">Distributor Application</option>
                      <option value="Career Openings">Career Openings</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="form-message" className="ent-label block mb-1">Detailed Message *</label>
                  <textarea
                    id="form-message"
                    name="message"
                    placeholder="Describe your structural specifications, quantities, or delivery location details..."
                    disabled={loading}
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={`ent-textarea ${fieldErrors.message ? 'ent-input-error' : ''}`}
                  ></textarea>
                  {fieldErrors.message && (
                    <span className="ent-error-message mt-1 block">{fieldErrors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="ent-btn-primary w-full sm:w-auto"
                >
                  {loading ? (
                    <span>SENDING...</span>
                  ) : (
                    <>
                      <span>SEND INQUIRY</span>
                      <Send className="h-3.5 w-3.5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-spacing bg-white dark:bg-slate-950/40 border-t border-brand-charcoal/10 dark:border-white/5">
        <div className="container-custom">
          <div className="space-y-4 mb-8">
            <span className="text-xs font-bold tracking-widest text-brand-amber uppercase">Location</span>
            <h2 className="font-outfit text-2xl font-bold text-brand-slate dark:text-white sm:text-3xl">Find Us On Google Maps</h2>
            <p className="text-sm text-brand-charcoal dark:text-gray-400 font-inter">
              Visit our manufacturing unit and sales depot in Veeraghattam, Andhra Pradesh.
            </p>
          </div>
          <div className="w-full h-[400px] overflow-hidden rounded-md border border-brand-charcoal/10 dark:border-white/5 shadow-ent-md relative bg-slate-100 dark:bg-slate-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3788.8924840854497!2d83.5846854!3d18.6929354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c1bd48ff7afad%3A0xc6cb55610ec1f2f!2sSSN%20industries%20(%20roofing%20sheets%20%26%20TMT%20Rods)!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              title="SSN Industries Location Map"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
