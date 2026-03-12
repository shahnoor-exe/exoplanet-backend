import { useState, useRef } from 'react';
import {
  Upload,
  Radar,
  FileSpreadsheet,
  X,
  Download,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { predictCsv, parsePredictionCsv, type PredictionRow } from '../services/exoplanetApi';

const UploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PredictionRow[] | null>(null);
  const [csvBlob, setCsvBlob] = useState<Blob | null>(null);
  const [exoplanetsFound, setExoplanetsFound] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const header = useInView();
  const card = useInView(0.1);

  const acceptFile = (f: File) => {
    if (!f.name.endsWith('.csv')) return;
    setFile(f);
    setResults(null);
    setError(null);
    setCsvBlob(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    if (f) acceptFile(f);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragActive(true); };
  const handleDragLeave = () => setDragActive(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) acceptFile(f);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a CSV file first.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setCsvBlob(null);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => (prev >= 90 ? 90 : prev + Math.random() * 15));
    }, 400);

    try {
      const blob = await predictCsv(file);
      setCsvBlob(blob);

      const text = await blob.text();
      const rows = parsePredictionCsv(text);
      if (rows.length > 0) {
        setResults(rows);
        setTotalRows(rows.length);
        setExoplanetsFound(rows.filter(r => r.pred_label === 1).length);
      }

      setProgress(100);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Analysis failed: ${message}`);
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!csvBlob) return;
    const url = window.URL.createObjectURL(csvBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exoplanet_predictions_${file?.name || 'results'}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const removeFile = () => {
    setFile(null);
    setResults(null);
    setError(null);
    setCsvBlob(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <section id="upload" className="relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div
          ref={header.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            header.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-inter text-cosmic-400 tracking-wider uppercase mb-4">
            <Radar className="w-3.5 h-3.5" />
            Analysis Module
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-white to-cosmic-200 bg-clip-text text-transparent">
              Upload Light Curve{' '}
            </span>
            <span className="bg-gradient-to-r from-cosmic-400 to-cyan-400 bg-clip-text text-transparent">
              Data
            </span>
          </h2>
          <p className="mt-4 text-gray-400 font-inter max-w-xl mx-auto">
            Feed stellar brightness measurements to our AI. It analyzes transit
            dips to identify planetary candidates with high accuracy.
          </p>
        </div>

        {/* Upload Card */}
        <div
          ref={card.ref}
          className={`gradient-border transition-all duration-700 delay-200 ${
            card.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass rounded-2xl p-8 md:p-12 relative">
            {/* Progress bar */}
            {loading && (
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden animate-fade-in">
                <div
                  className="h-full bg-gradient-to-r from-cosmic-500 via-cyan-400 to-cosmic-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Dropzone */}
            <div
              onClick={() => inputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                dragActive
                  ? 'dropzone-active border-cosmic-400'
                  : 'border-gray-700/50 hover:border-cosmic-500/50 hover:bg-cosmic-500/5'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className={`transition-transform duration-200 ${dragActive ? 'scale-110 -translate-y-1' : ''}`}>
                <div className="relative inline-block mb-6">
                  <Upload className="w-12 h-12 text-cosmic-400 mx-auto" />
                  <div className="absolute -inset-3 bg-cosmic-500/10 rounded-full blur-xl animate-pulse" />
                </div>

                <h3 className="font-orbitron text-xl font-semibold text-white mb-2">
                  {dragActive ? 'Release to Upload' : 'Drop CSV File Here'}
                </h3>
                <p className="text-gray-500 font-inter text-sm">
                  or click to browse &bull; Accepts .csv light curve data
                </p>
              </div>
            </div>

            {/* Selected file */}
            {file && (
              <div className="mt-6 flex items-center gap-4 p-4 rounded-xl bg-cosmic-950/50 border border-cosmic-500/20 animate-fade-in-up">
                <FileSpreadsheet className="w-8 h-8 text-cosmic-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{file.name}</p>
                  <p className="text-gray-500 text-sm">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(); }}
                  className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading || !file}
              className="btn-shine mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-cosmic-600 to-cosmic-500 text-white font-semibold text-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-cosmic-600/20 hover:shadow-cosmic-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Stellar Data...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze with AI
                </>
              )}
            </button>

            {/* Error */}
            {error && (
              <div className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 animate-fade-in-up">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm font-inter">{error}</p>
              </div>
            )}

            {/* Results */}
            {results && (
              <div className="mt-8 animate-fade-in-up">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-5 rounded-xl glass text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
                    <p className="text-3xl font-orbitron font-bold text-white">{totalRows}</p>
                    <p className="text-gray-400 text-sm mt-1 font-inter">Stars Analyzed</p>
                  </div>
                  <div className="p-5 rounded-xl glass text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <p className="text-3xl font-orbitron font-bold text-emerald-400">{exoplanetsFound}</p>
                    <p className="text-gray-400 text-sm mt-1 font-inter">Exoplanets Detected</p>
                  </div>
                  <div className="p-5 rounded-xl glass text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
                    <p className="text-3xl font-orbitron font-bold text-cosmic-400">
                      {totalRows > 0 ? ((exoplanetsFound / totalRows) * 100).toFixed(1) : 0}%
                    </p>
                    <p className="text-gray-400 text-sm mt-1 font-inter">Detection Rate</p>
                  </div>
                </div>

                {/* Success banner */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <p className="text-emerald-300 text-sm font-inter">
                    Analysis complete! {exoplanetsFound > 0
                      ? `Found ${exoplanetsFound} potential exoplanet candidate${exoplanetsFound > 1 ? 's' : ''}!`
                      : 'No exoplanet transits detected in this dataset.'}
                  </p>
                </div>

                {/* Top results table */}
                <div className="rounded-xl overflow-hidden border border-cosmic-500/10">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-cosmic-950/80 text-left">
                          <th className="px-4 py-3 font-inter text-gray-400 font-medium">#</th>
                          <th className="px-4 py-3 font-inter text-gray-400 font-medium">Probability</th>
                          <th className="px-4 py-3 font-inter text-gray-400 font-medium">Prediction</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.slice(0, 10).map((row, i) => (
                          <tr
                            key={i}
                            className="border-t border-cosmic-500/10 hover:bg-cosmic-500/5 transition-colors animate-fade-in-left"
                            style={{ animationDelay: `${0.05 * i}s` }}
                          >
                            <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 h-2 rounded-full bg-gray-800 overflow-hidden max-w-[120px]">
                                  <div
                                    className={`h-full rounded-full transition-all ${
                                      row.pred_probability >= 0.5
                                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                                        : 'bg-gradient-to-r from-gray-600 to-gray-500'
                                    }`}
                                    style={{ width: `${row.pred_probability * 100}%` }}
                                  />
                                </div>
                                <span className="text-white font-mono">
                                  {(row.pred_probability * 100).toFixed(1)}%
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {row.pred_label === 1 ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-medium">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Exoplanet
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-500/15 text-gray-400 text-xs font-medium">
                                  No Transit
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {results.length > 10 && (
                    <div className="px-4 py-3 bg-cosmic-950/60 text-gray-500 text-xs text-center font-inter">
                      Showing 10 of {results.length} results. Download CSV for full data.
                    </div>
                  )}
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="btn-shine mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Predictions CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
