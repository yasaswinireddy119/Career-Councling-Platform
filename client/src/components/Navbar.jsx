import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { Compass, LogOut, Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Counselors', path: '/counselors' },
    { name: 'Resources', path: '/resources' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Forum', path: '/forum' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-200 group-hover:scale-105 transition-transform duration-300">
                <Compass className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-zinc-900 tracking-tight font-display">CareerPath <span className="text-brand-600">AI</span></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === item.path
                    ? "text-brand-600 bg-brand-50/50"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="h-6 w-px bg-zinc-200 mx-2" />
            {user ? (
              <div className="flex items-center space-x-3 pl-2">
                <div className="flex flex-col items-end mr-1">
                  <span className="text-xs font-semibold text-zinc-900 leading-none">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-zinc-400 mt-0.5">Premium Member</span>
                </div>
                <button
                  onClick={async () => {
                    await signOut();
                  }}
                  className="p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-2 bg-zinc-900 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-zinc-800 transition-all duration-200 shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-brand-50 text-brand-700"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-zinc-100">
            {user ? (
              <button
                onClick={async () => {
                  await signOut();
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-zinc-900 text-white px-4 py-3 rounded-xl text-base font-bold shadow-lg"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
