-- create DB
CREATE DATABASE test
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.authors
-- DROP TABLE public.authors;

CREATE TABLE IF NOT EXISTS public.authors
(
    id serial NOT NULL,
    name varchar(150) NOT NULL,
    lastname varchar(150) NOT NULL,
    surname varchar(150) NOT NULL,
    CONSTRAINT authors_pkey PRIMARY KEY (id)
);

ALTER TABLE public.authors
    OWNER to postgres;

-- Table: public.items
-- DROP TABLE public.items;

CREATE TABLE public.items
(
    id serial NOT NULL,
    name varchar(150) NOT NULL,
    avg_rating real DEFAULT 0,
    CONSTRAINT items_pkey PRIMARY KEY (id)
);

ALTER TABLE public.items
    OWNER to postgres;

-- Table: public.feedback_items
-- DROP TABLE public.feedback_items;

CREATE TABLE IF NOT EXISTS public.feedback_items
(
    id serial NOT NULL,
    item_id integer NOT NULL,
    author_id integer NOT NULL,
    rating integer NOT NULL CHECK (rating >= 0 AND rating <= 10),
    created_date timestamp without time zone NOT NULL DEFAULT now(),
    update_date timestamp without time zone NOT NULL DEFAULT now(),
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
);

ALTER TABLE public.feedback_items
    OWNER to postgres;

CREATE FUNCTION upd_stamp() RETURNS trigger AS $upd_stamp$
    BEGIN
        NEW.update_date := current_timestamp;
        RETURN NEW;
    END;
$upd_stamp$ LANGUAGE plpgsql;

CREATE TRIGGER upd_stamp BEFORE UPDATE ON feedback_items
FOR EACH ROW EXECUTE PROCEDURE upd_stamp();

CREATE FUNCTION avg_count() RETURNS trigger AS $avg_count$
    DECLARE
        avg_r              numeric(10,3);
    BEGIN
        avg_r = (select avg(rating) from public.feedback_items where item_id = NEW.item_id);
        UPDATE public.items SET avg_rating = avg_r WHERE id = NEW.item_id;
        RETURN NEW;
    END;
$avg_count$ LANGUAGE plpgsql;

CREATE TRIGGER avg_count AFTER INSERT OR UPDATE ON feedback_items
FOR EACH ROW EXECUTE PROCEDURE avg_count();

CREATE VIEW api_feedback_items AS
    SELECT author_id, item_id, i.name as item_name, a.name, a.lastname, a.surname, rating
    FROM public.feedback_items f
    JOIN public.authors a on f.author_id = a.id
    JOIN public.items i on f.item_id = i.id;

-- -- INSERT DATA
-- INSERT INTO public.authors(name, lastname, surname) VALUES ('Paul', 'Rabic', 'Zamal');
-- INSERT INTO public.authors(name, lastname, surname) VALUES ('Jane', 'Duen', 'Seqora');
-- INSERT INTO public.authors(name, lastname, surname) VALUES ('John', 'Seana', 'Aeste');

-- INSERT INTO public.items(name) VALUES ('TV'); 
-- INSERT INTO public.items(name) VALUES ('Teapot');
-- INSERT INTO public.items(name) VALUES ('Microwawe oven');

-- INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (1,1,1);
-- INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (1,2,3);
-- INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (1,3,4);
-- INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (2,1,5);
-- INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (2,2,6);
-- INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (2,3,7);
-- INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (3,1,8);
-- INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (3,2,9);
-- INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (3,3,10);