import { BookOpen, Award, ArrowRight } from 'lucide-react';

export default function EducationPage() {
  const articles = [
    { title: 'The Impact of Fast Fashion', category: 'Consumption', time: '5 min read', points: 20 },
    { title: 'Demystifying Carbon Offsets', category: 'Climate Science', time: '8 min read', points: 30 },
    { title: 'Plant-Based Diet Transition Guide', category: 'Diet', time: '10 min read', points: 50 },
    { title: 'Renewable Energy at Home', category: 'Energy', time: '6 min read', points: 25 },
  ];

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-cyan-500/20 p-3 rounded-xl">
          <BookOpen className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Educational Learning Center</h1>
          <p className="text-slate-400">Read articles, take quizzes, and earn sustainability points.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {articles.map((article, idx) => (
          <button 
            key={idx} 
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-cyan-500/50 transition-colors cursor-pointer group text-left w-full focus-visible:ring-2 focus-visible:ring-cyan-500 outline-none"
            aria-label={`Read article: ${article.title}. Category: ${article.category}. Earn ${article.points} XP.`}
          >
            <div className="flex justify-between items-start mb-4 w-full">
              <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-amber-400 text-sm font-bold bg-amber-400/10 px-2 py-1 rounded">
                <Award className="w-4 h-4" /> +{article.points} XP
              </span>
            </div>
            
            <h2 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{article.title}</h2>
            <p className="text-sm text-slate-200 mb-6 flex-1">
              Learn actionable insights about how {article.category.toLowerCase()} affects your carbon footprint and the UN Sustainable Development Goals.
            </p>
            
            <div className="flex items-center justify-between mt-auto w-full">
              <span className="text-sm text-slate-300">{article.time}</span>
              <span className="text-cyan-400 flex items-center gap-1 text-sm font-bold group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}
