--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15
-- Dumped by pg_dump version 10.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cliente (
    id smallint NOT NULL,
    nombre character varying(256),
    email character varying(256),
    contrasena character varying(256),
    estado boolean
);


ALTER TABLE public.cliente OWNER TO postgres;

--
-- Name: cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cliente_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cliente_id_seq OWNER TO postgres;

--
-- Name: cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cliente_id_seq OWNED BY public.cliente.id;


--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    id smallint DEFAULT nextval('public.cliente_id_seq'::regclass) NOT NULL,
    nombre character varying(256),
    email character varying(256),
    contrasena character varying(256),
    estado boolean
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: carro_compra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carro_compra (
    id smallint NOT NULL,
    cliente_id smallint,
    foto_id smallint
);


ALTER TABLE public.carro_compra OWNER TO postgres;

--
-- Name: carro_compra_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carro_compra_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carro_compra_id_seq OWNER TO postgres;

--
-- Name: carro_compra_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carro_compra_id_seq OWNED BY public.carro_compra.id;


--
-- Name: foto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foto (
    id smallint NOT NULL,
    contenido character varying(256),
    titulo character varying,
    activa boolean DEFAULT true
);


ALTER TABLE public.foto OWNER TO postgres;

--
-- Name: foto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.foto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.foto_id_seq OWNER TO postgres;

--
-- Name: foto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.foto_id_seq OWNED BY public.foto.id;


--
-- Name: lista_deseo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lista_deseo (
    id smallint DEFAULT nextval('public.carro_compra_id_seq'::regclass) NOT NULL,
    cliente_id smallint,
    foto_id smallint
);


ALTER TABLE public.lista_deseo OWNER TO postgres;

--
-- Name: orden; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orden (
    id smallint NOT NULL,
    fecha date,
    cliente_id smallint,
    total smallint
);


ALTER TABLE public.orden OWNER TO postgres;

--
-- Name: orden_detalle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orden_detalle (
    id smallint NOT NULL,
    orden_id smallint,
    foto_id smallint
);


ALTER TABLE public.orden_detalle OWNER TO postgres;

--
-- Name: orden_detalle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orden_detalle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orden_detalle_id_seq OWNER TO postgres;

--
-- Name: orden_detalle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orden_detalle_id_seq OWNED BY public.orden_detalle.id;


--
-- Name: orden_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orden_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orden_id_seq OWNER TO postgres;

--
-- Name: orden_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orden_id_seq OWNED BY public.orden.id;


--
-- Name: carro_compra id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carro_compra ALTER COLUMN id SET DEFAULT nextval('public.carro_compra_id_seq'::regclass);


--
-- Name: cliente id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente ALTER COLUMN id SET DEFAULT nextval('public.cliente_id_seq'::regclass);


--
-- Name: foto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto ALTER COLUMN id SET DEFAULT nextval('public.foto_id_seq'::regclass);


--
-- Name: orden id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden ALTER COLUMN id SET DEFAULT nextval('public.orden_id_seq'::regclass);


--
-- Name: orden_detalle id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden_detalle ALTER COLUMN id SET DEFAULT nextval('public.orden_detalle_id_seq'::regclass);


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (id, nombre, email, contrasena, estado) FROM stdin;
3	pedro	pedro@fotosparati.com	123123	t
1	victor\n	victor@fotosparati.com	123123	t
\.


--
-- Data for Name: carro_compra; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carro_compra (id, cliente_id, foto_id) FROM stdin;
62	2	2
\.


--
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cliente (id, nombre, email, contrasena, estado) FROM stdin;
2	Luis	luis@gmail.com	123123	t
1	pedro	pedro@gmail.com	123123	t
\.


--
-- Data for Name: foto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foto (id, contenido, titulo, activa) FROM stdin;
13	13.png	algo	t
1	img1.jpg	Verde	t
2	img2.jpg	Olas	t
3	img3.jpg	Árboles	t
4	img4.jpg	ByN	t
12	img12.jpg	Luna	t
\.


--
-- Data for Name: lista_deseo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lista_deseo (id, cliente_id, foto_id) FROM stdin;
64	2	1
69	1	2
70	1	1
\.


--
-- Data for Name: orden; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orden (id, fecha, cliente_id, total) FROM stdin;
40	2018-11-08	2	1
41	2018-11-07	2	2
42	2018-11-07	2	3
43	2021-04-01	2	4
44	2021-04-02	2	2
45	2021-04-16	1	2
46	2021-04-16	1	3
\.


--
-- Data for Name: orden_detalle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orden_detalle (id, orden_id, foto_id) FROM stdin;
40	40	2
41	41	1
42	41	2
43	42	2
44	42	1
45	42	4
46	43	12
47	43	1
48	43	3
49	43	4
50	44	12
51	44	4
52	45	3
53	45	2
54	46	12
55	46	4
56	46	3
\.


--
-- Name: carro_compra_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carro_compra_id_seq', 70, true);


--
-- Name: cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cliente_id_seq', 3, true);


--
-- Name: foto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.foto_id_seq', 13, true);


--
-- Name: orden_detalle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orden_detalle_id_seq', 56, true);


--
-- Name: orden_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orden_id_seq', 46, true);


--
-- Name: lista_deseo carro_compra_copy1_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lista_deseo
    ADD CONSTRAINT carro_compra_copy1_pkey PRIMARY KEY (id);


--
-- Name: carro_compra carro_compra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carro_compra
    ADD CONSTRAINT carro_compra_pkey PRIMARY KEY (id);


--
-- Name: admin cliente_copy1_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT cliente_copy1_pkey PRIMARY KEY (id);


--
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);


--
-- Name: foto foto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT foto_pkey PRIMARY KEY (id);


--
-- Name: orden_detalle orden_detalle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden_detalle
    ADD CONSTRAINT orden_detalle_pkey PRIMARY KEY (id);


--
-- Name: orden orden_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orden
    ADD CONSTRAINT orden_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

