CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    created_at timestamp not null,
    title TEXT,
    info TEXT
)