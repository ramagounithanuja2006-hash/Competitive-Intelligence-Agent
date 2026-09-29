import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/common/Card";
import { api } from "../services/api";

export default function Reports() {
  const [question, setQuestion] = useState(
    "Generate a competitive intelligence report based on the latest competitor information."
  );
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    setReport("");

    try {
      const response = await api.post("/api/ask", {
        question,
      });

      setReport(
        response.data?.result?.answer ||
        response.data?.answer ||
        "No report generated."
      );
    } catch (error) {
      setReport("Unable to generate report. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Reports">

      <Card className="p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <p className="text-cyan-600 text-sm font-bold">
              INTELLIGENCE REPORTS
            </p>

            <h2 className="text-2xl font-black mt-1">
              Competitive Intelligence Report
            </h2>

            <p className="text-slate-500 mt-2">
              Generate a structured report from your collected intelligence.
            </p>
          </div>

          <button
            onClick={generateReport}
            disabled={loading}
            className="rounded-xl bg-slate-900 text-white px-6 py-3 font-bold hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Report"}
          </button>

        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          className="w-full mt-6 rounded-xl border border-slate-200 p-4 outline-none focus:ring-2 focus:ring-cyan-200"
        />

        {loading && (
          <div className="mt-6 rounded-2xl bg-cyan-50 p-6 text-center">
            <p className="font-bold text-cyan-700">
              Generating intelligence report...
            </p>
          </div>
        )}

        {report && !loading && (
          <div className="mt-6 rounded-2xl bg-slate-50 p-6">

            <div className="whitespace-pre-wrap text-sm text-slate-700 leading-7">
              {report}
            </div>

          </div>
        )}

      </Card>

    </DashboardLayout>
  );
}