import { Logo } from './components/Logo';
import { RegistrationForm } from './components/RegistrationForm';
import { Sparkles, Zap, Target, TrendingUp } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjOTNjNWZkIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <Logo />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-xl shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">حلول رقمية متكاملة</h3>
                  <p className="text-gray-600">نقدم خدمات تصميم وتطوير المواقع والتطبيقات باحترافية عالية</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-xl shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">استراتيجيات تسويقية فعالة</h3>
                  <p className="text-gray-600">نساعدك في الوصول لجمهورك المستهدف وزيادة مبيعاتك</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-xl shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">تطوير سريع وفعال</h3>
                  <p className="text-gray-600">نستخدم أحدث التقنيات لتقديم منتج عالي الجودة بسرعة</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-blue-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-xl shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">نمو مستدام لأعمالك</h3>
                  <p className="text-gray-600">نساعدك على بناء حضور رقمي قوي ومستدام</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-blue-200 sticky top-8">
            <RegistrationForm />
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-600">
          <p className="text-sm">© 2025 Dot Studio. جميع الحقوق محفوظة</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
