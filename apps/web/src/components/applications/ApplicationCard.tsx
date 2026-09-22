import type { Application } from '../../types/application';

type ApplicationCardProps = {
  application: Application;
  onDelete: (id: string) => void;
};

function ApplicationCard({
  application,
  onDelete,
}: ApplicationCardProps) {
  return (
    <article>
      <h2>{application.position}</h2>
      <p>{application.company}</p>
      <p>Status: {application.status}</p>
      <p>Applied: {application.appliedAt}</p>

      <button onClick={() => onDelete(application.id)}>
        Delete
      </button>
    </article>
  );
}

export default ApplicationCard;