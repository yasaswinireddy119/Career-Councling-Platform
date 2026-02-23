import { useState } from 'react';
import { careerService } from '../services/api';
import { useAuth } from '../context/useAuth';
import { Sparkles, Brain, Target, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([
    {
      careerTitle: "AI Solutions Architect",
      whyItMatches: "Your background in Computer Science and interest in AI makes you a perfect fit for designing complex AI systems.",
      estimatedSalaryRange: "$150k - $220k"
    },
    {
      careerTitle: "Full Stack Product Engineer",
      whyItMatches: "Combining your React/Node.js skills with UI design interests allows you to own features from end-to-end.",
      estimatedSalaryRange: "$130k - $190k"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [profile] = useState({
    education: "Bachelor's in Computer Science",
    skills: ["React", "Node.js", "UI Design"],
    interests: ["Artificial Intelligence", "Sustainability", "Education"],
    experience: "2 years as a Junior Developer"
  });

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await careerService.getAIRecommendations(profile);
      setRecommendations(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Welcome back, <span className="text-brand-600">{displayName}</span>
          </h1>
          <p className="text-zinc-500 text-lg font-medium">Your personalized career journey starts here.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="px-4 py-2 bg-white border border-zinc-200 rounded-xl flex items-center space-x-2 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider">AI Engine Active</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white rounded-3xl border border-zinc-200/60 p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-brand-50 rounded-lg">
                    <Sparkles className="text-brand-600 w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900">AI Career Recommendations</h2>
                </div>
                <button
                  onClick={fetchRecommendations}
                  disabled={loading}
                  className="flex items-center space-x-2 bg-zinc-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-zinc-200"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
                  <span>Generate New</span>
                </button>
              </div>

              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.map((rec, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx}
                      className="group p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:border-brand-200 transition-all duration-300 card-hover"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-zinc-900 text-lg leading-tight group-hover:text-brand-600 transition-colors">{rec.careerTitle}</h3>
                        <div className="p-1.5 bg-white rounded-lg border border-zinc-100 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="w-4 h-4 text-brand-600" />
                        </div>
                      </div>
                      <p className="text-sm text-zinc-500 mb-6 line-clamp-3 leading-relaxed">{rec.whyItMatches}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Est. Salary</span>
                          <span className="text-sm font-bold text-zinc-900">{rec.estimatedSalaryRange}</span>
                        </div>
                        <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-md">High Match</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Brain className="w-8 h-8 text-zinc-300" />
                  </div>
                  <p className="text-zinc-500 font-medium">Click generate to see AI-powered career paths tailored for you.</p>
                </div>
              )}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200/60 shadow-sm card-hover">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Sessions</p>
              <div className="flex items-end space-x-2">
                <p className="text-4xl font-bold text-zinc-900">12</p>
                <p className="text-xs font-bold text-emerald-500 mb-1.5">+2 this week</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200/60 shadow-sm card-hover">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Skills</p>
              <div className="flex items-end space-x-2">
                <p className="text-4xl font-bold text-zinc-900">08</p>
                <p className="text-xs font-bold text-brand-500 mb-1.5">Top 5%</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-200/60 shadow-sm card-hover">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Applications</p>
              <div className="flex items-end space-x-2">
                <p className="text-4xl font-bold text-zinc-900">24</p>
                <p className="text-xs font-bold text-zinc-400 mb-1.5">In review</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-brand-600 text-white rounded-3xl p-8 shadow-xl shadow-brand-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl group-hover:scale-110 transition-transform duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Upcoming Event</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">Next Session</h3>
              <p className="text-brand-100 text-sm mb-8 font-medium">With Dr. Sarah Miller</p>
              
              <div className="flex items-center space-x-3 text-sm font-bold mb-8 bg-white/10 p-3 rounded-xl border border-white/10">
                <Target className="w-5 h-5 text-brand-200" />
                <span>Tomorrow, 10:00 AM</span>
              </div>
              
              <button className="w-full bg-white text-brand-600 py-3.5 rounded-xl font-bold hover:bg-brand-50 transition-all duration-300 shadow-lg active:scale-95">
                Join Meeting
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-zinc-200/60 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2" />
              Recent Resources
            </h3>
            <div className="space-y-5">
              {['Mastering React 19', 'Interview Prep Guide', 'Salary Negotiation'].map((item, i) => (
                <div key={i} className="flex items-center space-x-4 group cursor-pointer">
                  <div className="w-11 h-11 bg-zinc-50 rounded-xl flex items-center justify-center group-hover:bg-brand-50 transition-all duration-300 border border-zinc-100">
                    <BookOpen className="w-5 h-5 text-zinc-400 group-hover:text-brand-600 transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-800 group-hover:text-brand-600 transition-colors">{item}</span>
                    <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">5 min read</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 text-sm font-bold text-zinc-500 hover:text-brand-600 hover:bg-brand-50/50 rounded-xl transition-all duration-300">
              View All Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookOpen = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);
