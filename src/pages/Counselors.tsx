import React, { useState, useEffect } from 'react';
import { careerService } from '../services/api';
import { User, Star, MapPin, Calendar, Search } from 'lucide-react';
import { motion } from 'motion/react';

export const Counselors = () => {
  const [counselors, setCounselors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        // Using static dummy data for the demo
        const dummyCounselors = [
          { id: 1, name: 'Dr. Sarah Miller', expertise: ['Tech', 'Leadership', 'AI'], rating: 4.9, location: 'Remote', bio: 'Former Google HR with 10+ years experience in scaling engineering teams.' },
          { id: 2, name: 'James Wilson', expertise: ['Design', 'Product', 'UX'], rating: 4.8, location: 'London, UK', bio: 'Helping creatives find their path in tech through portfolio reviews and product thinking.' },
          { id: 3, name: 'Elena Rodriguez', expertise: ['AI', 'Data Science', 'Python'], rating: 5.0, location: 'New York, NY', bio: 'Specializing in emerging technologies and transition from academia to industry.' },
          { id: 4, name: 'Marcus Chen', expertise: ['Finance', 'FinTech', 'Strategy'], rating: 4.7, location: 'Singapore', bio: 'Expert in financial systems and digital banking career transitions.' },
          { id: 5, name: 'Aisha Khan', expertise: ['Education', 'EdTech', 'Public Speaking'], rating: 4.9, location: 'Dubai, UAE', bio: 'Passionate about the future of learning and educational leadership.' },
          { id: 6, name: 'David Smith', expertise: ['Marketing', 'Growth', 'SEO'], rating: 4.6, location: 'Austin, TX', bio: 'Growth hacker turned career coach for marketing professionals.' },
        ];
        setCounselors(dummyCounselors);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounselors();
  }, []);

  const filteredCounselors = counselors.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.expertise.some((e: string) => e.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Expert Counselors</h1>
          <p className="text-zinc-500">Find the perfect mentor to guide your career.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search expertise or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-80"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCounselors.map((counselor, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              key={counselor.id}
              className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="text-indigo-600 w-8 h-8" />
                  </div>
                  <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg text-xs font-bold">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {counselor.rating}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-1">{counselor.name}</h3>
                <div className="flex items-center text-zinc-500 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {counselor.location}
                </div>
                <p className="text-zinc-600 text-sm mb-4 line-clamp-2">{counselor.bio}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {counselor.expertise.map((exp: string, i: number) => (
                    <span key={i} className="bg-zinc-100 text-zinc-700 px-2 py-1 rounded-md text-xs font-medium">
                      {exp}
                    </span>
                  ))}
                </div>
                <button className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>Book Session</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
