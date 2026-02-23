import React, { useState, useEffect } from 'react';
import { careerService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Brain, Target, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<any[]>([
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
  const [profile, setProfile] = useState({
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 tracking-tight mb-2">Welcome back, {displayName}</h1>
        <p className="text-zinc-500 text-lg">Your personalized career journey starts here.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Recommendations Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Sparkles className="text-indigo-600 w-6 h-6" />
                <h2 className="text-xl font-semibold text-zinc-900">AI Career Recommendations</h2>
              </div>
              <button
                onClick={fetchRecommendations}
                disabled={loading}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
                <span>Generate New</span>
              </button>
            </div>

            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="p-4 rounded-xl border border-zinc-100 bg-zinc-50 hover:border-indigo-200 transition-colors"
                  >
                    <h3 className="font-bold text-zinc-900 mb-2">{rec.careerTitle}</h3>
                    <p className="text-sm text-zinc-600 mb-4 line-clamp-3">{rec.whyItMatches}</p>
                    <div className="flex items-center justify-between text-xs font-medium text-indigo-600">
                      <span>{rec.estimatedSalaryRange}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-zinc-50 rounded-xl border border-dashed border-zinc-300">
                <Brain className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                <p className="text-zinc-500">Click generate to see AI-powered career paths tailored for you.</p>
              </div>
            )}
          </div>

          {/* Quick Stats / Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-sm text-zinc-500 mb-1">Sessions Completed</p>
              <p className="text-3xl font-bold text-zinc-900">12</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-sm text-zinc-500 mb-1">Skills Acquired</p>
              <p className="text-3xl font-bold text-zinc-900">8</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <p className="text-sm text-zinc-500 mb-1">Applications Sent</p>
              <p className="text-3xl font-bold text-zinc-900">24</p>
            </div>
          </div>
        </div>

        {/* Sidebar / Upcoming */}
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Next Session</h3>
              <p className="text-indigo-200 text-sm mb-4">With Dr. Sarah Miller</p>
              <div className="flex items-center space-x-2 text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                <span>Tomorrow, 10:00 AM</span>
              </div>
              <button className="w-full bg-white text-indigo-900 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
                Join Meeting
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-800 rounded-full -mr-16 -mt-16 opacity-50" />
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-900 mb-4">Recent Resources</h3>
            <div className="space-y-4">
              {['Mastering React 19', 'Interview Prep Guide', 'Salary Negotiation'].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 group cursor-pointer">
                  <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <BookOpen className="w-5 h-5 text-zinc-500 group-hover:text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-zinc-700 group-hover:text-indigo-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookOpen = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);
