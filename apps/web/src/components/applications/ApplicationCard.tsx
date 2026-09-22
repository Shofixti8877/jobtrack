import type {
  Application,
  ApplicationStatus,
} from '../../types/application';
import { APPLICATION_STATUSES } from '../../constants/applicationStatus';

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
    <article>
      <h2>{application.position}</h2>
      <p>{application.company}</p>

      <div>
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
      </div>

      <p>Applied: {application.appliedAt}</p>

      <button onClick={() => onDelete(application.id)}>
        Delete
      </button>
    </article>
  );
}

export default ApplicationCard;