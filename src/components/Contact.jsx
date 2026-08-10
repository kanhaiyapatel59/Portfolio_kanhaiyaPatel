import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import SectionHeading from './SectionHeading';
import Toast from './Toast';
import { useToast } from '../hooks/useToast';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { toasts, add, remove } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Check if Formspree endpoint or key is configured
      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_URL || import.meta.env.VITE_FORMSPREE_ENDPOINT;
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_KEY || '8ca5c3db-24b9-4091-bfce-4a7b973eb0e9';

      let response;

      if (formspreeEndpoint) {
        // Submit via Formspree
        response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message
          })
        });

        if (response.ok) {
          add("Message sent! I'll get back to you soon 🚀", 'success');
          setForm({ name: '', email: '', message: '' });
        } else {
          const data = await response.json();
          add(data.error || 'Failed to send message via Formspree.', 'error');
        }
      } else {
        // Submit via Web3Forms
        const formData = new FormData();
        formData.append('access_key', web3FormsKey);
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('message', form.message);
        formData.append('subject', `New Portfolio Message from ${form.name}`);

        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          add("Message sent! I'll get back to you soon 🚀", 'success');
          setForm({ name: '', email: '', message: '' });
        } else {
          add(data.message || 'Something went wrong. Please try again.', 'error');
        }
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      add('Failed to send email. Please check your connection or send an email directly.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="contact" className="py-24 section-padding relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <SectionHeading
            eyebrow="Contact"
            title={profile.contactTitle}
            description={profile.contactDescription}
          />

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4 mb-8">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 p-4 glass-card rounded-xl hover:border-[#00E5FF]/20 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                    <Mail size={18} className="text-[#00E5FF]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                    <p className="text-sm font-medium group-hover:text-[#00E5FF] transition-colors">{profile.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center">
                    <MapPin size={18} className="text-[#7C3AED]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                    <p className="text-sm font-medium">{profile.location}</p>
                  </div>
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                      <Phone size={18} className="text-[#00E5FF]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-medium">{profile.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {(profile.github || profile.socials?.github) && (
                  <a href={profile.github || profile.socials?.github} target="_blank" rel="noreferrer" className="p-3 glass-card rounded-xl text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/20 transition-all">
                    <FaGithub size={20} />
                  </a>
                )}
                {(profile.linkedin || profile.socials?.linkedin) && (
                  <a href={profile.linkedin || profile.socials?.linkedin} target="_blank" rel="noreferrer" className="p-3 glass-card rounded-xl text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/20 transition-all">
                    <FaLinkedinIn size={20} />
                  </a>
                )}
                {(profile.twitter || profile.socials?.twitter) && (
                  <a href={profile.twitter || profile.socials?.twitter} target="_blank" rel="noreferrer" className="p-3 glass-card rounded-xl text-gray-400 hover:text-[#00E5FF] hover:border-[#00E5FF]/20 transition-all">
                    <FaTwitter size={20} />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="glass-card p-8 space-y-5"
            >
              {[{ label: 'Your Name', type: 'text', key: 'name', placeholder: 'John Doe' },
                { label: 'Email Address', type: 'email', key: 'email', placeholder: 'john@example.com' }].map(({ label, type, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{label}</label>
                  <input
                    type={type}
                    required
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    style={{
                      width: '100%',
                      background: 'var(--input-bg)',
                      border: '1px solid var(--input-border)',
                      borderRadius: '0.75rem',
                      padding: '0.75rem 1rem',
                      fontSize: '0.875rem',
                      color: 'var(--input-text)',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 2px color-mix(in srgb, var(--accent) 20%, transparent)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  style={{
                    width: '100%',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    color: 'var(--input-text)',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 2px color-mix(in srgb, var(--accent) 20%, transparent)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--input-border)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#000' }} /> Sending...</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      <Toast toasts={toasts} remove={remove} />
    </>
  );
}
