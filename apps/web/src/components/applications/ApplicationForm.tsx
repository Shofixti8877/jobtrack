import { useState } from 'react';
import { APPLICATION_STATUSES } from '../../constants/applicationStatus';
import type {
  Application,
  ApplicationInput,
  ApplicationStatus,
} from '../../types/application';
import './AddApplicationForm.css';

type ApplicationFormProps = {
  initialApplication?: Application;
  onSubmit: (application: ApplicationInput) => void | Promise<void>;
  onCancel: () => void;
};

function ApplicationForm({
  initialApplication,
  onSubmit,
  onCancel,
}: ApplicationFormProps) {
  const [company, setCompany] = useState(initialApplication?.company ?? '');

  const [position, setPosition] = useState(initialApplication?.position ?? '');

  const [status, setStatus] = useState<ApplicationStatus>(
    initialApplication?.status ?? 'applied',
  );

  const [location, setLocation] = useState(initialApplication?.location ?? '');

  const [source, setSource] = useState(initialApplication?.source ?? '');

  const [jobUrl, setJobUrl] = useState(initialApplication?.jobUrl ?? '');

  const [notes, setNotes] = useState(initialApplication?.notes ?? '');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit({
        company,
        position,
        status,
        location: location || undefined,
        jobUrl: jobUrl || undefined,
        source: source || undefined,
        notes: notes || undefined,
      });
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <div className="application-form__field">
        <label htmlFor="company">Company</label>

        <input
          id="company"
          type="text"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          required
        />
      </div>

      <div className="application-form__field">
        <label htmlFor="position">Position</label>

        <input
          id="position"
          type="text"
          value={position}
          onChange={(event) => setPosition(event.target.value)}
          required
        />
      </div>

      <div className="application-form__field">
        <label htmlFor="status">Status</label>

        <select
          id="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as ApplicationStatus)
          }
        >
          {APPLICATION_STATUSES.map((statusOption) => (
            <option key={statusOption.value} value={statusOption.value}>
              {statusOption.label}
            </option>
          ))}
        </select>
      </div>

      <div className="application-form__field">
        <label htmlFor="location">Location</label>

        <input
          id="location"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>

      <div className="application-form__field">
        <label htmlFor="source">Source</label>

        <input
          id="source"
          type="text"
          value={source}
          onChange={(event) => setSource(event.target.value)}
        />
      </div>

      <div className="application-form__field">
        <label htmlFor="job-url">Job URL</label>

        <input
          id="job-url"
          type="url"
          value={jobUrl}
          onChange={(event) => setJobUrl(event.target.value)}
        />
      </div>

      <div className="application-form__field">
        <label htmlFor="notes">Notes</label>

        <textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
        />
      </div>

      {submitError && (
        <p className="form-error" role="alert">
          {submitError}
        </p>
      )}

      <div className="application-form__actions">
        <button
          className="application-form__cancel"
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button
          className="application-form__submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Saving...'
            : initialApplication
              ? 'Save changes'
              : 'Add application'}
        </button>
      </div>
    </form>
  );
}

export default ApplicationForm;
