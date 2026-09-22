import { useState } from 'react';
import ApplicationCard from '../components/applications/ApplicationCard';
import { applications as initialApplications } from '../data/applications';
import type { Application } from '../types/application';

function ApplicationsPage() {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  function handleAddApplication() {
    const newApplication: Application = {
      id: crypto.randomUUID(),
      company: 'Stark Industries',
      position: 'Senior React Developer',
      status: 'applied',
      appliedAt: '2026-09-22',
    };

    setApplications((currentApplications) => [
      ...currentApplications,
      newApplication,
    ]);
  }

  return (
    <section>
      <h1>Applications</h1>
      <p>Track and manage your job applications.</p>

      <button onClick={handleAddApplication}>
        Add application
      </button>

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