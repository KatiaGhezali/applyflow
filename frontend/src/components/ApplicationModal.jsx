import { useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  company: "",
  position: "",
  location: "",
  type: "Full-time",
  dateApplied: new Date().toISOString().slice(0, 10),
  status: "Applied",
  website: "",
  notes: "",
};

const statuses = [
  "Applied",
  "Interview",
  "Technical Test",
  "Offer",
  "Rejected",
];

function ApplicationModal({ isOpen, onClose, onSave, application }) {
  if (!isOpen) return null;

  return (
    <ApplicationModalForm
      key={application?.id ?? "new"}
      onClose={onClose}
      onSave={onSave}
      application={application}
    />
  );
}

function ApplicationModalForm({ onClose, onSave, application }) {
  const [formData, setFormData] = useState(() => ({
    ...emptyForm,
    ...(application || {}),
  }));

  const [error, setError] = useState("");

  const isEditing = Boolean(application);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.company.trim() || !formData.position.trim()) {
      setError("Company and job title are required.");
      return;
    }

    onSave({
      ...formData,
      company: formData.company.trim(),
      position: formData.position.trim(),
      location: formData.location.trim(),
      website: formData.website.trim(),
      notes: formData.notes.trim(),
    });

    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="application-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-modal-title"
      >
        <div className="modal-heading">
          <div>
            <span className="modal-eyebrow">APPLICATION DETAILS</span>

            <h2 id="application-modal-title">
              {isEditing ? "Edit application" : "Add new application"}
            </h2>

            <p>
              {isEditing
                ? "Update the details of this opportunity."
                : "Keep all your job opportunities organized in one place."}
            </p>
          </div>

          <button
            className="modal-close-button"
            type="button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="form-field">
              Company name <span>*</span>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Google"
                required
              />
            </label>

            <label className="form-field">
              Job title <span>*</span>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                required
              />
            </label>

            <label className="form-field">
              Location
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote, London"
              />
            </label>

            <label className="form-field">
              Employment type
              <select name="type" value={formData.type} onChange={handleChange}>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
                <option>Freelance</option>
              </select>
            </label>

            <label className="form-field">
              Date applied <span>*</span>
              <input
                type="date"
                name="dateApplied"
                value={formData.dateApplied}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-field">
              Application status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field form-field-full">
              Company website
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://company.com"
              />
            </label>

            <label className="form-field form-field-full">
              Notes
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add interview details, follow-ups, or other notes..."
                rows="3"
              />
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-footer">
            <button
              className="button button-secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button className="button button-primary" type="submit">
              {isEditing ? "Save changes" : "Add application"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ApplicationModal;
