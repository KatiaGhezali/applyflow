import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Pencil,
  Trash2,
  BriefcaseBusiness,
  MapPin,
  ArrowUpDown,
  ExternalLink,
} from "lucide-react";

import { useApplications } from "../context/useApplications";
import ApplicationModal from "../components/ApplicationModal";

const statusOptions = [
  "All statuses",
  "Applied",
  "Interview",
  "Technical Test",
  "Offer",
  "Rejected",
];

function formatDate(date) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Applications() {
  const { applications, addApplication, updateApplication, deleteApplication } =
    useApplications();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const filteredApplications = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return applications
      .filter((application) => {
        const matchesSearch =
          application.company.toLowerCase().includes(search) ||
          application.position.toLowerCase().includes(search) ||
          application.location.toLowerCase().includes(search);

        const matchesStatus =
          selectedStatus === "All statuses" ||
          application.status === selectedStatus;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const comparison = a.dateApplied.localeCompare(b.dateApplied);

        return sortOrder === "newest" ? -comparison : comparison;
      });
  }, [applications, searchTerm, selectedStatus, sortOrder]);

  const statusCounts = useMemo(() => {
    return {
      total: applications.length,
      applied: applications.filter((app) => app.status === "Applied").length,
      interview: applications.filter((app) => app.status === "Interview")
        .length,
      offers: applications.filter((app) => app.status === "Offer").length,
    };
  }, [applications]);

  const openAddModal = () => {
    setEditingApplication(null);
    setActiveMenu(null);
    setIsModalOpen(true);
  };

  const openEditModal = (application) => {
    setEditingApplication(application);
    setActiveMenu(null);
    setIsModalOpen(true);
  };

  const handleSaveApplication = (formData) => {
  if (editingApplication) {
    updateApplication(editingApplication.id, formData);
  } else {
    addApplication(formData);
  }

  setEditingApplication(null);
};

  const handleDeleteApplication = (application) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete the application for ${application.position} at ${application.company}?`,
  );

  if (!confirmed) return;

  deleteApplication(application.id);
  setActiveMenu(null);
};

  return (
    <div className="applications-page">
      <section className="page-heading">
        <div>
          <p className="page-eyebrow">YOUR JOB SEARCH</p>
          <h1>Applications</h1>
          <p className="page-description">
            Manage and keep track of all your job opportunities.
          </p>
        </div>

        <button
          className="button button-primary add-application-button"
          type="button"
          onClick={openAddModal}
        >
          <Plus size={17} />
          Add application
        </button>
      </section>

      <section className="application-summary">
        <article className="summary-card">
          <div className="summary-icon summary-icon-purple">
            <BriefcaseBusiness size={19} />
          </div>
          <div>
            <span>Total applications</span>
            <strong>{statusCounts.total}</strong>
          </div>
        </article>

        <article className="summary-card">
          <div className="summary-icon summary-icon-blue">
            <ArrowUpDown size={19} />
          </div>
          <div>
            <span>In progress</span>
            <strong>{statusCounts.applied + statusCounts.interview}</strong>
          </div>
        </article>

        <article className="summary-card">
          <div className="summary-icon summary-icon-green">
            <ExternalLink size={19} />
          </div>
          <div>
            <span>Offers received</span>
            <strong>{statusCounts.offers}</strong>
          </div>
        </article>
      </section>

      <section className="applications-panel-full">
        <div className="applications-toolbar">
          <div className="applications-toolbar-title">
            <h2>All applications</h2>
            <span>{filteredApplications.length} results</span>
          </div>

          <div className="application-controls">
            <label className="application-search">
              <Search size={17} />
              <input
                type="search"
                placeholder="Search company or role..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search applications"
              />
            </label>

            <label className="application-filter">
              <SlidersHorizontal size={16} />
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
                aria-label="Filter by status"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <select
              className="application-sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              aria-label="Sort applications"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        <div className="full-table-wrapper">
          <table className="full-applications-table">
            <thead>
              <tr>
                <th>COMPANY & ROLE</th>
                <th>LOCATION</th>
                <th>DATE APPLIED</th>
                <th>STATUS</th>
                <th>TYPE</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <div className="application-company-cell">
                      <div className="application-company-icon">
                        {application.company.charAt(0).toUpperCase()}
                      </div>

                      <div className="application-company-info">
                        <strong>{application.company}</strong>
                        <span>{application.position}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="application-location">
                      <MapPin size={14} />
                      {application.location || "Not specified"}
                    </span>
                  </td>

                  <td>{formatDate(application.dateApplied)}</td>

                  <td>
                    <span
                      className={`status-badge status-${application.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td>{application.type}</td>

                  <td className="application-actions-cell">
                    <div className="application-actions">
                      <button
                        className="table-more-button"
                        type="button"
                        aria-label={`Actions for ${application.company}`}
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === application.id
                              ? null
                              : application.id,
                          )
                        }
                      >
                        <MoreHorizontal size={19} />
                      </button>

                      {activeMenu === application.id && (
                        <div className="application-action-menu">
                          <button
                            type="button"
                            onClick={() => openEditModal(application)}
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button
                            className="delete-action"
                            type="button"
                            onClick={() => handleDeleteApplication(application)}
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="applications-empty-state">
              <div className="empty-state-icon">
                <BriefcaseBusiness size={25} />
              </div>
              <h3>No applications found</h3>
              <p>
                Try changing your search or filter, or add a new application.
              </p>
              <button
                className="button button-primary"
                type="button"
                onClick={openAddModal}
              >
                <Plus size={16} />
                Add application
              </button>
            </div>
          )}
        </div>
      </section>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingApplication(null);
        }}
        onSave={handleSaveApplication}
        application={editingApplication}
      />
    </div>
  );
}

export default Applications;
