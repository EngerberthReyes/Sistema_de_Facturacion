PGDMP      )                {            sistemadefacturacionalp_2    15.3    16.0 -    *           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            +           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ,           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            -           1262    33097    sistemadefacturacionalp_2    DATABASE     �   CREATE DATABASE sistemadefacturacionalp_2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
 )   DROP DATABASE sistemadefacturacionalp_2;
                postgres    false            �            1259    33105    factura    TABLE     �  CREATE TABLE public.factura (
    id_factura bigint NOT NULL,
    nombre_de_usuario character varying(32) NOT NULL,
    nombre_de_cliente character varying(32) NOT NULL,
    cedula_de_cliente integer NOT NULL,
    codigo_de_producto character varying(773) NOT NULL,
    nombre_de_producto character varying(773) NOT NULL,
    precio_de_producto integer NOT NULL,
    fecha_de_registro timestamp with time zone DEFAULT date_trunc('second'::text, '2023-10-18 14:29:27.964043'::timestamp without time zone) NOT NULL,
    metodo_de_pago character varying(32) NOT NULL,
    total double precision NOT NULL,
    cantidad_de_producto integer NOT NULL
);
    DROP TABLE public.factura;
       public         heap    postgres    false            �            1259    33110    Factura_idFactura_seq    SEQUENCE     �   CREATE SEQUENCE public."Factura_idFactura_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Factura_idFactura_seq";
       public          postgres    false    215            .           0    0    Factura_idFactura_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public."Factura_idFactura_seq" OWNED BY public.factura.id_factura;
          public          postgres    false    216            �            1259    33098    cliente    TABLE       CREATE TABLE public.cliente (
    cedula_de_cliente integer NOT NULL,
    nombre character varying(32) NOT NULL,
    apellido character varying(32) NOT NULL,
    telefono bigint NOT NULL,
    nacionalidad character varying(1) NOT NULL,
    id_cliente integer NOT NULL
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    73921    cliente_id_cliente_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_cliente_seq;
       public          postgres    false    214            /           0    0    cliente_id_cliente_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_cliente_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    225            �            1259    49391    cliente_id_usuario_fk_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_usuario_fk_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.cliente_id_usuario_fk_seq;
       public          postgres    false            �            1259    65746    cliente_usuario    TABLE     }  CREATE TABLE public.cliente_usuario (
    fk_id_usuario integer NOT NULL,
    nombre_de_usuario character varying(64) NOT NULL,
    fk_cedula_de_cliente integer NOT NULL,
    nombre_de_cliente character varying(64) NOT NULL,
    fecha_de_facturacion timestamp with time zone DEFAULT date_trunc('second'::text, '2023-10-18 14:29:27.964043'::timestamp without time zone) NOT NULL
);
 #   DROP TABLE public.cliente_usuario;
       public         heap    postgres    false            �            1259    65745 (   cliente_usuario_fk_cedula_de_cliente_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_usuario_fk_cedula_de_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.cliente_usuario_fk_cedula_de_cliente_seq;
       public          postgres    false    224            0           0    0 (   cliente_usuario_fk_cedula_de_cliente_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.cliente_usuario_fk_cedula_de_cliente_seq OWNED BY public.cliente_usuario.fk_cedula_de_cliente;
          public          postgres    false    223            �            1259    65744 !   cliente_usuario_fk_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_usuario_fk_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.cliente_usuario_fk_id_usuario_seq;
       public          postgres    false    224            1           0    0 !   cliente_usuario_fk_id_usuario_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.cliente_usuario_fk_id_usuario_seq OWNED BY public.cliente_usuario.fk_id_usuario;
          public          postgres    false    222            �            1259    57539    factura_id_factura_seq    SEQUENCE        CREATE SEQUENCE public.factura_id_factura_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.factura_id_factura_seq;
       public          postgres    false            �            1259    33111    producto    TABLE     �   CREATE TABLE public.producto (
    codigo character varying(8) NOT NULL,
    nombre_de_producto character varying(32) NOT NULL,
    precio_de_producto integer NOT NULL,
    url_imagen character varying(256)
);
    DROP TABLE public.producto;
       public         heap    postgres    false            �            1259    33196    usuario    TABLE     v   CREATE TABLE public.usuario (
    id_usuario bigint NOT NULL,
    nombre_de_usuario character varying(32) NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    33199    usuario_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.usuario_id_usuario_seq;
       public          postgres    false    218            2           0    0    usuario_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;
          public          postgres    false    219            {           2604    73922    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_cliente_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    225    214                       2604    65749    cliente_usuario fk_id_usuario    DEFAULT     �   ALTER TABLE ONLY public.cliente_usuario ALTER COLUMN fk_id_usuario SET DEFAULT nextval('public.cliente_usuario_fk_id_usuario_seq'::regclass);
 L   ALTER TABLE public.cliente_usuario ALTER COLUMN fk_id_usuario DROP DEFAULT;
       public          postgres    false    222    224    224            �           2604    65750 $   cliente_usuario fk_cedula_de_cliente    DEFAULT     �   ALTER TABLE ONLY public.cliente_usuario ALTER COLUMN fk_cedula_de_cliente SET DEFAULT nextval('public.cliente_usuario_fk_cedula_de_cliente_seq'::regclass);
 S   ALTER TABLE public.cliente_usuario ALTER COLUMN fk_cedula_de_cliente DROP DEFAULT;
       public          postgres    false    223    224    224            |           2604    33123    factura id_factura    DEFAULT     y   ALTER TABLE ONLY public.factura ALTER COLUMN id_factura SET DEFAULT nextval('public."Factura_idFactura_seq"'::regclass);
 A   ALTER TABLE public.factura ALTER COLUMN id_factura DROP DEFAULT;
       public          postgres    false    216    215            ~           2604    49406    usuario id_usuario    DEFAULT     x   ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);
 A   ALTER TABLE public.usuario ALTER COLUMN id_usuario DROP DEFAULT;
       public          postgres    false    219    218                      0    33098    cliente 
   TABLE DATA           j   COPY public.cliente (cedula_de_cliente, nombre, apellido, telefono, nacionalidad, id_cliente) FROM stdin;
    public          postgres    false    214   8       &          0    65746    cliente_usuario 
   TABLE DATA           �   COPY public.cliente_usuario (fk_id_usuario, nombre_de_usuario, fk_cedula_de_cliente, nombre_de_cliente, fecha_de_facturacion) FROM stdin;
    public          postgres    false    224   18                 0    33105    factura 
   TABLE DATA           �   COPY public.factura (id_factura, nombre_de_usuario, nombre_de_cliente, cedula_de_cliente, codigo_de_producto, nombre_de_producto, precio_de_producto, fecha_de_registro, metodo_de_pago, total, cantidad_de_producto) FROM stdin;
    public          postgres    false    215   N8                 0    33111    producto 
   TABLE DATA           ^   COPY public.producto (codigo, nombre_de_producto, precio_de_producto, url_imagen) FROM stdin;
    public          postgres    false    217   k8                  0    33196    usuario 
   TABLE DATA           @   COPY public.usuario (id_usuario, nombre_de_usuario) FROM stdin;
    public          postgres    false    218   �8       3           0    0    Factura_idFactura_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Factura_idFactura_seq"', 82, true);
          public          postgres    false    216            4           0    0    cliente_id_cliente_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cliente_id_cliente_seq', 1, false);
          public          postgres    false    225            5           0    0    cliente_id_usuario_fk_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.cliente_id_usuario_fk_seq', 1, false);
          public          postgres    false    220            6           0    0 (   cliente_usuario_fk_cedula_de_cliente_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.cliente_usuario_fk_cedula_de_cliente_seq', 1, false);
          public          postgres    false    223            7           0    0 !   cliente_usuario_fk_id_usuario_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.cliente_usuario_fk_id_usuario_seq', 1, false);
          public          postgres    false    222            8           0    0    factura_id_factura_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.factura_id_factura_seq', 1, false);
          public          postgres    false    221            9           0    0    usuario_id_usuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 7, true);
          public          postgres    false    219            �           2606    33128    cliente Cliente_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "Cliente_pkey" PRIMARY KEY (cedula_de_cliente);
 @   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "Cliente_pkey";
       public            postgres    false    214            �           2606    33130    factura Factura_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT "Factura_pkey" PRIMARY KEY (id_factura);
 @   ALTER TABLE ONLY public.factura DROP CONSTRAINT "Factura_pkey";
       public            postgres    false    215            �           2606    33132    producto Producto_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT "Producto_pkey" PRIMARY KEY (codigo);
 B   ALTER TABLE ONLY public.producto DROP CONSTRAINT "Producto_pkey";
       public            postgres    false    217            �           2606    49443 !   factura nombre_de_producto_unique 
   CONSTRAINT     j   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT nombre_de_producto_unique UNIQUE (nombre_de_producto);
 K   ALTER TABLE ONLY public.factura DROP CONSTRAINT nombre_de_producto_unique;
       public            postgres    false    215            �           2606    49408    usuario usuario_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    218            �           2606    65751 4   cliente_usuario fk_cliente_usuario_cedula_de_cliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_usuario
    ADD CONSTRAINT fk_cliente_usuario_cedula_de_cliente FOREIGN KEY (fk_cedula_de_cliente) REFERENCES public.cliente(cedula_de_cliente);
 ^   ALTER TABLE ONLY public.cliente_usuario DROP CONSTRAINT fk_cliente_usuario_cedula_de_cliente;
       public          postgres    false    3203    214    224            �           2606    65756 -   cliente_usuario fk_cliente_usuario_id_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_usuario
    ADD CONSTRAINT fk_cliente_usuario_id_usuario FOREIGN KEY (fk_id_usuario) REFERENCES public.usuario(id_usuario);
 W   ALTER TABLE ONLY public.cliente_usuario DROP CONSTRAINT fk_cliente_usuario_id_usuario;
       public          postgres    false    3211    218    224                  x������ � �      &      x������ � �            x������ � �            x������ � �             x������ � �     