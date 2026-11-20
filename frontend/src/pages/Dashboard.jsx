import {
  BriefcaseBusiness,
  CalendarDays,
  Trophy,
  XCircle,
  ArrowUpRight,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    label: "Total applications",
    value: "24",
    change: "+12%",
    description: "vs. last month",
    icon: BriefcaseBusiness,
    color: "purple",
  },
  {
    label: "Interviews scheduled",
    value: "08",
    change: "+3",
    description: "this month",
    icon: CalendarDays,
    color: "blue",
  },
  {
    label: "Offers received",
    value: "03",
    change: "+2",
    description: "this month",
    icon: Trophy,
    color: "green",
  },
  {
    label: "Rejected",
    value: "05",
    change: "—",
    description: "this month",
    icon: XCircle,
    color: "orange",
  },
];

const applications = [
  {
    company: "Stripe",
    initials: "S",
    role: "Frontend Developer",
    date: "Nov 18, 2026",
    status: "Interview",
    color: "stripe",
  },
  {
    company: "Notion",
    initials: "N",
    role: "React Developer",
    date: "Nov 16, 2026",
    status: "Applied",
    color: "notion",
  },
  {
    company: "Figma",
    initials: "F",
    role: "UI Engineer",
    date: "Nov 14, 2026",
    status: "Technical test",
    color: "figma",
  },
  {
    company: "Linear",
    initials: "L",
    role: "Frontend Engineer",
    date: "Nov 12, 2026",
    status: "Offer",
    color: "linear",
  },
];

const interviews = [
  {
    company: "Stripe",
    role: "Frontend Developer",
    type: "Technical interview",
    date: "Tomorrow",
    time: "10:30 AM",
    initials: "S",
    color: "stripe",
  },
  {
    company: "Vercel",
    role: "Junior React Developer",
    type: "Initial screening",
    date: "Nov 24",
    time: "2:00 PM",
    initials: "V",
    color: "vercel",
  },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <section className="welcome-section">
        <div>
          <p className="welcome-eyebrow">FRIDAY, NOVEMBER 20, 2026</p>
          <h1>
            Good morning, Katia <span>✦</span>
          </h1>
          <p className="welcome-description">
            Here's what's happening with your job search today.
          </p>
        </div>

        <div className="welcome-badge">
          <span className="welcome-badge-dot" />
          Your job search is in progress
        </div>
      </section>

      <section className="stats-grid" aria-label="Application statistics">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article className="stat-card" key={stat.label}>
              <div className="stat-card-top">
                <div className={`stat-icon stat-icon-${stat.color}`}>
                  <Icon size={20} />
                </div>
                <button
                  className="card-more-button"
                  aria-label={`More options for ${stat.label}`}
                  type="button"
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <p className="stat-label">{stat.label}</p>

              <div className="stat-value-row">
                <h2>{stat.value}</h2>
                <span className={`stat-change stat-change-${stat.color}`}>
                  {stat.change}
                </span>
              </div>

              <p className="stat-description">{stat.description}</p>
            </article>
          );
        })}
      </section>

      <section className="dashboard-content-grid">
        <article className="panel applications-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent applications</h2>
              <p>Keep track of your latest opportunities.</p>
            </div>

            <a href="/applications" className="text-link">
              View all <ArrowRight size={16} />
            </a>
          </div>

          <div className="applications-table-wrapper">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>COMPANY</th>
                  <th>ROLE</th>
                  <th>DATE APPLIED</th>
                  <th>STATUS</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {applications.map((application) => (
                  <tr key={application.company}>
                    <td>
                      <div className="company-cell">
                        <div
                          className={`company-logo company-logo-${application.color}`}
                        >
                          {application.initials}
                        </div>
                        <strong>{application.company}</strong>
                      </div>
                    </td>

                    <td>{application.role}</td>
                    <td>{application.date}</td>

                    <td>
                      <span
                        className={`status-badge status-${application.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="table-more-button"
                        aria-label={`More options for ${application.company}`}
                        type="button"
                      >
                        <MoreHorizontal size={19} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <a href="/applications" className="mobile-view-all">
            View all applications <ArrowRight size={16} />
          </a>
        </article>

        <article className="panel interviews-panel">
          <div className="panel-heading">
            <div>
              <h2>Upcoming interviews</h2>
              <p>Get ready for your next opportunity.</p>
            </div>

            <button
              className="card-more-button"
              aria-label="More interview options"
              type="button"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="interviews-list">
            {interviews.map((interview) => (
              <div className="interview-item" key={interview.company}>
                <div className={`company-logo company-logo-${interview.color}`}>
                  {interview.initials}
                </div>

                <div className="interview-details">
                  <strong>{interview.company}</strong>
                  <span>{interview.role}</span>
                  <small>{interview.type}</small>
                </div>

                <div className="interview-date">
                  <strong>{interview.date}</strong>
                  <span>{interview.time}</span>
                </div>
              </div>
            ))}
          </div>

          <a href="/interviews" className="text-link interview-link">
            View calendar <ArrowUpRight size={16} />
          </a>
        </article>
      </section>
    </div>
  );
}

export default Dashboard;
