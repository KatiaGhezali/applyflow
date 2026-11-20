import { useState } from "react";
import {
  Plus,
  MapPin,
  CalendarDays,
  GripVertical,
  BriefcaseBusiness,
} from "lucide-react";

import { useApplications } from "../context/useApplications";

const columns = [
  { title: "Applied", color: "blue" },
  { title: "Interview", color: "purple" },
  { title: "Technical Test", color: "orange" },
  { title: "Offer", color: "green" },
  { title: "Rejected", color: "red" },
];

function formatDate(date) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ApplicationCard({ application, onDragStart, onDragEnd }) {
  return (
    <article
      className="kanban-card"
      draggable
      onDragStart={(event) => onDragStart(event, application)}
      onDragEnd={onDragEnd}
    >
      <div className="kanban-card-top">
        <div className="kanban-company-icon">
          {application.company.charAt(0).toUpperCase()}
        </div>

        <GripVertical size={17} className="kanban-drag-icon" />
      </div>

      <h3>{application.company}</h3>
      <p className="kanban-position">{application.position}</p>

      <div className="kanban-card-details">
        <span>
          <MapPin size={13} />
          {application.location || "Not specified"}
        </span>

        <span>
          <CalendarDays size={13} />
          {formatDate(application.dateApplied)}
        </span>
      </div>

      <div className="kanban-card-footer">
        <span>{application.type}</span>
      </div>
    </article>
  );
}

function KanbanBoard() {
  const { applications, updateApplication } = useApplications();

  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = (event, application) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(application.id));
  };

  const handleDragOver = (event, columnTitle) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    setDragOverColumn(columnTitle);
  };

  const handleDragLeave = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (event, columnTitle) => {
    event.preventDefault();

    const applicationId = Number(event.dataTransfer.getData("text/plain"));

    const application = applications.find((item) => item.id === applicationId);

    if (application && application.status !== columnTitle) {
      updateApplication(application.id, {
        ...application,
        status: columnTitle,
      });
    }

    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDragOverColumn(null);
  };
  return (
    <div className="kanban-page">
      <section className="page-heading kanban-heading">
        <div>
          <p className="page-eyebrow">APPLICATION PIPELINE</p>
          <h1>Kanban Board</h1>
          <p className="page-description">
            Track the progress of your job applications at every stage.
          </p>
        </div>

        <div className="kanban-total">
          <BriefcaseBusiness size={17} />
          <span>{applications.length} applications</span>
        </div>
      </section>

      <div className="kanban-instructions">
        <GripVertical size={17} />
        <span>Drag and drop cards between columns to update their status.</span>
      </div>

      <section className="kanban-columns">
        {columns.map((column) => {
          const columnApplications = applications.filter(
            (application) => application.status === column.title,
          );

          return (
            <div
              className={`kanban-column ${
                dragOverColumn === column.title ? "kanban-column-active" : ""
              }`}
              key={column.title}
              onDragOver={(event) => handleDragOver(event, column.title)}
              onDragLeave={handleDragLeave}
              onDrop={(event) => handleDrop(event, column.title)}
            >
              <div className="kanban-column-header">
                <div className="kanban-column-title">
                  <span className={`kanban-dot kanban-dot-${column.color}`} />
                  <h2>{column.title}</h2>
                  <span className="kanban-count">
                    {columnApplications.length}
                  </span>
                </div>
              </div>

              <div className="kanban-card-list">
                {columnApplications.map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}

                {columnApplications.length === 0 && (
                  <div className="kanban-empty">
                    <Plus size={18} />
                    <span>No applications yet</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default KanbanBoard;
