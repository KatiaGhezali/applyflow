import { useState } from "react";
import { ApplicationContext } from "./ApplicationContext";
import { initialApplications } from "../data/applications";

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState(initialApplications);

  const addApplication = (formData) => {
    const newApplication = {
      ...formData,
      id: Date.now(),
    };

    setApplications((current) => [newApplication, ...current]);
  };

  const updateApplication = (id, updatedData) => {
    setApplications((current) =>
      current.map((application) =>
        application.id === id ? { ...updatedData, id } : application,
      ),
    );
  };

  const deleteApplication = (id) => {
    setApplications((current) =>
      current.filter((application) => application.id !== id),
    );
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
