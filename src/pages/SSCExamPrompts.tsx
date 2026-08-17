import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

type AIPlatform = "ChatGPT" | "Claude" | "Gemini";

type Category =
  | "All"
  | "রচনা লেখা"
  | "অ্যাসাইনমেন্ট"
  | "পড়ার রুটিন"
  | "পরীক্ষা প্রস্তুতি"
  | "সৃজনশীল প্রশ্ন"
  | "HSC প্রস্তুতি";

interface ExamPrompt {
  id: string;
  category: Exclude<Category, "All">;
  title: string;
  titleBn: string;
  price: number;
  ai: AIPlatform[];
  uses: number;
  rating: number;
  badge: string; // short use-case label
  prompt: string;
}

const PROMPTS: ExamPrompt[] = [
  {
    id: "ssc-bangla-rachana",
    category: "রচনা লেখা",
    title: "SSC Bangla Essay (রচনা) Writer",
    titleBn: "SSC বাংলা রচনা লেখার AI Prompt",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 11240,
    rating: 4.9,
    badge: "SSC 2026 · বাংলা ১ম পত্র",
    prompt: `তুমি একজন অভিজ্ঞ বাংলা শিক্ষক এবং SSC পরীক্ষার রচনা বিশেষজ্ঞ। আমাকে "[রচনার বিষয়]" শিরোনামে একটি SSC মানের পূর্ণ বাংলা রচনা লিখে দাও।

রচনার বিষয়: [বিষয়, যেমন: বাংলাদেশের মুক্তিযুদ্ধ / পরিবেশ দূষণ / ডিজিটাল বাংলাদেশ / বৃক্ষরোপণ]

Structure:
১. ভূমিকা (৩-৪ বাক্য): বিষয়টির গুরুত্ব ও প্রাসঙ্গিকতা
২. মূল বিষয় (৫-৬ প্যারাগ্রাফ):
   - সংজ্ঞা ও ব্যাখ্যা
   - ইতিহাস বা পটভূমি
   - বর্তমান অবস্থা
   - সমস্যা ও কারণ
   - সমাধান বা করণীয়
৩. উপসংহার (২-৩ বাক্য): সারসংক্ষেপ ও প্রত্যাশা

Requirements:
- শব্দ সংখ্যা: ৪০০-৫০০ শব্দ (SSC standard)
- ভাষা: শুদ্ধ প্রমিত বাংলা, সাবলীল
- প্রাসঙ্গিক উদ্ধৃতি বা কবিতার লাইন যোগ করো যদি মানানসই হয়
- তথ্য: সঠিক ও আপ-টু-ডেট
- Tone: Academic কিন্তু readable

💡 SSC পরীক্ষায় সর্বোচ্চ নম্বর পেতে: রচনার প্রতিটি paragraph-এ নির্দিষ্ট তথ্য ও উদাহরণ দাও।`,
  },
  {
    id: "ssc-english-essay",
    category: "রচনা লেখা",
    title: "SSC English Composition / Essay",
    titleBn: "SSC ইংরেজি Composition লেখার Prompt",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 8730,
    rating: 4.9,
    badge: "SSC 2026 · English 1st Paper",
    prompt: `You are an expert SSC English teacher in Bangladesh. Write a complete SSC-standard English composition/essay on "[TOPIC]".

Topic: [TOPIC, e.g. Climate Change / Importance of Trees / Digital Bangladesh / My Aim in Life / Traffic Jam in Bangladesh]

Structure:
1. Introduction (3-4 sentences): Hook + thesis statement
2. Body Paragraph 1: Main point with explanation and Bangladesh-specific example
3. Body Paragraph 2: Second point with supporting details
4. Body Paragraph 3: Third point or counterargument + rebuttal
5. Conclusion (2-3 sentences): Summary + future hope/call to action

Requirements:
- Word count: 250-300 words (SSC standard)
- Vocabulary level: SSC appropriate (not too advanced, not too simple)
- Grammar: Correct tenses, subject-verb agreement
- Bangladesh context: Include local references where appropriate
- No contractions (formal essay style)

Also provide:
- 5 key vocabulary words from the essay with Bengali meanings
- 1 alternative introduction option

💡 Tip: শেষে পুরো essay-টা একবার grammar check করতে বলো।`,
  },
  {
    id: "assignment-writer",
    category: "অ্যাসাইনমেন্ট",
    title: "Assignment Writer — Any Subject",
    titleBn: "যেকোনো বিষয়ের অ্যাসাইনমেন্ট লেখার Prompt",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 14560,
    rating: 4.9,
    badge: "SSC · HSC · College · University",
    prompt: `তুমি একজন বিশেষজ্ঞ শিক্ষক এবং academic writer। আমার নিচের assignment-টি সম্পূর্ণ করে দাও।

Assignment details:
- বিষয় (Subject): [বিষয়, যেমন: বাংলাদেশ ও বিশ্ব পরিচয়, পদার্থবিজ্ঞান, ইতিহাস]
- Class: [SSC / HSC / Degree]
- Assignment topic: [নির্দিষ্ট বিষয়, যেমন: "বাংলাদেশের নদনদীর গুরুত্ব"]
- Required length: [কত পৃষ্ঠা বা শব্দ]
- Special instruction: [শিক্ষক কী বলেছেন, যেমন: চিত্র আঁকতে হবে / নিজের মতামত দিতে হবে]

লেখার format:
১. শিরোনাম পৃষ্ঠা (Title, Class, Roll, Date)
২. ভূমিকা
৩. মূল আলোচনা (subheading সহ, ৩-৫টি section)
৪. উপসংহার
৫. তথ্যসূত্র (Reference) — ২-৩টি

Additional:
- সংক্ষিপ্ত বাংলা ভাষায় লিখো, সহজ শব্দে
- প্রাসঙ্গিক তথ্য ও পরিসংখ্যান যোগ করো
- Plagiarism-free original content

⚠️ গুরুত্বপূর্ণ: AI-র লেখা সরাসরি submit না করে নিজের ভাষায় একটু edit করে নাও।`,
  },
  {
    id: "study-plan-generator",
    category: "পড়ার রুটিন",
    title: "Personalized Study Plan / Routine",
    titleBn: "পড়ার রুটিন বানানোর AI Prompt",
    price: 0,
    ai: ["ChatGPT", "Gemini", "Claude"],
    uses: 6890,
    rating: 4.8,
    badge: "SSC · HSC · পরীক্ষার আগে",
    prompt: `তুমি একজন expert education consultant এবং study planner। আমার জন্য একটি realistic ও effective পড়ার রুটিন তৈরি করো।

আমার তথ্য:
- Class: [SSC / HSC / অন্য]
- পরীক্ষার তারিখ: [তারিখ বা কতদিন বাকি]
- দুর্বল বিষয়: [যে বিষয়ে কম নম্বর পাই, যেমন: গণিত, ইংরেজি]
- শক্তিশালী বিষয়: [যে বিষয়ে ভালো]
- প্রতিদিন পড়ার সময়: [কত ঘণ্টা পড়তে পারবো]
- সমস্যা: [যেমন: মনোযোগ কমে যায়, মুখস্থ থাকে না, ফোনে আসক্তি]

রুটিনে অন্তর্ভুক্ত করো:
- দৈনিক subject-ভিত্তিক time allocation
- Pomodoro technique (২৫ মিনিট পড়া, ৫ মিনিট বিরতি)
- Revision schedule (নতুন পড়া + পুরনো পড়া review)
- Weekly mock test plan
- ঘুম, খাওয়া ও বিশ্রামের সময়
- পরীক্ষার আগের ৭ দিনের বিশেষ plan

Output format: সপ্তাহের প্রতিটি দিনের জন্য আলাদা তালিকা, table format-এ।

💡 Tip: রুটিন বানানোর পর ChatGPT-কে বলো "এই রুটিন কি realistic?" — সে নিজেই adjust করে দেবে।`,
  },
  {
    id: "ssc-mcq-practice",
    category: "পরীক্ষা প্রস্তুতি",
    title: "MCQ Practice Question Generator",
    titleBn: "MCQ প্র্যাকটিস প্রশ্ন তৈরির Prompt",
    price: 0,
    ai: ["ChatGPT", "Gemini", "Claude"],
    uses: 9120,
    rating: 4.9,
    badge: "SSC · HSC · বহুনির্বাচনী",
    prompt: `তুমি একজন SSC/HSC পরীক্ষার বিশেষজ্ঞ শিক্ষক। আমাকে [বিষয়]-এর [অধ্যায়]-এর উপর ২০টি MCQ প্র্যাকটিস প্রশ্ন তৈরি করে দাও।

বিষয়: [Subject, যেমন: পদার্থবিজ্ঞান / রসায়ন / গণিত / বাংলাদেশ ও বিশ্ব পরিচয়]
অধ্যায়: [Chapter name বা number]
Class: [SSC / HSC]
Difficulty: [Easy / Medium / Hard / Mixed]

প্রতিটি প্রশ্নের format:
প্রশ্ন [নম্বর]: [প্রশ্ন]
ক) [Option A]
খ) [Option B]
গ) [Option C]
ঘ) [Option D]

সব ২০টি প্রশ্নের পরে:
Answer Key:
১-ক, ২-গ, ৩-খ... (এভাবে সব উত্তর)

Brief Explanation:
প্রতিটি সঠিক উত্তরের জন্য এক লাইনে কারণ।

Requirements:
- NCTB syllabus অনুযায়ী
- SSC board প্রশ্নের মান বজায় রাখো
- Tricky question কম করো — conceptual প্রশ্ন বেশি রাখো
- Bangla medium-এ লিখবে (English medium হলে বলে দাও)`,
  },
  {
    id: "srijonshil-question",
    category: "সৃজনশীল প্রশ্ন",
    title: "সৃজনশীল প্রশ্নের উত্তর লেখার Prompt",
    titleBn: "SSC সৃজনশীল প্রশ্ন উত্তর",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 7430,
    rating: 4.8,
    badge: "SSC · সৃজনশীল · সব বিষয়",
    prompt: `তুমি একজন অভিজ্ঞ SSC পরীক্ষার শিক্ষক। নিচের সৃজনশীল প্রশ্নের সম্পূর্ণ উত্তর লিখে দাও।

বিষয়: [Subject]
উদ্দীপক (Stimulus): [উদ্দীপকের text হুবহু লিখো]

প্রশ্ন:
ক) [জ্ঞান — ১ নম্বর]
খ) [অনুধাবন — ২ নম্বর]
গ) [প্রয়োগ — ৩ নম্বর]
ঘ) [উচ্চতর দক্ষতা — ৪ নম্বর]

উত্তর format:
ক) — সরাসরি, সংক্ষিপ্ত সংজ্ঞা বা তথ্য (১-২ বাক্য)
খ) — উদ্দীপকের সাথে সংযোগ রেখে ব্যাখ্যা (৩-৪ বাক্য)
গ) — উদ্দীপকের প্রেক্ষিতে তত্ত্ব প্রয়োগ (৫-৬ বাক্য, প্রাসঙ্গিক উদাহরণ সহ)
ঘ) — বিশ্লেষণ ও মূল্যায়ন, উদ্দীপক + নিজস্ব যুক্তি (৭-৮ বাক্য, দুটি দিক আলোচনা)

Important:
- প্রতিটি উত্তর শুরু করো প্রশ্নের কীওয়ার্ড দিয়ে
- ঘ) প্রশ্নে "পক্ষে" ও "বিপক্ষে" উভয় যুক্তি দাও
- উদ্দীপকের সাথে সরাসরি সংযোগ রাখো
- সহজ, পরিষ্কার বাংলায় লিখো`,
  },
  {
    id: "memorization-technique",
    category: "পরীক্ষা প্রস্তুতি",
    title: "মুখস্থ করার কৌশল ও Mnemonics",
    titleBn: "দ্রুত মুখস্থ করার AI Prompt",
    price: 0,
    ai: ["ChatGPT", "Gemini", "Claude"],
    uses: 5670,
    rating: 4.8,
    badge: "সব class · সব বিষয়",
    prompt: `তুমি একজন memory expert এবং education specialist। নিচের তথ্যগুলো সহজে মনে রাখার জন্য আমাকে সাহায্য করো।

যা মুখস্থ করতে চাই: [CONTENT, যেমন: periodic table-এর প্রথম ২০টি element / বাংলাদেশের নদীর নাম / ইতিহাসের তারিখ / রসায়নের সূত্র]

আমাকে দাও:
১. Mnemonic device (স্মৃতি সূত্র): প্রতিটি item-এর প্রথম অক্ষর দিয়ে একটি বাংলা বাক্য বা ছড়া
২. Visual association: প্রতিটি item-এর সাথে একটি মজার mental image
৩. Story method: সব item-গুলো দিয়ে একটি ছোট গল্প (বাংলায়)
৪. Chunking: বড় list-কে ছোট ছোট group-এ ভাগ করো
৫. Practice quiz: ৫টি fill-in-the-blank প্রশ্ন মুখস্থ test করতে

Bonus:
- এই content review করার best time কখন? (Spaced repetition schedule)
- মুখস্থ রাখার জন্য আর কী করতে পারি?

Language: বাংলায় সহজ করে বোঝাও, মজাদার করো যেন ভুলে না যাই।`,
  },
  {
    id: "hsc-preparation",
    category: "HSC প্রস্তুতি",
    title: "HSC AI Preparation Coach",
    titleBn: "HSC পরীক্ষার AI প্রস্তুতি Prompt",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 6340,
    rating: 4.9,
    badge: "HSC 2026 · বিজ্ঞান · মানবিক · বাণিজ্য",
    prompt: `তুমি একজন HSC পরীক্ষার expert coach। আমার HSC পরীক্ষার প্রস্তুতিতে সম্পূর্ণ সহায়তা করো।

আমার তথ্য:
- Group: [Science / Humanities / Commerce / বিজ্ঞান / মানবিক / বাণিজ্য]
- পরীক্ষার মাস: [মাস ও বছর]
- GPA target: [লক্ষ্যমাত্রা, যেমন: A+ / 5.00 / Golden A+]
- সবচেয়ে দুর্বল বিষয়: [subject]
- অতিরিক্ত coaching আছে কি: [হ্যাঁ / না]

আমাকে দাও:
১. Subject-wise priority list (কোন বিষয়ে কতটুকু সময় দেবো)
২. Chapter importance — কোন chapter থেকে বেশি প্রশ্ন আসে
৩. Last 5 years board question pattern analysis (সাধারণ জ্ঞান থেকে)
৪. Revision strategy — পরীক্ষার ১ মাস আগের plan
৫. Exam hall tips — সময় ব্যবস্থাপনা, কোন প্রশ্ন আগে করবো
৬. Common mistakes HSC students করে — এবং কীভাবে এড়াবো

Group-specific focus:
- বিজ্ঞান: পদার্থ, রসায়ন, জীববিজ্ঞান, উচ্চতর গণিত
- মানবিক: বাংলা, ইংরেজি, ইতিহাস, ইসলাম শিক্ষা
- বাণিজ্য: হিসাববিজ্ঞান, ব্যবসায় সংগঠন, ফিন্যান্স`,
  },
  {
    id: "math-problem-solver",
    category: "পরীক্ষা প্রস্তুতি",
    title: "Math Problem Solver — Step by Step",
    titleBn: "গণিত সমস্যা সমাধান Prompt",
    price: 0,
    ai: ["ChatGPT", "Gemini"],
    uses: 12890,
    rating: 4.9,
    badge: "SSC · HSC · গণিত · পদার্থবিজ্ঞান",
    prompt: `তুমি একজন expert SSC/HSC গণিত শিক্ষক। নিচের গণিত সমস্যাটি ধাপে ধাপে সমাধান করো।

সমস্যা: [গণিত সমস্যাটি এখানে লিখো]
বিষয়: [গণিত / পদার্থবিজ্ঞান / রসায়ন]
Class: [SSC / HSC]
Chapter/Topic: [অধ্যায়ের নাম, যেমন: বীজগণিত / ত্রিকোণমিতি / পরিসংখ্যান]

সমাধান format:
Step 1: দেওয়া আছে (Given)
Step 2: বের করতে হবে (Find)
Step 3: সূত্র (Formula) — কোন সূত্র ব্যবহার করবো এবং কেন
Step 4: সমাধান (Solution) — প্রতিটি ধাপ আলাদা করে, বাংলায় ব্যাখ্যা সহ
Step 5: উত্তর (Answer) — unit সহ

এরপর দাও:
- এই ধরনের সমস্যা solve করার shortcut (যদি থাকে)
- Common mistakes যা students করে এই type-এর অংকে
- একই ধরনের আরও ২টি practice problem

ভাষা: বাংলায় step-by-step বুঝিয়ে দাও, যেন একা বসে পড়লেও বুঝতে পারি।`,
  },
  {
    id: "exam-fear-overcome",
    category: "পরীক্ষা প্রস্তুতি",
    title: "পরীক্ষার ভয় কমানোর Plan",
    titleBn: "পরীক্ষার anxiety কমানোর AI Prompt",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 4230,
    rating: 4.7,
    badge: "মানসিক প্রস্তুতি · পরীক্ষার আগে",
    prompt: `তুমি একজন student counselor এবং education psychologist। আমার পরীক্ষার anxiety ও ভয় কমাতে সাহায্য করো।

আমার সমস্যা:
- পরীক্ষার আগে: [যেমন: ঘুম আসে না, মাথা ব্যথা করে, সব ভুলে যাই, হাত কাঁপে]
- পরীক্ষার হলে: [যেমন: প্রশ্ন দেখে মাথা ফাঁকা হয়ে যায়, সময় কম মনে হয়]
- পড়ার সময়: [যেমন: মনোযোগ রাখতে পারি না, ফোন ছাড়তে পারি না]
- পরীক্ষা: [SSC / HSC]

আমাকে দাও:
১. পরীক্ষার রাতে করণীয় — ঘুমানোর আগের ৩০ মিনিট
২. পরীক্ষার সকালে routine — ঘুম থেকে উঠে হল পর্যন্ত
৩. হলে ঢোকার পর anxiety কমানোর ৩টি breathing technique
৪. প্রশ্ন দেখে মাথা ফাঁকা হলে কী করবো — step-by-step
৫. সময় বণ্টন কৌশল — কোন প্রশ্নে কত মিনিট
৬. পরীক্ষার পরে কী করবো (over-analyze না করার কৌশল)

Reminder: তুমি একা নও — বাংলাদেশে লক্ষ লক্ষ ছাত্র একই সমস্যায় পড়ে। এটি স্বাভাবিক।`,
  },
  {
    id: "ssc-english-grammar",
    category: "পরীক্ষা প্রস্তুতি",
    title: "SSC English Grammar Practice",
    titleBn: "SSC ইংরেজি Grammar Prompt",
    price: 49,
    ai: ["ChatGPT", "Claude"],
    uses: 5580,
    rating: 4.8,
    badge: "SSC · English 2nd Paper",
    prompt:
      "[Premium prompt — purchase to unlock the full SSC English Grammar pack: gap fill, right form of verbs, sentence transformation, tag questions, narration change — 200+ practice items with answer key and explanation, aligned to SSC 2026 board pattern.]",
  },
  {
    id: "hsc-group-notes",
    category: "HSC প্রস্তুতি",
    title: "Chapter Summary / Short Notes Maker",
    titleBn: "অধ্যায়ের সংক্ষিপ্ত নোট বানানোর Prompt",
    price: 0,
    ai: ["ChatGPT", "Gemini", "Claude"],
    uses: 7910,
    rating: 4.8,
    badge: "SSC · HSC · যেকোনো অধ্যায়",
    prompt: `তুমি একজন expert শিক্ষক। আমার [বিষয়]-এর "[অধ্যায়ের নাম]" অধ্যায়ের একটি complete short note তৈরি করে দাও।

বিষয়: [Subject]
অধ্যায়: [Chapter name]
Class: [SSC / HSC]
Board: [Dhaka / Rajshahi / Chittagong / Comilla / অন্য]

Short note-এ অন্তর্ভুক্ত করো:
১. 📌 মূল ধারণা (Key Concepts) — bullet point-এ, সহজ বাংলায়
২. 📊 গুরুত্বপূর্ণ সংজ্ঞা (Definitions) — MCQ-তে আসার মতো
৩. 🔢 সূত্রসমূহ (Formulas) — যদি থাকে, বাংলায় ব্যাখ্যা সহ
৪. 📝 মনে রাখার কৌশল (Mnemonics) — কঠিন বিষয় সহজে মনে রাখার trick
৫. ⭐ Exam-এ বেশি আসে এমন topics (High-priority points)
৬. ❌ Common mistakes — ছাত্ররা সাধারণত যেখানে ভুল করে

Format: Printable, easy-to-scan, bullet points ও table mix
Length: ১ পৃষ্ঠার মধ্যে (A4 size equivalent)

💡 এই notes-টি print করে পরীক্ষার আগের দিন revision করো।`,
  },
];

const CATEGORIES: Category[] = [
  "All",
  "রচনা লেখা",
  "অ্যাসাইনমেন্ট",
  "পড়ার রুটিন",
  "পরীক্ষা প্রস্তুতি",
  "সৃজনশীল প্রশ্ন",
  "HSC প্রস্তুতি",
];

const AIS: AIPlatform[] = ["ChatGPT", "Claude", "Gemini"];
const AI_FILTER = ["All AI", ...AIS] as const;
type AIFilter = (typeof AI_FILTER)[number];

const formatNumber = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : String(n);

const STATS_ROW = [
  { emoji: "🎓", label: "SSC 2026", detail: "পরীক্ষার্থীর সংখ্যা ২০ লাখ+" },
  { emoji: "📚", label: "বিষয়সমূহ", detail: "বাংলা, ইংরেজি, গণিত, বিজ্ঞান সহ সব" },
  { emoji: "🤖", label: "AI Tools", detail: "ChatGPT, Claude, Gemini" },
  { emoji: "✅", label: "বিনামূল্যে", detail: "সব free prompt, signup লাগে না" },
];

const FAQS = [
  {
    q: "SSC পরীক্ষার জন্য ChatGPT কীভাবে ব্যবহার করবো?",
    a: "ChatGPT.com-এ যান → এই page থেকে যেকোনো prompt copy করুন → paste করুন → [BRACKETS]-এর জায়গায় আপনার বিষয়/অধ্যায় লিখুন → Enter দিন। ChatGPT তৎক্ষণাৎ রচনা, সৃজনশীল উত্তর, MCQ বা নোট তৈরি করে দেবে।",
  },
  {
    q: "AI দিয়ে লেখা কি পরীক্ষায় দেওয়া যাবে?",
    a: "পরীক্ষার হলে AI ব্যবহার করা যায় না। তবে বাড়িতে assignment, নোট তৈরি ও practice-এর জন্য AI খুবই কার্যকর। AI-র output সরাসরি copy না করে বুঝে নিজের ভাষায় লেখা শিখলে পরীক্ষায় অনেক ভালো করবে।",
  },
  {
    q: "Gemini নাকি ChatGPT — SSC পড়ার জন্য কোনটা ভালো?",
    a: "ChatGPT (GPT-4) — রচনা, সৃজনশীল এবং বিস্তারিত explanation-এ সেরা। Gemini — গণিত ও বিজ্ঞানের সমস্যায় এবং দ্রুত তথ্য খুঁজতে ভালো। Claude — বাংলা লেখার মান ও প্রশ্নোত্তর-এ সেরা। তিনটিই বিনামূল্যে ব্যবহার করা যায়।",
  },
  {
    q: "পরীক্ষার কত আগে এই prompts ব্যবহার শুরু করা উচিত?",
    a: "পরীক্ষার ৩ মাস আগে থেকে শুরু করা সবচেয়ে ভালো। Study Plan prompt দিয়ে রুটিন বানাও, তারপর Chapter Notes ও MCQ Practice prompt দিয়ে প্রতিদিন পড়ো। পরীক্ষার ১ সপ্তাহ আগে Revision mode-এ যাও।",
  },
  {
    q: "বাংলা medium-এর ছাত্ররা কি ইংরেজিতে ChatGPT ব্যবহার করতে পারবে?",
    a: "হ্যাঁ — সম্পূর্ণ বাংলায় ChatGPT ব্যবহার করা যায়। এই page-এর সব prompt বাংলায় লেখা, সরাসরি copy করে paste করলেই বাংলায় উত্তর পাবে। ইংরেজি জানার দরকার নেই।",
  },
];

export default function SSCExamPrompts() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedAI, setSelectedAI] = useState<AIFilter>("All AI");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROMPTS.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (selectedAI !== "All AI" && !p.ai.includes(selectedAI as AIPlatform)) return false;
      if (
        q &&
        !p.title.toLowerCase().includes(q) &&
        !p.titleBn.toLowerCase().includes(q) &&
        !p.category.toLowerCase().includes(q) &&
        !p.badge.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [selectedCategory, selectedAI, searchQuery]);

  const handleCopy = async (p: ExamPrompt) => {
    try {
      await navigator.clipboard.writeText(p.prompt);
      setCopiedId(p.id);
      setTimeout(() => setCopiedId((c) => (c === p.id ? null : c)), 2000);
    } catch {
      // noop
    }
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 font-bengali">
      <SEOHead
        title="SSC ChatGPT Prompt বাংলা | রচনা, অ্যাসাইনমেন্ট, MCQ | BdPrompt"
        description="SSC ও HSC পরীক্ষার্থীদের জন্য বাংলা AI prompt — রচনা লেখা, অ্যাসাইনমেন্ট, MCQ practice, সৃজনশীল উত্তর, পড়ার রুটিন। ChatGPT, Claude, Gemini দিয়ে বিনামূল্যে।"
        keywords="SSC ChatGPT prompt বাংলা, HSC AI prompt Bangladesh, ছাত্রদের জন্য ChatGPT, AI দিয়ে অ্যাসাইনমেন্ট, বাংলা রচনা AI prompt, পড়ার রুটিন AI, SSC 2026 ChatGPT"
        canonicalUrl="https://bdprompt.com/ssc-exam-prompts"
        ogImage="https://bdprompt.com/og-image.png"
        ogType="website"
      />

      {/* NAV */}
      <nav className="bg-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">BdPrompt</span>
            <span className="text-[10px] font-semibold bg-amber-400 text-teal-950 px-1.5 py-0.5 rounded">
              BETA
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/explore" className="hover:text-amber-400 transition">Explore</Link>
            <Link to="/facebook-post-prompts" className="hover:text-amber-400 transition">Facebook</Link>
            <Link to="/youtube-script-prompts" className="hover:text-amber-400 transition">YouTube</Link>
            <Link to="/packs" className="hover:text-amber-400 transition">Packs</Link>
          </div>
          <Link
            to="/auth"
            className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-semibold text-sm px-4 py-2 rounded-lg transition"
          >
            বিনামূল্যে শুরু করুন
          </Link>
        </div>
      </nav>

      {/* URGENCY BANNER */}
      <div className="bg-red-600 text-white text-center text-sm py-2.5 px-4 font-semibold">
        🚨 SSC 2026 পরীক্ষা আসছে — এখনই AI দিয়ে প্রস্তুতি শুরু করুন!
      </div>

      {/* HERO */}
      <header className="bg-gradient-to-br from-teal-900 via-teal-800 to-green-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span>৪৭,০০০+ SSC ও HSC ছাত্র এই prompts ব্যবহার করছে</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            SSC ও HSC পরীক্ষার জন্য{" "}
            <span className="text-amber-400">ChatGPT Prompt বাংলা</span>
          </h1>
          <p className="text-base md:text-lg text-green-100 max-w-3xl mx-auto mb-8">
            রচনা লেখা, অ্যাসাইনমেন্ট, MCQ practice, সৃজনশীল উত্তর, পড়ার রুটিন — সব AI দিয়ে করো।
            ChatGPT, Claude ও Gemini-এ কাজ করে। সম্পূর্ণ বাংলায়, সম্পূর্ণ বিনামূল্যে।
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href="#prompts"
              className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition"
            >
              📚 Prompts দেখুন ↓
            </a>
            <Link
              to="/playground"
              className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Playground-এ Try করুন
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-green-100">
            {[
              "রচনা ও composition",
              "সৃজনশীল প্রশ্ন",
              "MCQ generator",
              "পড়ার রুটিন",
              "গণিত সমাধান",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-amber-400">✓</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS_ROW.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl mb-1">{s.emoji}</div>
              <div className="font-bold text-teal-900 text-base">{s.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW TO START BANNER */}
      <section className="max-w-6xl mx-auto px-4 pt-10">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-2">
          <p className="text-sm font-bold text-amber-900 mb-3">
            🚀 ৩ মিনিটে শুরু করো — account লাগে না:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            {[
              { step: "১", text: "নিচে থেকে prompt copy করো", icon: "📋" },
              { step: "২", text: "chat.openai.com বা claude.ai খোলো", icon: "🤖" },
              { step: "৩", text: "Paste করো → [BRACKETS] fill করো → Enter!", icon: "✨" },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-amber-100">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <span className="font-bold text-amber-800">Step {s.step}: </span>
                  <span className="text-gray-700">{s.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMPTS */}
      <section id="prompts" className="max-w-6xl mx-auto px-4 py-10">
        {/* Search */}
        <div className="mb-5">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Prompt খুঁজুন... (রচনা, MCQ, গণিত, HSC, assignment...)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-700 bg-white"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          {CATEGORIES.map((c) => {
            const active = selectedCategory === c;
            return (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                  active
                    ? "bg-teal-900 text-white border-teal-900"
                    : "bg-white text-gray-700 border-gray-300 hover:border-teal-700"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* AI pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {AI_FILTER.map((a) => {
            const active = selectedAI === a;
            return (
              <button
                key={a}
                onClick={() => setSelectedAI(a)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                  active
                    ? "bg-green-700 text-white border-green-700"
                    : "bg-white text-gray-700 border-gray-300 hover:border-green-500"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-5xl mb-3" aria-hidden>🔍</div>
            <p>কোনো prompt পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((p) => {
              const expanded = expandedId === p.id;
              const copied = copiedId === p.id;
              return (
                <article
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold bg-green-50 text-green-900 px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                      {p.price === 0 ? (
                        <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded">
                          Free
                        </span>
                      ) : (
                        <span className="text-xs font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                          ৳{p.price}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 text-right shrink-0">
                      <div>⭐ {p.rating}</div>
                      <div>{formatNumber(p.uses)} uses</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 leading-snug">{p.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{p.titleBn}</p>
                  <p className="text-xs text-green-700 font-medium mb-3">{p.badge}</p>

                  {/* AI chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.ai.map((a) => (
                      <span
                        key={a}
                        className="text-[11px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                      >
                        {a}
                      </span>
                    ))}
                  </div>

                  {/* Prompt preview */}
                  <div className="relative mb-1">
                    <pre
                      className={`bg-gray-900 text-gray-100 text-xs font-mono p-3 rounded-lg whitespace-pre-wrap overflow-hidden ${
                        expanded ? "" : "max-h-32"
                      }`}
                    >
                      {p.prompt}
                    </pre>
                    {!expanded && (
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-900 to-transparent rounded-b-lg pointer-events-none" />
                    )}
                  </div>
                  <button
                    onClick={() => setExpandedId(expanded ? null : p.id)}
                    className="mb-4 text-xs text-teal-800 font-semibold hover:underline text-left"
                  >
                    {expanded ? "সংক্ষেপে দেখুন ▲" : "পুরো prompt দেখুন ▼"}
                  </button>

                  {/* Actions */}
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => handleCopy(p)}
                      disabled={p.price > 0}
                      className={`flex-1 font-semibold text-sm py-2.5 rounded-lg transition ${
                        p.price > 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : copied
                          ? "bg-green-600 text-white"
                          : "bg-teal-900 hover:bg-teal-800 text-white"
                      }`}
                    >
                      {p.price > 0 ? "🔒 Premium" : copied ? "✅ Copied!" : "📋 Copy Prompt"}
                    </button>
                    <Link
                      to="/playground"
                      className="border border-teal-900 text-teal-900 hover:bg-teal-50 font-semibold text-sm px-4 py-2.5 rounded-lg transition"
                    >
                      Try →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="bg-teal-50 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-900 mb-10">
            সাধারণ প্রশ্ন
          </h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group bg-white rounded-lg shadow-sm p-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  {f.q}
                  <span className="text-teal-700 group-open:rotate-180 transition shrink-0 ml-2">▼</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
          />
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-800 mb-5 text-center">আরও Prompt দেখুন</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "🎬 YouTube Script", href: "/youtube-script-prompts" },
              { label: "🖼️ Image Generation", href: "/image-generation-prompts" },
              { label: "📱 Facebook Post", href: "/facebook-post-prompts" },
              { label: "💼 Business Prompts", href: "/explore/business" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-center border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-700 hover:border-teal-500 hover:text-teal-800 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            SSC 2026-এ{" "}
            <span className="text-amber-400">A+ পাওয়ার</span> প্রস্তুতি নাও AI দিয়ে
          </h2>
          <p className="text-green-100 max-w-2xl mx-auto mb-8">
            ৪৭,০০০+ ছাত্র ইতিমধ্যে এই prompts দিয়ে পড়াশোনা করছে। তুমিও শুরু করো —
            সম্পূর্ণ বিনামূল্যে, account ছাড়া।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#prompts"
              className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition"
            >
              📚 Prompt Copy করো
            </a>
            <Link
              to="/packs"
              className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Premium Study Pack →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-teal-950 text-teal-200 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-2 justify-between items-center">
          <p>© {new Date().getFullYear()} BdPrompt by Start BD — বাংলা Free AI Prompt Generator</p>
          <p>Made with 💚 in Bangladesh</p>
        </div>
      </footer>
    </div>
  );
}
