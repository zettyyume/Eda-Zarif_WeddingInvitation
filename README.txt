Wedding invitation Supabase-connected files

Replace your existing index.html, script.js, and style.css with these versions.
Keep your existing images/ and font/ folders in the same website root; they are still referenced by the HTML/CSS.

The JavaScript uses your Supabase project URL and publishable key. The publishable key is intended for browser use with RLS and the configured RPC function.

Before testing, run this once in Supabase SQL Editor if you have not already:
grant select on public.public_wishes to anon, authenticated;

Then upload/commit all three files to your GitHub Pages repository. Do not upload any service_role or secret key.
