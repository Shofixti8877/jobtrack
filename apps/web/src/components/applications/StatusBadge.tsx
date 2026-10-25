import type { ApplicationStatus } from '../../types/application';
import './StatusBadge.css';

type StatusBadgeProps = {
  status: ApplicationStatus;
};

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status}`}>{status}</span>
  );
}

export default StatusBadge;
