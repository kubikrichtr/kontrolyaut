DROP POLICY IF EXISTS "anyone can create order" ON public.inspection_orders;
CREATE POLICY "anyone can create order" ON public.inspection_orders
FOR INSERT TO anon, authenticated
WITH CHECK (
  (user_id IS NULL OR user_id = auth.uid())
  AND status = 'new'
  AND length(full_name) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 320
  AND length(phone) BETWEEN 3 AND 50
  AND (note IS NULL OR length(note) <= 5000)
);