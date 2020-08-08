-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    user_id bigint NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    fullname character varying(120) COLLATE pg_catalog."default",
    username character varying(30) COLLATE pg_catalog."default" NOT NULL,
    password character varying(16) COLLATE pg_catalog."default" NOT NULL,
    is_admin bit(1) NOT NULL DEFAULT '0'::"bit",
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;
