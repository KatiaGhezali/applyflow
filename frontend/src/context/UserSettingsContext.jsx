import { useState } from "react";
import { UserSettingsContext } from "./UserSettingsContext";

const initialSettings = {
  fullName: "Katia Ghezali",
  email: "katia@example.com",
  jobTitle: "Frontend Developer",
  location: "Remote",
  jobType: "Full-time",
  emailNotifications: true,
  interviewReminders: true,
  applicationUpdates: true,
};

export function UserSettingsProvider({ children }) {
  const [settings, setSettings] = useState(initialSettings);

  const updateSettings = (updatedSettings) => {
    setSettings((current) => ({
      ...current,
      ...updatedSettings,
    }));
  };

  return (
    <UserSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
}
