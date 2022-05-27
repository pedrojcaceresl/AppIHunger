--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9
-- Dumped by pg_dump version 12.9

-- Started on 2022-05-10 23:14:10

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 58508)
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    cat_id integer NOT NULL,
    cat_nombre character varying,
    cat_descripcion character varying
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 58506)
-- Name: categoría_cat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."categoría_cat_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."categoría_cat_id_seq" OWNER TO postgres;

--
-- TOC entry 2890 (class 0 OID 0)
-- Dependencies: 202
-- Name: categoría_cat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."categoría_cat_id_seq" OWNED BY public.categoria.cat_id;


--
-- TOC entry 205 (class 1259 OID 58517)
-- Name: comprobante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comprobante (
    com_id integer NOT NULL,
    com_nombre character varying,
    com_numero_inicial integer,
    com_numero_fin integer,
    com_cant_digitos integer,
    com_serie character varying,
    com_timbrado character varying,
    com_fecha_inicio_vigencia date,
    com_fecha_fin_vigencia date,
    com_numero_actual integer DEFAULT 1
);


ALTER TABLE public.comprobante OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 58515)
-- Name: comprobante_com_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comprobante_com_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comprobante_com_id_seq OWNER TO postgres;

--
-- TOC entry 2891 (class 0 OID 0)
-- Dependencies: 204
-- Name: comprobante_com_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comprobante_com_id_seq OWNED BY public.comprobante.com_id;


--
-- TOC entry 207 (class 1259 OID 58526)
-- Name: detalle_pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_pedido (
    det_id integer NOT NULL,
    det_id_pedido integer NOT NULL,
    det_id_producto integer,
    det_precio_unitario numeric,
    det_total_parcial numeric,
    det_cantidad numeric,
    det_valor_iva numeric,
    det_total_general numeric,
    det_iva_porcentaje integer,
    det_estado integer DEFAULT 2,
    det_observacion text
);


ALTER TABLE public.detalle_pedido OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 58524)
-- Name: detalle_pedido_det_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_pedido_det_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalle_pedido_det_id_seq OWNER TO postgres;

--
-- TOC entry 2892 (class 0 OID 0)
-- Dependencies: 206
-- Name: detalle_pedido_det_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_pedido_det_id_seq OWNED BY public.detalle_pedido.det_id;


--
-- TOC entry 209 (class 1259 OID 58544)
-- Name: pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedido (
    ped_id integer NOT NULL,
    ped_id_cliente integer,
    ped_fecha date,
    ped_id_comprobante integer,
    ped_fecha_inicio_vigencia date,
    ped_fecha_fin_vigencia date,
    ped_num_comprobante character varying,
    ped_timbrado character varying,
    ped_total_parcial numeric,
    ped_iva numeric,
    ped_total_general numeric,
    ped_estado integer,
    gpsx text,
    gpsy text
);


ALTER TABLE public.pedido OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 58542)
-- Name: pedido_ped_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedido_ped_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pedido_ped_id_seq OWNER TO postgres;

--
-- TOC entry 2893 (class 0 OID 0)
-- Dependencies: 208
-- Name: pedido_ped_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedido_ped_id_seq OWNED BY public.pedido.ped_id;


--
-- TOC entry 211 (class 1259 OID 58562)
-- Name: producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto (
    pro_id integer NOT NULL,
    cat_id integer,
    pro_precio numeric,
    pro_descripcion character varying,
    pro_iva numeric,
    image text DEFAULT 'https://www.suzukijember.com/gallery/gambar_product/default.jpg'::text
);


ALTER TABLE public.producto OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 58560)
-- Name: producto_pro_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producto_pro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.producto_pro_id_seq OWNER TO postgres;

--
-- TOC entry 2894 (class 0 OID 0)
-- Dependencies: 210
-- Name: producto_pro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producto_pro_id_seq OWNED BY public.producto.pro_id;


--
-- TOC entry 213 (class 1259 OID 58571)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    usu_id integer NOT NULL,
    usu_nombre character varying,
    usu_telefono character varying,
    usu_email character varying,
    usu_password character varying,
    usu_fecha timestamp without time zone,
    usu_imagen text,
    usu_documento text
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 58569)
-- Name: usuarios_usu_codigo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_usu_codigo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_usu_codigo_seq OWNER TO postgres;

--
-- TOC entry 2895 (class 0 OID 0)
-- Dependencies: 212
-- Name: usuarios_usu_codigo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_usu_codigo_seq OWNED BY public.usuarios.usu_id;


--
-- TOC entry 2723 (class 2604 OID 58511)
-- Name: categoria cat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN cat_id SET DEFAULT nextval('public."categoría_cat_id_seq"'::regclass);


--
-- TOC entry 2724 (class 2604 OID 58520)
-- Name: comprobante com_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comprobante ALTER COLUMN com_id SET DEFAULT nextval('public.comprobante_com_id_seq'::regclass);


--
-- TOC entry 2726 (class 2604 OID 58529)
-- Name: detalle_pedido det_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido ALTER COLUMN det_id SET DEFAULT nextval('public.detalle_pedido_det_id_seq'::regclass);


--
-- TOC entry 2728 (class 2604 OID 58547)
-- Name: pedido ped_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido ALTER COLUMN ped_id SET DEFAULT nextval('public.pedido_ped_id_seq'::regclass);


--
-- TOC entry 2729 (class 2604 OID 58565)
-- Name: producto pro_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto ALTER COLUMN pro_id SET DEFAULT nextval('public.producto_pro_id_seq'::regclass);


--
-- TOC entry 2731 (class 2604 OID 58574)
-- Name: usuarios usu_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN usu_id SET DEFAULT nextval('public.usuarios_usu_codigo_seq'::regclass);


--
-- TOC entry 2874 (class 0 OID 58508)
-- Dependencies: 203
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categoria (cat_id, cat_nombre, cat_descripcion) FROM stdin;
1	test	\N
\.


--
-- TOC entry 2876 (class 0 OID 58517)
-- Dependencies: 205
-- Data for Name: comprobante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comprobante (com_id, com_nombre, com_numero_inicial, com_numero_fin, com_cant_digitos, com_serie, com_timbrado, com_fecha_inicio_vigencia, com_fecha_fin_vigencia, com_numero_actual) FROM stdin;
1	tikect	1	\N	\N	T	\N	\N	\N	1
\.


--
-- TOC entry 2878 (class 0 OID 58526)
-- Dependencies: 207
-- Data for Name: detalle_pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_pedido (det_id, det_id_pedido, det_id_producto, det_precio_unitario, det_total_parcial, det_cantidad, det_valor_iva, det_total_general, det_iva_porcentaje, det_estado, det_observacion) FROM stdin;
14	42	1	30000	30000	1	0	30000	0	2	Sin tomate
15	42	1	30000	30000	1	0	30000	0	0	Sin tomate
\.


--
-- TOC entry 2880 (class 0 OID 58544)
-- Dependencies: 209
-- Data for Name: pedido; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pedido (ped_id, ped_id_cliente, ped_fecha, ped_id_comprobante, ped_fecha_inicio_vigencia, ped_fecha_fin_vigencia, ped_num_comprobante, ped_timbrado, ped_total_parcial, ped_iva, ped_total_general, ped_estado, gpsx, gpsy) FROM stdin;
42	1	2022-07-25	1	\N	\N	1	\N	30000	0	30000	2	0	0
\.


--
-- TOC entry 2882 (class 0 OID 58562)
-- Dependencies: 211
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.producto (pro_id, cat_id, pro_precio, pro_descripcion, pro_iva, image) FROM stdin;
1	1	30000	X-BURGUER	0	https://www.suzukijember.com/gallery/gambar_product/default.jpg
\.


--
-- TOC entry 2884 (class 0 OID 58571)
-- Dependencies: 213
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (usu_id, usu_nombre, usu_telefono, usu_email, usu_password, usu_fecha, usu_imagen, usu_documento) FROM stdin;
1	DEFAULT	\N	DEFAULT	123456	\N	\N	\N
\.


--
-- TOC entry 2896 (class 0 OID 0)
-- Dependencies: 202
-- Name: categoría_cat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."categoría_cat_id_seq"', 2, true);


--
-- TOC entry 2897 (class 0 OID 0)
-- Dependencies: 204
-- Name: comprobante_com_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comprobante_com_id_seq', 2, true);


--
-- TOC entry 2898 (class 0 OID 0)
-- Dependencies: 206
-- Name: detalle_pedido_det_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_pedido_det_id_seq', 16, true);


--
-- TOC entry 2899 (class 0 OID 0)
-- Dependencies: 208
-- Name: pedido_ped_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pedido_ped_id_seq', 43, true);


--
-- TOC entry 2900 (class 0 OID 0)
-- Dependencies: 210
-- Name: producto_pro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_pro_id_seq', 2, true);


--
-- TOC entry 2901 (class 0 OID 0)
-- Dependencies: 212
-- Name: usuarios_usu_codigo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_usu_codigo_seq', 1, true);


--
-- TOC entry 2733 (class 2606 OID 58579)
-- Name: categoria categoría_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT "categoría_pkey" PRIMARY KEY (cat_id);


--
-- TOC entry 2735 (class 2606 OID 58581)
-- Name: comprobante comprobante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comprobante
    ADD CONSTRAINT comprobante_pkey PRIMARY KEY (com_id);


--
-- TOC entry 2737 (class 2606 OID 58583)
-- Name: detalle_pedido datelle_pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT datelle_pedido_pkey PRIMARY KEY (det_id);


--
-- TOC entry 2739 (class 2606 OID 58589)
-- Name: pedido pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_pkey PRIMARY KEY (ped_id);


--
-- TOC entry 2741 (class 2606 OID 58591)
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (pro_id);


--
-- TOC entry 2743 (class 2606 OID 58593)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (usu_id);


--
-- TOC entry 2746 (class 2606 OID 58594)
-- Name: producto fk_cat_producto_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_cat_producto_id FOREIGN KEY (cat_id) REFERENCES public.categoria(cat_id);


--
-- TOC entry 2744 (class 2606 OID 58599)
-- Name: detalle_pedido fk_id_pedido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT fk_id_pedido FOREIGN KEY (det_id_pedido) REFERENCES public.pedido(ped_id) NOT VALID;


--
-- TOC entry 2745 (class 2606 OID 58604)
-- Name: detalle_pedido fk_id_producto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT fk_id_producto FOREIGN KEY (det_id_producto) REFERENCES public.producto(pro_id) NOT VALID;


-- Completed on 2022-05-10 23:14:10

--
-- PostgreSQL database dump complete
--

