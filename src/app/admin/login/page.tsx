'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldAlert, Factory, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate secure enterprise admin authentication check
    setTimeout(() => {
      if (username === 'admin' && password === 'SSNIndustries2026!') {
        // Set secure mock admin session flag in localStorage/sessionStorage
        sessionStorage.setItem('ssn_admin_authenticated', 'true');
        router.push('/admin');
      } else {
        setError('Invalid administrative credentials. Access denied.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle light background pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#0f2942_1px,transparent_1px),linear-gradient(to_bottom,#0f2942_1px,transparent_1px)] bg-[size:45px_45px]"></div>
      {/* Soft top accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-amber via-yellow-400 to-brand-amber"></div>

      <div className="relative w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-md p-8 font-inter">
        {/* Header logo */}
        <div className="flex flex-col items-center text-center space-y-2 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-brand-amber text-brand-slate shadow-md">
            <Factory className="h-7 w-7 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-outfit text-xl font-bold tracking-tight text-brand-slate uppercase">SSN Administration</h1>
            <p className="text-[9px] font-bold tracking-wider text-brand-charcoal/60 uppercase mt-0.5">Secure Portal Access</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center space-x-2.5 bg-rose-50 border border-rose-300 text-rose-600 p-3.5 rounded-sm text-xs">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-xs">
          <div>
            <label className="block mb-1 text-[11px] font-bold uppercase tracking-wider text-brand-slate">Username *</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="ent-input"
            />
          </div>

          <div>
            <label className="block mb-1 text-[11px] font-bold uppercase tracking-wider text-brand-slate">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="ent-input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-brand-charcoal hover:text-brand-slate"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="ent-btn-primary w-full mt-8"
          >
            <Lock className="h-4.5 w-4.5 stroke-[2.5] mr-2" />
            <span>{loading ? 'AUTHENTICATING...' : 'LOG IN SECURELY'}</span>
          </button>
        </form>

        <p className="mt-6 text-center text-[10px] text-brand-charcoal/40 font-semibold tracking-wide uppercase">SSN Industries · Admin Portal</p>
      </div>
    </div>
  );
}
