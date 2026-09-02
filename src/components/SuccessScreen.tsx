import type { ApplicationData } from '../types';

interface SuccessScreenProps {
  data: ApplicationData;
  referenceId: string;
  onStartNew: () => void;
}

export function SuccessScreen({ data, referenceId, onStartNew }: SuccessScreenProps) {
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `priory-care-application-${referenceId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="success-screen">
      <div className="success-screen__icon" aria-hidden="true">✓</div>
      <h2>Application submitted</h2>
      <p>
        Thanks, {data.personal.firstName || 'there'} — your application has been recorded. Your reference number
        is <strong>{referenceId}</strong>.
      </p>
      <p className="success-screen__note">
        This build runs client-side only, so nothing has been sent to a server yet. Download a copy below, or wire
        up <code>src/lib/submitApplication.ts</code> to your API or Formspree endpoint so submissions reach you
        automatically — see the README.
      </p>
      <div className="success-screen__actions">
        <button type="button" className="btn btn--primary" onClick={downloadJson}>
          Download application (JSON)
        </button>
        <button type="button" className="btn btn--secondary" onClick={() => window.print()}>
          Print / save as PDF
        </button>
        <button type="button" className="btn btn--ghost" onClick={onStartNew}>
          Start a new application
        </button>
      </div>
    </div>
  );
}
