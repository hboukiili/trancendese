--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg120+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg120+1)

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
-- Name: myschema; Type: SCHEMA; Schema: -; Owner: myuser
--

CREATE SCHEMA myschema;


ALTER SCHEMA myschema OWNER TO myuser;

--
-- Name: MODE; Type: TYPE; Schema: myschema; Owner: myuser
--

CREATE TYPE myschema."MODE" AS ENUM (
    'classic',
    'AI',
    'Friends'
);


ALTER TYPE myschema."MODE" OWNER TO myuser;

--
-- Name: Role; Type: TYPE; Schema: myschema; Owner: myuser
--

CREATE TYPE myschema."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE myschema."Role" OWNER TO myuser;

--
-- Name: notificationType; Type: TYPE; Schema: myschema; Owner: myuser
--

CREATE TYPE myschema."notificationType" AS ENUM (
    'Accepted_request',
    'game_invitation',
    'Achievement',
    'GroupInvitation'
);


ALTER TYPE myschema."notificationType" OWNER TO myuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Friendship; Type: TABLE; Schema: myschema; Owner: myuser
--

CREATE TABLE myschema."Friendship" (
    "FriendshipId" integer NOT NULL,
    "SenderId" text NOT NULL,
    "ReceiverId" text NOT NULL,
    "CreationTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Accepted" boolean DEFAULT false NOT NULL,
    "blockedByReceiver" boolean DEFAULT false NOT NULL,
    "blockedBySender" boolean DEFAULT false NOT NULL
);


ALTER TABLE myschema."Friendship" OWNER TO myuser;

--
-- Name: Friendship_FriendshipId_seq; Type: SEQUENCE; Schema: myschema; Owner: myuser
--

CREATE SEQUENCE myschema."Friendship_FriendshipId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE myschema."Friendship_FriendshipId_seq" OWNER TO myuser;

--
-- Name: Friendship_FriendshipId_seq; Type: SEQUENCE OWNED BY; Schema: myschema; Owner: myuser
--

ALTER SEQUENCE myschema."Friendship_FriendshipId_seq" OWNED BY myschema."Friendship"."FriendshipId";


--
-- Name: Game; Type: TABLE; Schema: myschema; Owner: myuser
--

CREATE TABLE myschema."Game" (
    "GameId" integer NOT NULL,
    "PlayerId1" text NOT NULL,
    "PlayerId2" text NOT NULL,
    "isDraw" boolean DEFAULT false NOT NULL,
    "Rounds" integer NOT NULL,
    "Mode" myschema."MODE" NOT NULL,
    "CreationTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "WinnerId" text,
    "WinnerXP" integer,
    "looserXP" integer
);


ALTER TABLE myschema."Game" OWNER TO myuser;

--
-- Name: Game_GameId_seq; Type: SEQUENCE; Schema: myschema; Owner: myuser
--

CREATE SEQUENCE myschema."Game_GameId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE myschema."Game_GameId_seq" OWNER TO myuser;

--
-- Name: Game_GameId_seq; Type: SEQUENCE OWNED BY; Schema: myschema; Owner: myuser
--

ALTER SEQUENCE myschema."Game_GameId_seq" OWNED BY myschema."Game"."GameId";


--
-- Name: Membership; Type: TABLE; Schema: myschema; Owner: myuser
--

CREATE TABLE myschema."Membership" (
    "GroupId" integer NOT NULL,
    "RoomId" integer NOT NULL,
    "UserId" text NOT NULL,
    "isBanned" boolean NOT NULL,
    "isMuted" boolean NOT NULL,
    "CreationTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Role" myschema."Role" DEFAULT 'USER'::myschema."Role" NOT NULL
);


ALTER TABLE myschema."Membership" OWNER TO myuser;

--
-- Name: Membership_GroupId_seq; Type: SEQUENCE; Schema: myschema; Owner: myuser
--

CREATE SEQUENCE myschema."Membership_GroupId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE myschema."Membership_GroupId_seq" OWNER TO myuser;

--
-- Name: Membership_GroupId_seq; Type: SEQUENCE OWNED BY; Schema: myschema; Owner: myuser
--

ALTER SEQUENCE myschema."Membership_GroupId_seq" OWNED BY myschema."Membership"."GroupId";


--
-- Name: Message; Type: TABLE; Schema: myschema; Owner: myuser
--

CREATE TABLE myschema."Message" (
    "MessageId" integer NOT NULL,
    "RoomId" integer NOT NULL,
    "UserId" text NOT NULL,
    "Content" text NOT NULL,
    "SendTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE myschema."Message" OWNER TO myuser;

--
-- Name: Message_MessageId_seq; Type: SEQUENCE; Schema: myschema; Owner: myuser
--

CREATE SEQUENCE myschema."Message_MessageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE myschema."Message_MessageId_seq" OWNER TO myuser;

--
-- Name: Message_MessageId_seq; Type: SEQUENCE OWNED BY; Schema: myschema; Owner: myuser
--

ALTER SEQUENCE myschema."Message_MessageId_seq" OWNED BY myschema."Message"."MessageId";


--
-- Name: Notification; Type: TABLE; Schema: myschema; Owner: myuser
--

CREATE TABLE myschema."Notification" (
    "NotificationId" integer NOT NULL,
    "CreationTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isRead" boolean NOT NULL,
    "Type" myschema."notificationType" NOT NULL,
    "receiverId" text NOT NULL,
    "senderId" text NOT NULL
);


ALTER TABLE myschema."Notification" OWNER TO myuser;

--
-- Name: Notification_NotificationId_seq; Type: SEQUENCE; Schema: myschema; Owner: myuser
--

CREATE SEQUENCE myschema."Notification_NotificationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE myschema."Notification_NotificationId_seq" OWNER TO myuser;

--
-- Name: Notification_NotificationId_seq; Type: SEQUENCE OWNED BY; Schema: myschema; Owner: myuser
--

ALTER SEQUENCE myschema."Notification_NotificationId_seq" OWNED BY myschema."Notification"."NotificationId";


--
-- Name: Room; Type: TABLE; Schema: myschema; Owner: myuser
--

CREATE TABLE myschema."Room" (
    "RoomId" integer NOT NULL,
    "RoomNAme" text NOT NULL,
    "CreationTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updateTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ischannel boolean NOT NULL,
    "Password" text NOT NULL
);


ALTER TABLE myschema."Room" OWNER TO myuser;

--
-- Name: Room_RoomId_seq; Type: SEQUENCE; Schema: myschema; Owner: myuser
--

CREATE SEQUENCE myschema."Room_RoomId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE myschema."Room_RoomId_seq" OWNER TO myuser;

--
-- Name: Room_RoomId_seq; Type: SEQUENCE OWNED BY; Schema: myschema; Owner: myuser
--

ALTER SEQUENCE myschema."Room_RoomId_seq" OWNED BY myschema."Room"."RoomId";


--
-- Name: User; Type: TABLE; Schema: myschema; Owner: myuser
--

CREATE TABLE myschema."User" (
    "FA_On" boolean,
    "FAsecret" text,
    "FullName" text NOT NULL,
    "UserId" text NOT NULL,
    "XP" integer DEFAULT 0,
    avatar text NOT NULL,
    badge text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    level integer DEFAULT 0,
    status boolean DEFAULT true NOT NULL
);


ALTER TABLE myschema."User" OWNER TO myuser;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: myschema; Owner: myuser
--

CREATE TABLE myschema._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE myschema._prisma_migrations OWNER TO myuser;

--
-- Name: achievement; Type: TABLE; Schema: myschema; Owner: myuser
--

CREATE TABLE myschema.achievement (
    "badgesId" integer NOT NULL,
    "UserId" text NOT NULL,
    "First_Blood" boolean DEFAULT false NOT NULL,
    "Shutout" boolean DEFAULT false NOT NULL,
    "Unstoppable" boolean DEFAULT false NOT NULL,
    "Invincible" boolean DEFAULT false NOT NULL,
    "Legend" boolean DEFAULT false NOT NULL,
    "Lets_Play" boolean DEFAULT false NOT NULL,
    "Rookie" boolean DEFAULT false NOT NULL
);


ALTER TABLE myschema.achievement OWNER TO myuser;

--
-- Name: achievement_badgesId_seq; Type: SEQUENCE; Schema: myschema; Owner: myuser
--

CREATE SEQUENCE myschema."achievement_badgesId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE myschema."achievement_badgesId_seq" OWNER TO myuser;

--
-- Name: achievement_badgesId_seq; Type: SEQUENCE OWNED BY; Schema: myschema; Owner: myuser
--

ALTER SEQUENCE myschema."achievement_badgesId_seq" OWNED BY myschema.achievement."badgesId";


--
-- Name: Friendship FriendshipId; Type: DEFAULT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Friendship" ALTER COLUMN "FriendshipId" SET DEFAULT nextval('myschema."Friendship_FriendshipId_seq"'::regclass);


--
-- Name: Game GameId; Type: DEFAULT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Game" ALTER COLUMN "GameId" SET DEFAULT nextval('myschema."Game_GameId_seq"'::regclass);


--
-- Name: Membership GroupId; Type: DEFAULT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Membership" ALTER COLUMN "GroupId" SET DEFAULT nextval('myschema."Membership_GroupId_seq"'::regclass);


--
-- Name: Message MessageId; Type: DEFAULT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Message" ALTER COLUMN "MessageId" SET DEFAULT nextval('myschema."Message_MessageId_seq"'::regclass);


--
-- Name: Notification NotificationId; Type: DEFAULT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Notification" ALTER COLUMN "NotificationId" SET DEFAULT nextval('myschema."Notification_NotificationId_seq"'::regclass);


--
-- Name: Room RoomId; Type: DEFAULT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Room" ALTER COLUMN "RoomId" SET DEFAULT nextval('myschema."Room_RoomId_seq"'::regclass);


--
-- Name: achievement badgesId; Type: DEFAULT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema.achievement ALTER COLUMN "badgesId" SET DEFAULT nextval('myschema."achievement_badgesId_seq"'::regclass);


--
-- Data for Name: Friendship; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Friendship" ("FriendshipId", "SenderId", "ReceiverId", "CreationTime", "Accepted", "blockedByReceiver", "blockedBySender") FROM stdin;
9	98937	98879	2023-07-21 21:21:14.942	t	f	f
\.


--
-- Data for Name: Game; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Game" ("GameId", "PlayerId1", "PlayerId2", "isDraw", "Rounds", "Mode", "CreationTime", "WinnerId", "WinnerXP", "looserXP") FROM stdin;
2	99035	98879	t	0	classic	2023-07-21 22:17:51.73	\N	3	3
1	98879	102109265031908659149	f	0	classic	2023-07-21 22:17:11.467	98879	5	2
\.


--
-- Data for Name: Membership; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Membership" ("GroupId", "RoomId", "UserId", "isBanned", "isMuted", "CreationTime", "Role") FROM stdin;
\.


--
-- Data for Name: Message; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Message" ("MessageId", "RoomId", "UserId", "Content", "SendTime") FROM stdin;
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Notification" ("NotificationId", "CreationTime", "isRead", "Type", "receiverId", "senderId") FROM stdin;
1	2023-07-21 20:54:10.158	f	Accepted_request	99045	98937
2	2023-07-21 20:56:11.868	f	Accepted_request	99045	98937
3	2023-07-21 20:58:13.607	f	Accepted_request	99045	98937
4	2023-07-21 20:58:39.922	f	Accepted_request	99045	98937
5	2023-07-21 21:26:20.388	f	Accepted_request	99045	98937
6	2023-07-21 21:53:36.186	f	Accepted_request	99035	98937
7	2023-07-21 21:54:00.299	f	Accepted_request	99035	98937
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Room" ("RoomId", "RoomNAme", "CreationTime", "updateTime", ischannel, "Password") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."User" ("FA_On", "FAsecret", "FullName", "UserId", "XP", avatar, badge, "createdAt", username, email, level, status) FROM stdin;
f	\N	Hemza Boukili	102109265031908659149	0	https://lh3.googleusercontent.com/a/AAcHTtdNd_EGpv6Wsgbog6OUTj4LGJkSi6SsHnTw6MHqND15=s96-c	\N	2023-07-21 04:22:46.114	HBoukili102	hm.boukiili97@gmail.com	0	f
f	\N	Taha Chtaibi	98879	0	https://cdn.intra.42.fr/users/6a2c03ee95b681acca46263bcfa2e850/medium_tchtaibi.jpg	\N	2023-07-21 04:23:28.008	tchtaibi	tchtaibi@student.1337.ma	0	f
f	LEMVM7SSM45HUJRL	Ali Aizza	99035	0	/uploads/aaizza-255583220_10226316804975754_3750406338831950973_n.jpeg	\N	2023-07-21 21:53:04.547	aaizza	aaizza@student.1337.ma	0	f
f	\N	Mostapha Moutawakil	99046	0	/uploads/mmoutawa-Image_created_with_a_mobile_phone.png	\N	2023-07-21 22:03:18.831	mmoutawa	mmoutawa@student.1337.ma	0	t
f	\N	Hamza Boukili	98937	0	https://cdn.intra.42.fr/users/505cbe5d91097ae88576c9ad5b38b66b/medium_hboukili.jpg	\N	2023-07-21 04:45:37.456	hboukili	hboukili@student.1337.ma	0	t
f	\N	Saber Choukoukou	99045	0	https://cdn.intra.42.fr/users/16a8917f3a4b43161e770e46b7b1f65f/medium_schoukou.jpg	\N	2023-07-21 04:23:59.892	schoukou	schoukou@student.1337.ma	0	f
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
2848ffc5-f7e5-44e9-8dab-8a527d7f887b	3de9e0465a22932a5a941f8f9a96591ac8be6d3e3bcbd66871fde9b0902d33c0	2023-07-21 04:21:49.642667+00	20230605014623_init	\N	\N	2023-07-21 04:21:49.462473+00	1
8678d1a4-d045-4b17-a541-97b696ddb357	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	2023-07-21 04:21:50.806508+00	20230621005732_	\N	\N	2023-07-21 04:21:50.801363+00	1
cd409e15-d78f-4d16-892f-f051e6abecff	73775d652cbf41bdb0e3f78e17d8384e59e5d6db181ad54fa083f541b794170e	2023-07-21 04:21:50.005393+00	20230606012335_init	\N	\N	2023-07-21 04:21:49.646673+00	1
d936438d-779a-425f-9b48-08c63ca2794a	702b130e5eca3759bce1db90771a35c30d93d9e231de0443e412dba02b5625a0	2023-07-21 04:21:50.029902+00	20230607160915_myschema	\N	\N	2023-07-21 04:21:50.008846+00	1
e43f12f4-64f2-471b-a3be-1d8eebb5762d	d9ed2071d3fab89fd889844819ce75bfcecd956ee50398f99f3201ae7ee2c6e3	2023-07-21 04:21:50.042088+00	20230612035255_add_refresh_token	\N	\N	2023-07-21 04:21:50.033036+00	1
8c105cc8-c0a4-4b8f-88af-a5620b5229a9	4d3a7370c271cd0d551d9a189326709d0174d321071c77cf362bd9aa0a7beff5	2023-07-21 04:21:50.817516+00	20230621040514_myschema	\N	\N	2023-07-21 04:21:50.809478+00	1
650fa35f-eaf2-48e6-9fa1-e0ca900190c1	a80b09589dd758339dcab5acb4ffafe7ebb93cd01305ae778f262e4dd5ffe93b	2023-07-21 04:21:50.060068+00	20230614041123_myschema3	\N	\N	2023-07-21 04:21:50.044403+00	1
1331b83f-bc48-4303-ac00-685d453a931a	e09e80a658298fed832d8739f36b2fc6b93b927537dc1d5e6e380211e5ce0a7c	2023-07-21 04:21:50.078692+00	20230615144243_myschema	\N	\N	2023-07-21 04:21:50.064057+00	1
c1b1213e-c6cd-4eb2-a889-941e68f7d9b7	c9639cce7c2f81e619889982e7162f2c880cb0aafbdf2283a8dc1b74f4b39144	2023-07-21 04:21:50.366038+00	20230616025120_myschema	\N	\N	2023-07-21 04:21:50.080593+00	1
cb3e3cba-d536-4fe4-9674-2e00d166c062	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	2023-07-21 04:21:50.828217+00	20230622162812_	\N	\N	2023-07-21 04:21:50.820463+00	1
ce104ee5-2ec4-43d4-a787-d0919dd87fcf	8f99884738269262fadc163f0f98b49aed7b40e512b2791a36bc4353307044d7	2023-07-21 04:21:50.7166+00	20230616025402_myschema	\N	\N	2023-07-21 04:21:50.367607+00	1
2e83c2b2-75be-418e-9af5-ef18ab6b7786	787d9b130656e80a016a2b0d5b020f8fe8a77d3704b6d7b5b63c3284f1f16c74	2023-07-21 04:21:50.734022+00	20230616210218_myschema	\N	\N	2023-07-21 04:21:50.718375+00	1
e5cea224-e32e-421b-9e01-6c42c67b66a8	5f05f7c56b7c1ffaadd563c52fe7b0428bc9c4e5736b5164498676e56eda61f8	2023-07-21 04:21:50.750063+00	20230616210702_myschema	\N	\N	2023-07-21 04:21:50.736798+00	1
3a3520d5-d6aa-43fa-a7ea-78f4bf1c2dc6	984121ae2964a396a8983ca248cb7e7c676860426b59baededf38c894953cc3a	2023-07-21 04:21:50.838965+00	20230714024421_upload	\N	\N	2023-07-21 04:21:50.831384+00	1
5729857c-0f2f-4109-b259-d35f257785a8	aafcadbd9f2d10d57bc2329e150a599200073018610830e66beb8fbca1656aa7	2023-07-21 04:21:50.760647+00	20230619212304_myschema	\N	\N	2023-07-21 04:21:50.751897+00	1
d13cf01c-1627-43e0-8fe6-007d11a6853f	d2280109a126d706db9174e4cada49c0b3863d0484e3928bb3c576ada6e12e34	2023-07-21 04:21:50.769657+00	20230620192424_	\N	\N	2023-07-21 04:21:50.763101+00	1
200f28f6-6393-4596-ad1e-cc92d7117bb3	c1aa1358ec56c0013ebe7f251f27d499e447d19b7e4b3730ecff983b0b9fa0f6	2023-07-21 04:21:50.787705+00	20230620221832_myschema	\N	\N	2023-07-21 04:21:50.772706+00	1
1b562fb0-4a6f-4a45-ae82-6a016431ad90	068d005119b4597553418795bb96d617cd6a0f5a9a3fc6b8333841dc300a14a8	2023-07-21 04:21:50.855003+00	20230714201412_no_upload	\N	\N	2023-07-21 04:21:50.844788+00	1
5e64c1dc-23f0-4d55-aebf-604eefe65541	2974e88ad1fc9cc74d81ac94506fc808377daeb0f39795d72d848b9fe2d10908	2023-07-21 04:21:50.799447+00	20230621001326_myschema	\N	\N	2023-07-21 04:21:50.789714+00	1
41ddbf27-000a-4b59-8cf3-86ae991211fa	01e0b2a14abb44e7c814895475022d7c271f3245d757a60e9ae351a9d93a8db4	2023-07-21 04:21:50.936856+00	20230716231216_asa	\N	\N	2023-07-21 04:21:50.857107+00	1
c717763d-d992-446e-b00f-a5c6663c000c	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	2023-07-21 04:21:50.945629+00	20230716232153_myschema	\N	\N	2023-07-21 04:21:50.940236+00	1
f200acb8-b83a-4ae5-b980-274dd5bc28be	85c2d05fb5a927488d25a7d4c4bfea85ae8901cef78b08f5b5598c9dff6fd23b	2023-07-21 04:21:51.002661+00	20230718022451_	\N	\N	2023-07-21 04:21:50.948624+00	1
f702d3f8-5ed1-44d2-b792-37f5fd3d8bf5	d312965018e023d80195b743ea6b9b5a8670d70f8fd9aa3516cc5d83f15e88ca	2023-07-21 04:21:51.09167+00	20230721041423_achievement	\N	\N	2023-07-21 04:21:51.004684+00	1
\.


--
-- Data for Name: achievement; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema.achievement ("badgesId", "UserId", "First_Blood", "Shutout", "Unstoppable", "Invincible", "Legend", "Lets_Play", "Rookie") FROM stdin;
2	98937	f	f	f	f	f	f	f
3	99035	f	f	f	f	f	f	f
4	99046	f	f	f	f	f	f	f
\.


--
-- Name: Friendship_FriendshipId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Friendship_FriendshipId_seq"', 12, true);


--
-- Name: Game_GameId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Game_GameId_seq"', 2, true);


--
-- Name: Membership_GroupId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Membership_GroupId_seq"', 1, false);


--
-- Name: Message_MessageId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Message_MessageId_seq"', 1, false);


--
-- Name: Notification_NotificationId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Notification_NotificationId_seq"', 7, true);


--
-- Name: Room_RoomId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Room_RoomId_seq"', 1, false);


--
-- Name: achievement_badgesId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."achievement_badgesId_seq"', 4, true);


--
-- Name: Friendship Friendship_pkey; Type: CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Friendship"
    ADD CONSTRAINT "Friendship_pkey" PRIMARY KEY ("FriendshipId");


--
-- Name: Game Game_pkey; Type: CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Game"
    ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("GameId");


--
-- Name: Membership Membership_pkey; Type: CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Membership"
    ADD CONSTRAINT "Membership_pkey" PRIMARY KEY ("GroupId");


--
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("MessageId");


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("NotificationId");


--
-- Name: Room Room_pkey; Type: CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Room"
    ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("RoomId");


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("UserId");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: achievement achievement_pkey; Type: CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema.achievement
    ADD CONSTRAINT achievement_pkey PRIMARY KEY ("badgesId");


--
-- Name: User_email_key; Type: INDEX; Schema: myschema; Owner: myuser
--

CREATE UNIQUE INDEX "User_email_key" ON myschema."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: myschema; Owner: myuser
--

CREATE UNIQUE INDEX "User_username_key" ON myschema."User" USING btree (username);


--
-- Name: achievement_UserId_key; Type: INDEX; Schema: myschema; Owner: myuser
--

CREATE UNIQUE INDEX "achievement_UserId_key" ON myschema.achievement USING btree ("UserId");


--
-- Name: Friendship Friendship_ReceiverId_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Friendship"
    ADD CONSTRAINT "Friendship_ReceiverId_fkey" FOREIGN KEY ("ReceiverId") REFERENCES myschema."User"("UserId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Friendship Friendship_SenderId_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Friendship"
    ADD CONSTRAINT "Friendship_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES myschema."User"("UserId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Game Game_PlayerId1_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Game"
    ADD CONSTRAINT "Game_PlayerId1_fkey" FOREIGN KEY ("PlayerId1") REFERENCES myschema."User"("UserId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Game Game_PlayerId2_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Game"
    ADD CONSTRAINT "Game_PlayerId2_fkey" FOREIGN KEY ("PlayerId2") REFERENCES myschema."User"("UserId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Game Game_WinnerId_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Game"
    ADD CONSTRAINT "Game_WinnerId_fkey" FOREIGN KEY ("WinnerId") REFERENCES myschema."User"("UserId") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Membership Membership_RoomId_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Membership"
    ADD CONSTRAINT "Membership_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES myschema."Room"("RoomId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Membership Membership_UserId_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Membership"
    ADD CONSTRAINT "Membership_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES myschema."User"("UserId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Message Message_RoomId_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Message"
    ADD CONSTRAINT "Message_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES myschema."Room"("RoomId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Message Message_UserId_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Message"
    ADD CONSTRAINT "Message_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES myschema."User"("UserId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Notification Notification_receiverId_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Notification"
    ADD CONSTRAINT "Notification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES myschema."User"("UserId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Notification Notification_senderId_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Notification"
    ADD CONSTRAINT "Notification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES myschema."User"("UserId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: achievement achievement_UserId_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema.achievement
    ADD CONSTRAINT "achievement_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES myschema."User"("UserId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

