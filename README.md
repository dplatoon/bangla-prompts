# BD Prompt - বাংলাদেশের সবচেয়ে বড় AI প্রম্পট হাব

🇧🇩 **বাংলাদেশের #১ AI প্রম্পট প্ল্যাটফর্ম** - ChatGPT, Claude, Gemini এবং অন্যান্য AI মডেলের জন্য ৫০০+ প্রিমিয়াম বাংলা প্রম্পট।

**Live Site:** [https://bdprompt.com](https://bdprompt.com)

## 🚀 Features

- ✅ **৫০০+ প্রিমিয়াম প্রম্পট** - শিক্ষা, ব্যবসা, কন্টেন্ট, কোড, মার্কেটিং এবং আরও অনেক ক্যাটাগরি
- ✅ **এক ক্লিকে কপি** - সহজে যেকোনো প্রম্পট কপি করে সরাসরি ব্যবহার করুন
- ✅ **ChatGPT, Claude, Gemini সাপোর্ট** - সব জনপ্রিয় AI মডেলের সাথে কাজ করে
- ✅ **বাংলা এবং ইংরেজি** - দুটি ভাষায়ই প্রম্পট পাওয়া যায়
- ✅ **সম্পূর্ণ বিনামূল্যে** - কোনো পেমেন্ট বা সাবস্ক্রিপশন লাগে না

## 🛠️ Technology Stack

- **Frontend Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **UI Components:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Authentication + Database)
- **State Management:** TanStack React Query
- **Deployment:** Vercel

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm installed
- Supabase account (for backend services)

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/Start-bd/bangla-prompt.git
cd bangla-prompt
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_SUPABASE_URL=https://your_project_id.supabase.co
```

4. **Run the development server:**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## 📂 Project Structure

```
bangla-prompt/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/           # Route pages
│   ├── integrations/    # Supabase client setup
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── App.tsx          # Main app component
├── index.html           # HTML entry point (SEO metadata)
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
└── README.md            # This file
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Site:** [bdprompt.com](https://bdprompt.com)
- **GitHub:** [github.com/Start-bd/bangla-prompt](https://github.com/Start-bd/bangla-prompt)
- **Support:** [bdprompt.com/support](https://bdprompt.com/support)

## 📧 Contact

For questions or support, email: **hello@bdprompt.com**

---

**Made with ❤️ in Bangladesh** 🇧🇩
