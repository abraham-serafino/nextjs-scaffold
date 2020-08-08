-- Table: public.sessions

-- DROP TABLE public.sessions;

CREATE TABLE public.sessions
(
    session_id bigint NOT NULL DEFAULT nextval('sessions_session_id_seq'::regclass),
    user_id integer NOT NULL DEFAULT nextval('sessions_user_id_seq'::regclass),
    token uuid NOT NULL,
    CONSTRAINT sessions_pkey PRIMARY KEY (session_id),
    CONSTRAINT token_unique UNIQUE (token),
    CONSTRAINT sessions_user_id_users_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.sessions
    OWNER to postgres;
-- Index: fki_sessions_user_id_users_user_id_fkey

-- DROP INDEX public.fki_sessions_user_id_users_user_id_fkey;

CREATE INDEX fki_sessions_user_id_users_user_id_fkey
    ON public.sessions USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: sessions_token_index

-- DROP INDEX public.sessions_token_index;

CREATE INDEX sessions_token_index
    ON public.sessions USING btree
    (token ASC NULLS LAST)
    TABLESPACE pg_default;
