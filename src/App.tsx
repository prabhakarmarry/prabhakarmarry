import { usePortfolioData } from './hooks/usePortfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { Contact } from './components/Contact';
import { SECTION_TITLES } from './config/sheets';
import { Loader2, AlertCircle } from 'lucide-react';

function App() {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white gap-4">
        <Loader2 className="animate-spin w-10 h-10 text-black" />
        <p className="text-black font-bold uppercase tracking-widest animate-pulse">Loading Portfolio...</p>
      </div>
    );
  }

  if (error || !data.basicInfo || data.basicInfo.length === 0) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white p-4 text-center max-w-md mx-auto">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Unable to Load Portfolio</h1>
        <p className="text-slate-500 mb-6">
          We couldn't fetch the data from Google Sheets. Please check your internet connection or the sheet permissions.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition uppercase text-sm font-bold tracking-widest"
        >
          Try Again
        </button>
      </div>
    );
  }

  const validSections = (Object.keys(SECTION_TITLES) as (keyof typeof SECTION_TITLES)[])
    .filter(key => {
      const rows = data[key];
      if (key === 'basicInfo') return true;
      return rows && rows.length > 0 && rows.some(r => Object.values(r).some(v => v));
    });

  const sectionsToRender = validSections.filter(k => k !== 'basicInfo' && k !== 'contactMe');

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-black selection:text-white scroll-smooth">
      <Navbar />

      <main className="transition-all duration-300">
        <Hero data={data.basicInfo[0]} />

        <div className="flex flex-col container mx-auto px-6 py-20">
          {sectionsToRender.map(key => (
            <Section
              key={key}
              id={key}
              title={SECTION_TITLES[key]}
              rows={data[key]!}
            />
          ))}

          <Contact email={data.contactMe?.[0]?.['mail'] || data.basicInfo[0]['Official Email']} />
        </div>

        <footer className="py-20 text-center text-gray-400 text-sm bg-black">
          <p className="uppercase tracking-[0.3em] font-bold">
            © {new Date().getFullYear()} {data.basicInfo[0]['Full Name']}
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
