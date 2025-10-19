import { useState } from 'react';
import { Send, CheckCircle, Loader2, User, Phone, Mail, Briefcase, Building2, MapPin, Globe, Instagram, Youtube, TrendingUp } from 'lucide-react';
import { LeadFormData } from '../types/lead';
import { sendOTP, verifyOTP } from '../services/otpService';
import { saveLead } from '../services/leadService';

const saudiCities = [
  'الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 'الخبر', 'الظهران',
  'الطائف', 'تبوك', 'بريدة', 'خميس مشيط', 'حائل', 'نجران', 'جازان', 'ينبع',
  'الأحساء', 'القطيف', 'الجبيل', 'أبها', 'عرعر', 'سكاكا', 'القريات', 'أخرى'
];

const brandFields = [
  'طبيب', 'عيادة', 'مركز طبي'
];

export const RegistrationForm = () => {
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [devOTP, setDevOTP] = useState('');

  const [formData, setFormData] = useState<LeadFormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '+966',
    email: '',
    businessName: '',
    businessField: '',
    city: '',
    websiteUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    tiktokUrl: '',
    snapchatUrl: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError('الرجاء إدخال الاسم الأول');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('الرجاء إدخال الاسم الأخير');
      return false;
    }
    if (!formData.phoneNumber || formData.phoneNumber.length < 13) {
      setError('الرجاء إدخال رقم واتساب صحيح');
      return false;
    }
    if (!formData.email || !formData.email.includes('@')) {
      setError('الرجاء إدخال بريد إلكتروني صحيح');
      return false;
    }
    if (!formData.businessName.trim()) {
      setError('الرجاء إدخال اسم البراند');
      return false;
    }
    if (!formData.businessField) {
      setError('الرجاء اختيار مجال البراند');
      return false;
    }
    if (!formData.city) {
      setError('الرجاء اختيار المدينة');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await sendOTP(formData.phoneNumber);
      if (response.devOTP) {
        setDevOTP(response.devOTP);
      }
      setStep('otp');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'فشل في إرسال رمز التحقق');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpCode || otpCode.length !== 6) {
      setError('الرجاء إدخال رمز التحقق المكون من 6 أرقام');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await verifyOTP(formData.phoneNumber, otpCode);
      await saveLead(formData);
      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'رمز التحقق غير صحيح أو منتهي الصلاحية');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    setOtpCode('');

    try {
      const response = await sendOTP(formData.phoneNumber);
      if (response.devOTP) {
        setDevOTP(response.devOTP);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'فشل في إعادة إرسال الرمز');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="text-center py-12 animate-fadeIn">
        <div className="mb-6 flex justify-center">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-full shadow-2xl">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">تم التسجيل بنجاح!</h2>
        <p className="text-gray-600 text-lg mb-8">شكراً لتسجيلك. سنتواصل معك قريباً</p>
        <button
          onClick={() => {
            setStep('form');
            setFormData({
              firstName: '',
              lastName: '',
              phoneNumber: '+966',
              email: '',
              businessName: '',
              businessField: '',
              city: '',
              websiteUrl: '',
              instagramUrl: '',
              youtubeUrl: '',
              tiktokUrl: '',
              snapchatUrl: '',
            });
            setOtpCode('');
            setDevOTP('');
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          تسجيل عميل جديد
        </button>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <form onSubmit={handleVerifyOTP} className="space-y-6 animate-fadeIn">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4 shadow-lg">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">تحقق من رقم الواتساب</h2>
          <p className="text-gray-600">تم إرسال رمز التحقق إلى {formData.phoneNumber}</p>
          {devOTP && (
            <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
              <p className="text-yellow-800 font-semibold text-sm">وضع التطوير - رمز OTP:</p>
              <p className="text-2xl font-bold text-yellow-900 tracking-widest">{devOTP}</p>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-right">
            {error}
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-right">
            رمز التحقق (6 أرقام)
          </label>
          <input
            type="text"
            value={otpCode}
            onChange={(e) => {
              setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6));
              setError('');
            }}
            placeholder="000000"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-center text-2xl font-bold tracking-widest"
            maxLength={6}
            disabled={loading}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || otpCode.length !== 6}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري التحقق...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                تأكيد
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={handleResendOTP}
          disabled={loading}
          className="w-full text-blue-600 hover:text-blue-800 font-semibold py-2 transition-colors"
        >
          إعادة إرسال الرمز
        </button>

        <button
          type="button"
          onClick={() => setStep('form')}
          className="w-full text-gray-600 hover:text-gray-800 font-semibold py-2 transition-colors"
        >
          رجوع
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
          سجل الآن
        </h2>
        <p className="text-gray-600">املأ البيانات للتواصل معك</p>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-right animate-shake">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-right flex items-center justify-end gap-2">
            <span>الاسم الأول</span>
            <User className="w-4 h-4 text-blue-600" />
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="محمد"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-right"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-right flex items-center justify-end gap-2">
            <span>الاسم الأخير</span>
            <User className="w-4 h-4 text-blue-600" />
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="أحمد"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-right"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-right flex items-center justify-end gap-2">
          <span>رقم الواتساب <span className="text-red-500">*</span></span>
          <Phone className="w-4 h-4 text-blue-600" />
        </label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="+966501234567"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          required
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1 text-right">سيتم إرسال رمز التحقق عبر الواتساب</p>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-right flex items-center justify-end gap-2">
          <span>البريد الإلكتروني</span>
          <Mail className="w-4 h-4 text-blue-600" />
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="example@domain.com"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-right flex items-center justify-end gap-2">
          <span>اسم البراند</span>
          <Briefcase className="w-4 h-4 text-blue-600" />
        </label>
        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleInputChange}
          placeholder="اسم العيادة أو المركز الطبي"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-right"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-right flex items-center justify-end gap-2">
          <span>مجال البراند</span>
          <Building2 className="w-4 h-4 text-blue-600" />
        </label>
        <select
          name="businessField"
          value={formData.businessField}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-right"
          required
          disabled={loading}
        >
          <option value="">اختر المجال</option>
          {brandFields.map((field) => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-right flex items-center justify-end gap-2">
          <span>المدينة</span>
          <MapPin className="w-4 h-4 text-blue-600" />
        </label>
        <select
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-right"
          required
          disabled={loading}
        >
          <option value="">اختر المدينة</option>
          {saudiCities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="border-t-2 border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-right">روابط التواصل الاجتماعي (اختياري)</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-right flex items-center justify-end gap-2">
              <span>موقع الويب</span>
              <Globe className="w-4 h-4 text-blue-600" />
            </label>
            <input
              type="url"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-right flex items-center justify-end gap-2">
              <span>انستجرام</span>
              <Instagram className="w-4 h-4 text-blue-600" />
            </label>
            <input
              type="url"
              name="instagramUrl"
              value={formData.instagramUrl}
              onChange={handleInputChange}
              placeholder="https://instagram.com/username"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-right flex items-center justify-end gap-2">
              <span>يوتيوب</span>
              <Youtube className="w-4 h-4 text-blue-600" />
            </label>
            <input
              type="url"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleInputChange}
              placeholder="https://youtube.com/@channel"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-right flex items-center justify-end gap-2">
              <span>تيك توك</span>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </label>
            <input
              type="url"
              name="tiktokUrl"
              value={formData.tiktokUrl}
              onChange={handleInputChange}
              placeholder="https://tiktok.com/@username"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-right flex items-center justify-end gap-2">
              <span>سناب شات</span>
              <Send className="w-4 h-4 text-blue-600" />
            </label>
            <input
              type="url"
              name="snapchatUrl"
              value={formData.snapchatUrl}
              onChange={handleInputChange}
              placeholder="https://snapchat.com/add/username"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        {loading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            جاري الإرسال...
          </>
        ) : (
          <>
            <Send className="w-6 h-6" />
            إرسال
          </>
        )}
      </button>
    </form>
  );
};
