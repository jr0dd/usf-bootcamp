\c lunchly 

DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text,
    notes text DEFAULT '' NOT NULL
);

CREATE TABLE reservations (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    customer_id integer NOT NULL REFERENCES customers,
    start_at timestamp without time zone NOT NULL,
    num_guests integer NOT NULL,
    notes text DEFAULT '' NOT NULL,
    CONSTRAINT reservations_num_guests_check CHECK ((num_guests > 0))
);

COPY public.customers (id, first_name, last_name, phone, notes) FROM stdin;
1	Anthony	Gonzales	590-813-4874x723	Money voice rate chair war subject kid.
2	Joseph	Wells	\N	Else quite deal culture deep candidate exactly.
3	Crystal	Coleman	\N	
4	Kimberly	Vega	691.593.9975x09909	
5	Jessica	Friedman	\N	Medical measure despite.
6	Leslie	Freeman	\N	Fear ten director offer glass teach.
7	Margaret	Bell	+75(3)6214649419	
8	Michael	Martinez	\N	
9	Todd	Craig	\N	
10	Christian	Keith	056.198.0131x6435	
11	Cheryl	Armstrong	030-620-6128x8108	
12	Preston	Caldwell	735.872.6314x210	Few fill body eight.
13	Teresa	Gomez	287-871-7449x385	
14	Sean	Floyd	\N	
15	Peggy	Garner	(324)384-7886	
16	Leonard	Richards	\N	
17	John	Benton	\N	Spring business speak nothing.
18	Douglas	Lewis	(878)427-8640	Task environmental structure themselves Mrs forward.
19	Alicia	Weaver	\N	Foot field here south page option it.
20	Paul	Martinez	807.778.7753x447	Attack phone firm capital popular here human.
21	Maria	Washington	1-125-678-1322x217	
22	Rachel	Robinson	\N	Pick important fire.
23	Joshua	Taylor	706.694.7838	
24	Michael	Singh	\N	
25	Melissa	Daniel	\N	
26	Hannah	Wallace	\N	Officer meeting future.
27	Sharon	Stewart	951-924-6179	
28	Paul	Galvan	\N	
29	Jay	Robinson	(302)312-6353	
30	Robert	Reynolds	\N	
31	Anthony	Snyder	\N	Eat operation next receive.
32	Shelby	Horn	(810)801-2742	Rest former detail agree rather truth out.
33	Kelly	Johnson	\N	
34	James	Miller	273.573.3350	
35	Amanda	Anderson	1-860-259-1789x885	
36	Brittany	Underwood	\N	
37	David	Holmes	\N	Evening which between late.
38	Laura	Roberts	945.318.2228x72872	
39	Jessica	Abbott	\N	Let list activity key north.
40	Kristi	Jenkins	\N	
41	Gregory	Marshall	\N	Clearly western past scientist put decade serve big.
42	Marissa	Sutton	\N	
43	Thomas	Whitney	\N	
44	Travis	Nelson	\N	
45	Kathleen	Thomas	\N	Production your buy represent leader how.
46	Tracy	Leonard	\N	
47	Peter	Marshall	\N	
48	Bradley	Richardson	\N	
49	Hannah	Morrison	\N	
50	John	Bennett	+88(6)4017259339	
51	Jasmine	Booker	00057689453	Economy former force present follow.
52	Kevin	Norton	\N	
53	Stacey	Curry	\N	
54	David	Martin	969-402-1592	
55	Douglas	Graves	(872)460-3541x498	
56	Johnny	Ortiz	\N	
57	Joseph	Thomas	(238)548-2692	Financial during prevent.
58	Jamie	Franklin	1-650-298-4099	
59	Mark	Snyder	\N	Build if behavior environment however him.
60	Debra	Torres	\N	
61	Jennifer	Collins	\N	
62	Jennifer	Berry	\N	
63	Donna	Spencer	\N	
64	Shawn	Robinson	1-283-661-7228	Our all military fact behavior.
65	Sarah	White	\N	
66	Tonya	Sharp	537-213-1641x19133	
67	Susan	Miller	\N	Ten cause guess explain seven beat.
68	Amy	Parker	\N	
69	Joan	Berry	\N	
70	Rebecca	Daniel	(383)521-1148x691	Billion world different section different scene.
71	Alicia	Brooks	\N	
72	Monique	Lee	\N	
73	Cassandra	Oconnor	\N	
74	Robert	Baldwin	\N	
75	Chelsea	Friedman	\N	
76	Edward	Day	\N	
77	Eric	Camacho	1-432-570-9807x095	
78	Stephen	Hogan	\N	Act sense manager success.
79	Kelli	Nguyen	\N	Sister else adult sea.
80	Kevin	Campbell	\N	
81	Arthur	Perez	\N	
82	Jeffrey	Kramer	784-544-3576	Under upon public leader.
83	Stephen	Greene	1-090-235-9399x225	
84	Jonathan	Meza	083.382.3754x70824	
85	Jennifer	Wolf	547-715-2684	
86	Jeremiah	Carlson	\N	
87	Zachary	Chandler	05585057084	
88	Christopher	Weaver	\N	
89	Kristin	Graham	185-134-1189x276	
90	Brian	Yoder	870.454.0193x20205	
91	Heather	Collins	\N	
92	Sarah	Gillespie	595.280.5711x8003	Year late law fall.
93	Marilyn	Riddle	\N	
94	Alicia	Manning	\N	Big part take drive.
95	Sheryl	Rivers	(832)634-2316	Possible room art thank by.
96	Richard	Davis	\N	Candidate music market move.
97	Catherine	Thomas	1-810-724-0265x62440	Writer indeed night.
98	Cynthia	Patel	(435)534-8363x5789	
99	Joshua	Cook	(475)724-2506x890	
100	Michael	Hudson	\N	
\.

COPY public.reservations (id, customer_id, start_at, num_guests, notes) FROM stdin;
1	16	2018-09-08 12:20:07-07	2	Decade college home heart.
2	33	2018-06-18 19:31:59-07	5	
3	39	2018-09-21 14:24:33-07	5	
4	85	2018-04-02 09:11:56-07	2	
5	41	2018-11-11 15:46:16-08	8	
6	73	2018-06-23 06:42:27-07	2	
7	100	2018-01-23 01:41:16-08	2	
8	56	2018-05-11 14:25:43-07	5	
9	36	2018-02-11 23:14:40-08	6	Mouth firm author product house.
10	22	2018-02-18 14:21:04-08	2	
11	28	2018-08-29 07:42:22-07	2	
12	80	2018-04-25 04:15:28-07	4	
13	66	2018-04-05 12:42:24-07	1	
14	53	2018-07-25 07:10:12-07	5	
15	80	2018-10-27 11:45:46-07	8	
16	43	2018-07-16 10:31:52-07	2	Side detail similar teach station doctor weight.
17	18	2018-01-11 11:17:07-08	4	
18	51	2018-08-03 06:31:06-07	2	
19	35	2018-02-09 11:29:48-08	1	
20	32	2018-01-29 05:19:39-08	2	
21	44	2018-02-26 09:29:59-08	2	
22	12	2018-03-12 14:34:36-07	2	
23	24	2018-12-18 05:14:42-08	1	
24	69	2018-05-29 22:19:19-07	4	
25	99	2018-05-06 10:39:07-07	2	
26	72	2018-11-24 16:11:41-08	2	
27	2	2018-08-04 12:08:58-07	2	
28	36	2018-10-06 00:02:55-07	1	
29	76	2018-08-21 23:12:03-07	2	This product walk bar fine.
30	90	2018-01-27 15:52:27-08	1	
31	4	2018-05-18 01:24:47-07	3	Old every member after quickly follow hear.
32	22	2018-12-26 00:46:06-08	1	International card have understand least wrong.
33	65	2018-02-09 13:08:28-08	2	
34	87	2018-10-01 17:26:03-07	5	
35	92	2018-09-01 08:23:33-07	4	Number maintain medical decision.
36	90	2018-09-13 00:03:40-07	4	
37	81	2018-07-11 16:23:05-07	9	
38	3	2018-05-23 17:18:28-07	1	
39	16	2018-10-17 19:08:52-07	2	Mean position mother word help.
40	30	2018-11-10 01:48:26-08	4	
41	48	2018-03-06 21:50:39-08	7	
42	32	2018-05-10 19:49:54-07	4	
43	84	2018-06-10 18:13:23-07	2	
44	57	2018-11-21 13:43:24-08	2	
45	22	2018-03-03 09:34:39-08	2	
46	74	2018-06-22 07:33:42-07	4	Life news debate actually entire including.
47	93	2018-03-27 14:40:26-07	8	Through glass still seem hit worry.
48	43	2018-02-26 14:25:51-08	6	
49	47	2018-10-15 02:50:02-07	6	
50	40	2018-12-07 01:12:36-08	1	Us plant local maybe customer.
51	56	2018-06-11 09:45:21-07	2	
52	61	2018-09-16 17:24:26-07	3	
53	6	2018-11-22 10:46:14-08	3	
54	10	2018-02-20 19:32:09-08	2	Body local upon threat.
55	19	2018-04-04 23:35:10-07	4	
56	15	2018-08-22 20:51:35-07	2	
57	40	2018-01-13 15:55:38-08	1	
58	75	2018-06-05 05:20:49-07	2	
59	57	2018-08-29 00:13:25-07	2	
60	9	2018-09-12 09:51:15-07	4	
61	18	2018-11-15 11:32:58-08	9	
62	54	2018-08-16 08:49:28-07	2	Item such difference season box everybody mind.
63	3	2018-01-31 20:45:00-08	4	Under push evening.
64	31	2018-01-09 00:02:24-08	2	Heart different include list.
65	54	2018-10-19 15:52:28-07	2	
66	9	2018-04-18 03:49:17-07	2	
67	65	2018-05-16 06:42:12-07	3	Painting law across let stock church.
68	37	2018-11-26 18:12:29-08	9	Politics garden particularly factor drop democratic.
69	40	2018-06-05 17:08:53-07	6	
70	5	2018-04-14 09:22:19-07	2	Mean purpose fly field democratic moment.
71	45	2018-08-16 10:13:23-07	3	
72	89	2018-10-13 21:27:12-07	4	Husband way tend establish.
73	15	2018-11-11 11:36:49-08	2	
74	94	2018-04-24 20:21:47-07	1	Near stay occur.
75	74	2018-10-28 10:07:48-07	2	
76	39	2018-07-16 09:04:21-07	9	
77	58	2018-09-07 16:20:15-07	2	According walk lot until.
78	24	2018-04-17 10:27:03-07	2	Get oil project them western mouth.
79	76	2018-06-16 21:18:18-07	2	
80	93	2018-09-19 10:26:17-07	1	Painting second consumer detail high.
81	20	2018-07-03 00:32:09-07	9	
82	70	2018-09-10 02:36:37-07	5	
83	60	2018-08-28 16:54:36-07	2	
84	34	2018-05-22 06:23:39-07	4	
85	100	2018-07-11 04:58:51-07	2	
86	58	2018-02-20 01:44:43-08	7	Alone agent suddenly meeting sound response middle.
87	26	2018-08-19 04:11:01-07	2	
88	96	2018-06-24 07:21:41-07	3	Government speech answer individual guess.
89	72	2018-05-21 18:16:59-07	2	
90	58	2018-05-01 21:26:02-07	2	
91	24	2018-08-05 06:05:12-07	2	
92	29	2018-04-17 08:51:24-07	6	
93	16	2018-03-28 18:35:15-07	9	
94	42	2018-02-14 10:55:33-08	3	I reach positive.
95	83	2018-07-28 05:19:43-07	1	
96	95	2018-04-27 00:03:16-07	4	
97	52	2018-01-06 04:30:07-08	1	
98	89	2018-04-27 02:30:57-07	2	
99	34	2018-05-15 03:43:34-07	2	In cell he full method close sense.
100	84	2018-07-13 16:44:38-07	9	
101	55	2018-05-09 05:12:25-07	5	
102	10	2018-02-12 17:41:05-08	7	
103	96	2018-11-18 03:34:30-08	8	
104	65	2018-04-14 03:01:38-07	1	
105	90	2018-05-02 18:02:40-07	1	
106	94	2018-11-16 23:47:53-08	8	
107	30	2018-11-20 04:12:58-08	6	
108	7	2018-08-02 06:28:01-07	4	
109	46	2018-03-26 13:40:12-07	7	
110	54	2018-02-16 16:18:28-08	3	
111	57	2018-05-02 11:06:38-07	5	
112	62	2018-03-11 11:01:59-07	4	Wall life still approach someone strong field.
113	75	2018-12-29 01:24:30-08	5	
114	58	2018-08-18 18:00:56-07	6	
115	41	2018-06-20 12:00:02-07	6	
116	27	2018-02-21 17:26:32-08	5	
117	54	2018-03-01 20:58:36-08	2	
118	89	2018-02-13 20:00:55-08	4	
119	67	2018-06-28 01:56:24-07	1	Firm clearly ability Mr.
120	74	2018-01-17 23:39:01-08	2	
121	29	2018-07-05 13:48:31-07	2	Respond hair with my low.
122	1	2018-03-10 10:46:46-08	5	
123	80	2018-08-28 12:59:40-07	2	Never catch upon.
124	5	2018-02-16 06:55:47-08	1	
125	62	2018-04-03 02:40:18-07	1	
126	32	2018-09-25 17:12:53-07	5	
127	30	2018-06-08 09:13:42-07	5	
128	32	2018-05-07 14:51:40-07	2	Herself less lawyer.
129	29	2018-03-28 16:43:32-07	5	
130	10	2018-06-01 14:41:09-07	8	
131	82	2018-09-15 16:53:54-07	2	
132	67	2018-10-11 01:21:33-07	4	Professor reason compare assume peace.
133	26	2018-01-08 12:03:00-08	2	
134	2	2018-10-18 17:41:46-07	2	
135	26	2018-05-06 16:14:27-07	4	
136	85	2018-08-20 02:57:38-07	2	
137	58	2018-10-21 18:43:04-07	4	
138	91	2018-06-01 05:29:04-07	2	Only film opportunity knowledge cup summer.
139	100	2018-07-12 10:14:24-07	7	Again really address area reach ok consumer couple.
140	31	2018-01-17 17:17:29-08	2	Tax lose on under almost.
141	74	2018-09-23 20:12:41-07	1	Total the growth reality full work.
142	56	2018-09-08 17:14:08-07	4	
143	51	2018-09-10 03:56:14-07	7	But protect benefit strategy.
144	11	2018-08-05 23:14:34-07	7	
145	54	2018-05-28 22:49:39-07	2	
146	55	2018-01-07 02:38:12-08	6	
147	48	2018-01-20 07:35:56-08	5	
148	77	2018-02-12 06:55:25-08	2	
149	18	2018-06-03 20:27:21-07	4	
150	11	2018-10-16 09:27:12-07	2	Necessary table seven summer environment.
151	68	2018-02-24 19:04:51-08	2	Approach herself you price likely next.
152	29	2018-06-09 00:20:54-07	1	White nearly southern seven remain message.
153	91	2018-05-03 02:20:15-07	4	
154	16	2018-05-21 00:05:35-07	4	
155	36	2018-06-05 22:09:49-07	8	
156	6	2018-01-31 22:11:42-08	4	
157	99	2018-02-20 22:08:41-08	2	Walk professional state art north law.
158	23	2018-10-06 10:18:37-07	4	
159	3	2018-05-19 02:57:49-07	2	
160	62	2018-02-20 13:56:48-08	6	
161	50	2018-08-17 18:51:30-07	8	
162	21	2018-05-07 20:09:29-07	5	
163	97	2018-03-20 12:14:13-07	2	
164	77	2018-10-30 22:12:49-07	5	
165	39	2018-09-28 13:20:56-07	5	
166	77	2018-01-22 17:54:26-08	2	
167	66	2018-08-24 08:06:25-07	1	Production main note full various nearly customer continue.
168	68	2018-07-05 22:29:07-07	1	And popular in indeed away.
169	89	2018-07-09 03:22:28-07	4	Happen drop involve newspaper.
170	94	2018-07-24 09:17:57-07	2	
171	80	2018-04-03 05:02:23-07	2	
172	42	2018-01-25 04:44:09-08	1	
173	100	2018-05-20 01:38:08-07	9	Yet represent art speak save public husband.
174	25	2018-06-25 12:49:46-07	2	
175	24	2018-04-05 08:59:59-07	2	Responsibility relate appear machine.
176	46	2018-06-06 09:47:55-07	2	
177	65	2018-03-10 23:15:43-08	8	
178	65	2018-03-18 08:19:44-07	5	Certain attack eat must term modern case.
179	47	2018-01-05 02:33:19-08	2	
180	19	2018-06-20 10:40:29-07	2	Trouble ten be.
181	79	2018-05-10 02:54:03-07	6	
182	5	2018-03-02 21:23:18-08	2	Popular different quality.
183	39	2018-08-24 11:36:00-07	1	
184	24	2018-03-14 20:41:22-07	2	
185	19	2018-07-05 10:19:15-07	2	Education because thank that study without.
186	13	2018-06-22 14:27:18-07	6	
187	25	2018-10-12 15:36:46-07	5	Sound occur over.
188	54	2018-03-16 01:45:38-07	7	College decide attorney few family of.
189	52	2018-03-20 16:13:33-07	9	
190	39	2018-11-15 16:13:57-08	1	Bill eye although nice during young brother.
191	99	2018-08-01 05:52:25-07	9	
192	62	2018-01-03 09:01:18-08	4	Require international win stop.
193	75	2018-09-10 16:14:05-07	1	
194	63	2018-12-25 03:47:38-08	2	
195	67	2018-01-05 16:01:08-08	1	
196	29	2018-12-05 11:38:05-08	1	Pressure miss low will.
197	34	2018-04-05 16:19:10-07	4	
198	66	2018-06-15 13:56:43-07	9	Every fight message together international whose key.
199	7	2018-08-30 16:11:31-07	5	Training range discussion notice mother art food.
200	53	2018-12-05 13:41:30-08	2	
\.

SELECT pg_catalog.setval('public.customers_id_seq', 100, true);
SELECT pg_catalog.setval('public.reservations_id_seq', 200, true);

CREATE INDEX reservations_customer_id_idx ON public.reservations USING btree (customer_id);
CREATE INDEX reservations_start_at_idx ON public.reservations USING btree (start_at);
