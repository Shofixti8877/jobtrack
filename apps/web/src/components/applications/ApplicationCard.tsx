import { APPLICATION_STATUSES } from '../../constants/applicationStatus';
import type {
  Application,
  ApplicationStatus,
} from '../../types/application';
import './ApplicationCard.css';
import { Link } from 'react-router';

type ApplicationCardProps = {
  application: Application;
  onDelete: (id: string) => void;
  onStatusChange: (
    id: string,
    status: ApplicationStatus,
  ) => void;
};

function ApplicationCard({
  application,
  onDelete,
  onStatusChange,
}: ApplicationCardProps) {
  return (
    <article className="application-card">
      <div className="application-card__header">
        <div>
          <h2>
            <Link
              to={`/applications/${application.id}`}
              className="application-card__title-link"
            >
              {application.position}
            </Link>
          </h2>
          <p>{application.company}</p>
        </div>

        <span
          className={`application-card__status application-card__status--${application.status}`}
        >
          {application.status}
        </span>
      </div>

      <div className="application-card__details">
        <label htmlFor={`status-${application.id}`}>
          Status
        </label>

        <select
          id={`status-${application.id}`}
          value={application.status}
          onChange={(event) =>
            onStatusChange(
              application.id,
              event.target.value as ApplicationStatus,
            )
          }
        >
          {APPLICATION_STATUSES.map((statusOption) => (
            <option
              key={statusOption.value}
              value={statusOption.value}
            >
              {statusOption.label}
            </option>
          ))}
        </select>

        <p className="application-card__date">
          Applied {application.appliedAt}
        </p>
      </div>

      <div className="application-card__actions">
        <button
          className="application-card__delete"
          onClick={() => onDelete(application.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ApplicationCard;