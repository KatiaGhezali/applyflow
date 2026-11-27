import { useState } from "react";
import { useUserSettings } from "../context/useUserSettings";
import { motion } from "framer-motion";
import {
  UserRound,
  BriefcaseBusiness,
  Palette,
  Bell,
  Save,
  Check,
} from "lucide-react";

function Settings() {
  const { settings, updateSettings } = useUserSettings();
  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    updateSettings({
      [name]: type === "checkbox" ? checked : value,
    });

    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-7 pb-8"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          PERSONALIZE YOUR EXPERIENCE
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          Settings
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your profile, job preferences, and notifications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <UserRound size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">Profile information</h2>
              <p className="mt-1 text-sm text-slate-500">
                Update your personal details.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Full name
              </span>
              <input
                name="fullName"
                value={settings.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Email address
              </span>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Professional title
              </span>
              <input
                name="jobTitle"
                value={settings.jobTitle}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
          </div>
        </section>

        {/* Job preferences */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <BriefcaseBusiness size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">Job preferences</h2>
              <p className="mt-1 text-sm text-slate-500">
                Set your preferred work arrangements.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Preferred location
              </span>
              <input
                name="location"
                value={settings.location}
                onChange={handleChange}
                placeholder="e.g. Remote, Algiers"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Employment type
              </span>
              <select
                name="jobType"
                value={settings.jobType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Freelance</option>
              </select>
            </label>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Bell size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">Notifications</h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose which notifications you want to receive.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {[
              {
                name: "emailNotifications",
                label: "Email notifications",
                description: "Receive updates about your job search.",
              },
              {
                name: "interviewReminders",
                label: "Interview reminders",
                description: "Get reminders about upcoming interviews.",
              },
              {
                name: "applicationUpdates",
                label: "Application updates",
                description: "Stay informed about application progress.",
              },
            ].map((item) => (
              <label
                key={item.name}
                className="flex cursor-pointer items-center justify-between gap-4"
              >
                <span>
                  <span className="block text-sm font-semibold text-slate-700">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm text-slate-500">
                    {item.description}
                  </span>
                </span>

                <input
                  type="checkbox"
                  name={item.name}
                  checked={settings[item.name]}
                  onChange={handleChange}
                  className="h-5 w-5 shrink-0 cursor-pointer accent-indigo-600"
                />
              </label>
            ))}
          </div>
        </section>

        {/* Appearance information */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
              <Palette size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">Appearance</h2>
              <p className="mt-1 text-sm text-slate-500">
                ApplyFlow currently uses its default light appearance.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-end gap-4">
          {saved && (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600">
              <Check size={17} />
              Changes saved for this session
            </span>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Save size={17} />
            Save changes
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default Settings;
