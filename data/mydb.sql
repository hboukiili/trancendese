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
-- Name: notificationType; Type: TYPE; Schema: myschema; Owner: myuser
--

CREATE TYPE myschema."notificationType" AS ENUM (
    'Accepted_request',
    'game_invitation',
    'Achievement',
    'GroupInvitation',
    'Message'
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
    "Accepted" boolean DEFAULT false NOT NULL,
    "blockedBySender" boolean DEFAULT false NOT NULL,
    "blockedByReceiver" boolean DEFAULT false NOT NULL,
    "CreationTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
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
    "Mode" text DEFAULT 'classic'::text NOT NULL,
    "WinnerId" text,
    "isDraw" boolean DEFAULT false NOT NULL,
    "WinnerXP" integer,
    "looserXP" integer,
    "Rounds" integer NOT NULL,
    "CreationTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
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
    "MembershipId" integer NOT NULL,
    "RoomId" integer NOT NULL,
    "UserId" text NOT NULL,
    "Role" text DEFAULT 'Member'::text NOT NULL,
    "isBanned" boolean DEFAULT false NOT NULL,
    "isMuted" boolean DEFAULT false NOT NULL,
    "unmuteUntil" timestamp(3) without time zone,
    "CreationTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE myschema."Membership" OWNER TO myuser;

--
-- Name: Membership_MembershipId_seq; Type: SEQUENCE; Schema: myschema; Owner: myuser
--

CREATE SEQUENCE myschema."Membership_MembershipId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE myschema."Membership_MembershipId_seq" OWNER TO myuser;

--
-- Name: Membership_MembershipId_seq; Type: SEQUENCE OWNED BY; Schema: myschema; Owner: myuser
--

ALTER SEQUENCE myschema."Membership_MembershipId_seq" OWNED BY myschema."Membership"."MembershipId";


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
    "senderId" text NOT NULL,
    "receiverId" text NOT NULL,
    "Type" myschema."notificationType" NOT NULL,
    "isRead" boolean NOT NULL,
    "CreationTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
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
    "RoomNAme" text,
    "CreationTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updateTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ischannel boolean DEFAULT false NOT NULL,
    "Password" text,
    "Type" text
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
    "UserId" text NOT NULL,
    username text NOT NULL,
    "FullName" text NOT NULL,
    avatar text,
    "FA_On" boolean,
    "FAsecret" text,
    "XP" integer DEFAULT 0,
    level integer DEFAULT 0,
    badge text,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
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
    extrovert boolean DEFAULT false NOT NULL,
    "Helmchen" boolean DEFAULT false NOT NULL,
    "PongPlayer" boolean DEFAULT false NOT NULL,
    kasparov boolean DEFAULT false NOT NULL,
    "Worldcup" boolean DEFAULT false NOT NULL,
    "Hawking" boolean DEFAULT false NOT NULL,
    "Batal" boolean DEFAULT false NOT NULL
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
-- Name: Membership MembershipId; Type: DEFAULT; Schema: myschema; Owner: myuser
--

ALTER TABLE ONLY myschema."Membership" ALTER COLUMN "MembershipId" SET DEFAULT nextval('myschema."Membership_MembershipId_seq"'::regclass);


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

COPY myschema."Friendship" ("FriendshipId", "SenderId", "ReceiverId", "Accepted", "blockedBySender", "blockedByReceiver", "CreationTime") FROM stdin;
1	98879	98937	t	f	f	2023-08-05 14:21:07.146
2	99045	98879	t	f	f	2023-08-05 14:23:10.222
\.


--
-- Data for Name: Game; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Game" ("GameId", "PlayerId1", "PlayerId2", "Mode", "WinnerId", "isDraw", "WinnerXP", "looserXP", "Rounds", "CreationTime") FROM stdin;
1	98879	98937	classic	98937	f	5	0	1	2023-08-05 14:21:43.731
2	99045	98879	football	98879	f	5	0	1	2023-08-05 14:24:01.102
3	99045	98879	friends	98879	f	5	0	1	2023-08-05 14:24:36.249
\.


--
-- Data for Name: Membership; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Membership" ("MembershipId", "RoomId", "UserId", "Role", "isBanned", "isMuted", "unmuteUntil", "CreationTime") FROM stdin;
1	1	98879	Member	f	f	\N	2023-08-05 14:21:09.242
2	1	98937	Member	f	f	\N	2023-08-05 14:21:09.242
3	2	99045	Member	f	f	\N	2023-08-05 14:23:11.987
4	2	98879	Member	f	f	\N	2023-08-05 14:23:11.987
\.


--
-- Data for Name: Message; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Message" ("MessageId", "RoomId", "UserId", "Content", "SendTime") FROM stdin;
1	2	99045	cc	2023-08-05 14:23:30.572
2	2	98879	cv	2023-08-05 14:23:36.81
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Notification" ("NotificationId", "senderId", "receiverId", "Type", "isRead", "CreationTime") FROM stdin;
1	98937	98879	Accepted_request	f	2023-08-05 14:21:09.141
2	98879	99045	Accepted_request	f	2023-08-05 14:23:11.964
3	99045	98879	game_invitation	f	2023-08-05 14:24:19.829
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."Room" ("RoomId", "RoomNAme", "CreationTime", "updateTime", ischannel, "Password", "Type") FROM stdin;
1	604ca615-7d6d-490e-9acc-a0f9c94b893b	2023-08-05 14:21:09.242	2023-08-05 14:21:09.242	f	\N	\N
2	4dc92a11-6b01-49d7-ad3d-5a1bdebfd615	2023-08-05 14:23:11.987	2023-08-05 14:23:11.987	f	\N	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema."User" ("UserId", username, "FullName", avatar, "FA_On", "FAsecret", "XP", level, badge, email, "createdAt", status) FROM stdin;
99045	schoukou	Saber Choukoukou	https://cdn.intra.42.fr/users/16a8917f3a4b43161e770e46b7b1f65f/medium_schoukou.jpg	f	\N	0	0	\N	schoukou@student.1337.ma	2023-08-05 14:22:39.009	t
98879	tchtaibi	Taha Chtaibi	https://cdn.intra.42.fr/users/6a2c03ee95b681acca46263bcfa2e850/medium_tchtaibi.jpg	f	\N	40	1	\N	tchtaibi@student.1337.ma	2023-08-05 14:20:43.273	f
98937	hboukili	Hamza Boukili	https://cdn.intra.42.fr/users/505cbe5d91097ae88576c9ad5b38b66b/medium_hboukili.jpg	f	\N	120	0	\N	hboukili@student.1337.ma	2023-08-05 14:19:51.618	f
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f79d5dc4-21e2-45e2-bb5e-ffbb0e398b30	ca6c26afed441e48327361751a6030c32e7442ed6aec9a0347e94a0eb6a5dbc7	2023-08-05 14:18:33.369534+00	20230805141831_first	\N	\N	2023-08-05 14:18:31.572526+00	1
\.


--
-- Data for Name: achievement; Type: TABLE DATA; Schema: myschema; Owner: myuser
--

COPY myschema.achievement ("badgesId", "UserId", extrovert, "Helmchen", "PongPlayer", kasparov, "Worldcup", "Hawking", "Batal") FROM stdin;
1	98937	f	f	t	f	f	f	f
3	99045	f	f	t	f	f	f	f
2	98879	f	f	t	f	f	f	t
\.


--
-- Name: Friendship_FriendshipId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Friendship_FriendshipId_seq"', 2, true);


--
-- Name: Game_GameId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Game_GameId_seq"', 3, true);


--
-- Name: Membership_MembershipId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Membership_MembershipId_seq"', 4, true);


--
-- Name: Message_MessageId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Message_MessageId_seq"', 2, true);


--
-- Name: Notification_NotificationId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Notification_NotificationId_seq"', 3, true);


--
-- Name: Room_RoomId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."Room_RoomId_seq"', 2, true);


--
-- Name: achievement_badgesId_seq; Type: SEQUENCE SET; Schema: myschema; Owner: myuser
--

SELECT pg_catalog.setval('myschema."achievement_badgesId_seq"', 3, true);


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
    ADD CONSTRAINT "Membership_pkey" PRIMARY KEY ("MembershipId");


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

