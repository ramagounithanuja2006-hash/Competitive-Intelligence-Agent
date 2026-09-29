import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/common/Card";
import { api } from "../services/api";

export default function AIAnalysis() {
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnalysis("");

    try {
      const response = await api.post("/api/ask", {
        question,
      });

      setAnalysis(
        response.data?.result?.answer ||
        response.data?.answer ||
        "No analysis available."
      );
    } catch (error) {
      setAnalysis("Unable to connect to the AI backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="AI Analysis">

      <div className="grid xl:grid-cols-3 gap-6">

        {/* LEFT */}
        <Card className="p-6 xl:col-span-1">

          <p className="text-cyan-600 text-sm font-bold">
            AI POWERED
          </p>

          <h2 className="text-2xl font-black mt-2">
            Competitive Analysis
          </h2>

          <p className="text-slate-500 mt-2">
            Ask the AI agent to analyze competitors,
            strategies, products and market movements.
          </p>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: Analyze TechNova's competitive strategy."
            rows={7}
            className="w-full mt-6 rounded-xl border border-slate-200 p-3 resize-none outline-none focus:ring-2 focus:ring-cyan-200"
          />

          <button
            onClick={analyze}
            disabled={loading}
            className="w-full mt-4 rounded-xl bg-slate-900 text-white p-3 font-bold hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Run AI Analysis"}
          </button>

        </Card>

        {/* RIGHT */}
        <Card className="p-6 xl:col-span-2">

          <p className="text-cyan-600 text-sm font-bold">
            INTELLIGENCE ENGINE
          </p>

          <h2 className="text-2xl font-black mt-2">
            Competitive Intelligence Report
          </h2>

          {!analysis && !loading && (
            <div className="mt-8 rounded-2xl bg-slate-50 p-8 text-center">

              <div className="text-4xl mb-3">
                🤖
              </div>

              <p className="font-bold text-slate-700">
                Ready for analysis
              </p>

              <p className="text-sm text-slate-500 mt-2">
                Enter a competitive question and run the AI analysis.
              </p>

            </div>
          )}

          {loading && (
            <div className="mt-8 rounded-2xl bg-cyan-50 p-8 text-center">

              <div className="text-3xl mb-3">
                🧠
              </div>

              <p className="font-bold text-cyan-700">
                AI is analyzing intelligence...
              </p>

              <p className="text-sm text-slate-500 mt-2">
                Hindsight memory is being used to generate the report.
              </p>

            </div>
          )}

          {analysis && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-6">

              <div className="whitespace-pre-wrap text-sm text-slate-700 leading-7">
                {analysis}
              </div>

            </div>
          )}

        </Card>

      </div>

    </DashboardLayout>
  );
}