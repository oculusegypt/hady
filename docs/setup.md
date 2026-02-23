# 4) Setup & run instructions

## Local
1. `npm install`
2. `cp .env.example .env.local`
3. Fill Supabase vars.
4. `npm run dev`

## Env vars
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Supabase deploy
1. Create project.
2. Run `supabase/schema.sql` in SQL editor.
3. Enable Phone Auth OTP (test mode for demo).
4. Create storage bucket `chat-photos`.

## Vercel deploy
1. Import GitHub repo.
2. Set environment variables above.
3. Build command: `npm run build`
4. Output: `.next`
5. Deploy.
