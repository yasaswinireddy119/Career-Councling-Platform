import { useState, useEffect } from 'react';
import { User, Star, MapPin, Calendar, Search } from 'lucide-react';
import { motion } from 'motion/react';

export const Counselors = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
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
    c.expertise.some((e) => e.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Expert Counselors</h1>
          <p className="text-zinc-500 text-lg font-medium">Find the perfect mentor to guide your career journey.</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5 group-focus-within:text-brand-600 transition-colors" />
          <input
            type="text"
            placeholder="Search expertise or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3.5 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 w-full md:w-96 shadow-sm transition-all font-medium"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCounselors.map((counselor, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              key={counselor.id}
              className="bg-white border border-zinc-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300 group"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <User className="text-brand-600 w-8 h-8" />
                  </div>
                  <div className="flex items-center bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-100">
                    <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
                    {counselor.rating}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-1 group-hover:text-brand-600 transition-colors">{counselor.name}</h3>
                <div className="flex items-center text-zinc-400 text-sm font-medium mb-4">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  {counselor.location}
                </div>
                <p className="text-zinc-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">{counselor.bio}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {counselor.expertise.map((exp, i) => (
                    <span key={i} className="bg-zinc-50 text-zinc-600 px-3 py-1 rounded-lg text-xs font-bold border border-zinc-100">
                      {exp}
                    </span>
                  ))}
                </div>
                <button className="w-full flex items-center justify-center space-x-2 bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all duration-300 shadow-lg shadow-zinc-100 active:scale-[0.98]">
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
