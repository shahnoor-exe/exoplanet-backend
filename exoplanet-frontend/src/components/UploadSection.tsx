import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Radar } from "lucide-react";

interface ScanResult {
    status: string;
    confidence: string;
    type: string;
}

const BACKEND_URL = "https://exoplanet--am3072171.replit.app";
// later you can change this URL

const UploadSection = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setResult(null);
            setError(null);
        }
    };

    const startScan = async () => {
        if (!file) {
            setError("Please upload a CSV file first.");
            return;
        }

        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(`${BACKEND_URL}/predict-csv`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Prediction failed");
            }

            // Backend returns CSV → download it
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "prediction_results.csv";
            a.click();

            // Dummy UI result (for display only)
            setResult({
                status: "Exoplanet Analysis Completed",
                confidence: "High",
                type: "See downloaded CSV",
            });
        } catch (err) {
            setError("Backend error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative z-10 mt-32 max-w-4xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative p-16 rounded-3xl text-center border"
            >
                {loading && (
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4 }}
                        className="absolute top-0 left-0 h-1 bg-purple-500"
                    />
                )}

                <Upload className="mx-auto text-purple-500 mb-4" size={44} />
                <h3 className="text-2xl font-semibold">Upload Light Curve CSV</h3>
                <p className="mt-2 text-gray-500">
                    AI analyzes stellar brightness variations
                </p>

                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="mt-6 block mx-auto"
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startScan}
                    disabled={loading}
                    className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-xl disabled:opacity-50 flex items-center gap-2 mx-auto"
                >
                    <Radar size={18} />
                    {loading ? "Analyzing..." : "Analyze with AI"}
                </motion.button>

                {error && (
                    <p className="mt-4 text-red-500 font-medium">{error}</p>
                )}

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-10 p-6 rounded-xl border"
                        >
                            <p className="text-xl font-bold text-purple-600">
                                {result.status}
                            </p>
                            <p className="text-gray-500 mt-1">
                                Confidence: {result.confidence}
                            </p>
                            <p className="text-gray-400 mt-1">
                                {result.type}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default UploadSection;
