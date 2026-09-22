import ApplicationCard from '../components/applications/ApplicationCard';
import { applications } from '../data/applications';

function ApplicationsPage() {
  return (
    <section>
      <h1>Applications</h1>
      <p>Track and manage your job applications.</p>

      <div>
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
          />
        ))}
      </div>
    </section>
  );
}

export default ApplicationsPage;