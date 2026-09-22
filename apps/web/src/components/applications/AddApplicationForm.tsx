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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const application: Application = {
      id: crypto.randomUUID(),
      company,
      position,
      status,
      appliedAt: new Date().toISOString().slice(0, 10),
    };

    onAdd(application);

    setCompany('');
    setPosition('');
    setStatus('applied');
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