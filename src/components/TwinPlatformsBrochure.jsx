import { ArrowRight, Briefcase, MessageSquare, Sparkles, Star, Target, Users, Zap } from "lucide-react";

export default function TwinPlatformsBrochure() {
  return (
    <div className="w-full max-w-[8.5in] mx-auto bg-white text-gray-900 p-12 shadow-2xl print:shadow-none">
      {/* Header - Twin Platforms Story */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-3">
            Meet the Twins
          </h1>
          <p className="text-3xl text-gray-700 font-medium">CareerElite & TalentElite</p>
        </div>

        {/* Twin Icons */}
        <div className="flex justify-center items-center gap-12 mb-10">
          <div className="text-center">
            <div className="w-28 h-28 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Sparkles className="w-14 h-14 text-white" />
            </div>
            <div className="text-lg font-bold text-cyan-600">CareerElite</div>
            <div className="text-base text-gray-600">The Extrovert</div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mb-2"></div>
            <div className="text-sm text-gray-600 font-semibold">Connected Platform</div>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mt-2"></div>
          </div>

          <div className="text-center">
            <div className="w-28 h-28 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Briefcase className="w-14 h-14 text-white" />
            </div>
            <div className="text-lg font-bold text-purple-600">TalentElite</div>
            <div className="text-base text-gray-600">The Introvert</div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
          <p className="text-lg text-gray-800 leading-relaxed mb-5 font-medium">
            They're not identical twins—<span className="font-bold text-cyan-600">CareerElite</span> is the extrovert, 
            candidate-facing and ambitious, while <span className="font-bold text-purple-600">TalentElite</span> is the 
            focused introvert, serving HR teams and recruiters. But make no mistake: they know each other intimately and 
            complement each other brilliantly. Together, they understand and execute on a singular vision—streamlining an 
            industry that's been overdue for disruption.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed italic font-medium">
            The vision is elegantly simple: A candidate should be able to tell their platform, <span className="font-bold">"Find me the perfect job,"</span> and 
            a recruiter should be able to tell theirs, <span className="font-bold">"Find me the perfect candidate."</span> And our twin Plaforms make this happen.
          </p>
        </div>
      </section>

      {/* Platform Features - Two Columns */}
      <section className="mb-16">
        <div className="grid grid-cols-2 gap-10">
          
          {/* CareerElite - Left Column */}
          <div className="border-r-2 border-gray-300 pr-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-cyan-600">CareerElite</h2>
                <p className="text-base text-gray-600 font-medium">Candidate Platform</p>
              </div>
            </div>

            <div className="space-y-6">
              <FeatureItem 
                icon={<Target className="w-6 h-6" />}
                color="cyan"
                title="AI Career Profiles"
                description="Build professional profiles in minutes with AI assistance"
              />
              
              <FeatureItem 
                icon={<Sparkles className="w-6 h-6" />}
                color="blue"
                title="Job Match Analysis"
                description="AI-powered resume tailoring for specific job descriptions with instant match scores"
              />
              
              <FeatureItem 
                icon={<MessageSquare className="w-6 h-6" />}
                color="purple"
                title="Mock Interview Agents"
                description="AI agents conduct interviews with job-specific questions, real-time feedback, and skill gap analysis"
              />
              
              <FeatureItem 
                icon={<Star className="w-6 h-6" />}
                color="yellow"
                title="AI Readiness Score"
                description="Quantifiable assessment of AI proficiency and career readiness"
              />
            </div>

            <div className="mt-8 p-6 bg-cyan-100 rounded-xl border-2 border-cyan-300 shadow-md">
              <div className="text-base font-bold text-cyan-700 mb-2">Platform Traction</div>
              <div className="text-4xl font-bold text-cyan-600">1,000+</div>
              <div className="text-sm text-gray-700 font-medium">Professionals using the platform</div>
            </div>
          </div>

          {/* TalentElite - Right Column */}
          <div className="pl-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-purple-600">TalentElite</h2>
                <p className="text-base text-gray-600 font-medium">Employer Platform</p>
              </div>
            </div>

            <div className="space-y-6">
              <FeatureItem 
                icon={<Briefcase className="w-6 h-6" />}
                color="purple"
                title="Agentic ATS Stages"
                description="Auto-Screen and Auto-HR agents save time with multi-stage hiring pipeline and intelligent scheduling"
              />
              
              <FeatureItem 
                icon={<Zap className="w-6 h-6" />}
                color="indigo"
                title="Smart Matching"
                description="0-100 match scores across 6 categories: skills, experience, trajectory, education, and fit"
              />
              
              <FeatureItem 
                icon={<Users className="w-6 h-6" />}
                color="blue"
                title="Talent Pools"
                description="Save candidates, tag them, and move between opportunities with automatic rescoring"
              />
              
              <FeatureItem 
                icon={<Target className="w-6 h-6" />}
                color="cyan"
                title="Cross-Platform Integration"
                description="Seamless access to CareerElite candidate pool with real-time matching"
              />
            </div>

            <div className="mt-8 p-6 bg-purple-100 rounded-xl border-2 border-purple-300 shadow-md">
              <div className="text-base font-bold text-purple-700 mb-2">Live & Active</div>
              <div className="text-4xl font-bold text-purple-600">Beta Launch</div>
              <div className="text-sm text-gray-700 font-medium">Generating applications & placements</div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="border-t-4 border-gray-300 pt-10">
        <div className="grid grid-cols-3 gap-10 items-center">
          {/* CareerElite Link */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-xl font-bold shadow-xl mb-3 text-lg">
              <Sparkles className="w-5 h-5" />
              <span>CareerElite</span>
            </div>
            <div className="text-sm text-gray-700 font-medium">https://careerelite.ai</div>
            <div className="text-sm text-gray-600 mt-2 font-medium">For Candidates</div>
          </div>

          {/* Parent Company */}
          <div className="text-center border-x-2 border-gray-300 px-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text text-transparent mb-2">
              ABL Nexus
            </div>
            <div className="text-lg text-gray-700 italic mb-3 font-medium">AI Brought to Life</div>
            <div className="text-sm text-gray-600 font-medium">Parent Company</div>
          </div>

          {/* TalentElite Link */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-8 py-4 rounded-xl font-bold shadow-xl mb-3 text-lg">
              <Briefcase className="w-5 h-5" />
              <span>TalentElite</span>
            </div>
            <div className="text-sm text-gray-700 font-medium">https://talentelite.ai</div>
            <div className="text-sm text-gray-600 mt-2 font-medium">For Employers</div>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-600 font-semibold">
          Both platforms live today • Real engagement • Real applications • Real hires
        </div>
      </footer>

    </div>
  );
}

// Helper component for feature items
function FeatureItem({ icon, color, title, description }) {
  const colorClasses = {
    cyan: "text-cyan-600 bg-cyan-100 border-cyan-300",
    blue: "text-blue-600 bg-blue-100 border-blue-300",
    purple: "text-purple-600 bg-purple-100 border-purple-300",
    indigo: "text-indigo-600 bg-indigo-100 border-indigo-300",
    yellow: "text-yellow-600 bg-yellow-100 border-yellow-300"
  };

  return (
    <div className="flex gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClasses[color]} border-2 shadow-md`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-base text-gray-900 mb-2">{title}</h4>
        <p className="text-sm text-gray-700 leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
}