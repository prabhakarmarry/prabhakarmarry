import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactProps {
    email?: string;
}

export const Contact: React.FC<ContactProps> = ({ email }) => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        purpose: '',
        message: '',
        consent: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const targetEmail = email || "mohitkonduri@example.com"; // Fallback if data hasn't loaded
        const endpoint = `https://formsubmit.co/ajax/${targetEmail}`;

        setStatus('submitting');

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    _subject: `Portfolio Contact: ${formData.subject}`,
                    _template: 'table'
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', purpose: '', message: '', consent: false });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error("Failed to send");
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [id || e.target.name]: val }));
    };

    return (
        <section id="contact" className="py-24 bg-white border-t border-gray-100 scroll-mt-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-black tracking-tighter uppercase mb-4">
                        Contact Me
                    </h2>
                    <div className="w-20 h-1.5 bg-black" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
                    {/* Contact Info */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Let's Collaborate</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                I'm always open to discussing new academic collaborations or answering queries. Your message will be sent directly to my inbox.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 bg-gray-50 border border-gray-100 rounded-sm">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-2">Office Hours</h4>
                                <p className="text-sm text-gray-600 font-bold">Mon - Fri: 9:00 AM - 4:00 PM</p>
                            </div>
                            <div className="p-6 bg-black text-white rounded-sm shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Response Time</h4>
                                <p className="text-sm font-bold italic">Usually within 24-48 hours</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:col-span-3">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center p-12 bg-gray-50 border-2 border-dashed border-black rounded-sm"
                            >
                                <CheckCircle2 size={64} className="text-black mb-6" />
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Email Sent!</h3>
                                <p className="text-gray-600 font-medium">Thank you for reaching out. I'll get back to you at my earliest convenience.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {status === 'error' && (
                                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold flex items-center gap-3 rounded-sm">
                                        <AlertCircle size={18} /> Something went wrong. Please try again.
                                    </div>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black ml-1">Name</label>
                                        <input
                                            required
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Your full name"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:border-black focus:bg-white outline-none transition-all font-medium text-sm rounded-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black ml-1">Email</label>
                                        <input
                                            required
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="hello@example.com"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:border-black focus:bg-white outline-none transition-all font-medium text-sm rounded-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black ml-1">Subject</label>
                                        <input
                                            required
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Brief overview"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:border-black focus:bg-white outline-none transition-all font-medium text-sm rounded-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black ml-1">Purpose of Contact</label>
                                        <select
                                            required
                                            id="purpose"
                                            name="purpose"
                                            value={formData.purpose}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:border-black focus:bg-white outline-none transition-all font-medium text-sm rounded-sm appearance-none cursor-pointer"
                                        >
                                            <option value="">Select a purpose</option>
                                            <option value="Academic Query">Academic Query</option>
                                            <option value="Research Collaboration">Research Collaboration</option>
                                            <option value="Student Guidance">Student Guidance</option>
                                            <option value="Conference/Journal">Conference/Journal</option>
                                            <option value="Administrative">Administrative</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black ml-1">Message</label>
                                    <textarea
                                        required
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="How can I help you?"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:border-black focus:bg-white outline-none transition-all font-medium text-sm rounded-sm resize-none"
                                    ></textarea>
                                </div>

                                <div className="flex items-start gap-4 py-2">
                                    <div className="flex items-center h-5 text-black">
                                        <input
                                            required
                                            id="consent"
                                            name="consent"
                                            checked={formData.consent}
                                            onChange={handleChange}
                                            type="checkbox"
                                            className="w-4 h-4 rounded-sm accent-black cursor-pointer"
                                        />
                                    </div>
                                    <label htmlFor="consent" className="text-xs font-bold text-gray-500 cursor-pointer select-none leading-tight">
                                        I agree to be contacted for academic purposes and research discussions.
                                    </label>
                                </div>

                                <button
                                    disabled={status === 'submitting'}
                                    type="submit"
                                    className="group relative w-full sm:w-auto px-10 py-5 bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:scale-100 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] hover:shadow-none"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {status === 'submitting' ? 'Sending...' : (
                                            <>Submit Message <Send size={14} /></>
                                        )}
                                    </span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
