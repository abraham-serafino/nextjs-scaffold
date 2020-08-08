-- Table: public.settings

-- DROP TABLE public.settings;

CREATE TABLE public.settings
(
    setting_id integer NOT NULL DEFAULT nextval('settings_setting_id_seq'::regclass),
    name character varying(120) COLLATE pg_catalog."default" NOT NULL,
    value json NOT NULL,
    CONSTRAINT settings_pkey PRIMARY KEY (setting_id)
)

TABLESPACE pg_default;

ALTER TABLE public.settings
    OWNER to postgres;
