-- Table: public.authors

-- DROP TABLE public.authors;

CREATE TABLE public.authors
(
    id integer NOT NULL DEFAULT nextval('authors_id_seq'::regclass),
    name character varying(150) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(150) COLLATE pg_catalog."default" NOT NULL,
    surname character varying(150) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT authors_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.authors
    OWNER to postgres;

-- Table: public.feedback_items

-- DROP TABLE public.feedback_items;

CREATE TABLE public.feedback_items
(
    id integer NOT NULL DEFAULT nextval('feedback_items_id_seq'::regclass),
    item_id integer NOT NULL,
    author_id integer NOT NULL,
    created_date timestamp without time zone NOT NULL DEFAULT now(),
    update_date timestamp without time zone NOT NULL,
    CONSTRAINT feedback_items_pkey PRIMARY KEY (id),
    CONSTRAINT feedback_items_authors_fkey FOREIGN KEY (author_id)
        REFERENCES public.authors (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT feedback_items_items_fkey FOREIGN KEY (item_id)
        REFERENCES public.items (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.feedback_items
    OWNER to postgres;

-- Table: public.items

-- DROP TABLE public.items;

CREATE TABLE public.items
(
    id integer NOT NULL DEFAULT nextval('items_id_seq'::regclass),
    name character varying(150) COLLATE pg_catalog."default" NOT NULL,
    avg_rating real,
    CONSTRAINT items_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.items
    OWNER to postgres;

CREATE FUNCTION upd_stamp() RETURNS trigger AS $upd_stamp$
    BEGIN
        NEW.update_date := current_timestamp;
        RETURN NEW;
    END;
$upd_stamp$ LANGUAGE plpgsql;

CREATE TRIGGER upd_stamp AFTER UPDATE ON feedback_items
    FOR EACH ROW EXECUTE PROCEDURE upd_stamp();

-- CREATE FUNCTION emp_stamp() RETURNS trigger AS $emp_stamp$
--     BEGIN
--         -- Проверить, что указаны имя сотрудника и зарплата
--         IF NEW.empname IS NULL THEN
--             RAISE EXCEPTION 'empname cannot be null';
--         END IF;
--         IF NEW.salary IS NULL THEN
--             RAISE EXCEPTION '% cannot have null salary', NEW.empname;
--         END IF;

--         -- Кто будет работать, если за это надо будет платить?
--         IF NEW.salary < 0 THEN
--             RAISE EXCEPTION '% cannot have a negative salary', NEW.empname;
--         END IF;

--         -- Запомнить, кто и когда изменил запись
--         NEW.last_date := current_timestamp;
--         NEW.last_user := current_user;
--         RETURN NEW;
--     END;
-- $emp_stamp$ LANGUAGE plpgsql;

-- CREATE TRIGGER emp_stamp BEFORE INSERT OR UPDATE ON emp
--     FOR EACH ROW EXECUTE PROCEDURE emp_stamp();