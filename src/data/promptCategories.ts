export interface PromptItem {
  title: string;
  copyText: string;
  usage: string;
}

export interface PromptCategory {
  slug: string;
  title: string;
  description: string;
  icon: string;
  prompts: PromptItem[];
}

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    slug: "seo-bangla",
    title: "SEO-এর জন্য সেরা ১০টি ChatGPT প্রম্পট (২০২৬)",
    description: "বাংলায় এসইও কন্টেন্ট প্ল্যানিং, কিওয়ার্ড রিসার্চ এবং মেটা ডেসক্রিপশন লেখার জন্য সেরা চ্যাটজিপিটি প্রম্পট কালেকশন।",
    icon: "Search",
    prompts: [
      {
        title: "Keyword Research Strategy",
        copyText: "Act as an SEO expert. Create a keyword strategy for a [niche] website in Bangladesh targeting low competition keywords with high search volume. Include primary keywords, long-tail keywords, and LSI keywords. Format the output as a table with columns: Keyword, Search Intent, Competition Level, Priority.",
        usage: "নতুন ব্লগের জন্য কিওয়ার্ড খুঁজে বের করতে ব্যবহার করুন।"
      },
      {
        title: "Meta Description Generator",
        copyText: "Write a click-worthy meta description for a blog post about [topic] within 155 characters. Include the primary keyword [keyword] naturally. Make it compelling with a clear value proposition and a subtle call-to-action.",
        usage: "ব্লগ পোস্টের মেটা ডেসক্রিপশন লিখতে।"
      },
      {
        title: "SEO Content Outline Creator",
        copyText: "Create a comprehensive SEO-optimized content outline for an article about [topic]. Include: H1 title (with keyword), H2 and H3 subheadings, key points to cover under each section, word count recommendations, internal linking opportunities, and FAQ section ideas.",
        usage: "আর্টিকেল লেখার আগে স্ট্রাকচার তৈরি করতে।"
      },
      {
        title: "Title Tag Optimizer",
        copyText: "Generate 10 SEO-optimized title tag variations for an article about [topic]. Each title should be under 60 characters, include the primary keyword [keyword] near the beginning, and be compelling enough to improve click-through rate. Include power words where appropriate.",
        usage: "ব্লগ পোস্টের টাইটেল অপটিমাইজ করতে।"
      },
      {
        title: "Internal Linking Planner",
        copyText: "I have a website about [niche] with articles on [list of topics]. Create an internal linking strategy that connects these articles logically. Suggest anchor text variations and explain which articles should link to which for optimal SEO benefit.",
        usage: "ওয়েবসাইটের ইন্টারনাল লিংকিং প্ল্যান করতে।"
      },
      {
        title: "Featured Snippet Optimizer",
        copyText: "Rewrite the following content to optimize it for Google Featured Snippets. Format it appropriately (paragraph, list, or table) based on the query type. The target keyword is [keyword]. Content: [paste content]",
        usage: "গুগল ফিচার্ড স্নিপেটে র‍্যাংক করতে।"
      },
      {
        title: "Local SEO Content Writer",
        copyText: "Write a locally optimized blog post about [topic] targeting [city/area] in Bangladesh. Include local keywords naturally, mention nearby landmarks or areas, and include a section addressing local audience needs. Target keyword: [keyword].",
        usage: "লোকাল এসইও কন্টেন্ট লিখতে।"
      },
      {
        title: "SEO Audit Checklist Generator",
        copyText: "Create a comprehensive on-page SEO audit checklist for a [type of website] website. Include items for: title tags, meta descriptions, header tags, image optimization, URL structure, internal linking, content quality, mobile optimization, and page speed factors.",
        usage: "ওয়েবসাইট এসইও অডিট করতে।"
      },
      {
        title: "Competitor Analysis Prompt",
        copyText: "Act as an SEO analyst. Analyze the content strategy of a competitor website in the [niche] industry. Based on common SEO practices, suggest: content gaps I can fill, keyword opportunities they might be missing, content formats that perform well in this niche, and unique angles I can take.",
        usage: "প্রতিযোগী বিশ্লেষণ করতে।"
      },
      {
        title: "Link Building Outreach Email",
        copyText: "Write a personalized outreach email to request a backlink from a website in the [niche] industry. My article is about [topic]. Make the email friendly, explain the mutual benefit, and avoid sounding spammy. Keep it under 150 words.",
        usage: "ব্যাকলিংক আউটরিচ ইমেইল লিখতে।"
      }
    ]
  },
  {
    slug: "marketing",
    title: "সোশ্যাল মিডিয়া মার্কেটিং এর জন্য ভাইরাল প্রম্পট",
    description: "ফেসবুক ও ইনস্টাগ্রাম ক্যাপশন, অ্যাড কপি এবং কন্টেন্ট ক্যালেন্ডার তৈরির জন্য সেরা মার্কেটিং প্রম্পট।",
    icon: "Megaphone",
    prompts: [
      {
        title: "Facebook Ad Copy",
        copyText: "Write a persuasive Facebook ad copy for [product/service] targeting young adults (18-35) in Dhaka. Use emojis sparingly, a friendly tone, and include: attention-grabbing headline, pain point addressed, key benefits (3 bullet points), social proof element, and clear CTA. Keep it under 125 words.",
        usage: "ফেসবুক অ্যাডের জন্য আকর্ষণীয় ক্যাপশন।"
      },
      {
        title: "Instagram Caption Generator",
        copyText: "Write 5 engaging Instagram captions for a [brand type] posting about [topic]. Each caption should: start with a hook, tell a mini-story or share value, include a call-to-action, and suggest 15-20 relevant hashtags. Vary the tone from casual to inspirational.",
        usage: "ইনস্টাগ্রাম পোস্টের ক্যাপশন লিখতে।"
      },
      {
        title: "Content Calendar Planner",
        copyText: "Create a 30-day social media content calendar for a [business type] in Bangladesh. Include: post type (image/video/carousel/story), caption theme, best posting time for Bangladesh audience, content pillars to cover, and engagement tactics. Format as a weekly table.",
        usage: "মাসিক কন্টেন্ট প্ল্যান তৈরি করতে।"
      },
      {
        title: "Viral Hook Generator",
        copyText: "Generate 20 scroll-stopping hooks for social media posts about [topic/niche]. Include: controversial takes, curiosity gaps, relatable statements, challenge/question hooks, and story starters. Each hook should be under 10 words and designed to stop the scroll.",
        usage: "ভাইরাল হুক তৈরি করতে।"
      },
      {
        title: "Hashtag Strategy Creator",
        copyText: "Create a comprehensive hashtag strategy for a [niche] account on Instagram. Include: 10 high-volume hashtags (1M+ posts), 15 medium-volume hashtags (100K-1M posts), 10 low-volume niche hashtags (under 100K), and 5 branded hashtag ideas. Explain when to use each set.",
        usage: "হ্যাশট্যাগ স্ট্র্যাটেজি তৈরি করতে।"
      },
      {
        title: "Story Engagement Prompts",
        copyText: "Create 15 Instagram/Facebook Story ideas for a [business type] that drive engagement. Include: poll ideas, quiz questions, 'this or that' options, question stickers prompts, countdown event ideas, and behind-the-scenes concepts. Each should encourage interaction.",
        usage: "স্টোরি এনগেজমেন্ট বাড়াতে।"
      },
      {
        title: "Influencer Outreach Template",
        copyText: "Write a professional yet friendly DM template to reach out to micro-influencers (10K-50K followers) for a collaboration. My brand is [brand name] in the [industry]. Include: personalized opening, clear collaboration offer, what's in it for them, and next steps. Keep it under 100 words.",
        usage: "ইনফ্লুয়েন্সার কোলাবোরেশনের জন্য।"
      },
      {
        title: "Campaign Performance Analysis",
        copyText: "Act as a social media analyst. Based on the following metrics for my recent campaign, provide insights and recommendations: Reach: [X], Impressions: [X], Engagement Rate: [X]%, Click-through Rate: [X]%, Conversions: [X]. What worked, what didn't, and how can I improve?",
        usage: "ক্যাম্পেইন পারফরম্যান্স বিশ্লেষণ করতে।"
      },
      {
        title: "Audience Persona Builder",
        copyText: "Create 3 detailed buyer personas for a [product/service] targeting the Bangladesh market. For each persona include: name, age, occupation, income level, pain points (3-5), goals (3-5), social media platforms used, content preferences, and purchasing behavior.",
        usage: "টার্গেট অডিয়েন্স বুঝতে।"
      },
      {
        title: "A/B Test Copy Variants",
        copyText: "Create 3 A/B test variations for a Facebook ad about [product/service]. Each variant should have: different headline approach (benefit-focused, curiosity-driven, social proof), different hook, different CTA. Explain which audience segment each might work best for.",
        usage: "A/B টেস্টের জন্য কপি ভ্যারিয়েন্ট।"
      }
    ]
  },
  {
    slug: "freelancing",
    title: "আপওয়ার্ক ও ফাইভার কভার লেটার লেখার প্রম্পট",
    description: "ফ্রিল্যান্সিং প্লাটফর্মে জব পাওয়ার জন্য প্রফেশনাল কভার লেটার ও প্রপোজাল লেখার প্রম্পট।",
    icon: "Briefcase",
    prompts: [
      {
        title: "Upwork Proposal Writer",
        copyText: "Write a winning Upwork proposal for this job: [paste job description]. I am a [your profession] with [X] years of experience. My relevant skills are [skills]. Include: personalized opening that references their specific needs, 2-3 bullet points showing relevant experience, a brief approach to their project, and a soft CTA. Keep it under 150 words.",
        usage: "আপওয়ার্ক প্রপোজাল লিখতে।"
      },
      {
        title: "Fiverr Gig Description",
        copyText: "Write a compelling Fiverr gig description for a [service type] gig. Include: attention-grabbing title (under 80 characters), detailed description highlighting benefits and process, 3 package tiers (Basic, Standard, Premium) with clear deliverables, FAQs section (5 common questions), and requirements from buyers.",
        usage: "ফাইভার গিগ ডেসক্রিপশন লিখতে।"
      },
      {
        title: "Client Communication Template",
        copyText: "Write professional message templates for the following freelance situations: 1) Initial response to a job invite, 2) Asking clarifying questions about a project, 3) Providing a project update, 4) Handling a revision request politely, 5) Following up when client goes silent. Keep each under 75 words.",
        usage: "ক্লায়েন্ট কমিউনিকেশনের জন্য।"
      },
      {
        title: "Rate Negotiation Script",
        copyText: "Help me negotiate my freelance rate. The client offered [amount] for [project type], but my rate is [your rate]. Write a polite response that: acknowledges their budget, explains my value proposition, suggests a middle ground or scope adjustment, and keeps the door open for future work.",
        usage: "রেট নেগোসিয়েশনের জন্য।"
      },
      {
        title: "Portfolio Description Writer",
        copyText: "Write compelling portfolio project descriptions for my freelance profile. Project: [describe project]. Include: project overview (2 sentences), challenge faced, my approach/solution, results achieved (with metrics if possible), and tools/skills used. Make it concise but impactful.",
        usage: "পোর্টফোলিও প্রজেক্ট ডেসক্রিপশন লিখতে।"
      },
      {
        title: "Testimonial Request Email",
        copyText: "Write a friendly email to request a testimonial from a satisfied client. The project was [project type] completed [timeframe] ago. Make it easy for them by: thanking them, explaining why reviews help, suggesting 2-3 specific points they could mention, and offering to draft something they can edit.",
        usage: "ক্লায়েন্ট টেস্টিমোনিয়াল রিকোয়েস্ট করতে।"
      },
      {
        title: "Project Scope Clarifier",
        copyText: "Based on this vague project requirement: [paste requirement], generate a list of 10-15 clarifying questions I should ask the client before providing a quote. Organize questions by category: project goals, deliverables, timeline, technical requirements, and revision policy.",
        usage: "প্রজেক্ট স্কোপ ক্লিয়ার করতে।"
      },
      {
        title: "Invoice Follow-up Message",
        copyText: "Write 3 versions of a polite payment follow-up message for an overdue invoice: 1) Gentle reminder (3 days overdue), 2) Firm but friendly (1 week overdue), 3) Final notice (2+ weeks overdue). Include invoice details placeholder and keep professional tone throughout.",
        usage: "পেমেন্ট ফলোআপ মেসেজ পাঠাতে।"
      },
      {
        title: "Upselling Services Email",
        copyText: "Write an email to an existing client offering additional services. I just completed [project type] for them. I want to offer [additional service]. Make it: value-focused (not pushy), reference the successful project, explain how this adds value, and include a special offer for existing clients.",
        usage: "এক্সিস্টিং ক্লায়েন্টদের আপসেল করতে।"
      },
      {
        title: "Long-term Client Retention",
        copyText: "Create a client retention strategy message for a freelancer offering [service type]. Include: thank you for the ongoing partnership, summary of work completed together, proactive suggestions for their business, exclusive retainer offer details, and easy next steps. Keep it warm and professional.",
        usage: "লং-টার্ম ক্লায়েন্ট ধরে রাখতে।"
      }
    ]
  },
  {
    slug: "students",
    title: "অ্যাসাইনমেন্ট ও থিসিস পেপার লেখার জাদুকরী প্রম্পট",
    description: "স্কুল, কলেজ ও বিশ্ববিদ্যালয়ের অ্যাসাইনমেন্ট, রিসার্চ পেপার এবং প্রেজেন্টেশন তৈরির প্রম্পট।",
    icon: "GraduationCap",
    prompts: [
      {
        title: "Assignment Outline Generator",
        copyText: "Create a detailed outline for a [word count]-word assignment on [topic] for my [course/subject] class. Include: introduction with thesis statement, 3-5 main body sections with key arguments, supporting evidence suggestions, counterargument section, and conclusion. Follow academic writing standards.",
        usage: "অ্যাসাইনমেন্ট আউটলাইন তৈরি করতে।"
      },
      {
        title: "Thesis Introduction Writer",
        copyText: "Help me write a compelling introduction for my thesis/dissertation on [topic]. The research question is [question]. Include: background context, problem statement, research gap being addressed, objectives, significance of the study, and a brief methodology overview. Aim for 500 words, academic tone.",
        usage: "থিসিস ইন্ট্রোডাকশন লিখতে।"
      },
      {
        title: "Literature Review Helper",
        copyText: "I'm writing a literature review on [topic]. I have sources discussing [main themes]. Help me: organize these themes logically, write transition sentences between sections, identify gaps in existing research, and synthesize (not just summarize) the key findings. Academic tone required.",
        usage: "লিটারেচার রিভিউ লিখতে।"
      },
      {
        title: "Research Methodology Section",
        copyText: "Write a research methodology section for a [quantitative/qualitative/mixed] study on [topic]. Include: research design justification, population and sampling technique, data collection methods, data analysis approach, ethical considerations, and limitations. Follow standard academic format.",
        usage: "রিসার্চ মেথডলজি লিখতে।"
      },
      {
        title: "Data Analysis Explainer",
        copyText: "Explain how to analyze [type of data] for a research project on [topic]. Include: appropriate statistical tests or qualitative analysis methods, step-by-step process, how to interpret results, and how to present findings in tables/charts. Use simple language suitable for a university student.",
        usage: "ডাটা অ্যানালাইসিস বুঝতে।"
      },
      {
        title: "Citation Generator Guide",
        copyText: "Convert these source details into proper [APA/MLA/Chicago/Harvard] format citations: [paste source details]. Also explain the general rules for citing: journal articles, books, websites, and conference papers in this style.",
        usage: "সাইটেশন ফরম্যাট করতে।"
      },
      {
        title: "Presentation Script Creator",
        copyText: "Create a presentation script for a [X]-minute presentation on [topic]. Include: engaging opening hook, slide-by-slide talking points, key transitions, audience engagement questions, and strong conclusion with call-to-action. Also suggest visual elements for each slide.",
        usage: "প্রেজেন্টেশন স্ক্রিপ্ট লিখতে।"
      },
      {
        title: "Essay Structure Template",
        copyText: "Write an essay template/structure for a [word count]-word [essay type: argumentative/expository/compare-contrast] essay on [topic]. Include: thesis statement formula, topic sentence examples for body paragraphs, evidence integration tips, and conclusion strategies. Make it reusable.",
        usage: "এসে স্ট্রাকচার বুঝতে।"
      },
      {
        title: "Exam Preparation Notes",
        copyText: "Create comprehensive study notes for [subject/topic] covering: key concepts and definitions, important formulas/theories, common exam questions and how to approach them, memory tricks/mnemonics, and quick revision bullet points. Format for easy scanning.",
        usage: "এক্সাম প্রিপারেশনের জন্য।"
      },
      {
        title: "Academic Email Writer",
        copyText: "Write a professional email to my [professor/supervisor] regarding [topic: deadline extension/meeting request/feedback query/recommendation letter]. Include appropriate greeting, clear request with justification, relevant details, and polite closing. Keep it concise and respectful.",
        usage: "প্রফেসরকে ইমেইল লিখতে।"
      }
    ]
  },
  {
    slug: "coding",
    title: "পাইথন ও জাভাস্ক্রিপ্ট কোড ফিক্স করার প্রম্পট",
    description: "কোড ডিবাগিং, রিফ্যাক্টরিং এবং নতুন ফিচার তৈরির জন্য ডেভেলপারদের প্রম্পট।",
    icon: "Code",
    prompts: [
      {
        title: "Debug Python Code",
        copyText: "Debug this Python code. Error message: [paste error]. Code: [paste code]. Explain: 1) What's causing the error, 2) Step-by-step fix, 3) How to prevent this in the future, 4) Provide the corrected code with comments explaining changes.",
        usage: "পাইথন কোড ডিবাগ করতে।"
      },
      {
        title: "JavaScript Refactoring",
        copyText: "Refactor this JavaScript code to follow best practices: [paste code]. Improve: variable naming, function structure, error handling, ES6+ features usage, and performance. Explain each change made and why it's an improvement.",
        usage: "জাভাস্ক্রিপ্ট কোড রিফ্যাক্টর করতে।"
      },
      {
        title: "API Documentation Writer",
        copyText: "Write comprehensive API documentation for this endpoint: [describe endpoint or paste code]. Include: endpoint URL and method, request parameters/body with types, authentication requirements, response format with examples (success and error), rate limits, and code examples in JavaScript and Python.",
        usage: "API ডকুমেন্টেশন লিখতে।"
      },
      {
        title: "Unit Test Generator",
        copyText: "Write unit tests for this [Python/JavaScript] function: [paste function]. Use [pytest/Jest/Mocha] framework. Include: test cases for normal inputs, edge cases, error conditions, and mock dependencies if needed. Aim for high code coverage.",
        usage: "ইউনিট টেস্ট লিখতে।"
      },
      {
        title: "Code Review Helper",
        copyText: "Review this code as a senior developer: [paste code]. Provide feedback on: code quality and readability, potential bugs or issues, security concerns, performance optimizations, and adherence to [language/framework] best practices. Be constructive.",
        usage: "কোড রিভিউ করতে।"
      },
      {
        title: "Performance Optimizer",
        copyText: "Optimize this code for better performance: [paste code]. Current issue: [describe issue if known]. Analyze: time complexity, memory usage, database query efficiency (if applicable). Provide optimized version with benchmarks comparison.",
        usage: "কোড পারফরম্যান্স অপটিমাইজ করতে।"
      },
      {
        title: "Error Message Explainer",
        copyText: "Explain this error message in simple terms: [paste error message]. I'm working with [language/framework]. Tell me: what this error means, common causes, how to fix it step-by-step, and how to debug similar errors in the future.",
        usage: "এরর মেসেজ বুঝতে।"
      },
      {
        title: "Clean Code Converter",
        copyText: "Convert this messy/quick code into clean, production-ready code following SOLID principles: [paste code]. Add: proper error handling, type hints/JSDoc comments, logging, and modular structure. Explain the architectural decisions.",
        usage: "ক্লিন কোড লিখতে।"
      },
      {
        title: "Database Query Helper",
        copyText: "Write an optimized [SQL/MongoDB] query for: [describe what you need]. Database schema: [describe tables/collections]. The query should be: efficient, properly indexed (suggest indexes), handle edge cases, and include explanation of the query logic.",
        usage: "ডাটাবেস কোয়েরি লিখতে।"
      },
      {
        title: "Git Commit Message Writer",
        copyText: "Write clear, conventional commit messages for these changes: [describe changes]. Follow the format: type(scope): subject. Include: feat, fix, docs, style, refactor, test, chore as appropriate. Write both short (50 char) and extended descriptions.",
        usage: "গিট কমিট মেসেজ লিখতে।"
      }
    ]
  },
  {
    slug: "business",
    title: "ইমেইল মার্কেটিং ও কোল্ড ইমেইল লেখার প্রম্পট",
    description: "বিজনেস কমিউনিকেশন, সেলস ইমেইল এবং ক্লায়েন্ট ফলোআপের জন্য প্রফেশনাল প্রম্পট।",
    icon: "Mail",
    prompts: [
      {
        title: "Cold Email Template",
        copyText: "Write a cold email to [target: CEO/Marketing Manager/HR] at a [company type] company. My offer: [your service/product]. Include: personalized subject line options (3), opening that shows research on their company, value proposition, social proof, and low-friction CTA. Keep under 150 words.",
        usage: "কোল্ড ইমেইল লিখতে।"
      },
      {
        title: "Sales Follow-up Sequence",
        copyText: "Create a 5-email follow-up sequence for a [product/service] sales campaign. Each email should: have a different angle/value proposition, include subject line, maintain friendly persistence without being pushy, and have clear CTA. Space: Day 1, 3, 7, 14, 21.",
        usage: "সেলস ফলোআপ সিকোয়েন্স তৈরি করতে।"
      },
      {
        title: "Meeting Request Email",
        copyText: "Write a professional email requesting a meeting with [person/role] to discuss [topic]. Include: why this meeting would be valuable for them, proposed agenda (3-4 points), suggested times (or Calendly link placeholder), and meeting duration. Keep it concise and respectful of their time.",
        usage: "মিটিং রিকোয়েস্ট ইমেইল লিখতে।"
      },
      {
        title: "Partnership Proposal Email",
        copyText: "Write a partnership proposal email to [company type] company. My company offers [your services]. Propose: collaboration type, mutual benefits (specific for both parties), success metrics, and suggested next steps. Make it compelling but not overly salesy.",
        usage: "পার্টনারশিপ প্রপোজাল লিখতে।"
      },
      {
        title: "Customer Feedback Request",
        copyText: "Write an email requesting feedback from customers who purchased [product/service] [timeframe] ago. Include: thank you for their purchase, why feedback matters, specific questions to answer (5-7), incentive offer if any, and easy response options. Keep it friendly.",
        usage: "কাস্টমার ফিডব্যাক রিকোয়েস্ট করতে।"
      },
      {
        title: "Product Launch Announcement",
        copyText: "Write a product launch email for [product name]. Details: [key features]. Include: exciting subject line options (5), build-up intro, feature highlights with benefits, launch offer/pricing, social proof placeholder, and multiple CTAs. Create urgency without being pushy.",
        usage: "প্রোডাক্ট লঞ্চ অ্যানাউন্সমেন্ট ইমেইল লিখতে।"
      },
      {
        title: "Newsletter Content Writer",
        copyText: "Write a weekly newsletter for a [business type] business. This week's theme: [topic]. Include: engaging subject line, personal intro, main content section with value, curated resources/tips (3-5), subtle product mention, and engaging sign-off. Target: [audience].",
        usage: "নিউজলেটার কন্টেন্ট লিখতে।"
      },
      {
        title: "Complaint Response Email",
        copyText: "Write a professional response to this customer complaint: [paste complaint summary]. Include: sincere apology, acknowledgment of their frustration, explanation (if appropriate), solution offered, compensation if applicable, and prevention commitment. Maintain brand voice while being empathetic.",
        usage: "কাস্টমার কমপ্লেইন্ট হ্যান্ডেল করতে।"
      },
      {
        title: "Thank You Email Template",
        copyText: "Write 3 variations of thank you emails for: 1) After a purchase, 2) After a meeting, 3) After receiving a referral. Each should be genuine, include next steps or value-add, and strengthen the relationship. Keep professional but warm.",
        usage: "থ্যাংক ইউ ইমেইল লিখতে।"
      },
      {
        title: "Re-engagement Campaign Email",
        copyText: "Write a re-engagement email sequence (3 emails) for inactive customers who haven't purchased in [timeframe]. Include: reminder of value, what's new since they left, special comeback offer, and final goodbye (with easy return option). Make them feel valued, not guilted.",
        usage: "ইনঅ্যাক্টিভ কাস্টমারদের ফিরিয়ে আনতে।"
      }
    ]
  },
  {
    slug: "creative-art",
    title: "মিডজার্নি ও ডাল-ই (DALL-E) ইমেজ প্রম্পট গাইড",
    description: "AI দিয়ে আকর্ষণীয় ইমেজ, লোগো এবং গ্রাফিক ডিজাইন তৈরির প্রম্পট।",
    icon: "Palette",
    prompts: [
      {
        title: "Product Photography Prompt",
        copyText: "Professional product photography of [product], studio lighting, clean white background, soft shadows, high-end commercial style, 8K resolution, photorealistic, centered composition, slight reflection on surface, shot with Canon EOS R5 --ar 4:5 --v 6",
        usage: "প্রোডাক্ট ফটোগ্রাফি তৈরি করতে।"
      },
      {
        title: "Logo Design Concept",
        copyText: "Minimalist logo design for [company name], [industry type] company, clean geometric shapes, [color preference], vector style, professional, memorable, scalable, negative space usage, modern typography, white background, inspired by [reference brands] --ar 1:1 --v 6",
        usage: "লোগো ডিজাইন কনসেপ্ট তৈরি করতে।"
      },
      {
        title: "Social Media Graphics",
        copyText: "Eye-catching social media post graphic for [brand/topic], vibrant colors, bold typography space, [style: minimalist/maximalist/gradient], Instagram-optimized, trendy 2024 design, clean layout, engaging visual hierarchy, [mood: professional/playful/luxurious] --ar 1:1 --v 6",
        usage: "সোশ্যাল মিডিয়া গ্রাফিক্স তৈরি করতে।"
      },
      {
        title: "Banner Design Template",
        copyText: "Website hero banner design, [topic/theme], modern gradient background, abstract geometric elements, space for headline text on left, dynamic composition, professional corporate style, [color scheme], widescreen format, high contrast --ar 16:9 --v 6",
        usage: "ওয়েবসাইট ব্যানার ডিজাইন করতে।"
      },
      {
        title: "Character Design Concept",
        copyText: "Character design, [character description], [style: anime/cartoon/realistic/3D], full body pose, expressive face, detailed costume design, vibrant colors, dynamic pose, professional concept art, character sheet style, [mood/personality traits] --ar 3:4 --v 6",
        usage: "ক্যারেক্টার ডিজাইন করতে।"
      },
      {
        title: "Landscape Art Generator",
        copyText: "Breathtaking [landscape type: mountain/ocean/forest/city] scene, [time of day], dramatic lighting, [style: photorealistic/impressionist/fantasy], vivid colors, atmospheric perspective, cinematic composition, [weather/mood], 8K detailed, trending on ArtStation --ar 16:9 --v 6",
        usage: "ল্যান্ডস্কেপ আর্ট তৈরি করতে।"
      },
      {
        title: "Abstract Art Creator",
        copyText: "Abstract art composition, [color palette], fluid organic shapes, [style: geometric/fluid/mixed media], contemporary gallery style, dynamic movement, balanced composition, textured elements, suitable for wall art print, emotional and evocative --ar 3:4 --v 6",
        usage: "অ্যাবস্ট্রাক্ট আর্ট তৈরি করতে।"
      },
      {
        title: "Portrait Style Generator",
        copyText: "Stunning portrait of [subject description], [lighting: Rembrandt/butterfly/dramatic], [style: oil painting/digital art/photography], expressive eyes, detailed skin texture, artistic background, [mood: serene/intense/joyful], professional quality, museum-worthy --ar 3:4 --v 6",
        usage: "আর্টিস্টিক পোর্ট্রেট তৈরি করতে।"
      },
      {
        title: "Infographic Layout",
        copyText: "Clean infographic design layout, [topic], data visualization elements, [color scheme], modern flat design, icon illustrations, clear hierarchy, professional business style, white space, easy to read, corporate presentation quality --ar 2:3 --v 6",
        usage: "ইনফোগ্রাফিক লেআউট তৈরি করতে।"
      },
      {
        title: "Book Cover Design",
        copyText: "Compelling book cover design for [genre] book titled '[title]', [mood: mysterious/romantic/thrilling/inspiring], professional typography space, dramatic imagery, bookstore-ready, eye-catching, [style: illustrated/photographic/abstract], spine design included --ar 2:3 --v 6",
        usage: "বই-এর কভার ডিজাইন করতে।"
      }
    ]
  },
  {
    slug: "youtube-growth",
    title: "ইউটিউব ভিডিও স্ক্রিপ্ট ও টাইটেল জেনারেটর প্রম্পট",
    description: "ইউটিউব চ্যানেল গ্রোথের জন্য স্ক্রিপ্ট, SEO টাইটেল এবং থাম্বনেইল আইডিয়া প্রম্পট।",
    icon: "Youtube",
    prompts: [
      {
        title: "Video Script Writer",
        copyText: "Write a YouTube video script for a [X]-minute video about [topic]. Target audience: [audience]. Include: hook (first 30 seconds), introduction, main content (3-5 sections with timestamps), call-to-action points, and strong outro. Add [B-roll suggestions] and [on-screen text] cues.",
        usage: "ইউটিউব ভিডিও স্ক্রিপ্ট লিখতে।"
      },
      {
        title: "SEO Title Generator",
        copyText: "Generate 15 SEO-optimized YouTube video titles for a video about [topic]. Each title should: be under 60 characters, include the main keyword, use power words, create curiosity or promise value. Include mix of: how-to, listicles, and question formats.",
        usage: "ভিডিও টাইটেল অপটিমাইজ করতে।"
      },
      {
        title: "Description Optimizer",
        copyText: "Write an SEO-optimized YouTube video description for a video about [topic]. Include: compelling first 2 lines (shown in preview), timestamps, keyword-rich paragraphs, related video links placeholder, social media links, hashtags (3-5), and call-to-action.",
        usage: "ভিডিও ডেসক্রিপশন লিখতে।"
      },
      {
        title: "Thumbnail Ideas Generator",
        copyText: "Suggest 5 high-CTR thumbnail concepts for a YouTube video about [topic]. For each concept include: main visual element, text overlay (max 4 words), color scheme, emotion to convey, face expression if applicable, and what makes it click-worthy. Reference successful videos in this niche.",
        usage: "থাম্বনেইল আইডিয়া পেতে।"
      },
      {
        title: "Hook Script Generator",
        copyText: "Write 5 different video hook scripts (first 15-30 seconds) for a video about [topic]. Each hook should use a different technique: shocking statement, question, story teaser, challenge, or bold promise. Make viewers want to watch the full video.",
        usage: "ভিডিও হুক লিখতে।"
      },
      {
        title: "End Screen CTA Script",
        copyText: "Write engaging end screen scripts (last 20 seconds) for a [channel niche] YouTube video. Include: recap of value given, tease next video, ask for subscribe with specific reason why, and comment question. Create 3 variations with different energy levels.",
        usage: "এন্ড স্ক্রিন CTA লিখতে।"
      },
      {
        title: "Community Tab Post Ideas",
        copyText: "Generate 10 YouTube Community tab post ideas for a [niche] channel. Include: polls with interesting questions, behind-the-scenes updates, video topic votes, fun questions, milestone celebrations, and content teasers. Each post should drive engagement.",
        usage: "কমিউনিটি ট্যাব পোস্ট আইডিয়া পেতে।"
      },
      {
        title: "YouTube Shorts Script",
        copyText: "Write a YouTube Shorts script (under 60 seconds) about [topic]. Structure: instant hook (2 sec), quick value delivery, fast pacing, strong punchline/CTA. Include: visual cues, text overlay suggestions, and trending audio recommendation if applicable.",
        usage: "ইউটিউব শর্টস স্ক্রিপ্ট লিখতে।"
      },
      {
        title: "Playlist Strategy Creator",
        copyText: "Create a playlist strategy for a [niche] YouTube channel. Suggest: 5 playlist themes with names, 8-12 video ideas per playlist, playlist descriptions, optimal video order for watch time, and cross-promotion strategy between playlists.",
        usage: "প্লেলিস্ট স্ট্র্যাটেজি তৈরি করতে।"
      },
      {
        title: "Analytics Insight Generator",
        copyText: "Based on these YouTube analytics: [paste metrics - views, watch time, CTR, retention], provide actionable insights. Analyze: what's working, what needs improvement, content strategy adjustments, optimal posting schedule, and 3 specific actions to improve performance.",
        usage: "অ্যানালিটিক্স থেকে ইনসাইট পেতে।"
      }
    ]
  },
  {
    slug: "bangla-writing",
    title: "শুদ্ধ বাংলা লেখা ও অনুবাদের জন্য ChatGPT প্রম্পট",
    description: "ভুলহীন বাংলা লেখা, ইংরেজি থেকে বাংলা অনুবাদ এবং ফরমাল বাংলা মেইল লেখার জন্য প্রম্পট।",
    icon: "PenTool",
    prompts: [
      {
        title: "English to Formal Bangla",
        copyText: "Translate the following text into formal/professional Bengali suitable for business communication. Maintain the tone and intent while using appropriate বাংলা terminology. Avoid English words where Bangla alternatives exist. Text: [paste text]",
        usage: "অফিসিয়াল ডকুমেন্ট অনুবাদের জন্য।"
      },
      {
        title: "Bangla Grammar Checker",
        copyText: "Review this Bengali text for grammatical errors, spelling mistakes, and punctuation issues. Correct all errors and explain the rules behind each correction. Also suggest improvements for better readability. Text: [paste Bangla text]",
        usage: "বাংলা গ্রামার চেক করতে।"
      },
      {
        title: "Proverb Integration Helper",
        copyText: "Suggest 5 relevant Bengali proverbs (প্রবাদ বাক্য) that could enhance writing about [topic]. For each proverb, provide: the proverb in Bangla, literal meaning, contextual meaning, and example sentence showing how to use it in modern writing.",
        usage: "লেখায় প্রবাদ বাক্য যোগ করতে।"
      },
      {
        title: "Formal Letter Writing",
        copyText: "Write a formal Bengali letter for [purpose: job application/complaint/request/official communication]. Include: proper সম্বোধন, formal opening, clear body paragraphs, polite closing, and appropriate বিনীত/নিবেদক signature format. Follow standard বাংলা পত্র format.",
        usage: "ফরমাল বাংলা চিঠি লিখতে।"
      },
      {
        title: "Creative Story in Bangla",
        copyText: "Write a creative short story in Bengali about [theme/topic]. The story should be [word count] words, include vivid Bengali expressions and idioms, have engaging dialogue in natural Bangla, and capture the essence of Bengali storytelling tradition. Target audience: [audience].",
        usage: "বাংলায় ক্রিয়েটিভ গল্প লিখতে।"
      },
      {
        title: "Technical Translation",
        copyText: "Translate this technical content into clear, understandable Bengali. For technical terms without direct Bangla equivalents, provide the English term with বাংলা explanation in brackets. Maintain accuracy while being accessible to non-expert readers. Content: [paste technical text]",
        usage: "টেকনিক্যাল কন্টেন্ট বাংলায় অনুবাদ করতে।"
      },
      {
        title: "Social Media Post in Bangla",
        copyText: "Write an engaging social media post in Bengali about [topic] for [platform: Facebook/Instagram]. Use natural, conversational Bangla that resonates with young Bangladeshi audience. Include relevant emojis, hashtags in both Bangla and English, and a compelling call-to-action.",
        usage: "বাংলায় সোশ্যাল মিডিয়া পোস্ট লিখতে।"
      },
      {
        title: "News Article Style",
        copyText: "Write a news article in Bengali about [topic] following standard journalism format. Include: attention-grabbing headline, informative lead paragraph answering 5W1H, supporting details in inverted pyramid style, and objective tone throughout. Word count: [X] words.",
        usage: "বাংলায় নিউজ আর্টিকেল লিখতে।"
      },
      {
        title: "Academic Bangla Writing",
        copyText: "Write an academic paragraph in formal Bengali about [topic] suitable for [academic level]. Use proper academic vocabulary, cite-worthy style, and maintain scholarly tone. Avoid colloquialisms and ensure grammatical precision. Include topic sentence, supporting arguments, and conclusion.",
        usage: "একাডেমিক বাংলা লেখায়।"
      },
      {
        title: "Poetic Expression Helper",
        copyText: "Help me express this idea poetically in Bengali: [idea/emotion]. Create: 3 poetic lines using Bengali literary devices (উপমা, রূপক, অনুপ্রাস), a short poem (4-8 lines) in traditional Bengali meter if possible, and prose poetry version. Capture the emotional essence beautifully.",
        usage: "কাব্যিক বাংলা প্রকাশের জন্য।"
      }
    ]
  },
  {
    slug: "productivity",
    title: "প্রতিদিনের কাজ গুছিয়ে নেওয়ার ১০টি স্মার্ট প্রম্পট",
    description: "টাইম ম্যানেজমেন্ট, টাস্ক প্রায়োরিটি এবং গোল সেটিং এর জন্য প্রোডাক্টিভিটি প্রম্পট।",
    icon: "Clock",
    prompts: [
      {
        title: "Daily Task Prioritizer",
        copyText: "Help me prioritize my tasks for today using the Eisenhower Matrix. My tasks are: [list tasks]. Categorize each as: Urgent & Important (Do First), Important but Not Urgent (Schedule), Urgent but Not Important (Delegate), Neither (Eliminate). Create a time-blocked schedule.",
        usage: "দৈনিক কাজ প্রায়োরিটাইজ করতে।"
      },
      {
        title: "Weekly Goal Planner",
        copyText: "Create a weekly plan to achieve [goal] by [deadline]. Break it down into: daily actionable tasks, time estimates, potential obstacles and solutions, progress checkpoints, and success metrics. Use SMART goal framework and suggest accountability measures.",
        usage: "সাপ্তাহিক গোল প্ল্যান করতে।"
      },
      {
        title: "Meeting Summary Generator",
        copyText: "Summarize this meeting transcript/notes into actionable format: [paste notes]. Include: key decisions made, action items with owners and deadlines, questions to follow up on, next steps, and next meeting agenda suggestions. Format for easy sharing.",
        usage: "মিটিং সামারি তৈরি করতে।"
      },
      {
        title: "Decision Matrix Creator",
        copyText: "Help me decide between these options: [list options] for [decision context]. Create a weighted decision matrix with criteria: [list criteria or suggest relevant ones]. Score each option objectively and provide a clear recommendation with reasoning.",
        usage: "সিদ্ধান্ত নিতে সাহায্য করতে।"
      },
      {
        title: "Time Blocking Schedule",
        copyText: "Create a time-blocked daily schedule for a [profession/role] with these constraints: [work hours, meetings, personal commitments]. Include: deep work blocks, shallow task batches, breaks using Pomodoro or similar, buffer time, and evening wind-down routine.",
        usage: "টাইম ব্লকিং শিডিউল তৈরি করতে।"
      },
      {
        title: "Habit Tracker Setup",
        copyText: "Design a habit tracking system to build these habits: [list habits]. For each habit include: specific trigger, minimum viable action, reward system, streak tracking method, and recovery plan for missed days. Suggest a simple tracking template.",
        usage: "হ্যাবিট ট্র্যাকার সেটআপ করতে।"
      },
      {
        title: "Email Organization System",
        copyText: "Create an email management system to achieve inbox zero. Current situation: [describe email volume and pain points]. Suggest: folder/label structure, filter rules, response templates for common emails, and a daily email routine. Focus on reducing time spent on email.",
        usage: "ইমেইল অর্গানাইজ করতে।"
      },
      {
        title: "Project Breakdown Template",
        copyText: "Break down this project into manageable tasks: [project description]. Create: Work Breakdown Structure (WBS), task dependencies, time estimates, milestone checkpoints, risk factors, and a simple Gantt chart representation. Target completion: [deadline].",
        usage: "বড় প্রজেক্ট ভাগ করতে।"
      },
      {
        title: "Focus Session Planner",
        copyText: "Design a deep focus session plan for [task requiring concentration]. Include: pre-session preparation ritual, environment setup checklist, distraction prevention measures, session structure (duration, breaks), post-session review process. Consider my attention span: [short/medium/long].",
        usage: "ডিপ ফোকাস সেশন প্ল্যান করতে।"
      },
      {
        title: "Weekly Review Template",
        copyText: "Create a weekly review template covering: wins and achievements, lessons learned, tasks completed vs planned, energy levels analysis, goal progress tracking, adjustments needed, and next week's priorities. Make it completable in 15-20 minutes.",
        usage: "সাপ্তাহিক রিভিউ করতে।"
      }
    ]
  }
];

export const getCategoryBySlug = (slug: string): PromptCategory | undefined => {
  return PROMPT_CATEGORIES.find(category => category.slug === slug);
};

export const getAllCategorySlugs = (): string[] => {
  return PROMPT_CATEGORIES.map(category => category.slug);
};
