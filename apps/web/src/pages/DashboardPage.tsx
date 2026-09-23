import { useApplications } from '../context/ApplicationsContext';
import './DashboardPage.css';

function DashboardPage() {
  const { applications } = useApplications();

  const totalApplications = applications.length;

  const activeApplications = applications.filter(
    (application) =>
      application.status !== 'rejected' &&
      application.status !== 'offer',
  ).length;

  const interviewApplications = applications.filter(
    (application) =>
      application.status === 'technical' ||
      application.status === 'final',
  ).length;

  const offers = applications.filter(
    (application) => application.status === 'offer',
  ).length;

  const rejected = applications.filter(
    (application) => application.status === 'rejected',
  ).length;

  return (
    <section className="dashboard-page">
      <header className="dashboard-page__header">
        <h1>Dashboard</h1>
        <p>An overview of your job search activity.</p>
      </header>

      <div className="dashboard-page__stats">
        <article className="stat-card">
          <span className="stat-card__label">Total applications</span>
          <strong className="stat-card__value">
            {totalApplications}
          </strong>
        </article>

        <article className="stat-card">
          <span className="stat-card__label">Active processes</span>
          <strong className="stat-card__value">
            {activeApplications}
          </strong>
        </article>

        <article className="stat-card">
          <span className="stat-card__label">Interviews</span>
          <strong className="stat-card__value">
            {interviewApplications}
          </strong>
        </article>

        <article className="stat-card">
          <span className="stat-card__label">Offers</span>
          <strong className="stat-card__value">
            {offers}
          </strong>
        </article>

        <article className="stat-card">
          <span className="stat-card__label">Rejected</span>
          <strong className="stat-card__value">
            {rejected}
          </strong>
        </article>
      </div>
    </section>
  );
}

export default DashboardPage;