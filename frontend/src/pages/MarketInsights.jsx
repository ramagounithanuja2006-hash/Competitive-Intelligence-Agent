import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/common/Card";
import { api } from "../services/api";

export default function MarketInsights() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const getInsight = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await api.post("/api/ask", {
        question,
      });

      setAnswer(
        response.data?.result?.answer ||
        response.data?.answer ||
        "No insight found."
      );
    } catch (error) {
      setAnswer("Unable to connect to the intelligence backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Market Insights">

      <div className="grid xl:grid-cols-3 gap-6">

        <Card className="p-6 xl:col-span-1">
          <p className="text-cyan-600 text-sm font-bold">
            AI MARKET INTELLIGENCE
          </p>

          <h2 className="text-2xl font-black mt-2">
            Ask the Market
          </h2>

          <p className="text-slate-500 mt-2">
            Ask questions about competitors, products, pricing,
            strategies and market signals.
          </p>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: What do we know about TechNova?"
            rows={6}
            className="w-full mt-6 rounded-xl border border-slate-200 p-3 resize-none outline-none focus:ring-2 focus:ring-cyan-200"
          />

          <button
            onClick={getInsight}
            disabled={loading}
            className="w-full mt-4 rounded-xl bg-slate-900 text-white p-3 font-bold hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Generate Insight"}
          </button>
        </Card>

        <Card className="p-6 xl:col-span-2">

          <p className="text-cyan-600 text-sm font-bold">
            INTELLIGENCE RESULT
          </p>

          <h2 className="text-2xl font-black mt-2">
            Market Intelligence
          </h2>

          {!answer && !loading && (
            <div className="mt-8 rounded-2xl bg-slate-50 p-8 text-center">
              <p className="font-bold text-slate-700">
                Ask a question to generate insights
              </p>

              <p className="text-sm text-slate-500 mt-2">
                Your Hindsight-powered intelligence will appear here.
              </p>
            </div>
          )}

          {loading && (
            <div className="mt-8 rounded-2xl bg-cyan-50 p-8 text-center">
              <p className="font-bold text-cyan-700">
                AI is analyzing market intelligence...
              </p>
            </div>
          )}

          {answer && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-6">
              <div className="whitespace-pre-wrap text-sm text-slate-700 leading-7">
                {answer}
              </div>
            </div>
          )}

        </Card>

      </div>

    </DashboardLayout>
  );
}