import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { promptCountLabel, promptCountLabelBn, categoryCountLabel, categoryCountLabelBn } from "@/config/siteStats";

interface FAQProps {
  language: 'bn' | 'en';
}

const faqData = {
    bn: [
      {
        question: "ChatGPT বাংলায় কাজ করে কিভাবে?",
        answer: "ChatGPT বাংলা ভাষা বুঝতে এবং উত্তর দিতে পারে। আপনি বাংলায় প্রশ্ন করলে বাংলায় উত্তর পাবেন। bdprompt.com-এ আমরা বিশেষভাবে বাংলা ভাষায় অপ্টিমাইজড প্রম্পট তৈরি করেছি যা আরও ভালো ফলাফল দেয়।"
      },
      {
        question: "বাংলা AI প্রম্পট কি ফ্রি?",
        answer: "হ্যাঁ! bdprompt.com-এ বেশিরভাগ প্রম্পট সম্পূর্ণ বিনামূল্যে। আপনি এক ক্লিকে কপি করে যেকোনো AI টুলে (ChatGPT, Claude, Gemini) ব্যবহার করতে পারবেন। প্রিমিয়াম প্রম্পট প্যাকও পাওয়া যায়।"
      },
      {
        question: "AI প্রম্পট দিয়ে কী কী করা যায়?",
        answer: "AI প্রম্পট দিয়ে আপনি ব্লগ পোস্ট, সোশ্যাল মিডিয়া কন্টেন্ট, মার্কেটিং কপি, কোড, ইমেজ জেনারেশন, শিক্ষামূলক কন্টেন্ট, কবিতা, গল্প এবং আরও অনেক কিছু তৈরি করতে পারবেন।"
      },
      {
        question: "শিক্ষার্থীরা কিভাবে AI প্রম্পট ব্যবহার করতে পারে?",
        answer: "SSC, HSC এবং বিশ্ববিদ্যালয়ের ছাত্ররা AI প্রম্পট ব্যবহার করে পড়াশোনার নোট তৈরি, বিষয় বুঝতে, প্রশ্নের উত্তর অনুশীলন, এবং রিসার্চ করতে পারে। আমাদের '/shikkha' পেজে শিক্ষা-বিষয়ক প্রম্পট পাবেন।"
      },
      {
        question: "ব্যবসায় AI প্রম্পট কিভাবে সাহায্য করে?",
        answer: "বাংলাদেশি ব্যবসায়ীরা AI প্রম্পট ব্যবহার করে ফেসবুক পোস্ট, মেসেঞ্জার বট স্ক্রিপ্ট, প্রোডাক্ট ডেসক্রিপশন, কাস্টমার সাপোর্ট রেসপন্স এবং মার্কেটিং ক্যাম্পেইন তৈরি করতে পারেন।"
      },
      {
        question: "bdprompt.com কী অফার করে?",
        answer: `bdprompt.com-এ ${promptCountLabelBn} বাংলা AI প্রম্পট আছে — ${categoryCountLabelBn}টি ক্যাটাগরিতে সাজানো, বাংলাদেশের স্থানীয় প্রসঙ্গে তৈরি এবং বাংলা ভাষার জন্য অপ্টিমাইজড। নিয়মিত নতুন প্রম্পট যোগ হচ্ছে।`
      }
    ],
    en: [
      {
        question: "How does ChatGPT work in Bangla?",
        answer: "ChatGPT can understand and respond in Bangla. If you ask questions in Bangla, you'll get answers in Bangla. At bdprompt.com, we've created specially optimized prompts for Bangla language that deliver better results."
      },
      {
        question: "Are Bangla AI prompts free?",
        answer: "Yes! Most prompts on bdprompt.com are completely free. You can copy with one click and use them in any AI tool (ChatGPT, Claude, Gemini). Premium prompt packs are also available."
      },
      {
        question: "What can I do with AI prompts?",
        answer: "With AI prompts, you can create blog posts, social media content, marketing copy, code, image generation, educational content, poetry, stories, and much more."
      },
      {
        question: "How can students use AI prompts?",
        answer: "SSC, HSC, and university students can use AI prompts to create study notes, understand topics, practice answers, and do research. Find education-specific prompts on our '/shikkha' page."
      },
      {
        question: "How do AI prompts help businesses?",
        answer: "Bangladeshi businesses can use AI prompts to create Facebook posts, Messenger bot scripts, product descriptions, customer support responses, and marketing campaigns."
      },
      {
        question: "What does bdprompt.com offer?",
        answer: `bdprompt.com has ${promptCountLabel} Bangla AI prompts across ${categoryCountLabel} categories, written for the Bangladeshi context and optimized for the Bangla language. New prompts are added regularly.`
      }
    ]
  };

export const getFaqData = (language: 'bn' | 'en') => faqData[language];

export const FAQ = ({ language }: FAQProps) => {
  const currentFAQ = faqData[language];

  return (
    <section 
      className="py-16 lg:py-24 bg-muted/30"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 
            id="faq-heading"
            className={`text-3xl lg:text-4xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}
          >
            {language === 'bn' ? 'সচরাচর জিজ্ঞাসা' : 'Frequently Asked Questions'}
          </h2>
          <p className={`text-muted-foreground text-lg max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
            {language === 'bn' 
              ? 'বাংলা AI প্রম্পট সম্পর্কে সাধারণ প্রশ্ন ও উত্তর'
              : 'Common questions and answers about Bengali AI prompts'
            }
          </p>
        </header>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {currentFAQ.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg border border-border/50 px-6"
              >
                <AccordionTrigger 
                  className={`text-left text-base lg:text-lg font-medium hover:no-underline ${language === 'bn' ? 'font-bengali' : ''}`}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent 
                  className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
