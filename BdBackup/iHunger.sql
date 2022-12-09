-- public.categoria definition

-- Drop table

-- DROP TABLE public.categoria;

CREATE TABLE public.categoria (
	cat_id int4 NOT NULL DEFAULT nextval('"categoría_cat_id_seq"'::regclass),
	cat_nombre varchar NULL,
	cat_descripcion varchar NULL,
	image text NULL DEFAULT 'https://www.suzukijember.com/gallery/gambar_product/default.jpg'::text,
	CONSTRAINT categoría_pkey PRIMARY KEY (cat_id)
);


-- public.comprobante definition

-- Drop table

-- DROP TABLE public.comprobante;

CREATE TABLE public.comprobante (
	com_id serial4 NOT NULL,
	com_nombre varchar NULL,
	com_numero_inicial int4 NULL,
	com_numero_fin int4 NULL,
	com_cant_digitos int4 NULL,
	com_serie varchar NULL,
	com_timbrado varchar NULL,
	com_fecha_inicio_vigencia date NULL,
	com_fecha_fin_vigencia date NULL,
	com_numero_actual int4 NULL DEFAULT 1,
	CONSTRAINT comprobante_pkey PRIMARY KEY (com_id)
);


-- public."formaDePago" definition

-- Drop table

-- DROP TABLE public."formaDePago";

CREATE TABLE public."formaDePago" (
	"fp_Id" serial4 NOT NULL,
	fp_descripcion text NOT NULL,
	CONSTRAINT "formaDePago_pkey" PRIMARY KEY ("fp_Id")
);


-- public.pedido definition

-- Drop table

-- DROP TABLE public.pedido;

CREATE TABLE public.pedido (
	ped_id serial4 NOT NULL,
	ped_id_cliente int4 NULL,
	ped_fecha date NULL,
	ped_id_comprobante int4 NULL,
	ped_fecha_inicio_vigencia date NULL,
	ped_fecha_fin_vigencia date NULL,
	ped_num_comprobante varchar NULL,
	ped_timbrado varchar NULL,
	ped_total_general numeric NULL,
	ped_estado int4 NULL,
	gps text NULL,
	ped_pago int4 NULL,
	CONSTRAINT pedido_pkey PRIMARY KEY (ped_id)
);


-- public.usuarios definition

-- Drop table

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios (
	usu_id int4 NOT NULL DEFAULT nextval('usuarios_usu_codigo_seq'::regclass),
	usu_nombre varchar NULL,
	usu_telefono varchar NULL,
	usu_email varchar NULL,
	usu_password varchar NULL,
	usu_fecha timestamp NULL,
	usu_imagen text NULL,
	usu_documento text NULL,
	usu_token text NULL,
	usu_rol text NULL DEFAULT 'usuario'::text,
	CONSTRAINT usuarios_pkey PRIMARY KEY (usu_id)
);


-- public.producto definition

-- Drop table

-- DROP TABLE public.producto;

CREATE TABLE public.producto (
	pro_id serial4 NOT NULL,
	cat_id int4 NULL,
	pro_precio numeric NULL,
	pro_descripcion varchar NULL,
	pro_iva numeric NULL,
	image text NULL DEFAULT 'https://www.suzukijember.com/gallery/gambar_product/default.jpg'::text,
	pro_nombre text NULL,
	CONSTRAINT producto_pkey PRIMARY KEY (pro_id),
	CONSTRAINT fk_cat_producto_id FOREIGN KEY (cat_id) REFERENCES public.categoria(cat_id)
);


-- public.detalle_pedido definition

-- Drop table

-- DROP TABLE public.detalle_pedido;

CREATE TABLE public.detalle_pedido (
	det_id serial4 NOT NULL,
	det_id_pedido int4 NOT NULL,
	det_id_producto int4 NULL,
	det_precio_unitario numeric NULL,
	det_total_parcial numeric NULL,
	det_cantidad numeric NULL,
	det_valor_iva numeric NULL,
	det_total_general numeric NULL,
	det_iva_porcentaje int4 NULL,
	det_estado int4 NULL DEFAULT 2,
	det_observacion text NULL,
	CONSTRAINT datelle_pedido_pkey PRIMARY KEY (det_id),
	CONSTRAINT fk_id_pedido FOREIGN KEY (det_id_pedido) REFERENCES public.pedido(ped_id),
	CONSTRAINT fk_id_producto FOREIGN KEY (det_id_producto) REFERENCES public.producto(pro_id)
);



INSERT INTO public.categoria (cat_nombre,cat_descripcion,image) VALUES
	 ('Burgers','Carne 100% vacuna','assets/burger.svg'),
	 ('Pastas','Pastas y canelones','assets/noodle.svg'),
	 ('Postres','Postres gourmet','assets/cookies.svg'),
	 ('Pizza','Pizza','assets/pizza.svg'),
	 ('Bebidas','Bebidas','assets/cocktail.svg'),
	 ('Helados','helados gourmet con pasion','https://cdn-icons-png.flaticon.com/512/648/648872.png');


INSERT INTO public.comprobante (com_nombre,com_numero_inicial,com_numero_fin,com_cant_digitos,com_serie,com_timbrado,com_fecha_inicio_vigencia,com_fecha_fin_vigencia,com_numero_actual) VALUES
	 ('Factura',100,500,13,'001-001','13354325','2022-10-02','2022-04-02',109),
	 ('Ticket',1,NULL,NULL,'T',NULL,NULL,NULL,17);


INSERT INTO public.detalle_pedido (det_id_pedido,det_id_producto,det_precio_unitario,det_total_parcial,det_cantidad,det_valor_iva,det_total_general,det_iva_porcentaje,det_estado,det_observacion) VALUES
	 (65,3,50000,50000,1,0,50000,0,0,''),
	 (60,3,50000,50000,1,0,50000,0,0,''),
	 (60,1,85000,264559,4,0,264559,0,0,''),
	 (61,1,85000,170000,2,0,170000,0,0,''),
	 (61,3,50000,50000,1,0,50000,0,0,''),
	 (62,3,50000,50000,1,0,50000,0,0,''),
	 (63,3,50000,50000,1,0,50000,0,0,''),
	 (64,3,50000,50000,1,0,50000,0,0,''),
	 (66,4,95000,95000,1,0,95000,0,0,''),
	 (67,3,50000,100000,2,0,100000,0,0,'');
INSERT INTO public.detalle_pedido (det_id_pedido,det_id_producto,det_precio_unitario,det_total_parcial,det_cantidad,det_valor_iva,det_total_general,det_iva_porcentaje,det_estado,det_observacion) VALUES
	 (68,48,35000,35000,1,0,35000,0,0,'');


INSERT INTO public."formaDePago" (fp_descripcion) VALUES
	 ('Efectivo'),
	 ('Tarjeta'),
	 ('Aqui Pago'),
	 ('Bitcoin');


INSERT INTO public.pedido (ped_id_cliente,ped_fecha,ped_id_comprobante,ped_fecha_inicio_vigencia,ped_fecha_fin_vigencia,ped_num_comprobante,ped_timbrado,ped_total_general,ped_estado,gps,ped_pago) VALUES
	 (12,'2022-12-03',1,NULL,NULL,'9',NULL,314559,NULL,'undefined,-54.6057936',1),
	 (12,'2022-12-03',1,NULL,NULL,'10',NULL,220000,NULL,'undefined,-54.6057928',1),
	 (1,'2022-12-05',3,'2022-10-02','2022-04-02','108','13354325',50000,NULL,'undefined,-54.6013184',1),
	 (12,'2022-12-05',1,NULL,NULL,'11',NULL,50000,NULL,'undefined,-54.6013184',1),
	 (1,'2022-12-08',1,NULL,NULL,'12',NULL,50000,NULL,'undefined,-54.6058058',1),
	 (1,'2022-12-08',1,NULL,NULL,'13',NULL,50000,NULL,'undefined,-54.6057905',1),
	 (1,'2022-12-09',1,NULL,NULL,'14',NULL,95000,NULL,'undefined,-54.6057896',1),
	 (1,'2022-12-09',1,NULL,NULL,'15',NULL,100000,NULL,'undefined,-54.6289055',1),
	 (1,'2022-12-09',1,NULL,NULL,'16',NULL,35000,NULL,'undefined,-54.6289182',1);


INSERT INTO public.producto (cat_id,pro_precio,pro_descripcion,pro_iva,image,pro_nombre) VALUES
	 (1,85000,'Fetuccini a la bolognesa',0,'https://thumbs.dreamstime.com/b/spaghetti-bologneze-food-ingredients-58959860.jpg','Fetuccini a la bolognesa'),
	 (1,35000,'con pollo y salsa',NULL,'https://veganwithgusto.com/wp-content/uploads/2021/05/speedy-spaghetti-arrabbiata-featured-e1649949762421.jpg','Spaghetti'),
	 (1,95000,'Ratatouille',0,'https://thumbs.dreamstime.com/b/estofado-vegetal-de-ratatouille-con-calabac%C3%ADn-berenjenas-tomates-ajo-cebolla-y-albahaca-fundici%C3%B3n-hierro-tradicional-157966504.jpg','Ratatouille'),
	 (10,30000,'After Supper Cocktail',0,'https://www.thecocktaildb.com/images/media/drink/quyxwu1483387610.jpg','After Supper Cocktail'),
	 (10,38000,'Daiquiri Helado',0,'https://www.thecocktaildb.com/images/media/drink/7oyrj91504884412.jpg','Daiquiri Helado'),
	 (10,30000,'Rum Toddy',0,'https://www.thecocktaildb.com/images/media/drink/athdk71504886286.jpg','Rum Toddy'),
	 (5,50000,'Hamburguesa de Picaña',0,'https://www.minervafoods.com/wp-content/uploads/2018/08/como_fazer_hamburguer_caseiro_1.jpg','Hamburguesa de Picaña');


INSERT INTO public.usuarios (usu_nombre,usu_telefono,usu_email,usu_password,usu_fecha,usu_imagen,usu_documento,usu_token,usu_rol) VALUES
	 ('pedroAdmin','0982344420','pedro@gmail.com','admin','2022-11-27 00:00:00.000',NULL,'234234234',NULL,'admin'),
	 ('Carlos valdez','12341234123','valdez@mail.com','123456',NULL,'httpsperfilxxx',NULL,NULL,'usuario'),
	 ('pedroAdmin','0982344420','pedro@gmail.com','admin','2022-11-27 00:00:00.000','','234234234',NULL,'admin'),
	 ('Juan Ramon','12341234','ramon@mail.com','123456',NULL,'asdfasdfasdf',NULL,NULL,'usuario'),
	 ('Administrador','0982344420','admin@mail.com','admin','2022-11-27 00:00:00.000','asdfasdfasdfasfd','234234234',NULL,'admin'),
	 ('Usuario tests','0982344420','usuario@mail.com','usuario',NULL,'','234234234','','usuario');
