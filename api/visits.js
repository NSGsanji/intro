import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { data } = await supabase
    .from('visits')
    .select('visit_count');

  const total = data.reduce((sum, row) => sum + row.visit_count, 0);
  res.status(200).json({ total });
}
