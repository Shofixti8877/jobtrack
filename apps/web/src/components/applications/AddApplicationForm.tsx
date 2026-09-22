import { useState } from 'react';
import type {
  Application,
  ApplicationStatus,
} from '../../types/application';

type AddApplicationFormProps = {
  onAdd: (application: Application) => void;
};

function AddApplicationForm({ onAdd }: AddApplicationFormProps) {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="position">Position</label>
        <input
          id="position"
          type="text"
          value={position}
          onChange={(event) => setPosition(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as ApplicationStatus)
          }
        >
          <option value="applied">Applied</option>
          <option value="screening">Screening</option>
          <option value="technical">Technical</option>
          <option value="final">Final interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <button type="submit">Add application</button>
    </form>
  );
}

export default AddApplicationForm;