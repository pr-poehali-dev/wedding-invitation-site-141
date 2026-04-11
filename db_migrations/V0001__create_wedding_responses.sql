CREATE TABLE wedding_responses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  attending TEXT NOT NULL,
  guests TEXT,
  children TEXT,
  alcohol TEXT[],
  second_day TEXT,
  dietary TEXT,
  song TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);