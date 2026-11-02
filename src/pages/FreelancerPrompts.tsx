import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

type AIPlatform = "ChatGPT" | "Claude" | "Gemini";

type Category =
  | "All"
  | "Fiverr & Upwork"
  | "CV & Cover Letter"
  | "Client Communication"
  | "Proposal Writing"
  | "Portfolio & Profile"
  | "Skill Building";

interface FreelancePrompt {
  id: string;
  category: Exclude<Category, "All">;
  title: string;
  titleBn: string;
  price: number;
  ai: AIPlatform[];
  uses: number;
  rating: number;
  tag: string;
  prompt: string;
}

const PROMPTS: FreelancePrompt[] = [
  {
    id: "fiverr-gig-description",
    category: "Fiverr & Upwork",
    title: "Fiverr Gig Description Writer",
    titleBn: "Fiverr গিগ ডেসক্রিপশন লেখার Prompt",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 12340,
    rating: 4.9,
    tag: "Fiverr · Level 1–2 · Top Rated",
    prompt: `তুমি একজন expert Fiverr copywriter যে বাংলাদেশি freelancers-দের গিগ optimize করতে সাহায্য করেছে। আমার Fiverr গিগের জন্য একটি high-converting description লিখে দাও।

আমার তথ্য:
- Service: [আপনার সার্ভিস, যেমন: Logo Design / Web Development / Video Editing / Content Writing]
- Experience: [কত বছর বা কত project]
- Special skills: [আপনার unique দক্ষতা]
- Tools: [ব্যবহার করা software/tools, যেমন: Photoshop, WordPress, Premiere Pro]
- Delivery time: [কত দিনে deliver করেন]
- Target buyer: [কোন ধরনের client চান]

Gig Description Structure:

**Opening Hook (2-3 lines):**
Buyer-এর সমস্যা বা desire দিয়ে শুরু — আপনার নাম বা service দিয়ে নয়।

**Why Choose Me (bullet points):**
✅ [Unique selling point 1]
✅ [Unique selling point 2]
✅ [Unique selling point 3]
✅ [Guarantee/revision policy]

**What You'll Get:**
• [Deliverable 1]
• [Deliverable 2]
• [Deliverable 3]

**My Process:**
Step 1 → Step 2 → Step 3 (simple, reassuring)

**CTA:**
"Ready to get started? Order now or send me a message — I respond within [X] hours."

Also provide:
- Gig Title (80 chars max): 3 SEO-optimized options
- Search Tags: 5 high-traffic Fiverr tags
- FAQ answers: 3 common buyer questions + professional answers

Language: English (Fiverr গিগ সবসময় English-এ)
Tone: Professional, confident, buyer-focused — "I" কম, "you/your" বেশি`,
  },
  {
    id: "upwork-proposal",
    category: "Fiverr & Upwork",
    title: "Upwork Proposal Writer",
    titleBn: "Upwork প্রপোজাল লেখার Prompt",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 9870,
    rating: 4.9,
    tag: "Upwork · Connects সাশ্রয় · High response rate",
    prompt: `তুমি একজন expert Upwork proposal writer। নিচের job post-এর জন্য একটি winning proposal লিখে দাও।

Job post: [Job description এখানে paste করো]

আমার background:
- Skills: [Your relevant skills]
- Relevant experience: [Similar projects you've done]
- Portfolio link: [Your portfolio URL if available]
- Location advantage: [Bangladesh — time zone, communication]

Proposal Structure (250-350 words):

Opening (NEVER start with "Dear Hiring Manager" or "I saw your job post"):
[Start with a direct insight about their specific problem or project — shows you read the job]

Middle:
• Address their specific requirements one by one
• Brief relevant experience — 1-2 sentences with proof
• What your approach would be
• 1 smart clarifying question (shows expertise, invites response)

Closing:
• Clear next step
• Availability
• Confident but not desperate CTA

Formatting:
- Short paragraphs (2-3 lines max)
- 1-2 bullet points only
- No bold/italic (Upwork strips formatting in some views)

Also provide:
- Subject line / Bid title: 3 options
- Follow-up message: if no reply after 3 days (50 words)

Tone: Confident, specific, solution-focused — NOT generic template`,
  },
  {
    id: "cv-writing",
    category: "CV & Cover Letter",
    title: "Professional CV / Resume Writer",
    titleBn: "পেশাদার CV বানানোর AI Prompt",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 14560,
    rating: 4.9,
    tag: "Job market · Fresh graduate · Experienced",
    prompt: `তুমি একজন professional CV writer এবং HR expert। আমার জন্য একটি ATS-friendly, professional CV লিখে দাও।

আমার তথ্য:
- নাম: [Full name]
- পদ যাচ্ছি: [Job title applying for, যেমন: Junior Web Developer / Marketing Executive / Graphic Designer]
- Education: [Degree, Institution, Year, CGPA/GPA]
- Experience: [Company, Role, Duration, Key responsibilities — bullet points]
- Skills: [Technical + soft skills]
- Projects: [Notable projects with brief description]
- Certifications: [Any courses, certificates]
- Location: [Dhaka / City name]
- Contact: [Email, LinkedIn, Phone, Portfolio]

CV Structure:

1. Professional Summary (3 lines):
Action verb শুরু + years of experience + key strength + what you bring to the role

2. Skills Section:
Technical Skills | Tools | Languages | Soft Skills

3. Experience (if any):
[Company] | [Role] | [Duration]
• Achievement-based bullet (STAR format: action + result with number)
• [2-3 bullets per role]

4. Education:
[Degree] | [Institution] | [Year] | [GPA]

5. Projects:
[Project Name] — [One-line description] | [Tech/Tools used]

6. Certifications & Courses

Format notes:
- ATS-friendly: no tables, graphics, or headers that scanners miss
- Length: 1 page (fresh graduate) or 2 pages (5+ years experience)
- Action verbs: Developed, Managed, Increased, Designed, Led
- Numbers wherever possible: "Increased sales by 30%" not "Improved sales"`,
  },
  {
    id: "cover-letter",
    category: "CV & Cover Letter",
    title: "Cover Letter — Any Job",
    titleBn: "চাকরির আবেদনের Cover Letter",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 8730,
    rating: 4.8,
    tag: "Corporate · NGO · Startup · Government",
    prompt: `তুমি একজন expert career coach ও cover letter writer। নিচের job-এর জন্য আমার একটি compelling cover letter লিখে দাও।

Job details:
- Company name: [Company]
- Position: [Job title]
- Job requirements (paste from posting): [Key requirements]
- How I found: [LinkedIn / Bdjobs / Referral / Website]

My background:
- Current/Recent role: [Title at Company]
- Key achievement relevant to this job: [Specific achievement with numbers]
- Why this company specifically: [Genuine reason — research the company]
- Education: [Degree, Institution]

Cover Letter Structure:

Para 1 — Opening (不 generic):
[Specific hook: a company achievement you admire + how your background connects] — NOT "I am writing to apply for..."

Para 2 — Why you're qualified:
Your most relevant experience + 1 specific achievement that maps to their need. Numbers = credibility.

Para 3 — Why this company:
1 specific reason you want THIS company (product, mission, culture, recent news). Shows you researched.

Para 4 — CTA:
Confident closing. "I'd welcome the opportunity to discuss how I can contribute to [Company]'s [specific goal]."

Signature: Professional

Length: 250-300 words (one page)
Tone: Confident, specific, authentic — not desperate
Format: Business letter format, plain text`,
  },
  {
    id: "client-onboarding-message",
    category: "Client Communication",
    title: "Client Onboarding Message Pack",
    titleBn: "Client Onboarding মেসেজ টেমপ্লেট",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 6780,
    rating: 4.8,
    tag: "First impression · Professional · Retain clients",
    prompt: `তুমি একজন freelance business expert। আমার জন্য client onboarding-এর জন্য প্রয়োজনীয় message templates লিখে দাও।

আমার service: [Your freelance service]
Platform: [Fiverr / Upwork / Direct client]
Communication style: [Formal / Semi-formal / Friendly professional]

Template 1 — Order Confirmation (নতুন order পাওয়ার পরে):
"Hi [Name], Thank you for your order! I'm excited to work on your [project]. Here's what happens next:..."
Include: Timeline, what you need from them, when to expect updates

Template 2 — Requirements Request:
Professional way to ask for project details/assets — specific questions, easy to answer

Template 3 — Progress Update (মাঝপথে):
Short update showing work is on track — builds confidence

Template 4 — Delivery Message (কাজ শেষে):
How to deliver work professionally — what's included, revision process, request for review

Template 5 — Revision Request Response:
Professional way to handle revision requests — even unreasonable ones

Template 6 — 5-Star Review Request:
Natural, non-pushy way to ask for review after successful delivery

Template 7 — Upsell Message:
Suggest additional service to existing satisfied client

Each template: English (for international clients) + বাংলা version (for local clients)
Tone: Professional but warm — builds long-term relationships`,
  },
  {
    id: "fiverr-profile-bio",
    category: "Portfolio & Profile",
    title: "Fiverr / LinkedIn Profile Bio",
    titleBn: "Fiverr ও LinkedIn প্রোফাইল Bio",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 7340,
    rating: 4.8,
    tag: "Profile optimization · First impression",
    prompt: `তুমি একজন personal branding expert। আমার Fiverr এবং LinkedIn profile-এর জন্য compelling bio লিখে দাও।

আমার তথ্য:
- Name: [Your name]
- Profession: [What you do, e.g. Graphic Designer / Full-stack Developer / Content Writer]
- Years of experience: [X years]
- Specialty: [Your niche, e.g. SaaS landing pages / E-commerce branding / YouTube thumbnails]
- Biggest achievement: [Numbers or milestone, e.g. 200+ projects, $50K+ earned, 100 5-star reviews]
- Tools/Skills: [Top 3-5 tools]
- Personality trait (work style): [e.g. detail-oriented / fast turnaround / creative problem-solver]

দাও:

1. Fiverr Profile Description (600 words max):
• Opening: Who you are + what you uniquely offer (NOT "I am a...")
• What makes you different: specific niche + approach
• Who you serve best: ideal client description
• What working with you looks like: process, communication, results
• Social proof: stats, testimonials hints
• CTA: "Let's create something great — check my gigs below"

2. LinkedIn About Section (2,000 chars):
• Hook: first 2 lines (shown before "See more")
• Story: how you got here
• What you do now + results
• Who you help
• Personal touch: 1 sentence about you as a person
• CTA: "Open to [opportunity type] — connect with me"

3. Twitter/X Bio (160 chars): punchy, keyword-rich
4. Instagram Bio (150 chars): line breaks, emoji, CTA`,
  },
  {
    id: "project-proposal-bd",
    category: "Proposal Writing",
    title: "Freelance Project Proposal — BD Client",
    titleBn: "বাংলাদেশি Client-এর জন্য Project Proposal",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 5450,
    rating: 4.8,
    tag: "Local market · Professional · Win more deals",
    prompt: `তুমি একজন freelance business consultant। বাংলাদেশি client-এর জন্য একটি professional project proposal লিখে দাও।

Project details:
- Client: [Company/Person name]
- Project type: [যেমন: Website development / Logo design / Digital marketing / App development]
- Client's requirement: [তারা কী চেয়েছে]
- My proposed solution: [কীভাবে করবো]
- Timeline: [কত সপ্তাহ/মাস]
- Budget: [Price range বা fixed price]

Proposal Structure:

১. Executive Summary (আধা পৃষ্ঠা):
Client-এর সমস্যা → আপনার solution → expected outcome — সংক্ষেপে

২. Understanding of Requirements:
Client যা বলেছে তা নিজের ভাষায় — proves you listened

৩. Proposed Solution:
- What you'll deliver (scope of work — specific)
- What is NOT included (prevents scope creep)
- Approach & methodology

৪. Timeline:
Week 1: [Milestone 1]
Week 2: [Milestone 2]
Delivery: [Final date]

৫. Investment (Price):
Package breakdown (না হলে client সব দেখে দরকষাকষি করে)
Payment terms: [50% advance, 50% on delivery]

৬. Why Choose Me:
3 bullet points — specific to this project

৭. Next Steps:
Clear CTA — "Reply to confirm, I'll send the contract within 24 hours"

Language: বাংলা (for local BD clients) — professional কিন্তু সহজ
Tone: Confident expert, not salesperson`,
  },
  {
    id: "skill-learning-roadmap",
    category: "Skill Building",
    title: "Freelance Skill Learning Roadmap",
    titleBn: "ফ্রিল্যান্সিং দক্ষতা শেখার রোডম্যাপ",
    price: 0,
    ai: ["ChatGPT", "Gemini", "Claude"],
    uses: 8910,
    rating: 4.9,
    tag: "Beginner → Pro · 3-6 months",
    prompt: `তুমি একজন expert freelance career coach। আমাকে [SKILL]-এ দক্ষ হয়ে Fiverr/Upwork-এ কাজ শুরু করার জন্য একটি realistic roadmap তৈরি করে দাও।

Skill: [যেমন: Graphic Design / Web Development / Video Editing / Digital Marketing / Content Writing / Data Entry / Virtual Assistant]
Current level: [Beginner / Some knowledge / Intermediate]
Time available per day: [X ঘণ্টা]
Goal: [First order পেতে চাই / Full-time income / Part-time income]
Budget for learning: [Free resources only / ৳X পর্যন্ত invest করতে পারবো]

Roadmap (Month-by-month):

Month 1 — Foundation:
• Free resources: [Specific YouTube channels, websites]
• What to learn first: [Core skills in order]
• Daily practice: [What to build/practice each day]
• Milestone: [What you should be able to do by end of month]

Month 2 — Portfolio Building:
• Build 3-5 portfolio pieces (even if free/spec work)
• Where to showcase: [Behance / GitHub / personal site]
• Join communities: [Facebook groups, Discord]

Month 3 — Launch:
• Fiverr gig setup: [How to structure gigs for this skill]
• First client strategy: [How to get first 1-3 orders]
• Pricing: [Starting price recommendation]

Ongoing:
• Upskilling priorities
• When to raise rates
• How to move from Fiverr to direct clients

Free tools for [SKILL]: [Specific list]
Paid tools worth it: [If any, with BD pricing]

Realistic income expectation: [Month 3 / Month 6 / Month 12]`,
  },
  {
    id: "rate-negotiation",
    category: "Client Communication",
    title: "Rate Negotiation & Price Response",
    titleBn: "দাম নিয়ে দরকষাকষির জবাব",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 7120,
    rating: 4.9,
    tag: "Don't undervalue · Professional response",
    prompt: `তুমি একজন freelance business expert। Client আমার quoted price কমাতে বলছে। Professional ও confident ভাবে respond করার template লিখে দাও।

My original quote: [AMOUNT]
Client's counter: [THEIR OFFER বা "বেশি হয়ে গেছে" বললে]
My service: [SERVICE TYPE]
My experience level: [Level]
What's included in my quote: [Scope summary]

৪টি situation-এর জন্য response:

Situation A — Client বলছে "budget নেই" (genuine):
Professional response যা scope কমিয়ে price maintain করে — NOT just lowering rate.
"I understand the budget constraints. Here's what I can offer at [LOWER AMOUNT]: [reduced scope]. For the full scope, the investment remains [ORIGINAL AMOUNT]."

Situation B — Client বলছে "অন্যরা কমে করে":
Response যা আপনার value explain করে without being defensive.

Situation C — Client বলছে "50% কমিয়ে দিন":
Firm but polite decline — and why slashing rates hurts quality.

Situation D — Client ভালো কিন্তু genuinely limited budget:
Creative solution: payment plan / phased project / smaller starter package.

Each response:
- English version (international clients)
- বাংলা version (local clients)
- Maximum 100 words — confident, not apologetic
- Never justify rate by saying "I'm new" or "I'll work hard"

Golden rule reminder: Rate কমানো মানে আপনার value কমানো — নিজেকে underprice করবেন না।`,
  },
  {
    id: "portfolio-case-study",
    category: "Portfolio & Profile",
    title: "Portfolio Case Study Writer",
    titleBn: "Portfolio Case Study লেখার Prompt",
    price: 49,
    ai: ["ChatGPT", "Claude"],
    uses: 4230,
    rating: 4.8,
    tag: "Converts browsers → buyers",
    prompt:
      "[Premium prompt — purchase to unlock the full portfolio case study template: Problem → Process → Solution → Results format with before/after metrics, client quote integration, SEO-optimized structure for Behance/portfolio sites, and 3 case study templates for Design, Development, and Marketing projects.]",
  },
  {
    id: "cold-email-outreach",
    category: "Proposal Writing",
    title: "Cold Email Outreach — Direct Clients",
    titleBn: "Cold Email দিয়ে সরাসরি Client পাওয়া",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 6780,
    rating: 4.8,
    tag: "Skip the platform fees · Direct clients",
    prompt: `তুমি একজন B2B sales copywriter। আমার [SERVICE]-এর জন্য potential clients-কে পাঠানোর একটি cold email sequence লিখে দাও।

My service: [SERVICE, e.g. web design, social media management, video editing]
Target client type: [e.g. Dhaka-based restaurants / international e-commerce stores / local NGOs]
My proof: [Portfolio link / Specific achievement]
Unique angle: [Why you over others]

Email 1 — Initial Outreach (Day 1):
Subject line options (5): [Curiosity + relevance + personalization]

Body (150 words max):
• Opening: Personal observation about THEIR business (shows research)
• Problem you noticed: specific, not generic
• Your solution: 1-2 sentences
• Social proof: 1 number or name-drop
• Low-friction CTA: "Would a 15-minute call be worth your time?"

Email 2 — Follow-up (Day 4, if no reply):
[Short, adds value — shares a quick tip relevant to their industry]

Email 3 — Final Follow-up (Day 8):
[Closing the loop — leaves door open, no pressure]

For each:
- English version (international)
- বাংলা version (local BD clients)

Subject line formula: [Specific result] for [Company type] — [Timeframe]
Example: "3 design changes that doubled conversion for Dhaka restaurants"

Important: Never start with "I hope this finds you well" or "My name is..."`,
  },
  {
    id: "income-tax-freelancer",
    category: "Skill Building",
    title: "Freelancer Income & Tax Guide Prompt",
    titleBn: "ফ্রিল্যান্সারের আয় ও ট্যাক্স গাইড",
    price: 0,
    ai: ["ChatGPT", "Gemini"],
    uses: 5560,
    rating: 4.7,
    tag: "Bangladesh tax · TIN · Income repatriation",
    prompt: `তুমি একজন বাংলাদেশি freelancer-দের জন্য financial advisor। আমাকে freelancing income সংক্রান্ত বাংলাদেশের নিয়মকানুন সহজ করে বুঝিয়ে দাও।

আমার situation:
- Platform: [Fiverr / Upwork / Direct / Mixed]
- Monthly earning: [Approximate USD amount]
- Withdrawal method: [Payoneer / Wise / Bank / bKash]
- TIN আছে কি: [হ্যাঁ / না]

আমাকে explain করো:

১. বাংলাদেশে freelancing income কি taxable?
২. কত টাকার উপরে tax দিতে হয়? (২০২৫-২৬ fiscal year)
৩. TIN registration কীভাবে করবো — step by step
৪. Income repatriation rules — কীভাবে বৈধভাবে টাকা আনবো
৫. Payoneer / Wise থেকে বাংলাদেশে টাকা আনার সবচেয়ে ভালো উপায়
৬. Tax exemption — freelancers কি কোনো ছাড় পান?
৭. Annual return কীভাবে file করবো
৮. NBR-এর freelancer-friendly policies কী আছে?

Important disclaimers to include:
- এটি সাধারণ তথ্য, professional tax advice নয়
- সর্বশেষ তথ্যের জন্য NBR website বা certified CA-এর পরামর্শ নিন

Language: সহজ বাংলা, technical terms-এ English সহ explanation`,
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Fiverr & Upwork",
  "CV & Cover Letter",
  "Client Communication",
  "Proposal Writing",
  "Portfolio & Profile",
  "Skill Building",
];

const AIS: AIPlatform[] = ["ChatGPT", "Claude", "Gemini"];
const AI_FILTER = ["All AI", ...AIS] as const;
type AIFilter = (typeof AI_FILTER)[number];

const AI_BADGE: Record<string, string> = {
  ChatGPT: "bg-green-100 text-green-800 border-green-200",
  Claude: "bg-orange-100 text-orange-800 border-orange-200",
  Gemini: "bg-blue-100 text-blue-800 border-blue-200",
};


const INCOME_STATS = [
  { label: "Fiverr শুরুর income", value: "$200–500/mo", note: "প্রথম ৩ মাস" },
  { label: "Level 1 seller", value: "$500–1,500/mo", note: "6–12 মাসে" },
  { label: "Top Rated Seller", value: "$2,000–5,000/mo", note: "2+ বছরে" },
  { label: "Direct clients", value: "Unlimited", note: "সর্বোচ্চ income" },
];

const FAQS = [
  {
    q: "Fiverr গিগ লেখায় ChatGPT ব্যবহার করা কি বৈধ?",
    a: "হ্যাঁ — Fiverr-এর Terms of Service-এ gig description-এ AI ব্যবহারের বিরুদ্ধে কোনো নিয়ম নেই। তবে gig-এর service delivery-তে AI use করলে buyer-কে জানানো professional practice। AI দিয়ে লেখা description review করে নিজের voice-এ customize করুন।",
  },
  {
    q: "Upwork proposal-এ AI লেখা detect হয়?",
    a: "Upwork এখনো proposal-এ AI detector ব্যবহার করে না। তবে generic AI-generated proposal সহজেই চেনা যায় কারণ এতে job-specific detail থাকে না। এই page-এর prompt দিয়ে তৈরি proposal-এ job post-এর specific detail যোগ করুন — তাহলে আর generic মনে হবে না।",
  },
  {
    q: "বাংলাদেশ থেকে Fiverr-এ সত্যিই কত আয় করা সম্ভব?",
    a: "বাস্তবসম্মত হিসাব: প্রথম ৩ মাস কঠিন — $0–200। 6 মাসে consistent $500–1,000 possible। 1 বছরে skilled freelancer $1,500–3,000। Top rated seller $5,000+ মাসে earn করছেন বাংলাদেশ থেকে। Key: right niche selection + consistent delivery + profile optimization.",
  },
  {
    q: "ChatGPT দিয়ে Upwork এ কাজ করা কি allowed?",
    a: "কাজের ধরন অনুযায়ী। Content writing, translation, coding, design — এগুলোতে AI tool use করা generally acceptable যদি client জানেন। কিছু client specifically 'no AI' বলে দেন — সেক্ষেত্রে follow করুন। Contract-এ AI policy উল্লেখ না থাকলে use করতে পারেন তবে quality নিশ্চিত করুন।",
  },
  {
    q: "Fiverr-এর বদলে সরাসরি client পাওয়া কি ভালো?",
    a: "দুটোই দরকার। Fiverr দিয়ে শুরু করুন — reviews ও portfolio build করতে। ২০% platform fee এড়াতে এবং বেশি control-এর জন্য direct clients চান। এই page-এর Cold Email prompt দিয়ে Fiverr-এর বাইরে direct outreach শুরু করুন। Ideal: Fiverr 50% + Direct 50%।",
  },
];

export default function FreelancerPrompts() {
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
        !p.tag.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [selectedCategory, selectedAI, searchQuery]);

  const handleCopy = async (p: FreelancePrompt) => {
    try {
      await navigator.clipboard.writeText(p.prompt);
      setCopiedId(p.id);
      setTimeout(() => setCopiedId((c) => (c === p.id ? null : c)), 2000);
    } catch {
      // noop
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-bengali">
      <SEOHead
        title="Fiverr Gig ও Upwork Proposal AI Prompt | BdPrompt"
        description="বাংলাদেশি freelancers-দের জন্য AI prompt — Fiverr gig, Upwork proposal, CV, cover letter, client message, cold email। ChatGPT দিয়ে বাংলায়।"
        keywords="Fiverr গিগ লেখার AI prompt, Upwork proposal prompt বাংলা, ফ্রিল্যান্সারদের জন্য AI prompt, CV বানানোর AI prompt, cover letter AI Bangladesh, freelancer ChatGPT"
        canonicalUrl="https://bdprompt.com/freelancer-prompts"
        ogImage="https://bdprompt.com/og-image.png"
        ogType="website"
        faqs={FAQS}
      />

      {/* NAV */}
      <nav className="bg-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">BdPrompt</span>
            <span className="text-[10px] font-semibold bg-amber-400 text-teal-950 px-1.5 py-0.5 rounded">BETA</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/explore" className="hover:text-amber-400 transition">Explore</Link>
            <Link to="/ad-copy-prompts" className="hover:text-amber-400 transition">Ad Copy</Link>
            <Link to="/ssc-exam-prompts" className="hover:text-amber-400 transition">SSC</Link>
            <Link to="/packs" className="hover:text-amber-400 transition">Packs</Link>
          </div>
          <Link to="/auth" className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-semibold text-sm px-4 py-2 rounded-lg transition">
            বিনামূল্যে শুরু করুন
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <header className="bg-gradient-to-br from-teal-900 via-cyan-900 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span>প্রতিটি prompt টেস্ট করা — Fiverr ও Upwork-এর বাস্তব কাজের ধারায় তৈরি</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            Freelancing-এর জন্য{" "}
            <span className="text-amber-400">AI Prompt বাংলা</span>
          </h1>
          <p className="text-base md:text-xl text-cyan-100 max-w-3xl mx-auto mb-8">
            Fiverr গিগ, Upwork proposal, CV, Cover Letter, client message, cold email — সব AI দিয়ে লিখুন।
            বাংলাদেশি freelancers-দের জন্য তৈরি। সম্পূর্ণ বিনামূল্যে।
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a href="#prompts" className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition">
              💼 Prompts দেখুন ↓
            </a>
            <Link to="/playground" className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition">
              Playground-এ Test করুন
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-cyan-100">
            {["Fiverr Gig", "Upwork Proposal", "CV & Cover Letter", "Client Messages", "Cold Email", "Tax Guide"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-amber-400">✓</span>{t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* INCOME STATS */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {INCOME_STATS.map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-bold text-teal-900">{s.value}</div>
              <div className="text-sm font-medium text-gray-700 mt-0.5">{s.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK TIP BANNER */}
      <section className="max-w-6xl mx-auto px-4 pt-10">
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 mb-2">
          <p className="text-sm font-bold text-cyan-900 mb-3">🚀 Fiverr-এ প্রথম order পাওয়ার fastest path:</p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
            {[
              { n: "১", text: "Fiverr Gig prompt দিয়ে optimized gig তৈরি করো" },
              { n: "২", text: "Profile Bio prompt দিয়ে professional profile সাজাও" },
              { n: "৩", text: "প্রথম ৩টি order-এ কম দামে দ্রুত deliver করো (reviews পেতে)" },
              { n: "৪", text: "Rate Negotiation prompt দিয়ে দাম maintain করো" },
            ].map((s) => (
              <div key={s.n} className="flex gap-2 bg-white rounded-lg p-3 border border-cyan-100">
                <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-xs flex items-center justify-center shrink-0 font-bold">{s.n}</span>
                <span className="text-gray-700 text-xs">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMPTS */}
      <section id="prompts" className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-5">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Prompt খুঁজুন... (Fiverr, CV, proposal, cold email...)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-700 bg-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {CATEGORIES.map((c) => {
            const active = selectedCategory === c;
            return (
              <button key={c} onClick={() => setSelectedCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${active ? "bg-teal-900 text-white border-teal-900" : "bg-white text-gray-700 border-gray-300 hover:border-teal-700"}`}>
                {c}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {AI_FILTER.map((a) => {
            const active = selectedAI === a;
            return (
              <button key={a} onClick={() => setSelectedAI(a)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${active ? "bg-cyan-600 text-white border-cyan-600" : "bg-white text-gray-700 border-gray-300 hover:border-cyan-400"}`}>
                {a}
              </button>
            );
          })}
        </div>

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
                <article key={p.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold bg-cyan-50 text-cyan-900 px-2 py-0.5 rounded">{p.category}</span>
                      {p.price === 0 ? (
                        <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded">Free</span>
                      ) : (
                        <span className="text-xs font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">৳{p.price}</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 text-right shrink-0">
                      <div>✓ টেস্ট করা</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">{p.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{p.titleBn}</p>
                  <p className="text-xs text-cyan-700 font-medium mb-3">{p.tag}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.ai.map((a) => (
                      <span key={a} className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${AI_BADGE[a] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}>{a}</span>
                    ))}
                  </div>
                  <div className="relative mb-1">
                    <pre className={`bg-gray-900 text-gray-100 text-xs font-mono p-3 rounded-lg whitespace-pre-wrap overflow-hidden ${expanded ? "" : "max-h-32"}`}>
                      {p.prompt}
                    </pre>
                    {!expanded && <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-900 to-transparent rounded-b-lg pointer-events-none" />}
                  </div>
                  <button onClick={() => setExpandedId(expanded ? null : p.id)} className="mb-4 text-xs text-teal-800 font-semibold hover:underline text-left">
                    {expanded ? "সংক্ষেপে দেখুন ▲" : "পুরো prompt দেখুন ▼"}
                  </button>
                  <div className="mt-auto flex gap-2">
                    <button onClick={() => handleCopy(p)} disabled={p.price > 0}
                      className={`flex-1 font-semibold text-sm py-2.5 rounded-lg transition ${p.price > 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : copied ? "bg-green-600 text-white" : "bg-teal-900 hover:bg-teal-800 text-white"}`}>
                      {p.price > 0 ? "🔒 Premium" : copied ? "✅ Copied!" : "📋 Copy Prompt"}
                    </button>
                    <Link to="/playground" className="border border-teal-900 text-teal-900 hover:bg-teal-50 font-semibold text-sm px-4 py-2.5 rounded-lg transition">
                      Try →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* MODEL GUIDE & USAGE RULES */}
      <section className="bg-white py-16" aria-labelledby="fl-model-guide">
        <div className="max-w-6xl mx-auto px-4">
          <h2 id="fl-model-guide" className="text-3xl md:text-4xl font-bold text-center text-teal-900 mb-4">
            মডেল গাইড ও ব্যবহারের নিয়ম
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            সঠিক AI মডেল বেছে নিলে এবং নিয়মগুলো মানলে এই prompts থেকে সবচেয়ে ভালো ফল পাবেন।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              { name: "ChatGPT", badge: "bg-green-100 text-green-800 border-green-300", best: "Gig description, proposal, cold email", why: "Structure ও instruction follow করতে সবচেয়ে ভালো — দীর্ঘ, বিন্যাসযুক্ত লেখায় ধারাবাহিক থাকে।" },
              { name: "Claude", badge: "bg-orange-100 text-orange-800 border-orange-300", best: "Cover letter, client message", why: "বাংলা লেখায় natural ও মানবিক সুর — negotiation বা client communication-এর মতো সূক্ষ্ম লেখায় সেরা।" },
              { name: "Gemini", badge: "bg-blue-100 text-blue-800 border-blue-300", best: "Skill building, research", why: "দ্রুত ও বিনামূল্যে — research, skill planning এবং তুলনামূলক বিশ্লেষণের কাজে ভালো।" },
            ].map((m) => (
              <div key={m.name} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <span className={`inline-block text-sm font-bold px-3 py-1 rounded-full border mb-3 ${m.badge}`}>{m.name}</span>
                <p className="text-sm font-semibold text-gray-900 mb-2">সেরা কাজ: {m.best}</p>
                <p className="text-sm text-gray-600">{m.why}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">ব্যবহারের ৬টি নিয়ম</h3>
          <ol className="space-y-4 max-w-3xl mx-auto">
            {[
              { title: "[BRACKETS] পূরণ করুন", detail: "প্রতিটি [PLACEHOLDER]-এর জায়গায় নিজের তথ্য বসান। খালি bracket মানে generic লেখা, আর generic proposal মানে reject।" },
              { title: "Job post থেকে specific detail নিন", detail: "Client-এর requirement-এর শব্দ ও প্রয়োজন prompt-এ ঢুকিয়ে দিন — এটাই AI লেখাকে personalized করে।" },
              { title: "Output নিজের voice-এ edit করুন", detail: "AI লেখা starting point, শেষ কপি নয়। পুরোটা নিজে পড়ে দরকারমতো বাংলা-English মেশান।" },
              { title: "Fact-check করুন", detail: "Income, tax, pricing সংক্রান্ত সংখ্যা AI ভুল দিতে পারে — ক্লায়েন্টের সামনে পাঠানোর আগে যাচাই করুন।" },
              { title: "স্বচ্ছ থাকুন", detail: "Service delivery-তে AI ব্যবহার করলে client-কে জানান। Gig-এ AI use-এর বিরুদ্ধে নিয়ম নেই, তবে সততাই professional practice।" },
              { title: "এক প্রম্পট, এক কাজ", detail: "Gig-এর জন্য gig prompt, proposal-এর জন্য proposal prompt — প্রতিটি prompt নির্দিষ্ট কাজের জন্য তৈরি।" },
            ].map((r, i) => (
              <li key={i} className="flex gap-4 items-start bg-gray-50 rounded-lg p-4">
                <span className="w-8 h-8 rounded-full bg-teal-900 text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-0.5">{r.title}</p>
                  <p className="text-sm text-gray-600">{r.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cyan-50 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-900 mb-10">সাধারণ প্রশ্ন</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group bg-white rounded-lg shadow-sm p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  {f.q}
                  <span className="text-teal-700 group-open:rotate-180 transition shrink-0 ml-2">▼</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-800 mb-5 text-center">আরও Prompt দেখুন</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "📢 Ad Copy", href: "/ad-copy-prompts" },
              { label: "📱 Facebook Post", href: "/facebook-post-prompts" },
              { label: "🎬 YouTube Script", href: "/youtube-script-prompts" },
              { label: "🎓 SSC Exam", href: "/ssc-exam-prompts" },
            ].map((link) => (
              <Link key={link.href} to={link.href} className="text-center border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-700 hover:border-teal-500 hover:text-teal-800 transition">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-teal-900 via-cyan-900 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            আজই আপনার{" "}
            <span className="text-amber-400">Freelancing Career</span> শুরু করুন
          </h2>
          <p className="text-cyan-100 max-w-2xl mx-auto mb-8">
            Fiverr ও Upwork-এর জন্য তৈরি ও টেস্ট-করা বাংলা prompt — বিনামূল্যে কপি করে আজই শুরু করুন।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#prompts" className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition">
              📋 Prompt Copy করুন
            </a>
            <Link to="/packs" className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition">
              Freelancer Pack →
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-teal-950 text-teal-200 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-2 justify-between items-center">
          <p>© {new Date().getFullYear()} BdPrompt by Start BD — বাংলা Free AI Prompt Generator</p>
          <p>Made with 💚 in Bangladesh</p>
        </div>
      </footer>
    </div>
  );
}
