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
    'friendship_request',
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
    "UserId" text NOT NULL,
    "CreationTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "isRead" boolean NOT NULL,
    "Type" myschema."notificationType" NOT NULL
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
    draw integer DEFAULT 0,
    loss integer DEFAULT 0,
    username text NOT NULL,
    win integer DEFAULT 0,
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
-- Data for Name: Friendship; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Friendship" ("FriendshipId", "SenderId", "ReceiverId", "CreationTime", "Accepted", "blockedByReceiver", "blockedBySender") FROM stdin;
7	99045	99046	2023-06-21 20:44:23.771	t	f	f
11	94426	99045	2023-06-23 02:00:47.511	t	f	f
13	98937	102109265031908659149	2023-06-23 02:14:29.387	f	f	f
5	94426	99046	2023-06-21 01:42:56.482	t	t	f
29	98935	98937	2023-06-25 01:20:55.095	t	f	t
21	98937	94426	2023-06-23 22:25:59.677	t	f	f
6	98937	99046	2023-06-21 03:47:30.687	f	f	f
24	98937	99045	2023-06-24 02:31:58.182	t	f	f
\.


--
-- Data for Name: Game; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Game" ("GameId", "PlayerId1", "PlayerId2", "isDraw", "Rounds", "Mode", "CreationTime", "WinnerId", "WinnerXP", "looserXP") FROM stdin;
3	94426	99046	f	0	classic	2023-06-21 21:33:22.234	94426	\N	\N
2	99045	94426	f	7	classic	2023-06-21 21:03:58.762	94426	5	2
4	98937	99045	t	0	classic	2023-06-22 00:56:17.109	\N	\N	\N
1	98937	99046	f	8	Friends	2023-06-21 02:26:10.599	98937	5	3
5	98937	94426	f	0	classic	2023-06-25 01:28:01.133	94426	\N	\N
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

COPY myschema."Notification" ("NotificationId", "UserId", "CreationTime", "isRead", "Type") FROM stdin;
2	94426	2023-06-21 00:47:08.188	f	friendship_request
3	99046	2023-06-21 03:47:30.768	f	friendship_request
4	94426	2023-06-21 20:44:47.167	f	friendship_request
5	99045	2023-06-23 01:52:56.279	f	friendship_request
6	99045	2023-06-23 01:56:26.446	f	friendship_request
7	99045	2023-06-23 02:02:01.294	f	friendship_request
8	99045	2023-06-23 02:42:44.929	f	friendship_request
9	99045	2023-06-23 02:43:48.601	f	friendship_request
10	99045	2023-06-23 02:44:43.336	f	friendship_request
11	99045	2023-06-23 02:59:58.468	f	friendship_request
12	99045	2023-06-23 03:21:01.748	f	friendship_request
13	99045	2023-06-23 03:23:49.155	f	friendship_request
14	94426	2023-06-23 22:25:59.92	f	friendship_request
15	99045	2023-06-23 22:26:04.311	f	friendship_request
16	99045	2023-06-24 01:57:11.074	f	friendship_request
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Room" ("RoomId", "RoomNAme", "CreationTime", "updateTime", ischannel, "Password") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."User" ("FA_On", "FAsecret", "FullName", "UserId", "XP", avatar, badge, "createdAt", draw, loss, username, win, email, level, status) FROM stdin;
f	\N	Hemza Boukili	102109265031908659149	0	https://lh3.googleusercontent.com/a/AAcHTtcOLwG8AnR1BrDETLYZUhCil4bH9Qp_evIpV6Pc=s96-c	\N	2023-06-20 23:51:12.474	0	0	HBoukili88	0	hm.boukiili97@gmail.com	0	t
f	\N	Mostapha Moutawakil	99046	0	https://cdn.intra.42.fr/users/6f17239eaa4c09503310349bc50e6328/medium_mmoutawa.jpg	\N	2023-06-21 00:07:52.346	0	0	mmoutawa	0	mmoutawa@student.1337.ma	0	t
f	\N	Chaimaa El Mhandez	94426	400	https://cdn.intra.42.fr/users/5ed2e6c1c785228db8440fdc0bf40445/medium_cel-mhan.jpg	\N	2023-06-21 00:22:29.506	0	0	cel-mhan	0	cel-mhan@student.1337.ma	4	t
f	\N	Saber Choukoukou	99045	2400	https://cdn.intra.42.fr/users/16a8917f3a4b43161e770e46b7b1f65f/medium_schoukou.jpg	\N	2023-06-21 20:42:57.501	0	0	schoukou	0	schoukou@student.1337.ma	12	t
f	\N	Hamza Boukili	98937	180	https://scontent.fcmn1-2.fna.fbcdn.net/v/t39.30808-6/255583220_10226316804975754_3750406338831950973_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeE22dDF8gCo47zp5DUss_Wzj0R9ECaVDh2PRH0QJpUOHd4F4izYeYpscJwLnHrZDT8&_nc_ohc=v9IPn53IQGoAX_4WWGK&_nc_ht=scontent.fcmn1-2.fna&oh=00_AfCRhBZY2FPYwFGpR3I4iqzypnjw-aNtCiwsAFl4DzcwwA&oe=6498AD4C	\N	2023-06-20 23:36:21.603	1	0	hboukili	1	hboukili@student.1337.ma	0	t
f	\N	Mohamed Aboulhoda	99029	0	https://cdn.intra.42.fr/users/0362e8b618cf17023726d0faade2f322/medium_maboulho.jpg	\N	2023-06-25 02:27:42.416	0	0	maboulho	0	maboulho@student.1337.ma	0	t
f	\N	Yassine Dahni	98935	120	https://cdn.intra.42.fr/users/6a849842d7abd046f5c5cbe6bee8b934/medium_ydahni.jpg	\N	2023-06-24 02:31:12.996	0	0	ydahni	0	ydahni@student.1337.ma	0	t
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ee1a951a-f9b5-4aa8-b4b0-55771516b22a	3de9e0465a22932a5a941f8f9a96591ac8be6d3e3bcbd66871fde9b0902d33c0	2023-06-20 22:18:22.797058+00	20230605014623_init	\N	\N	2023-06-20 22:18:22.591408+00	1
08933f72-69de-4332-9dae-3cc28788be5b	e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855	2023-06-21 04:04:19.197334+00	20230621005732_	\N	\N	2023-06-21 04:04:19.19179+00	1
0ca94048-16aa-47fb-a5db-50ae7fa43068	73775d652cbf41bdb0e3f78e17d8384e59e5d6db181ad54fa083f541b794170e	2023-06-20 22:18:23.044554+00	20230606012335_init	\N	\N	2023-06-20 22:18:22.799278+00	1
a3a862d3-83b2-4371-868e-3e54604c883e	702b130e5eca3759bce1db90771a35c30d93d9e231de0443e412dba02b5625a0	2023-06-20 22:18:23.103605+00	20230607160915_myschema	\N	\N	2023-06-20 22:18:23.085027+00	1
a342bfcb-5790-44fe-af5d-b8a2ad373d52	d9ed2071d3fab89fd889844819ce75bfcecd956ee50398f99f3201ae7ee2c6e3	2023-06-20 22:18:23.127269+00	20230612035255_add_refresh_token	\N	\N	2023-06-20 22:18:23.117678+00	1
80aa6817-bd8d-428b-9f35-5f984425a4db	4d3a7370c271cd0d551d9a189326709d0174d321071c77cf362bd9aa0a7beff5	2023-06-21 04:05:15.036763+00	20230621040514_myschema	\N	\N	2023-06-21 04:05:14.985328+00	1
1d432e90-1f28-4b81-8c97-2f4d4fb38483	a80b09589dd758339dcab5acb4ffafe7ebb93cd01305ae778f262e4dd5ffe93b	2023-06-20 22:18:23.154082+00	20230614041123_myschema3	\N	\N	2023-06-20 22:18:23.140991+00	1
832e2caa-029c-4ddb-956e-da82f2719058	e09e80a658298fed832d8739f36b2fc6b93b927537dc1d5e6e380211e5ce0a7c	2023-06-20 22:18:23.188389+00	20230615144243_myschema	\N	\N	2023-06-20 22:18:23.170299+00	1
30cf62e2-7d75-4cb9-9d46-9939b3e12d3d	c9639cce7c2f81e619889982e7162f2c880cb0aafbdf2283a8dc1b74f4b39144	2023-06-20 22:18:23.480199+00	20230616025120_myschema	\N	\N	2023-06-20 22:18:23.205946+00	1
bc0e0a9c-2460-4fb2-984a-55421ac91179	8f99884738269262fadc163f0f98b49aed7b40e512b2791a36bc4353307044d7	2023-06-20 22:18:23.71191+00	20230616025402_myschema	\N	\N	2023-06-20 22:18:23.490648+00	1
6673172b-31d2-46a2-91f0-b0f8998853f6	787d9b130656e80a016a2b0d5b020f8fe8a77d3704b6d7b5b63c3284f1f16c74	2023-06-20 22:18:23.74129+00	20230616210218_myschema	\N	\N	2023-06-20 22:18:23.725285+00	1
3278f55a-0e8e-4a5c-a972-8205a2aa92e0	5f05f7c56b7c1ffaadd563c52fe7b0428bc9c4e5736b5164498676e56eda61f8	2023-06-20 22:18:23.771392+00	20230616210702_myschema	\N	\N	2023-06-20 22:18:23.758765+00	1
fd889e3a-26d3-4909-b77c-6d4eb6c3908e	aafcadbd9f2d10d57bc2329e150a599200073018610830e66beb8fbca1656aa7	2023-06-20 22:18:23.789322+00	20230619212304_myschema	\N	\N	2023-06-20 22:18:23.782659+00	1
ef60757a-36f9-438c-a46b-f30755cce1e3	c1aa1358ec56c0013ebe7f251f27d499e447d19b7e4b3730ecff983b0b9fa0f6	2023-06-20 22:18:32.569558+00	20230620221832_myschema	\N	\N	2023-06-20 22:18:32.562241+00	1
f4f70196-e09f-4461-aaac-30e1e2a0111d	2974e88ad1fc9cc74d81ac94506fc808377daeb0f39795d72d848b9fe2d10908	2023-06-21 00:13:26.166418+00	20230621001326_myschema	\N	\N	2023-06-21 00:13:26.121721+00	1
1096465f-96c6-490d-a2d3-e16c04ae2da4	d2280109a126d706db9174e4cada49c0b3863d0484e3928bb3c576ada6e12e34	2023-06-21 04:04:19.189796+00	20230620192424_	\N	\N	2023-06-21 04:04:19.145006+00	1
\.


--
-- Name: Friendship_FriendshipId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Friendship_FriendshipId_seq"', 29, true);


--
-- Name: Game_GameId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Game_GameId_seq"', 5, true);


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

SELECT pg_catalog.setval('myschema."Notification_NotificationId_seq"', 16, true);


--
-- Name: Room_RoomId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Room_RoomId_seq"', 1, false);


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
-- Name: User_email_key; Type: INDEX; Schema: myschema; Owner: myuser
--

CREATE UNIQUE INDEX "User_email_key" ON myschema."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: myschema; Owner: myuser
--

CREATE UNIQUE INDEX "User_username_key" ON myschema."User" USING btree (username);


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
-- Name: Notification Notification_UserId_fkey; Type: FK CONSTRAINT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Notification"
    ADD CONSTRAINT "Notification_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES myschema."User"("UserId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

