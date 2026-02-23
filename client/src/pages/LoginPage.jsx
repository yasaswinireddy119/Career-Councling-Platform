import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { Compass, Lock, Mail, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate('/');
    } catch (err) {
      console.error('Auth failed:', err);
      if (err.message === 'Invalid email or password') {
        setError('Wrong email address or password');
      } else if (err.message === 'User already exists') {
        setError('An account with this email already exists');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-24">
        <div className="max-w-md w-full space-y-10">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-100">
              <Compass className="text-white w-7 h-7" />
            </div>
            <h1 className="text-4xl font-bold text-zinc-900 tracking-tight font-display">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-zinc-500 text-lg font-medium">
              {isSignUp ? 'Join 10,000+ professionals on their journey.' : 'Sign in to continue your personalized career path.'}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl font-semibold flex items-center"
            >
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5 group-focus-within:text-brand-600 transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all font-medium"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5 group-focus-within:text-brand-600 transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 shadow-xl shadow-zinc-200 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              <span>{isSignUp ? 'Get Started' : 'Sign In'}</span>
            </button>
          </form>

          <div className="text-center">
            <p className="text-zinc-500 font-medium">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError(null);
                }}
                className="text-brand-600 font-bold hover:text-brand-700 transition-colors focus:outline-none"
              >
                {isSignUp ? 'Sign In' : 'Create account'}
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 bg-zinc-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#4f46e5_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#6366f1_0%,transparent_40%)]" />
        </div>
        
        <div className="relative z-10 max-w-lg text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">Powered by Gemini 1.5 Pro</span>
          </div>
          <h2 className="text-5xl font-bold text-white tracking-tight leading-tight font-display">
            The future of career <span className="text-brand-400">navigation</span> is here.
          </h2>
          <p className="text-zinc-400 text-xl font-medium leading-relaxed">
            Stop guessing. Start growing. Our AI analyzes your unique profile to build the perfect roadmap for your professional success.
          </p>
          
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/5 text-left">
              <p className="text-3xl font-bold text-white mb-1">98%</p>
              <p className="text-sm text-zinc-400 font-medium">Success Rate</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/5 text-left">
              <p className="text-3xl font-bold text-white mb-1">10k+</p>
              <p className="text-sm text-zinc-400 font-medium">Active Users</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 right-12 w-64 h-64 border border-white/5 rounded-full" />
        <div className="absolute top-12 left-12 w-32 h-32 border border-white/5 rounded-full" />
      </div>
    </div>
  );
};
