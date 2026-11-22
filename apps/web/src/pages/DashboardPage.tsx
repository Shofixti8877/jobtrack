import { Link } from 'react-router';
import { useApplications } from '../context/useApplications';
import './DashboardPage.css';

function DashboardPage() {
  const { applications, isLoading, error } = useApplications();

  const totalApplications = applications.length;

  const activeApplications = applications.filter(
    (application) =>
      application.status !== 'rejected' && application.status !== 'offer',
  ).length;

  const interviewApplications = applications.filter(
    (application) =>
      application.status === 'technical' || application.status === 'final',
  ).length;

  const offers = applications.filter(
    (application) => application.status === 'offer',
  ).length;

  const rejected = applications.filter(
    (application) => application.status === 'rejected',
  ).length;

  if (isLoading) {
    return (
      <section className="dashboard-page">
        <div className="dashboard-page__state">
          <div className="dashboard-page__spinner" />
          <p>Loading dashboard...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-page">
        <div className="dashboard-page__state">
          <h2>Could not load dashboard</h2>
          <p>{error}</p>

          <button
            className="dashboard-page__retry-button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-page">
      <header className="dashboard-page__header">
        <h1>Dashboard</h1>
        <p>An overview of your job search activity.</p>
      </header>

      {applications.length === 0 ? (
        <div className="dashboard-page__empty">
          <h2>No activity yet</h2>
          <p>Add your first application to start tracking your job search.</p>

          <Link to="/applications" className="dashboard-page__empty-link">
            Go to applications
          </Link>
        </div>
      ) : (
        <div className="dashboard-page__stats">
          <article className="stat-card">
            <span className="stat-card__label">Total applications</span>
            <strong className="stat-card__value">{totalApplications}</strong>
          </article>

          <article className="stat-card">
            <span className="stat-card__label">Active processes</span>
            <strong className="stat-card__value">{activeApplications}</strong>
          </article>

          <article className="stat-card">
            <span className="stat-card__label">Interviews</span>
            <strong className="stat-card__value">
              {interviewApplications}
            </strong>
          </article>

          <article className="stat-card">
            <span className="stat-card__label">Offers</span>
            <strong className="stat-card__value">{offers}</strong>
          </article>

          <article className="stat-card">
            <span className="stat-card__label">Rejected</span>
            <strong className="stat-card__value">{rejected}</strong>
          </article>
        </div>
      )}
    </section>
  );
}

export default DashboardPage;
