import { useState } from "react";
import { ApplicationContext } from "./ApplicationContext";
import { initialApplications } from "../data/applications";
import { initialInterviews } from "../data/interviews";

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState(initialApplications);
  const [interviews, setInterviews] = useState(initialInterviews);

  // Application actions
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

    // Remove interviews linked to the deleted application.
    setInterviews((current) =>
      current.filter((interview) => interview.applicationId !== id),
    );
  };

  // Interview actions
  const addInterview = (formData) => {
    const newInterview = {
      ...formData,
      id: Date.now(),
    };

    setInterviews((current) => [newInterview, ...current]);
  };

  const updateInterview = (id, updatedData) => {
    setInterviews((current) =>
      current.map((interview) =>
        interview.id === id ? { ...updatedData, id } : interview,
      ),
    );
  };

  const deleteInterview = (id) => {
    setInterviews((current) =>
      current.filter((interview) => interview.id !== id),
    );
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
        interviews,
        addInterview,
        updateInterview,
        deleteInterview,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
