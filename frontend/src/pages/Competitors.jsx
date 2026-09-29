import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/common/Card";
import { api } from "../services/api";

function formatReport(text) {
  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, index) => {
    const clean = line
      .replace(/\*\*/g, "")
      .replace(/<br>/g, "")
      .replace(/<br\/>/g, "")
      .trim();

    if (!clean) {
      return <div key={index} className="h-2" />;
    }

    if (
      clean.startsWith("Competitive Intelligence") ||
      clean.startsWith("Competitive-Intelligence") ||
      clean.startsWith("Competitive Intelligence Snapshot")
    ) {
      return (
        <h3
          key={index}
          className="text-xl font-black text-slate-900 mt-2 mb-4"
        >
          {clean}
        </h3>
      );
    }

    if (
      clean.startsWith("Quick Takeaways") ||
      clean.startsWith("Key Takeaways") ||
      clean.startsWith("Strategic Overview") ||
      clean.startsWith("Summary")
    ) {
      return (
        <div
          key={index}
          className="mt-6 mb-3 rounded-xl bg-cyan-50 border border-cyan-100 p-4"
        >
          <h3 className="font-black text-cyan-800 text-lg">{clean}</h3>
        </div>
      );
    }

    if (
      clean.startsWith("Product") ||
      clean.startsWith("Pricing") ||
      clean.startsWith("Marketing") ||
      clean.startsWith("Hiring") ||
      clean.startsWith("Strategy")
    ) {
      return (
        <div
          key={index}
          className="mt-4 rounded-xl bg-white border border-slate-200 p-4 shadow-sm"
        >
          <p className="font-black text-slate-900">{clean}</p>
        </div>
      );
    }

    if (/^\d+[\.\)]/.test(clean) || clean.startsWith("-")) {
      return (
        <div
          key={index}
          className="flex gap-3 mt-3 rounded-xl bg-white border border-slate-100 p-3"
        >
          <span className="text-cyan-600 font-bold">✦</span>
          <p className="text-sm text-slate-700 leading-6">
            {clean.replace(/^\d+[\.\)]\s*/, "").replace(/^-\s*/, "")}
          </p>
        </div>
      );
    }

    return (
      <p
        key={index}
        className="text-sm text-slate-600 leading-7 mt-2"
      >
        {clean}
      </p>
    );
  });
}

export default function Competitors() {
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const collectData = async () => {
    if (!company || !source || !content) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await api.post("/api/collect", {
        company,
        source,
        content,
      });

      setResult(
        response.data?.result?.analysis ||
          response.data?.message ||
          "Data collected successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to connect to the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Competitors">

      <div className="grid xl:grid-cols-2 gap-6">

        {/* LEFT - DATA COLLECTION */}
        <Card className="p-6">

          <div className="mb-6">
            <p className="text-cyan-600 text-xs font-black tracking-widest">
              COMPETITIVE INTELLIGENCE
            </p>

            <h2 className="text-2xl font-black mt-2 text-slate-900">
              Add Competitor Intelligence
            </h2>

            <p className="text-slate-500 mt-2 text-sm leading-6">
              Collect competitor information and send it to the AI
              intelligence engine powered by Hindsight.
            </p>
          </div>

          <div className="space-y-5">

            <div>
              <label className="text-sm font-bold text-slate-700">
                Company
              </label>

              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Tesla"
                className="w-full mt-2 rounded-xl border border-slate-200 p-3 outline-none focus:ring-2 focus:ring-cyan-200"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">
                Data Source
              </label>

              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Company Website"
                className="w-full mt-2 rounded-xl border border-slate-200 p-3 outline-none focus:ring-2 focus:ring-cyan-200"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">
                Intelligence Data
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter competitor announcement, product update, pricing change, hiring signal..."
                rows={8}
                className="w-full mt-2 rounded-xl border border-slate-200 p-3 outline-none resize-none focus:ring-2 focus:ring-cyan-200"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 text-red-600 p-3 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={collectData}
              disabled={loading}
              className="w-full rounded-xl bg-slate-900 text-white p-3.5 font-bold hover:bg-slate-800 transition disabled:opacity-50"
            >
              {loading
                ? "Analyzing with AI..."
                : "Analyze & Store Intelligence"}
            </button>

          </div>
        </Card>

        {/* RIGHT - AI RESULT */}
        <Card className="p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-cyan-600 text-xs font-black tracking-widest">
                AI INTELLIGENCE ENGINE
              </p>

              <h2 className="text-2xl font-black mt-2 text-slate-900">
                Intelligence Analysis
              </h2>
            </div>

            <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center text-xl">
              ✦
            </div>

          </div>

          {/* EMPTY */}
          {!result && !loading && (
            <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-100 p-8 text-center">

              <div className="text-4xl mb-4">
                🤖
              </div>

              <p className="font-black text-slate-800">
                Waiting for competitor data
              </p>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Submit competitor information to generate an
                AI-powered competitive intelligence report.
              </p>

            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="mt-8 rounded-2xl bg-cyan-50 border border-cyan-100 p-8 text-center">

              <div className="text-4xl mb-4 animate-pulse">
                🧠
              </div>

              <p className="font-black text-cyan-800">
                Hindsight is analyzing the intelligence...
              </p>

              <p className="text-sm text-slate-500 mt-2">
                Storing insights and generating competitive signals.
              </p>

            </div>
          )}

          {/* RESULT */}
          {result && (
            <div className="mt-6">

              <div className="flex items-center gap-2 mb-4">

                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                  ANALYSIS READY
                </span>

                <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold">
                  HINDSIGHT
                </span>

              </div>

              <div className="max-h-[650px] overflow-y-auto pr-2">
                {formatReport(result)}
              </div>

            </div>
          )}

        </Card>

      </div>

    </DashboardLayout>
  );
}