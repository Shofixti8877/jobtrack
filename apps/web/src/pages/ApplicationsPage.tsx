import { useState } from 'react';
import ApplicationForm from '../components/applications/ApplicationForm';
import ApplicationCard from '../components/applications/ApplicationCard';
import { useApplications } from '../context/ApplicationsContext';
import type { Application, ApplicationStatus } from '../types/application';
import './ApplicationsPage.css';
import { APPLICATION_STATUSES } from '../constants/applicationStatus';

function ApplicationsPage() {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>(
    'all',
  );

  const {
    applications,
    addApplication,
    deleteApplication,
    updateApplicationStatus,
  } = useApplications();

  function handleAddApplication(application: Application) {
    addApplication(application);
    setIsAddFormOpen(false);
  }

  const filteredApplications = applications.filter((application) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    const matchesSearch =
      application.company.toLowerCase().includes(normalizedSearchTerm) ||
      application.position.toLowerCase().includes(normalizedSearchTerm);

    const matchesStatus =
      statusFilter === 'all' || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="applications-page">
      <header className="applications-page__header">
        <div>
          <h1>Applications</h1>
          <p>Track and manage your job applications.</p>
        </div>

        <div className="applications-page__header-actions">
          <div className="applications-page__count">
            {filteredApplications.length} of {applications.length} applications
          </div>

          <button
            className="applications-page__add-button"
            onClick={() => setIsAddFormOpen(true)}
          >
            Add application
          </button>
        </div>
      </header>

      {isAddFormOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal__header">
              <h2>Add application</h2>

              <button
                className="modal__close"
                onClick={() => setIsAddFormOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <ApplicationForm
              onSubmit={handleAddApplication}
              onCancel={() => setIsAddFormOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="applications-page__filters">
        <input
          type="search"
          placeholder="Search company or position..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as ApplicationStatus | 'all')
          }
        >
          <option value="all">All statuses</option>

          {APPLICATION_STATUSES.map((statusOption) => (
            <option key={statusOption.value} value={statusOption.value}>
              {statusOption.label}
            </option>
          ))}
        </select>
      </div>

      <div className="applications-page__grid">
        {filteredApplications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onDelete={deleteApplication}
            onStatusChange={updateApplicationStatus}
          />
        ))}
      </div>
    </section>
  );
}

export default ApplicationsPage;
