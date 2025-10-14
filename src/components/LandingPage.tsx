import { useState } from 'react';
import { Mail, Instagram, Send, MessageCircle, Globe, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  firstName: string;
  lastName: string;
  whatsappNumber: string;
  companyName: string;
  website: string;
  email: string;
  instagramLink: string;
  telegramLink: string;
  whatsappLink: string;
}

export default function LandingPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    whatsappNumber: '',
    companyName: '',
    website: '',
    email: '',
    instagramLink: '',
    telegramLink: '',
    whatsappLink: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            whatsapp_number: formData.whatsappNumber,
            company_name: formData.companyName,
            website: formData.website,
            email: formData.email,
            instagram_link: formData.instagramLink,
            telegram_link: formData.telegramLink,
            whatsapp_link: formData.whatsappLink,
          },
        ]);

      if (error) throw error;

      setSubmitMessage({ type: 'success', text: 'تم إرسال النموذج بنجاح! سنتواصل معك قريباً.' });
      setFormData({
        firstName: '',
        lastName: '',
        whatsappNumber: '',
        companyName: '',
        website: '',
        email: '',
        instagramLink: '',
        telegramLink: '',
        whatsappLink: '',
      });
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.' });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="relative">
        <header className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

          <div className="relative container mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 text-center md:text-right">
                <div className="inline-flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-l from-blue-200 to-white bg-clip-text text-transparent">
                    دوت ستوديو
                  </h1>
                </div>

                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  نبني لك تجربة رقمية استثنائية تجمع بين الإبداع والتقنية
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-end">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-3 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>انستغرام</span>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-3 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                    <span>تيليغرام</span>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-5 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>واتساب</span>
                  </a>
                </div>
              </div>

              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl blur-2xl opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-white/20 shadow-2xl">
                    <svg
                      width="280"
                      height="280"
                      viewBox="0 0 280 280"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-2xl"
                    >
                      <circle cx="140" cy="140" r="120" fill="url(#grad1)" opacity="0.2" />
                      <circle cx="140" cy="140" r="90" fill="url(#grad2)" opacity="0.3" />

                      <path
                        d="M140 60 L180 100 L180 140 L140 180 L100 140 L100 100 Z"
                        fill="url(#grad3)"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />

                      <circle cx="140" cy="100" r="8" fill="white" />
                      <circle cx="180" cy="120" r="8" fill="white" />
                      <circle cx="100" cy="120" r="8" fill="white" />
                      <circle cx="160" cy="160" r="8" fill="white" />
                      <circle cx="120" cy="160" r="8" fill="white" />

                      <line x1="140" y1="100" x2="180" y2="120" stroke="white" strokeWidth="2" opacity="0.6" />
                      <line x1="140" y1="100" x2="100" y2="120" stroke="white" strokeWidth="2" opacity="0.6" />
                      <line x1="180" y1="120" x2="160" y2="160" stroke="white" strokeWidth="2" opacity="0.6" />
                      <line x1="100" y1="120" x2="120" y2="160" stroke="white" strokeWidth="2" opacity="0.6" />
                      <line x1="160" y1="160" x2="120" y2="160" stroke="white" strokeWidth="2" opacity="0.6" />

                      <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#60A5FA" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2563EB" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="50%" stopColor="#2563EB" />
                          <stop offset="100%" stopColor="#1D4ED8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        </header>

        <main className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-200">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  ابدأ مشروعك معنا
                </h2>
                <p className="text-slate-600 text-lg">
                  املأ النموذج أدناه وسنتواصل معك في أقرب وقت
                </p>
              </div>

              {submitMessage && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitMessage.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2 text-right">
                      الاسم الأول *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right"
                      placeholder="أدخل الاسم الأول"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2 text-right">
                      الاسم الثاني *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right"
                      placeholder="أدخل الاسم الثاني"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="whatsappNumber" className="block text-sm font-semibold text-slate-700 mb-2 text-right">
                    <Phone className="inline w-4 h-4 ml-1" />
                    رقم الواتساب *
                  </label>
                  <input
                    type="tel"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right"
                    placeholder="+966xxxxxxxxx"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-semibold text-slate-700 mb-2 text-right">
                    اسم الشركة *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right"
                    placeholder="أدخل اسم الشركة"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-semibold text-slate-700 mb-2 text-right">
                    <Globe className="inline w-4 h-4 ml-1" />
                    الموقع الإلكتروني
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2 text-right">
                    <Mail className="inline w-4 h-4 ml-1" />
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 text-right">
                    روابط التواصل الاجتماعي (اختياري)
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="instagramLink" className="block text-sm font-semibold text-slate-700 mb-2 text-right">
                        <Instagram className="inline w-4 h-4 ml-1" />
                        رابط انستغرام
                      </label>
                      <input
                        type="url"
                        id="instagramLink"
                        name="instagramLink"
                        value={formData.instagramLink}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right"
                        placeholder="https://instagram.com/username"
                      />
                    </div>

                    <div>
                      <label htmlFor="telegramLink" className="block text-sm font-semibold text-slate-700 mb-2 text-right">
                        <Send className="inline w-4 h-4 ml-1" />
                        رابط تيليغرام
                      </label>
                      <input
                        type="url"
                        id="telegramLink"
                        name="telegramLink"
                        value={formData.telegramLink}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right"
                        placeholder="https://t.me/username"
                      />
                    </div>

                    <div>
                      <label htmlFor="whatsappLink" className="block text-sm font-semibold text-slate-700 mb-2 text-right">
                        <MessageCircle className="inline w-4 h-4 ml-1" />
                        رابط واتساب
                      </label>
                      <input
                        type="url"
                        id="whatsappLink"
                        name="whatsappLink"
                        value={formData.whatsappLink}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-right"
                        placeholder="https://wa.me/966xxxxxxxxx"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال النموذج'}
                </button>
              </form>
            </div>
          </div>
        </main>

        <footer className="bg-slate-900 text-white py-8 mt-16">
          <div className="container mx-auto px-6 text-center">
            <p className="text-slate-400">
              © 2024 دوت ستوديو - جميع الحقوق محفوظة
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
