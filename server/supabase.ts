import { createClient } from '@supabase/supabase-js';
import type { ApplicationData } from '../src/types';

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Supabase is not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(url, key);
}

export async function saveApplication(referenceId: string, data: ApplicationData): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from('applications').insert({
    reference_id: referenceId,
    applicant_name: [data.personal.firstName, data.personal.lastName].filter(Boolean).join(' '),
    email: data.contact.email1,
    phone: data.contact.mobileTel1,
    payload: data,
  });
  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }
}
