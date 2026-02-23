import { useState, useEffect } from 'react';
import { careerService } from '../services/api';
import { Briefcase, MapPin, DollarSign, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await careerService.getJobs();
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-2">
        <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Job Opportunities</h1>
        <p className="text-zinc-500 text-lg font-medium">Curated roles matching your career path and AI recommendations.</p>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-zinc-100 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={job.id}
              className="bg-white border border-zinc-200/60 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:border-brand-300 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-zinc-200/50"
            >
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center group-hover:bg-brand-50 transition-all duration-300 border border-zinc-100">
                  <Briefcase className="text-zinc-400 group-hover:text-brand-600 w-7 h-7 transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 group-hover:text-brand-600 transition-colors">{job.title}</h3>
                  <p className="text-brand-600 font-bold text-sm mb-4">{job.company}</p>
                  <div className="flex flex-wrap gap-6 text-zinc-400 text-xs font-bold uppercase tracking-widest">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-zinc-300" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-zinc-300" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-zinc-300" />
                      {job.type}
                    </div>
                  </div>
                </div>
              </div>
              <button className="flex items-center justify-center space-x-2 bg-zinc-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-zinc-800 transition-all duration-300 whitespace-nowrap shadow-lg shadow-zinc-100 active:scale-[0.98]">
                <span>Apply Now</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
