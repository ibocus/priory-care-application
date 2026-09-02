import { CheckboxField, YesNoField } from '../components/fields';
import type { StepProps } from './StepProps';

export function EligibilityStep({ data, setData, errors }: StepProps) {
  const e = data.eligibility;
  const set = (patch: Partial<typeof e>) =>
    setData((prev) => ({ ...prev, eligibility: { ...prev.eligibility, ...patch } }));

  return (
    <div className="step">
      <h2 className="step__title">Right to work &amp; eligibility</h2>
      <p className="step__intro">
        UK care regulations require us to confirm a few things before we can progress your application.
      </p>

      <YesNoField
        id="rightToWorkUK"
        label="Do you have the right to work in the UK?"
        required
        value={e.rightToWorkUK}
        onChange={(v) => set({ rightToWorkUK: v })}
        error={errors.rightToWorkUK}
      />
      <YesNoField
        id="requiresSponsorship"
        label="Will you now, or in the future, require visa sponsorship?"
        value={e.requiresSponsorship}
        onChange={(v) => set({ requiresSponsorship: v })}
      />
      <YesNoField
        id="hasDrivingLicence"
        label="Do you hold a full UK driving licence?"
        required
        value={e.hasDrivingLicence}
        onChange={(v) => set({ hasDrivingLicence: v })}
        error={errors.hasDrivingLicence}
      />
      <YesNoField
        id="hasOwnTransport"
        label="Do you have access to your own transport?"
        required
        value={e.hasOwnTransport}
        onChange={(v) => set({ hasOwnTransport: v })}
        error={errors.hasOwnTransport}
      />
      <YesNoField
        id="hasEnhancedDbs"
        label="Do you already hold an Enhanced DBS certificate (on the update service)?"
        value={e.hasEnhancedDbs}
        onChange={(v) => set({ hasEnhancedDbs: v })}
      />

      <CheckboxField
        id="consentToDbsCheck"
        checked={e.consentToDbsCheck}
        onChange={(v) => set({ consentToDbsCheck: v })}
        error={errors.consentToDbsCheck}
        label="I understand that any offer of employment is subject to a satisfactory Enhanced DBS check and reference checks, and I consent to these being carried out."
      />
    </div>
  );
}
