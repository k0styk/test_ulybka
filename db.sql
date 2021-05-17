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
    avg_rating real,
    CONSTRAINT items_pkey PRIMARY KEY (id)
)

ALTER TABLE public.items
    OWNER to postgres;

-- Table: public.feedback_items
-- DROP TABLE public.feedback_items;

CREATE TABLE IF NOT EXISTS public.feedback_items
(
    id integer NOT NULL DEFAULT nextval('feedback_items_id_seq'::regclass),
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

-- INSERT DATA
INSERT INTO public.authors(id, name, lastname, surname) VALUES (1,'Paul', 'Rabic', 'Zamal');
INSERT INTO public.authors(id, name, lastname, surname) VALUES (2,'Jane', 'Duen', 'Seqora');
INSERT INTO public.authors(id, name, lastname, surname) VALUES (3,'John', 'Seana', 'Aeste');

INSERT INTO public.items(id, name, avg_rating) VALUES ('1', 'TV', 0); 
INSERT INTO public.items(id, name, avg_rating) VALUES ('1', 'Teapot', 0);
INSERT INTO public.items(id, name, avg_rating) VALUES ('1', 'Microwawe oven', 0);

INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (1,1,1);
INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (1,2,3);
INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (1,3,4);
INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (2,1,5);
INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (2,2,6);
INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (2,3,7);
INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (3,1,8);
INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (3,2,9);
INSERT INTO public.feedback_items(item_id, author_id, rating) VALUES (3,3,11);

-- CREATE FUNCTION upd_stamp() RETURNS trigger AS $upd_stamp$
--     BEGIN
--         NEW.update_date := current_timestamp;
--         RETURN NEW;
--     END;
-- $upd_stamp$ LANGUAGE plpgsql;

-- CREATE TRIGGER upd_stamp AFTER UPDATE ON feedback_items
--     FOR EACH ROW EXECUTE PROCEDURE upd_stamp();

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