import { useState } from 'react';
import ApplicationForm from '../components/applications/ApplicationForm';
import ApplicationCard from '../components/applications/ApplicationCard';
import { useApplications } from '../context/useApplications';
import type { ApplicationInput, ApplicationStatus } from '../types/application';
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
    isLoading,
    error,
  } = useApplications();

  async function handleAddApplication(application: ApplicationInput) {
    await addApplication(application);
    setIsAddFormOpen(false);
  }

  async function handleDeleteApplication(id: string, company: string) {
    const confirmed = window.confirm(`Delete the application at ${company}?`);

    if (!confirmed) {
      return;
    }

    await deleteApplication(id);
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

  const hasActiveFilters = searchTerm.trim() !== '' || statusFilter !== 'all';

  if (isLoading) {
    return (
      <section className="applications-page">
        <div className="page-state">
          <div className="page-state__spinner" />
          <p>Loading applications...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="applications-page">
        <div className="page-state page-state--error">
          <h2>Could not load applications</h2>
          <p>{error}</p>

          <button
            className="applications-page__add-button"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

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

      {applications.length === 0 ? (
        <div className="empty-state">
          <h2>No applications yet</h2>
          <p>Start by adding your first job application.</p>

          <button
            className="applications-page__add-button"
            onClick={() => setIsAddFormOpen(true)}
          >
            Add application
          </button>
        </div>
      ) : (
        <>
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

          {filteredApplications.length === 0 && hasActiveFilters ? (
            <div className="empty-state">
              <h2>No matching applications</h2>
              <p>Try changing your search or status filter.</p>
            </div>
          ) : (
            <div className="applications-page__grid">
              {filteredApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  deleteApplication={handleDeleteApplication}
                  onStatusChange={updateApplicationStatus}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default ApplicationsPage;
