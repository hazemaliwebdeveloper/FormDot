import { Code2 } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 blur-xl opacity-50 rounded-full"></div>
        <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <Code2 className="w-12 h-12 text-white" strokeWidth={2.5} />
        </div>
      </div>
      <div className="text-right">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Dot Studio
        </h1>
        <p className="text-sm text-blue-600 font-medium tracking-wide">Digital Solutions</p>
      </div>
    </div>
  );
};
