import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/common/Card";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [marketAlerts, setMarketAlerts] = useState(true);
  const [emailReports, setEmailReports] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DashboardLayout title="Settings">

      <div className="max-w-5xl space-y-6">

        {/* Profile */}
        <Card className="p-6">
          <div className="mb-5">
            <p className="text-cyan-600 text-sm font-bold">
              ACCOUNT
            </p>

            <h2 className="text-2xl font-black mt-1">
              Profile Settings
            </h2>

            <p className="text-slate-500 mt-1">
              Manage your intelligence workspace profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="text-sm font-bold text-slate-700">
                Full Name
              </label>

              <input
                defaultValue="Merlin Archi"
                className="w-full mt-2 rounded-xl border border-slate-200 p-3 outline-none focus:ring-2 focus:ring-cyan-200"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">
                Email
              </label>

              <input
                defaultValue="admin@example.com"
                className="w-full mt-2 rounded-xl border border-slate-200 p-3 outline-none focus:ring-2 focus:ring-cyan-200"
              />
            </div>

          </div>

          <button className="mt-5 rounded-xl bg-slate-900 text-white px-5 py-3 font-bold hover:bg-slate-800">
            Save Profile
          </button>
        </Card>


        {/* Notifications */}
        <Card className="p-6">

          <p className="text-cyan-600 text-sm font-bold">
            NOTIFICATIONS
          </p>

          <h2 className="text-2xl font-black mt-1">
            Intelligence Alerts
          </h2>

          <p className="text-slate-500 mt-1 mb-6">
            Choose what intelligence updates you want to receive.
          </p>


          <div className="space-y-4">

            <SettingRow
              title="Competitor Alerts"
              description="Get notified when important competitor activity is detected."
              enabled={notifications}
              setEnabled={setNotifications}
            />

            <SettingRow
              title="Market Updates"
              description="Receive updates about important market movements."
              enabled={marketAlerts}
              setEnabled={setMarketAlerts}
            />

            <SettingRow
              title="Email Reports"
              description="Receive generated competitive intelligence reports by email."
              enabled={emailReports}
              setEnabled={setEmailReports}
            />

          </div>

        </Card>


        {/* AI Preferences */}
        <Card className="p-6">

          <p className="text-cyan-600 text-sm font-bold">
            AI AGENT
          </p>

          <h2 className="text-2xl font-black mt-1">
            AI Preferences
          </h2>

          <p className="text-slate-500 mt-1 mb-6">
            Customize how your intelligence workspace behaves.
          </p>


          <SettingRow
            title="Dark Mode"
            description="Switch the intelligence workspace to a darker interface."
            enabled={darkMode}
            setEnabled={setDarkMode}
          />

        </Card>


        {/* Security */}
        <Card className="p-6">

          <p className="text-cyan-600 text-sm font-bold">
            SECURITY
          </p>

          <h2 className="text-2xl font-black mt-1">
            Account Security
          </h2>

          <p className="text-slate-500 mt-1">
            Keep your intelligence workspace secure.
          </p>

          <button className="mt-5 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50">
            Change Password
          </button>

        </Card>


        {/* Danger Zone */}
        <Card className="p-6 border border-red-100">

          <p className="text-red-500 text-sm font-bold">
            DANGER ZONE
          </p>

          <h2 className="text-xl font-black mt-1">
            Account Actions
          </h2>

          <p className="text-slate-500 mt-1">
            Actions in this section may affect your account.
          </p>

          <button className="mt-5 rounded-xl bg-red-50 text-red-600 px-5 py-3 font-bold hover:bg-red-100">
            Delete Account
          </button>

        </Card>

      </div>

    </DashboardLayout>
  );
}


function SettingRow({
  title,
  description,
  enabled,
  setEnabled
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border border-slate-100 p-4">

      <div>
        <h3 className="font-bold text-slate-800">
          {title}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {description}
        </p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-12 h-7 rounded-full transition ${
          enabled ? "bg-cyan-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>

    </div>
  );
}