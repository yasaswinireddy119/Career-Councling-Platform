import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { AuthContext } from './AuthContextInstance';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        const dummyUser = localStorage.getItem('dummy_user');
        if (dummyUser) {
          setUser(JSON.parse(dummyUser));
        }
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

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

  const signIn = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const foundUser = registeredUsers.find((u) => u.email === email && u.password === password);

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
    };
    
    setUser(dummyUser);
    localStorage.setItem('dummy_user', JSON.stringify(dummyUser));
  };

  const signUp = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    
    if (registeredUsers.some((u) => u.email === email)) {
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
