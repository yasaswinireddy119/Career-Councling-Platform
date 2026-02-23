import supabase from "../config/supabase.js";

export const getRecommendations = async (req, res) => {
  try {
    const staticRecommendations = [
      {
        careerTitle: "AI Solutions Architect",
        whyItMatches: "Your background in Computer Science and interest in AI makes you a perfect fit for designing complex AI systems.",
        requiredSkills: ["Machine Learning", "Cloud Architecture", "Python", "System Design"],
        estimatedSalaryRange: "$150k - $220k",
        educationalResources: "Coursera AI Specialization, AWS Certified Solutions Architect"
      },
      {
        careerTitle: "Full Stack Product Engineer",
        whyItMatches: "Combining your React/Node.js skills with UI design interests allows you to own features from end-to-end.",
        requiredSkills: ["TypeScript", "Next.js", "PostgreSQL", "Figma"],
        estimatedSalaryRange: "$130k - $190k",
        educationalResources: "Full Stack Open, Frontend Masters"
      },
      {
        careerTitle: "EdTech Innovation Lead",
        whyItMatches: "Your interest in Education and technical skills position you well to lead digital transformation in learning.",
        requiredSkills: ["Product Management", "LMS Systems", "Stakeholder Management"],
        estimatedSalaryRange: "$120k - $170k",
        educationalResources: "Product School, EdTech Strategy Certification"
      }
    ];
    await new Promise(resolve => setTimeout(resolve, 800));
    res.json(staticRecommendations);
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
};

export const matchCounselors = async (req, res) => {
  try {
    const { userInterests } = req.body;
    const { data: counselors, error } = await supabase.from("counselors").select("*");
    if (error) throw error;
    const matches = counselors.map(c => {
      const overlap = c.expertise.filter((skill) => userInterests.includes(skill)).length;
      return { ...c, matchScore: overlap };
    }).sort((a, b) => b.matchScore - a.matchScore);
    res.json(matches.slice(0, 5));
  } catch {
    res.status(500).json({ error: "Failed to match counselors" });
  }
};

export const getJobs = async (req, res) => {
  const mockJobs = [
    { id: 1, title: "Senior Frontend Engineer", company: "Vercel", location: "Remote", salary: "$160k - $210k", type: "Full-time" },
    { id: 2, title: "AI Product Manager", company: "OpenAI", location: "San Francisco, CA", salary: "$180k - $250k", type: "Full-time" },
    { id: 3, title: "UX/UI Designer", company: "Airbnb", location: "Remote", salary: "$140k - $190k", type: "Full-time" },
    { id: 4, title: "Data Engineer", company: "Snowflake", location: "Bozeman, MT", salary: "$150k - $200k", type: "Full-time" },
    { id: 5, title: "DevOps Specialist", company: "Stripe", location: "Dublin, IE", salary: "$130k - $180k", type: "Contract" },
    { id: 6, title: "Full Stack Developer", company: "Supabase", location: "Remote", salary: "$120k - $170k", type: "Full-time" },
  ];
  res.json(mockJobs);
};
