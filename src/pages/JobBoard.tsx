import React, { useState, useEffect } from 'react';
import { careerService } from '../services/api';
import { Briefcase, MapPin, DollarSign, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export const JobBoard = () => {
  const [jobs, setJobs] = useState<any[]>([]);
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Job Opportunities</h1>
        <p className="text-zinc-500">Curated roles matching your career path and AI recommendations.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-zinc-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={job.id}
              className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-300 transition-colors group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                  <Briefcase className="text-zinc-500 group-hover:text-indigo-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">{job.title}</h3>
                  <p className="text-indigo-600 font-medium text-sm mb-2">{job.company}</p>
                  <div className="flex flex-wrap gap-4 text-zinc-500 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                  </div>
                </div>
              </div>
              <button className="flex items-center justify-center space-x-2 bg-zinc-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-zinc-800 transition-colors whitespace-nowrap">
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
