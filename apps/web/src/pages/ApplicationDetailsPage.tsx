import { Link, useParams } from 'react-router';
import { useApplications } from '../context/ApplicationsContext';
import './ApplicationDetailsPage.css';
import StatusBadge from '../components/applications/StatusBadge';
import { useState } from 'react';
import ApplicationForm from '../components/applications/ApplicationForm';

function ApplicationDetailsPage() {
  const { id } = useParams();
  const { applications, updateApplication } = useApplications();
  const [isEditing, setIsEditing] = useState(false);
  const application = applications.find((application) => application.id === id);

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
  if (isEditing) {
    return (
      <section className="application-details">
        <div className="application-details__card">
          <h1>Edit application</h1>

          <ApplicationForm
            initialApplication={application}
            onSubmit={(updatedApplication) => {
              updateApplication(updatedApplication);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="application-details">
      <Link to="/applications" className="application-details__back">
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

          <StatusBadge status={application.status} />
        </header>

        <div className="application-details__grid">
          <div className="application-details__field">
            <span className="application-details__label">Applied</span>
            <span>{application.appliedAt}</span>
          </div>

          {application.location && (
            <div className="application-details__field">
              <span className="application-details__label">Location</span>
              <span>{application.location}</span>
            </div>
          )}

          {application.source && (
            <div className="application-details__field">
              <span className="application-details__label">Source</span>
              <span>{application.source}</span>
            </div>
          )}
        </div>

        {application.notes && (
          <div className="application-details__notes">
            <span className="application-details__label">Notes</span>
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
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit application
        </button>
      </article>
    </section>
  );
}

export default ApplicationDetailsPage;
