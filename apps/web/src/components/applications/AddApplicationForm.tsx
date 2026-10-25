import { useState } from 'react';
import type {
  Application,
  ApplicationStatus,
} from '../../types/application';
import { APPLICATION_STATUSES } from '../../constants/applicationStatus';
import './AddApplicationForm.css';

type AddApplicationFormProps = {
  onAdd: (application: Application) => void;
  onCancel: () => void;
};

function AddApplicationForm({
  onAdd,
  onCancel,
}: AddApplicationFormProps) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] =
    useState<ApplicationStatus>('applied');
  const [location, setLocation] = useState('');
  const [source, setSource] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [notes, setNotes] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const application: Application = {
  id: crypto.randomUUID(),
  company: company.trim(),
  position: position.trim(),
  status,
  appliedAt: new Date().toISOString().slice(0, 10),

  location: location.trim() || undefined,
  source: source.trim() || undefined,
  jobUrl: jobUrl.trim() || undefined,
  notes: notes.trim() || undefined,
};

    onAdd(application);

    setCompany('');
    setPosition('');
    setStatus('applied');
    setLocation('');
setSource('');
setJobUrl('');
setNotes('');
  }

  return (
    <form
  className="application-form"
  onSubmit={handleSubmit}
>
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
        <option
          key={statusOption.value}
          value={statusOption.value}
        >
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
    placeholder="e.g. Tel Aviv / Hybrid"
  />
</div>

<div className="application-form__field">
  <label htmlFor="source">Source</label>
  <input
    id="source"
    type="text"
    value={source}
    onChange={(event) => setSource(event.target.value)}
    placeholder="e.g. LinkedIn"
  />
</div>

<div className="application-form__field">
  <label htmlFor="job-url">Job URL</label>
  <input
    id="job-url"
    type="url"
    value={jobUrl}
    onChange={(event) => setJobUrl(event.target.value)}
    placeholder="https://..."
  />
</div>

<div className="application-form__field">
  <label htmlFor="notes">Notes</label>
  <textarea
    id="notes"
    value={notes}
    onChange={(event) => setNotes(event.target.value)}
    placeholder="Interview notes, recruiter details..."
    rows={4}
  />
</div>

  <div className="application-form__actions">
    <button
      className="application-form__cancel"
      type="button"
      onClick={onCancel}
    >
      Cancel
    </button>

    <button
      className="application-form__submit"
      type="submit"
    >
      Add application
    </button>
  </div>
</form>
  );
}

export default AddApplicationForm;