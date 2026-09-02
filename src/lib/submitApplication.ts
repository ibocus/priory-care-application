import type { ApplicationData } from '../types';

/**
 * This build is client-side only: submitting the form does not send data
 * anywhere yet. To connect a real destination, replace the body of this
 * function — two common options:
 *
 *   1. Formspree (no backend code required):
 *        const res = await fetch('https://formspree.io/f/your-form-id', {
 *          method: 'POST',
 *          headers: { 'Content-Type': 'application/json' },
 *          body: JSON.stringify(data),
 *        });
 *        if (!res.ok) throw new Error('Submission failed');
 *
 *   2. Your own API route / serverless function:
 *        const res = await fetch('/api/applications', {
 *          method: 'POST',
 *          headers: { 'Content-Type': 'application/json' },
 *          body: JSON.stringify(data),
 *        });
 *        if (!res.ok) throw new Error('Submission failed');
 *
 * Keep this function's signature the same and App.tsx needs no changes.
 */
export async function submitApplication(data: ApplicationData): Promise<{ referenceId: string }> {
  void data;
  const referenceId = `PCS-${Date.now().toString(36).toUpperCase()}`;
  return { referenceId };
}
