import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

const METHOD_STEPS = [
  {
    step: "১",
    title: "প্রয়োজন নির্বাচন",
    body: "প্রম্পটের টপিক বাছাই হয় বাংলাদেশি ব্যবহারকারীদের বাস্তব কাজ থেকে — Fiverr/Upwork-এর গিগ ও প্রপোজাল, SSC/HSC পড়াশোনা, ছোট ব্যবসার মার্কেটিং, YouTube কন্টেন্ট। কোনো কাজে যদি প্রম্পটের প্রয়োজন না থাকে, সেটি আমরা লিখি না।",
  },
  {
    step: "২",
    title: "বাংলা-প্রথম লেখা ও লোকালাইজেশন",
    body: "প্রতিটি প্রম্পট বাংলায় লেখা হয়, বাংলা-অনুবাদ করে নয়। সাংস্কৃতিক প্রসঙ্গ — ঈদ, পরীক্ষার বোর্ড, টাকায় দাম, স্থানীয় ব্যবসার উদাহরণ — লেখার সময়েই যুক্ত করা হয়।",
  },
  {
    step: "৩",
    title: "প্রতিটি প্রম্পট টেস্ট",
    body: "প্রকাশের আগে প্রতিটি প্রম্পট ChatGPT, Claude ও Gemini-তে চালিয়ে আউটপুট দেখা হয়। আউটপুট যদি অগোছালো, অসম্পূর্ণ বা কাজে না-আসা হয়, প্রম্পট ঠিক করে আবার টেস্ট করা হয়। টেস্ট পাস না করলে প্রম্পট প্রকাশ হয় না।",
  },
  {
    step: "৪",
    title: "মান নিয়ন্ত্রণ চেকলিস্ট",
    body: "প্রতিটি প্রম্পট একটি নির্দিষ্ট চেকলিস্ট পাস করে: ভূমিকা (role) স্পষ্ট, প্রসঙ্গ ও ফরম্যাট নির্দিষ্ট, কোনো placeholder নেই, কপি-পেস্ট করেই কাজ করে, এবং প্রত্যাশিত আউটপুট দেখানো আছে।",
  },
  {
    step: "৫",
    title: "পর্যালোচনা ও আপডেট",
    body: "AI মডেল বদলালে বা নতুন পরীক্ষার সিলেবাস এলে পুরোনো প্রম্পট পুনঃপরীক্ষা করা হয়। প্রতিটি প্রম্পটের শেষ আপডেটের তারিখ ট্র্যাক করা হয় এবং সাইটম্যাপে সেই তারিখই দেখানো হয়।",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead />

      <nav className="bg-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">BdPrompt</span>
            <span className="text-[10px] font-semibold bg-amber-400 text-teal-950 px-1.5 py-0.5 rounded">BETA</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/explore" className="hover:text-amber-400 transition">Explore</Link>
            <Link to="/guide" className="hover:text-amber-400 transition">Guide</Link>
            <Link to="/about" className="text-amber-400">About</Link>
          </div>
          <Link to="/auth" className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-semibold text-sm px-4 py-2 rounded-lg transition">
            বিনামূল্যে শুরু করুন
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <header className="bg-gradient-to-br from-teal-900 via-cyan-900 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs mb-6">
            <span>🇧🇩 বাংলাদেশ থেকে, বাংলাভাষীদের জন্য</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
            আমাদের সম্পর্কে ও{" "}
            <span className="text-amber-400">প্রম্পট তৈরির পদ্ধতি</span>
          </h1>
          <p className="text-base md:text-lg text-cyan-100 max-w-2xl mx-auto">
            BdPrompt কীভাবে কাজ করে, প্রম্পট কীভাবে লেখা ও টেস্ট করা হয় এবং কোন মান ধরে রাখা হয় — খোলাখুলি এখানেই বলা হলো।
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* WHO WE ARE */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">BdPrompt কী?</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            BdPrompt হলো Start BD-এর চালানো একটি বাংলা AI প্রম্পট লাইব্রেরি। আমরা বাংলাদেশের একটি ছোট টিম — শিক্ষার্থী,
            freelancer, ব্যবসায়ী ও কন্টেন্ট নির্মাতাদের জন্য ChatGPT, Claude ও Gemini-তে কাজ করা বাংলা প্রম্পট তৈরি ও
            টেস্ট করি এবং বিনামূল্যে ভাগ করি।
          </p>
          <p className="text-gray-700 leading-relaxed">
            এখানে কোনো সাইন-আপ ফি বা লগইন ছাড়াই প্রম্পট কপি করা যায়। প্রিমিয়াম প্রম্পট থাকলে দাম স্পষ্টভাবে দেখানো হয় —
            কোনো লুকানো শর্ত নেই।
          </p>
        </section>

        {/* METHODOLOGY */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">প্রম্পট তৈরির পদ্ধতি</h2>
          <p className="text-gray-600 text-sm mb-6">
            প্রতিটি প্রম্পট এই ৫ ধাপ পার হয়ে তবেই সাইটে প্রকাশ হয়।
          </p>
          <div className="space-y-4">
            {METHOD_STEPS.map((s) => (
              <div key={s.step} className="flex gap-4 bg-gray-50 border border-gray-100 rounded-xl p-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-teal-900 text-amber-400 font-bold flex items-center justify-center">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HONESTY POLICY */}
        <section className="mb-12 bg-teal-50 border border-teal-100 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">সততার নীতি</h2>
          <ul className="space-y-2.5 text-gray-700 text-sm leading-relaxed">
            <li className="flex gap-2"><span className="text-teal-700 font-bold">✓</span> প্রদর্শিত প্রম্পট সংখ্যা আসল ক্যাটালগ থেকে আসে — আমরা যতটি প্রম্পট আছে তার বেশি দাবি করি না।</li>
            <li className="flex gap-2"><span className="text-teal-700 font-bold">✓</span> যাচাই-না-করা ব্যবহারকারীর সংখ্যা, কপি সংখ্যা বা রেটিং দেখানো হয় না। টেস্ট ছাড়া কোনো প্রম্পট প্রকাশ হয় না।</li>
            <li className="flex gap-2"><span className="text-teal-700 font-bold">✓</span> AI আউটপুট ভুল হতে পারে — গুরুত্বপূর্ণ কাজে (পরীক্ষা, ক্লায়েন্ট ডেলিভারি) ব্যবহারের আগে নিজে যাচাই করুন।</li>
            <li className="flex gap-2"><span className="text-teal-700 font-bold">✓</span> ভুল পেলে <Link to="/support" className="text-teal-800 font-semibold hover:underline">সাপোর্টে</Link> জানান — আমরা ঠিক করি।</li>
          </ul>
        </section>

        {/* INTERNAL LINKS */}
        <section className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">আরও দেখুন</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "🎓 প্রম্পট এক্সপ্লোর করুন", href: "/explore" },
              { label: "📖 ব্যবহারের গাইড", href: "/guide" },
              { label: "📋 সাবমিশন গাইডলাইন", href: "/guidelines" },
              { label: "💼 Freelancer প্রম্পট", href: "/freelancer-prompts" },
              { label: "🎓 SSC পরীক্ষার প্রম্পট", href: "/ssc-exam-prompts" },
              { label: "✍️ ক্রিয়েটর হন", href: "/become-creator" },
            ].map((link) => (
              <Link key={link.href} to={link.href} className="text-center border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-700 hover:border-teal-500 hover:text-teal-800 transition">
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-teal-950 text-teal-200 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-2 justify-between items-center">
          <p>© {new Date().getFullYear()} BdPrompt by Start BD — বাংলা Free AI Prompt Generator</p>
          <p>Start BD</p>
        </div>
      </footer>
    </div>
  );
}
