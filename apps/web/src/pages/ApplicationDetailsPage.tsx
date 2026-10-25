import { Link, useParams } from 'react-router';
import { useApplications } from '../context/ApplicationsContext';
import './ApplicationDetailsPage.css';

function ApplicationDetailsPage() {
  const { id } = useParams();
  const { applications } = useApplications();

  const application = applications.find(
    (application) => application.id === id,
  );

  if (!application) {
    return (
      <section className="application-details">
        <div className="application-details__card">
          <h1>Application not found</h1>
          <Link to="/applications">← Back to applications</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="application-details">
      <Link
        to="/applications"
        className="application-details__back"
      >
        ← Back to applications
      </Link>

      <article className="application-details__card">
        <header className="application-details__header">
          <div>
            <p className="application-details__company">
              {application.company}
            </p>

            <h1>{application.position}</h1>
          </div>

          <span
            className={`application-details__status application-details__status--${application.status}`}
          >
            {application.status}
          </span>
        </header>

        <div className="application-details__grid">
          <div className="application-details__field">
            <span className="application-details__label">
              Applied
            </span>
            <span>{application.appliedAt}</span>
          </div>

          {application.location && (
            <div className="application-details__field">
              <span className="application-details__label">
                Location
              </span>
              <span>{application.location}</span>
            </div>
          )}

          {application.source && (
            <div className="application-details__field">
              <span className="application-details__label">
                Source
              </span>
              <span>{application.source}</span>
            </div>
          )}
        </div>

        {application.notes && (
          <div className="application-details__notes">
            <span className="application-details__label">
              Notes
            </span>
            <p>{application.notes}</p>
          </div>
        )}

        {application.jobUrl && (
          <div className="application-details__actions">
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="application-details__job-link"
            >
              Open job posting ↗
            </a>
          </div>
        )}
      </article>
    </section>
  );
}

export default ApplicationDetailsPage;