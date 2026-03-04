import { useState, useEffect } from 'react';
import { Search, Copy, Zap, Rocket, Sparkles, RefreshCw, Check } from 'lucide-react';

const PREFIXES = [
  'Neo', 'Nova', 'Swift', 'Meta', 'Zen', 'Aura', 'Quantum', 'Hyper', 'Flow', 'Spark',
  'Nexus', 'Echo', 'Sync', 'Volt', 'Peak', 'Sky', 'Cloud', 'Data', 'Pulse', 'Edge'
];

const SUFFIXES = [
  'ly', 'ify', 'ia', 'io', 'on', 'um', 'ix', 'ex', 'er', 'ora',
  'flow', 'base', 'hub', 'grid', 'node', 'wave', 'lab', 'stack', 'byte', 'core'
];

const COMBINERS = [
  'Tech', 'App', 'AI', 'Soft', 'Net', 'Web', 'Lab', 'Studio', 'Pro', 'Smart'
];

const StartupCard = ({ name }: { name: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1"
         onClick={copyToClipboard}>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white tracking-tight">{name}</h3>
        <button className="text-indigo-300 group-hover:text-white transition-colors">
          {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
        </button>
      </div>
      <div className="mt-2 text-indigo-200/60 text-sm font-medium">Click to copy</div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur" />
    </div>
  );
};

function App() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNames = (val: string) => {
    if (!val.trim()) {
      setResults([]);
      return;
    }
    
    setIsGenerating(true);
    // Simulate a bit of "thinking" for visual effect
    setTimeout(() => {
      const input = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
      const generated = new Set<string>();

      // Rule 1: Prefix + Keyword
      PREFIXES.forEach(p => generated.add(`${p}${input}`));
      
      // Rule 2: Keyword + Suffix
      SUFFIXES.forEach(s => generated.add(`${input}${s}`));
      
      // Rule 3: Combiner + Keyword
      COMBINERS.forEach(c => generated.add(`${c} ${input}`));
      
      // Rule 4: Keyword + Combiner
      COMBINERS.forEach(c => generated.add(`${input} ${c}`));

      // Rule 5: Some fun transformations
      generated.add(`${input}ify`);
      generated.add(`Get${input}`);
      generated.add(`${input}ly`);
      generated.add(`Go${input}`);

      setResults(Array.from(generated).sort(() => Math.random() - 0.5).slice(0, 24));
      setIsGenerating(false);
    }, 400);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword) generateNames(keyword);
    }, 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-indigo-500/30 font-sans">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        {/* Hero Section */}
        <header className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-4">
            <Sparkles size={16} />
            <span>AI-Powered Ideas</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight">
            Launch Your Next <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Great Idea</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Generate memorable, tech-forward names for your startup in seconds. Enter a keyword and watch the magic happen.
          </p>
        </header>

        {/* Input Section */}
        <div className="max-w-xl mx-auto mb-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-[#1e293b] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="pl-6 text-slate-400">
                <Search size={24} />
              </div>
              <input
                type="text"
                placeholder="Enter a niche or keyword (e.g. food, cloud, pets)"
                className="w-full bg-transparent border-none py-6 px-4 text-lg text-white placeholder-slate-500 focus:ring-0 outline-none"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              {isGenerating && (
                <div className="pr-6 text-indigo-400 animate-spin">
                  <RefreshCw size={24} />
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-6 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5"><Rocket size={14} /> 100% Unique</span>
            <span className="flex items-center gap-1.5"><Zap size={14} /> Instant Results</span>
          </div>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in-fade">
            {results.map((name, idx) => (
              <StartupCard key={idx} name={name} />
            ))}
          </div>
        ) : keyword ? (
          <div className="text-center py-20 animate-pulse text-slate-500">
            Generating awesome names...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
             {['Skyline', 'NovaCore', 'Vortex'].map((name, i) => (
               <div key={i} className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl flex items-center justify-center text-slate-500 font-bold text-2xl italic transition-all hover:bg-white/10 opacity-40 hover:opacity-100">
                 {name}
               </div>
             ))}
          </div>
        )}
      </div>

      <footer className="text-center py-12 text-slate-500 text-sm border-t border-white/5">
        <p>© 2026 Startup Name Generator. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;
