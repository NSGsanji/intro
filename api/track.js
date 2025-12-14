import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket.remoteAddress;

  const { data } = await supabase
    .from('visits')
    .select('*')
    .eq('ip', ip)
    .single();

  if (data) {
    await supabase
      .from('visits')
      .update({
        visit_count: data.visit_count + 1,
        last_visit: new Date()
      })
      .eq('ip', ip);
  } else {
    await supabase.from('visits').insert({ ip });
  }

  res.status(200).json({ ok: true });
}
