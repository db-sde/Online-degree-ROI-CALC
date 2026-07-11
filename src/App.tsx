import { useState } from 'react';
import { Calculator as CalcIcon, TrendingUp, MessageCircle } from 'lucide-react';
import logo from './assets/logo.jpg';

// src/App.tsx — top of file
const CONFIG = {
  brandName: 'DegreeBaba',
  logoSrc: logo, // imported PNG/SVG asset, or remove for text fallback
  currencySymbol: '₹',
  currencyLocale: 'en-IN',  // used by toLocaleString()
  expertCtaLabel: 'Talk to Expert',
  expertCtaHref: '#',       // replace with actual CTA URL or tel: link
};

// ROI formula
const calculateRoi = (initialInvestment: number, finalReturn: number) => {
  const roiPercentage = ((finalReturn - initialInvestment) / initialInvestment) * 100;
  return Math.round(roiPercentage * 100) / 100;
};

// Currency formatting
const formatCurrency = (n: number) =>
  `${CONFIG.currencySymbol}${n.toLocaleString(CONFIG.currencyLocale)}`;

function App() {
  const [initialInvestmentStr, setInitialInvestment] = useState('');
  const [finalReturnStr, setFinalReturn] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    initialInvestment: 0,
    finalReturn: 0,
    roiPercentage: 0,
  });

  const handleCalculate = () => {
    const initial = parseFloat(initialInvestmentStr);
    const final = parseFloat(finalReturnStr);

    if (isNaN(initial) || isNaN(final)) {
      alert("Please enter valid numbers for both fields.");
      return;
    }

    if (initial <= 0) {
      alert("Initial investment must be greater than 0.");
      return;
    }

    setResults({
      initialInvestment: initial,
      finalReturn: final,
      roiPercentage: calculateRoi(initial, final),
    });
    setShowResults(true);
  };

  const handleReset = () => {
    setInitialInvestment('');
    setFinalReturn('');
    setShowResults(false);
    setResults({ initialInvestment: 0, finalReturn: 0, roiPercentage: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Header */}
      <header className="h-[80px] bg-white shadow-sm flex items-center px-4 md:px-8 justify-between sticky top-0 z-10">
        <div className="flex items-center">
          {CONFIG.logoSrc ? (
            <img src={CONFIG.logoSrc} alt={CONFIG.brandName} style={{ width: '150px' }} className="h-auto" />
          ) : (
            <span className="text-2xl font-bold text-gray-900 tracking-tight">{CONFIG.brandName}</span>
          )}
        </div>
        <div>
          <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full font-medium text-sm select-none border border-orange-100">
            <CalcIcon size={18} />
            <span>ROI Calculator</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center pt-12 pb-20 px-4 sm:px-6">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-purple-700 to-purple-600 tracking-tight">
            Calculate Your Education ROI
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Discover the true value of your degree and make data-driven educational decisions.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl mb-16">
          <div className="bg-blue-50 text-blue-800 px-6 py-4 text-sm font-medium border-b border-blue-100 flex items-center justify-center text-center">
            Note: These results are estimates only and do not guarantee future returns.
          </div>
          
          <div className="p-6 sm:p-10">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1">
                <label htmlFor="initialInvestment" className="block text-sm font-semibold text-gray-700 mb-2">
                  Initial Investment ({CONFIG.currencySymbol})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-medium">{CONFIG.currencySymbol}</span>
                  </div>
                  <input
                    type="number"
                    id="initialInvestment"
                    value={initialInvestmentStr}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    className="block w-full pl-10 pr-4 py-4 bg-gray-50 border-gray-200 rounded-2xl focus:ring-orange-500 focus:border-orange-500 text-lg transition-colors"
                    placeholder="e.g. 500000"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <label htmlFor="finalReturn" className="block text-sm font-semibold text-gray-700 mb-2">
                  Expected Final Return ({CONFIG.currencySymbol})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-medium">{CONFIG.currencySymbol}</span>
                  </div>
                  <input
                    type="number"
                    id="finalReturn"
                    value={finalReturnStr}
                    onChange={(e) => setFinalReturn(e.target.value)}
                    className="block w-full pl-10 pr-4 py-4 bg-gray-50 border-gray-200 rounded-2xl focus:ring-orange-500 focus:border-orange-500 text-lg transition-colors"
                    placeholder="e.g. 850000"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-8">
              {!showResults ? (
                <button
                  onClick={handleCalculate}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 w-full md:w-auto"
                >
                  Calculate My ROI
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-10 rounded-full shadow transition-all w-full md:w-auto"
                >
                  Calculate Again
                </button>
              )}
            </div>

            {/* Results Panel */}
            {showResults && (
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 border border-blue-100/50">
                <div className="flex items-center justify-center mb-6 space-x-3 text-indigo-900">
                  <TrendingUp className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Your ROI Results</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                    <div className="text-sm text-gray-500 font-medium mb-1">Initial Investment</div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatCurrency(results.initialInvestment)}
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl shadow-sm text-center">
                    <div className="text-sm text-gray-500 font-medium mb-1">Final Return</div>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(results.finalReturn)}
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl shadow-sm text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                    <div className="text-sm text-gray-500 font-medium mb-1">ROI Percentage</div>
                    <div className="text-3xl font-black text-blue-600">
                      {results.roiPercentage > 0 ? '+' : ''}{results.roiPercentage}%
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <a
                    href={CONFIG.expertCtaHref}
                    className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-orange-500/40 transition-all transform hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{CONFIG.expertCtaLabel}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 mb-10 prose prose-indigo max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding ROI: The Simple Formula</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Return on Investment (ROI) is a powerful financial metric used to evaluate the efficiency or profitability of an investment. In the context of education, it helps you measure the potential financial gain of a degree or course relative to its cost. The formula is straightforward: subtract the initial investment from the final return, divide by the initial investment, and multiply by 100 to get a percentage.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">What This Calculator Shows</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            This tool provides a rapid, high-level estimate of your educational ROI. By inputting your total expected costs (tuition, fees, living expenses) and your projected future earnings, you get an immediate sense of the financial trajectory. It's an excellent first step in quantifying the value of your career investment.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">Using ROI for Educational Decisions</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            When comparing multiple programs or institutions, ROI serves as an objective baseline. A higher ROI percentage generally indicates a more lucrative return relative to the upfront cost. However, it's just one piece of the puzzle—factors like program reputation, networking opportunities, and personal interest should also play a critical role in your decision-making process.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-3">Important Considerations</h3>
          <p className="text-gray-600 leading-relaxed">
            While ROI is a valuable tool, remember that these figures are estimates. Real-world returns can fluctuate based on market conditions, geographic location, and individual career progression. Furthermore, education offers intangible benefits—such as personal growth and job satisfaction—that numbers alone cannot capture. Always weigh these financial metrics against your broader life goals.
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center mt-auto">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} {CONFIG.brandName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
