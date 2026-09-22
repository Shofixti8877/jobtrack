import type { Application } from '../../types/application';

type ApplicationCardProps = {
  application: Application;
};

function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <article>
      <h2>{application.position}</h2>
      <p>{application.company}</p>
      <p>Status: {application.status}</p>
      <p>Applied: {application.appliedAt}</p>
    </article>
  );
}

export default ApplicationCard;