import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/common/Card";
import { api } from "../services/api";

export default function Alerts() {
  const [alerts, setAlerts] = useState("");
  const [loading, setLoading] = useState(false);

  const loadAlerts = async () => {
    setLoading(true);

    try {
      const response = await api.post("/api/ask", {
        question:
          "Identify important recent competitive threats, market signals, product changes, pricing changes, hiring signals and strategic alerts from the competitor intelligence memory."
      });

      setAlerts(
        response.data?.result?.answer ||
        response.data?.answer ||
        "No alerts found."
      );
    } catch (error) {
      setAlerts("Unable to load competitive alerts.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Alerts">

      <Card className="p-6">

        <p className="text-cyan-600 text-sm font-bold">
          COMPETITIVE SIGNALS
        </p>

        <h2 className="text-2xl font-black mt-1">
          Intelligence Alerts
        </h2>

        <p className="text-slate-500 mt-2">
          Detect important competitor movements and market signals.
        </p>

        <button
          onClick={loadAlerts}
          disabled={loading}
          className="mt-6 rounded-xl bg-slate-900 text-white px-6 py-3 font-bold hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Scanning..." : "Scan for Alerts"}
        </button>

        {alerts && (
          <div className="mt-6 rounded-2xl bg-slate-50 p-6">
            <div className="whitespace-pre-wrap text-sm text-slate-700 leading-7">
              {alerts}
            </div>
          </div>
        )}

      </Card>

    </DashboardLayout>
  );
}