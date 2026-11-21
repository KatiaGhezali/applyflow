import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  CalendarDays,
  Clock3,
  Video,
  Phone,
  MapPin,
  ExternalLink,
  Pencil,
  Trash2,
  BriefcaseBusiness,
  CheckCircle2,
  CalendarCheck,
  XCircle,
} from "lucide-react";

import { useApplications } from "../context/useApplications";
import InterviewModal from "../components/InterviewModal";

const statusStyles = {
  Scheduled: "bg-indigo-50 text-indigo-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-700",
};

const typeIcons = {
  Video,
  Phone,
  "In-person": MapPin,
};

function formatDate(dateString) {
  if (!dateString) return "No date";

  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function InterviewCard({ interview, application, onEdit, onDelete }) {
  const TypeIcon = typeIcons[interview.interviewType] || CalendarDays;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
            {application?.company?.charAt(0).toUpperCase() || "?"}
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              {application?.company || "Unknown company"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {application?.position || "Unknown position"}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[interview.status] || "bg-slate-100 text-slate-600"
          }`}
        >
          {interview.status}
        </span>
      </div>

      <div className="my-5 grid gap-3 border-y border-slate-100 py-4 sm:grid-cols-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={16} className="text-indigo-500" />
          {formatDate(interview.date)}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock3 size={16} className="text-indigo-500" />
          {interview.time}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <TypeIcon size={16} className="text-indigo-500" />
          {interview.interviewType}
        </div>

        {interview.location && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={16} className="text-indigo-500" />
            <span className="truncate">{interview.location}</span>
          </div>
        )}
      </div>

      {interview.notes && (
        <p className="mb-4 text-sm leading-relaxed text-slate-500">
          {interview.notes}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        {interview.meetingLink ? (
          <a
            href={interview.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            Join meeting
            <ExternalLink size={15} />
          </a>
        ) : (
          <span className="text-xs text-slate-400">No meeting link</span>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(interview)}
            aria-label="Edit interview"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(interview)}
            aria-label="Delete interview"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function Interviews() {
  const {
    applications,
    interviews,
    addInterview,
    updateInterview,
    deleteInterview,
  } = useApplications();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Scheduled", "Completed", "Cancelled"];

  const getApplication = (applicationId) =>
    applications.find((application) => application.id === applicationId);

  const filteredInterviews = useMemo(() => {
    return interviews
      .filter((interview) => {
        const application = applications.find(
          (item) => item.id === interview.applicationId,
        );

        const search = searchTerm.toLowerCase();

        const matchesSearch =
          application?.company.toLowerCase().includes(search) ||
          application?.position.toLowerCase().includes(search);

        const matchesStatus =
          activeFilter === "All" || interview.status === activeFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);

        return dateA - dateB;
      });
  }, [interviews, applications, searchTerm, activeFilter]);

  const scheduledCount = interviews.filter(
    (interview) => interview.status === "Scheduled",
  ).length;

  const completedCount = interviews.filter(
    (interview) => interview.status === "Completed",
  ).length;

  const cancelledCount = interviews.filter(
    (interview) => interview.status === "Cancelled",
  ).length;

  const openAddModal = () => {
    setEditingInterview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (interview) => {
    setEditingInterview(interview);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingInterview(null);
  };

  const handleSaveInterview = (formData) => {
    if (editingInterview) {
      updateInterview(editingInterview.id, formData);
    } else {
      addInterview(formData);
    }

    closeModal();
  };

  const handleDeleteInterview = (interview) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?",
    );

    if (confirmed) {
      deleteInterview(interview.id);
    }
  };

  const statCards = [
    {
      label: "Total interviews",
      value: interviews.length,
      icon: CalendarDays,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Scheduled",
      value: scheduledCount,
      icon: CalendarCheck,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Cancelled",
      value: cancelledCount,
      icon: XCircle,
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="space-y-7 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            YOUR RECRUITMENT JOURNEY
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Interviews
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your upcoming interviews and keep track of every opportunity.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Schedule interview
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <div className={`rounded-xl p-2.5 ${stat.color}`}>
                  <Icon size={19} />
                </div>
              </div>

              <p className="mt-4 text-3xl font-bold text-slate-800">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Your interviews
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredInterviews.length}{" "}
              {filteredInterviews.length === 1 ? "interview" : "interviews"}{" "}
              found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search company or role..."
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-64"
              />
            </div>

            <select
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none transition focus:border-indigo-400"
              aria-label="Filter interviews by status"
            >
              {filters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter === "All" ? "All statuses" : filter}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredInterviews.length > 0 ? (
          <motion.div layout className="mt-6 grid gap-4 xl:grid-cols-2">
            {filteredInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                application={getApplication(interview.applicationId)}
                onEdit={openEditModal}
                onDelete={handleDeleteInterview}
              />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
              <BriefcaseBusiness size={25} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-800">
              No interviews found
            </h3>

            <p className="mt-2 max-w-sm text-sm text-slate-500">
              {searchTerm || activeFilter !== "All"
                ? "Try changing your search or filter."
                : "Schedule your first interview to start organizing your recruitment journey."}
            </p>

            {!searchTerm && activeFilter === "All" && (
              <button
                type="button"
                onClick={openAddModal}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Plus size={17} />
                Schedule interview
              </button>
            )}
          </div>
        )}
      </section>

      <InterviewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveInterview}
        interview={editingInterview}
        applications={applications}
      />
    </div>
  );
}

export default Interviews;
