import { useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  applicationId: "",
  date: "",
  time: "",
  interviewType: "Video",
  location: "",
  meetingLink: "",
  status: "Scheduled",
  notes: "",
};

const interviewTypes = ["Video", "Phone", "In-person"];
const interviewStatuses = ["Scheduled", "Completed", "Cancelled"];

function InterviewModal({ isOpen, onClose, onSave, interview, applications }) {
  if (!isOpen) return null;

  return (
    <InterviewModalForm
      key={interview?.id ?? "new"}
      onClose={onClose}
      onSave={onSave}
      interview={interview}
      applications={applications}
    />
  );
}

function InterviewModalForm({ onClose, onSave, interview, applications }) {
  const [formData, setFormData] = useState(() => ({
    ...emptyForm,
    ...(interview || {}),
    applicationId: interview ? String(interview.applicationId) : "",
  }));

  const [error, setError] = useState("");

  const isEditing = Boolean(interview);

  const availableApplications = applications.filter(
    (application) =>
      application.status !== "Rejected" && application.status !== "Offer",
  );

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

    if (!formData.applicationId || !formData.date || !formData.time) {
      setError("Please select an application, date, and time.");
      return;
    }

    onSave({
      ...formData,
      applicationId: Number(formData.applicationId),
      location: formData.location.trim(),
      meetingLink: formData.meetingLink.trim(),
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
        aria-labelledby="interview-modal-title"
      >
        <div className="modal-heading">
          <div>
            <span className="modal-eyebrow">INTERVIEW DETAILS</span>

            <h2 id="interview-modal-title">
              {isEditing ? "Edit interview" : "Schedule an interview"}
            </h2>

            <p>
              {isEditing
                ? "Update the details of your interview."
                : "Add an interview to keep track of your recruitment process."}
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
            <label className="form-field form-field-full">
              Job application <span>*</span>
              <select
                name="applicationId"
                value={formData.applicationId}
                onChange={handleChange}
                required
              >
                <option value="">Select an application</option>

                {availableApplications.map((application) => (
                  <option key={application.id} value={application.id}>
                    {application.company} — {application.position}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              Interview date <span>*</span>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-field">
              Interview time <span>*</span>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-field">
              Interview type
              <select
                name="interviewType"
                value={formData.interviewType}
                onChange={handleChange}
              >
                {interviewTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {interviewStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field form-field-full">
              Location
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Company office, meeting room"
              />
            </label>

            <label className="form-field form-field-full">
              Meeting link
              <input
                type="url"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleChange}
                placeholder="https://meet.google.com/..."
              />
            </label>

            <label className="form-field form-field-full">
              Notes
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add preparation notes or other details..."
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
              {isEditing ? "Save changes" : "Schedule interview"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default InterviewModal;
