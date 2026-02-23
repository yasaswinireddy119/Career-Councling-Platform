import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        // Check local storage for dummy session
        const dummyUser = localStorage.getItem('dummy_user');
        if (dummyUser) {
          setUser(JSON.parse(dummyUser));
        }
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else if (_event === 'SIGNED_OUT') {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const dummyUser = {
      id: foundUser.id,
      email: foundUser.email,
      user_metadata: { full_name: foundUser.email.split('@')[0] },
      aud: 'authenticated',
      role: 'authenticated',
      created_at: foundUser.created_at,
    } as any;
    
    setUser(dummyUser);
    localStorage.setItem('dummy_user', JSON.stringify(dummyUser));
  };

  const signUp = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    
    if (registeredUsers.some((u: any) => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      created_at: new Date().toISOString(),
    };

    registeredUsers.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
    
    // Automatically sign in after sign up
    await signIn(email, password);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('dummy_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
