import { useState } from 'react';
import AddApplicationForm from '../components/applications/AddApplicationForm';
import ApplicationCard from '../components/applications/ApplicationCard';
import { applications as initialApplications } from '../data/applications';
import type {
  Application,
  ApplicationStatus,
} from '../types/application';

function ApplicationsPage() {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  function handleAddApplication(application: Application) {
    setApplications((currentApplications) => [
      ...currentApplications,
      application,
    ]);
  }

  function handleDeleteApplication(id: string) {
  setApplications((currentApplications) =>
    currentApplications.filter(
      (application) => application.id !== id,
    ),
  );
}

function handleStatusChange(
  id: string,
  status: ApplicationStatus,
) {
  setApplications((currentApplications) =>
    currentApplications.map((application) =>
      application.id === id
        ? { ...application, status }
        : application,
    ),
  );
}

  return (
    <section>
      <h1>Applications</h1>
      <p>Track and manage your job applications.</p>

      <AddApplicationForm onAdd={handleAddApplication} />

      <div>
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onDelete={handleDeleteApplication}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </section>
  );
}

export default ApplicationsPage;